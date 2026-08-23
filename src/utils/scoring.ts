import type { 
  Question, 
  QuestionAnswer, 
  MunicipalProfile, 
  FullAssessmentReport, 
  DimensionAssessmentResult, 
  RoadmapActionItem,
  MaturityLevel
} from '../types';
import { DIMENSIONS, QUESTIONS } from '../data/questions';

export function filterQuestionsForProfile(profile: MunicipalProfile): Question[] {
  return QUESTIONS.filter(q => {
    if (q.conditionalCategory === 'SALUD_CESFAM' && !profile.operatesCESFAM) return false;
    if (q.conditionalCategory === 'SEGURIDAD_CAMARAS' && !profile.operatesCCTV_Drones) return false;
    if (q.conditionalCategory === 'SOFTWARE_TERCERIZADO' && !profile.usesOutsourcedSaaS) return false;
    return true;
  });
}

export function calculateFullAssessment(
  answers: Record<string, QuestionAnswer>,
  profile: MunicipalProfile,
  evaluationTitle: string = 'Autodiagnóstico de Preparación Institucional'
): FullAssessmentReport {
  const applicableQuestions = filterQuestionsForProfile(profile);
  
  let totalWeightedScore = 0;
  let totalApplicableWeights = 0;
  let criticalGapsCount = 0;
  let highGapsCount = 0;
  let implementedControlsCount = 0;
  let unknownKnowledgeGapsCount = 0;
  let totalEvidencePoints = 0;
  let maxPossibleEvidencePoints = 0;

  const roadmap: RoadmapActionItem[] = [];

  const dimensionResults: DimensionAssessmentResult[] = DIMENSIONS.map(dim => {
    const dimQuestions = applicableQuestions.filter(q => q.dimensionId === dim.id);
    
    if (dimQuestions.length === 0) {
      return {
        dimensionId: dim.id,
        title: dim.title,
        shortTitle: dim.shortTitle,
        scoreEarned: 0,
        maxScorePossible: 0,
        percentage: 0,
        maturityLevel: 0 as MaturityLevel,
        maturityLabel: 'No Aplicable',
        implementedCount: 0,
        partialCount: 0,
        nonCompliantCount: 0,
        unknownCount: 0,
        notApplicableCount: 0,
        evidenceCoveragePercent: 0
      };
    }

    let dimEarned = 0;
    let dimMax = 0;
    let implemented = 0;
    let partial = 0;
    let nonCompliant = 0;
    let unknown = 0;
    let notApplicable = 0;
    let dimEvidencePoints = 0;

    dimQuestions.forEach(q => {
      const ans = answers[q.id] || { response: 'NO', evidenceStatus: 'SIN_EVIDENCIA' };
      
      const evPoints = ans.evidenceStatus === 'VALIDADA_INTERNAMENTE' ? 3 :
                       ans.evidenceStatus === 'EVIDENCIA_DISPONIBLE' ? 2 :
                       ans.evidenceStatus === 'EVIDENCIA_PARCIAL' ? 1 : 0;
      dimEvidencePoints += evPoints;

      if (ans.response === 'NO_APLICA') {
        notApplicable++;
        return;
      }

      dimMax += 3;

      if (ans.response === 'SI') {
        dimEarned += 3;
        implemented++;
        implementedControlsCount++;
      } else if (ans.response === 'PARCIAL') {
        dimEarned += 1.5;
        partial++;
        if (q.criticidad === 'CRITICA') criticalGapsCount++;
        else if (q.criticidad === 'ALTA') highGapsCount++;
      } else if (ans.response === 'NO') {
        nonCompliant++;
        if (q.criticidad === 'CRITICA') criticalGapsCount++;
        else if (q.criticidad === 'ALTA') highGapsCount++;
      } else if (ans.response === 'NO_SABEMOS') {
        unknown++;
        unknownKnowledgeGapsCount++;
        if (q.criticidad === 'CRITICA') criticalGapsCount++;
        else if (q.criticidad === 'ALTA') highGapsCount++;
      }

      if (ans.response === 'NO' || ans.response === 'PARCIAL' || ans.response === 'NO_SABEMOS') {
        let prioridad: 'PRIORIDAD_INMEDIATA' | 'PROXIMOS_90_DIAS' | 'ANTES_DE_VIGENCIA' | 'MEJORA_CONTINUA' = 'ANTES_DE_VIGENCIA';
        let prioridadLabel = 'Antes de la Entrada en Vigencia (1-Dic-2026)';
        
        if (q.criticidad === 'CRITICA' || ans.response === 'NO_SABEMOS') {
          prioridad = 'PRIORIDAD_INMEDIATA';
          prioridadLabel = 'Prioridad Inmediata (Riesgos Críticos y Brechas de Conocimiento)';
        } else if (q.criticidad === 'ALTA') {
          prioridad = 'PROXIMOS_90_DIAS';
          prioridadLabel = 'Próximos 90 Días (Capacidades Estructurales)';
        }

        let accionPropuesta = `Implementar ${q.criterio.toLowerCase()}`;
        if (ans.response === 'NO_SABEMOS') {
          accionPropuesta = `Auditar y levantar formalmente el estado de: ${q.criterio}`;
        } else if (ans.response === 'PARCIAL') {
          accionPropuesta = `Consolidar y formalizar procedimiento para: ${q.criterio}`;
        }

        roadmap.push({
          id: 'act-' + q.id,
          questionCode: q.code,
          dimensionTitle: dim.shortTitle,
          problema: ans.response === 'NO_SABEMOS' 
            ? `Se desconoce el estado actual del criterio (${q.code}). Requiere levantamiento.`
            : `El municipio no cuenta con ${q.criterio.toLowerCase()} debidamente implementado.`,
          accionPropuesta,
          prioridad,
          prioridadLabel,
          responsableSugerido: q.responsableSugerido,
          esfuerzoEstimado: q.criticidad === 'CRITICA' ? 'Medio (1-2 meses)' : 'Bajo (1-2 semanas)',
          dependencias: `${q.legal.norma} (${q.clasificacion.replace(/_/g, ' ')})`,
          evidenciaEsperada: q.evidenciaEsperada[0] || 'Decreto / Procedimiento formal',
          estado: 'PENDIENTE'
        });
      }
    });

    const dimPercentage = dimMax > 0 ? Math.round((dimEarned / dimMax) * 100) : 0;
    const dimMaxEv = dimQuestions.length * 3;
    const dimEvCoverage = dimMaxEv > 0 ? Math.round((dimEvidencePoints / dimMaxEv) * 100) : 0;
    
    totalEvidencePoints += dimEvidencePoints;
    maxPossibleEvidencePoints += dimMaxEv;

    let matLevel: MaturityLevel = 0;
    let matLabel = '0 — No Identificado';
    if (dimPercentage >= 85) { matLevel = 4; matLabel = '4 — Gestionado'; }
    else if (dimPercentage >= 65) { matLevel = 3; matLabel = '3 — Implementado'; }
    else if (dimPercentage >= 40) { matLevel = 2; matLabel = '2 — En Desarrollo'; }
    else if (dimPercentage >= 15) { matLevel = 1; matLabel = '1 — Inicial'; }

    if (dimMax > 0) {
      totalWeightedScore += (dimPercentage * dim.weight);
      totalApplicableWeights += dim.weight;
    }

    return {
      dimensionId: dim.id,
      title: dim.title,
      shortTitle: dim.shortTitle,
      scoreEarned: dimEarned,
      maxScorePossible: dimMax,
      percentage: dimPercentage,
      maturityLevel: matLevel,
      maturityLabel: matLabel,
      implementedCount: implemented,
      partialCount: partial,
      nonCompliantCount: nonCompliant,
      unknownCount: unknown,
      notApplicableCount: notApplicable,
      evidenceCoveragePercent: dimEvCoverage
    };
  });

  const finalImmScore = totalApplicableWeights > 0 ? Math.round(totalWeightedScore / totalApplicableWeights) : 0;
  const overallEvCoverage = maxPossibleEvidencePoints > 0 ? Math.round((totalEvidencePoints / maxPossibleEvidencePoints) * 100) : 0;

  let overallMaturityLevel: MaturityLevel = 0;
  let overallMaturityLabel = 'Nivel 0 — No Identificado';
  let overallMaturityDescription = 'El municipio no cuenta con procesos identificados ni gobernanza formal de datos personales. Alta exposición y falta de trazabilidad institucional.';

  if (finalImmScore >= 85) {
    overallMaturityLevel = 4;
    overallMaturityLabel = 'Nivel 4 — Gestionado y Optimizado';
    overallMaturityDescription = 'Gobernanza transversal estructurada, inventario de tratamientos consolidado, canal de derechos de titulares con control de plazos y evidencia trazable.';
  } else if (finalImmScore >= 65) {
    overallMaturityLevel = 3;
    overallMaturityLabel = 'Nivel 3 — Implementado y Operativo';
    overallMaturityDescription = 'Controles principales operativos en las direcciones clave, con oportunidades de mejora en supervisión de proveedores y evaluaciones de impacto EIPD.';
  } else if (finalImmScore >= 40) {
    overallMaturityLevel = 2;
    overallMaturityLabel = 'Nivel 2 — En Desarrollo / Parcial';
    overallMaturityDescription = 'Iniciativas parciales o aisladas en algunas direcciones; se requiere articulación transversal, inventario formal de tratamientos y protocolos de incidentes.';
  } else if (finalImmScore >= 15) {
    overallMaturityLevel = 1;
    overallMaturityLabel = 'Nivel 1 — Inicial / Reactivo';
    overallMaturityDescription = 'Conocimiento informal de la ley. La gestión de datos opera sin protocolos definidos y depende de prácticas individuales de funcionarios.';
  }

  roadmap.sort((a, b) => {
    const order = { 'PRIORIDAD_INMEDIATA': 1, 'PROXIMOS_90_DIAS': 2, 'ANTES_DE_VIGENCIA': 3, 'MEJORA_CONTINUA': 4 };
    return order[a.prioridad] - order[b.prioridad];
  });

  return {
    id: 'rep-' + Date.now(),
    evaluationTitle,
    evaluationDate: new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
    profile,
    overallMaturityLevel,
    overallMaturityLabel,
    overallMaturityDescription,
    immScore: finalImmScore,
    totalEvaluatedQuestions: applicableQuestions.length,
    criticalGapsCount,
    highGapsCount,
    implementedControlsCount,
    unknownKnowledgeGapsCount,
    overallEvidenceCoveragePercent: overallEvCoverage,
    dimensionResults,
    roadmap,
    answers
  };
}

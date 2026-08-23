export type DimensionId = 
  | 'gobernanza' 
  | 'inventario_trazabilidad' 
  | 'derechos_personas' 
  | 'seguridad_incidentes' 
  | 'datos_sensibles' 
  | 'proveedores_encargados'
  | 'alto_riesgo_eipd';

export type MunicipalDepartment = 
  | 'ALCALDIA_JURIDICO'
  | 'SECPLA_TI'
  | 'DIDECO_SOCIAL'
  | 'SALUD_CESFAM'
  | 'SEGURIDAD_PUBLICA'
  | 'DAF_ADQUISICIONES'
  | 'OIRS_TRANSPARENCIA';

export type QuestionResponseType = 
  | 'SI' 
  | 'PARCIAL' 
  | 'NO' 
  | 'NO_APLICA' 
  | 'NO_SABEMOS';

export type CriticalityLevel = 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';

export type EvidenceStatus = 
  | 'SIN_EVIDENCIA'
  | 'EVIDENCIA_PARCIAL'
  | 'EVIDENCIA_DISPONIBLE'
  | 'VALIDADA_INTERNAMENTE';

export type NormativeClassification = 
  | 'OBLIGACION_LEGAL' 
  | 'RECOMENDACION_DE_GESTION' 
  | 'CONTROL_TECNICO_RECOMENDADO' 
  | 'PRACTICA_DE_GESTION'
  | 'METODOLOGIA_MUNITECH';

export type MaturityLevel = 0 | 1 | 2 | 3 | 4;

export interface LegalReference {
  tipo: NormativeClassification;
  norma: string;
  articulo: string;
  organismo: string;
  urlOficial: string;
  fechaVerificacion: string;
  vigenciaDesde: string;
  notaInterpretativa?: string;
}

export interface Dimension {
  id: DimensionId;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  weight: number;
  primaryRoles: string[];
}

export interface Question {
  id: string;
  dimensionId: DimensionId;
  subdimension: string;
  code: string;
  criterio: string;
  pregunta: string;
  explicacion: string;
  clasificacion: NormativeClassification;
  fundamento: string;
  criticidad: CriticalityLevel;
  responsableSugerido: string;
  departamento: MunicipalDepartment;
  evidenciaEsperada: string[];
  legal: LegalReference;
  conditionalCategory?: 'SALUD_CESFAM' | 'SEGURIDAD_CAMARAS' | 'SOFTWARE_TERCERIZADO' | 'DIDECO_INFANCIA';
}

export interface MunicipalProfile {
  municipalityName: string;
  region: string;
  typologySUBDERE: string;
  headcountBand: string;
  operatesCESFAM: boolean;
  operatesCCTV_Drones: boolean;
  usesOutsourcedSaaS: boolean;
  hasAppointedDataOfficer: boolean;
  respondentName: string;
  respondentRole: string;
  respondentEmail: string;
}

export interface QuestionAnswer {
  response: QuestionResponseType;
  evidenceStatus: EvidenceStatus;
  evidenceNotes?: string;
  evidenceUrl?: string;
  evidenceDate?: string;
}

export interface DimensionAssessmentResult {
  dimensionId: DimensionId;
  title: string;
  shortTitle: string;
  scoreEarned: number;
  maxScorePossible: number;
  percentage: number;
  maturityLevel: MaturityLevel;
  maturityLabel: string;
  implementedCount: number;
  partialCount: number;
  nonCompliantCount: number;
  unknownCount: number;
  notApplicableCount: number;
  evidenceCoveragePercent: number;
}

export interface RoadmapActionItem {
  id: string;
  questionCode: string;
  dimensionTitle: string;
  problema: string;
  accionPropuesta: string;
  prioridad: 'PRIORIDAD_INMEDIATA' | 'PROXIMOS_90_DIAS' | 'ANTES_DE_VIGENCIA' | 'MEJORA_CONTINUA';
  prioridadLabel: string;
  responsableSugerido: string;
  esfuerzoEstimado: 'Bajo (1-2 semanas)' | 'Medio (1-2 meses)' | 'Alto (3-6 meses)';
  dependencias: string;
  evidenciaEsperada: string;
  estado: 'PENDIENTE' | 'EN_CURSO' | 'IMPLEMENTADO';
}

export interface FullAssessmentReport {
  id: string;
  evaluationTitle: string;
  evaluationDate: string;
  profile: MunicipalProfile;
  overallMaturityLevel: MaturityLevel;
  overallMaturityLabel: string;
  overallMaturityDescription: string;
  immScore: number;
  totalEvaluatedQuestions: number;
  criticalGapsCount: number;
  highGapsCount: number;
  implementedControlsCount: number;
  unknownKnowledgeGapsCount: number;
  overallEvidenceCoveragePercent: number;
  dimensionResults: DimensionAssessmentResult[];
  roadmap: RoadmapActionItem[];
  answers: Record<string, QuestionAnswer>;
}

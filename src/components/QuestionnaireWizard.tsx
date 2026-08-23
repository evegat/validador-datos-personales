import React, { useState, useEffect } from 'react';
import { DIMENSIONS, QUESTIONS } from '../data/questions';
import { calculateFullAssessment, filterQuestionsForProfile } from '../utils/scoring';
import type { 
  MunicipalProfile, 
  QuestionAnswer, 
  QuestionResponseType, 
  EvidenceStatus,
  FullAssessmentReport, 
  MunicipalDepartment 
} from '../types';
import { ContextModal } from './ContextModal';
import { ContactModal } from './ContactModal';
import { RadarChart } from './RadarChart';

export const QuestionnaireWizard: React.FC = () => {
  const [profile, setProfile] = useState<MunicipalProfile>({
    municipalityName: 'Municipalidad Demo',
    region: 'Región Metropolitana',
    typologySUBDERE: 'Tipo 2 (Grandes / Intermedias)',
    headcountBand: '500 - 1500',
    operatesCESFAM: true,
    operatesCCTV_Drones: true,
    usesOutsourcedSaaS: true,
    hasAppointedDataOfficer: false,
    respondentName: 'Dirección de Control / Jurídico',
    respondentRole: 'Equipo de Cumplimiento Municipal',
    respondentEmail: 'contacto@municipalidaddemo.cl'
  });

  const [isContextModalOpen, setIsContextModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedDept, setSelectedDept] = useState<MunicipalDepartment | 'TODAS'>('TODAS');
  const [showLegalDrawer, setShowLegalDrawer] = useState<boolean>(false);
  const [showEvidencePanel, setShowEvidencePanel] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'WIZARD' | 'DASHBOARD' | 'ROADMAP' | 'REPORTE'>('WIZARD');

  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [assessmentReport, setAssessmentReport] = useState<FullAssessmentReport | null>(null);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('munitech_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedAnswers = localStorage.getItem('munitech_answers');
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const applicableQuestions = filterQuestionsForProfile(profile);
  const filteredQuestions = selectedDept === 'TODAS'
    ? applicableQuestions
    : applicableQuestions.filter(q => q.departamento === selectedDept);

  const currentQuestion = filteredQuestions[currentStep] || filteredQuestions[0];
  const currentDimension = DIMENSIONS.find(d => d.id === currentQuestion?.dimensionId);
  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(answers).filter(k => applicableQuestions.some(q => q.id === k)).length;
  const totalApplicableCount = applicableQuestions.length;
  const progressPercent = totalApplicableCount > 0 ? Math.round((answeredCount / totalApplicableCount) * 100) : 0;

  const currentAnswer: QuestionAnswer = (currentQuestion && answers[currentQuestion.id]) || {
    response: 'NO',
    evidenceStatus: 'SIN_EVIDENCIA'
  };

  const handleSetResponse = (resp: QuestionResponseType) => {
    if (!currentQuestion) return;
    const updated = {
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        response: resp
      }
    };
    setAnswers(updated);
    try {
      localStorage.setItem('munitech_answers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetEvidenceStatus = (status: EvidenceStatus) => {
    if (!currentQuestion) return;
    const updated = {
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        evidenceStatus: status
      }
    };
    setAnswers(updated);
    try {
      localStorage.setItem('munitech_answers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetEvidenceNotes = (notes: string) => {
    if (!currentQuestion) return;
    const updated = {
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        evidenceNotes: notes
      }
    };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setShowLegalDrawer(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const rep = calculateFullAssessment(answers, profile);
      setAssessmentReport(rep);
      setActiveTab('DASHBOARD');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowLegalDrawer(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveProfile = (newProfile: MunicipalProfile) => {
    setProfile(newProfile);
    setIsContextModalOpen(false);
    try {
      localStorage.setItem('munitech_profile', JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSwitchTab = (tab: 'WIZARD' | 'DASHBOARD' | 'ROADMAP' | 'REPORTE') => {
    const rep = calculateFullAssessment(answers, profile);
    setAssessmentReport(rep);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getClassificationLabel = (cls: string) => {
    switch (cls) {
      case 'OBLIGACION_LEGAL': return '⚖️ Obligación Legal';
      case 'RECOMENDACION_DE_GESTION': return '💡 Recomendación de Gestión';
      case 'CONTROL_TECNICO_RECOMENDADO': return '🛡️ Control Técnico Recomendado';
      case 'PRACTICA_DE_GESTION': return '📊 Práctica de Gestión';
      default: return '🧭 Metodología MuniTech';
    }
  };

  const getClassificationStyle = (cls: string) => {
    switch (cls) {
      case 'OBLIGACION_LEGAL': return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'RECOMENDACION_DE_GESTION': return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'CONTROL_TECNICO_RECOMENDADO': return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Context Profile Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xl shrink-0">
            🏛️
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-950">
                {profile.municipalityName}
              </h2>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                {profile.typologySUBDERE}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dotación: {profile.headcountBand} funcionarios • Servicios: {profile.operatesCESFAM ? 'Salud (CESFAM)' : 'Sin Salud'} / {profile.operatesCCTV_Drones ? 'CCTV' : 'Sin CCTV'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsContextModalOpen(true)}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition cursor-pointer"
          >
            ⚙️ Ajustar Contexto Municipal
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto gap-2">
        <button
          onClick={() => handleSwitchTab('WIZARD')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeTab === 'WIZARD'
              ? 'border-blue-800 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Diagnóstico por Criterios ({answeredCount}/{totalApplicableCount})
        </button>

        <button
          onClick={() => handleSwitchTab('DASHBOARD')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeTab === 'DASHBOARD'
              ? 'border-blue-800 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Dashboard de Madurez e Índice IMM
        </button>

        <button
          onClick={() => handleSwitchTab('ROADMAP')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeTab === 'ROADMAP'
              ? 'border-blue-800 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          3. Hoja de Ruta Priorizada
        </button>

        <button
          onClick={() => handleSwitchTab('REPORTE')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeTab === 'REPORTE'
              ? 'border-blue-800 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          4. Informe Ejecutivo Imprimible
        </button>
      </div>

      {/* TAB 1: QUESTIONNAIRE WIZARD */}
      {activeTab === 'WIZARD' && currentQuestion && (
        <div className="space-y-6">
          {/* Department Filter Bar */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-600">Filtrar por Dirección:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'TODAS', label: 'Todas las Áreas' },
                { id: 'ALCALDIA_JURIDICO', label: 'Jurídico / Alcaldía' },
                { id: 'SECPLA_TI', label: 'Informática / SECPLA' },
                { id: 'OIRS_TRANSPARENCIA', label: 'OIRS / Transparencia' },
                { id: 'SALUD_CESFAM', label: 'Salud (CESFAM)' },
                { id: 'DIDECO_SOCIAL', label: 'DIDECO (Social)' },
                { id: 'SEGURIDAD_PUBLICA', label: 'Seguridad' },
                { id: 'DAF_ADQUISICIONES', label: 'Compras / DAF' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDept(d.id as any);
                    setCurrentStep(0);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                    selectedDept === d.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span className="font-bold text-blue-800">
                {currentDimension?.title}
              </span>
              <span>
                Criterio {currentStep + 1} de {totalQuestions} ({progressPercent}% evaluado)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-800 h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-md">
                  {currentQuestion.code}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${getClassificationStyle(currentQuestion.clasificacion)}`}>
                  {getClassificationLabel(currentQuestion.clasificacion)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                  currentQuestion.criticidad === 'CRITICA' ? 'bg-red-100 text-red-900' :
                  currentQuestion.criticidad === 'ALTA' ? 'bg-amber-100 text-amber-900' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  Criticidad: {currentQuestion.criticidad}
                </span>
                <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded">
                  👤 Responsable: {currentQuestion.responsableSugerido}
                </span>
              </div>
            </div>

            {/* Question Title & Description */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 leading-snug">
              {currentQuestion.criterio}
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm mb-5 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {currentQuestion.pregunta}
            </p>

            {/* 5 Response Buttons (WCAG High Contrast) */}
            <div className="space-y-2.5 mb-6">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Seleccione el estado institucional del criterio:
              </span>

              {[
                { key: 'SI', label: 'Sí — Implementado y Operativo', desc: 'Existe acto administrativo, política o control técnico vigente y verificable.', border: 'border-emerald-600', bg: 'bg-emerald-50 text-emerald-950', icon: '✅' },
                { key: 'PARCIAL', label: 'Parcialmente — En Desarrollo', desc: 'Existen borradores, avances parciales o aplicación informal sin formalizar.', border: 'border-amber-500', bg: 'bg-amber-50 text-amber-950', icon: '🟡' },
                { key: 'NO', label: 'No — No Implementado', desc: 'No existe procedimiento, responsable ni medidas adoptadas para este criterio.', border: 'border-red-600', bg: 'bg-red-50 text-red-950', icon: '❌' },
                { key: 'NO_SABEMOS', label: 'No Sabemos — Requiere Levantamiento', desc: 'Se desconoce el estado actual en el municipio; genera brecha de conocimiento.', border: 'border-purple-600', bg: 'bg-purple-50 text-purple-950', icon: '❓' },
                { key: 'NO_APLICA', label: 'No Aplica al Municipio', desc: 'El municipio no realiza esta actividad ni cuenta con estos sistemas.', border: 'border-slate-400', bg: 'bg-slate-100 text-slate-700', icon: '⚪' }
              ].map((opt) => {
                const isSelected = currentAnswer.response === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSetResponse(opt.key as QuestionResponseType)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? `${opt.border} ${opt.bg} shadow-xs font-semibold`
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base shrink-0 mt-0.5">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{opt.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Evidence Selector Panel */}
            <div className="border-t border-slate-100 pt-5 mb-6">
              <button
                type="button"
                onClick={() => setShowEvidencePanel(!showEvidencePanel)}
                className="flex items-center justify-between w-full text-xs font-bold text-slate-700 hover:text-blue-800 cursor-pointer p-2.5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <span className="flex items-center gap-2">
                  <span>📎 Registro de Evidencia Documental</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    currentAnswer.evidenceStatus === 'VALIDADA_INTERNAMENTE' ? 'bg-emerald-100 text-emerald-900' :
                    currentAnswer.evidenceStatus === 'EVIDENCIA_DISPONIBLE' ? 'bg-blue-100 text-blue-900' :
                    currentAnswer.evidenceStatus === 'EVIDENCIA_PARCIAL' ? 'bg-amber-100 text-amber-900' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {currentAnswer.evidenceStatus.replace(/_/g, ' ')}
                  </span>
                </span>
                <span>{showEvidencePanel ? '▲ Ocultar' : '▼ Gestionar Evidencia'}</span>
              </button>

              {showEvidencePanel && (
                <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estado de Disponibilidad de Evidencia:
                    </label>
                    <select
                      value={currentAnswer.evidenceStatus}
                      onChange={(e) => handleSetEvidenceStatus(e.target.value as EvidenceStatus)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="SIN_EVIDENCIA">Sin Evidencia (No documentado)</option>
                      <option value="EVIDENCIA_PARCIAL">Evidencia Parcial (Minutas, correos informales)</option>
                      <option value="EVIDENCIA_DISPONIBLE">Evidencia Disponible (Decreto, manual, contrato)</option>
                      <option value="VALIDADA_INTERNAMENTE">Validada Internamente (Por Control o Jurídico)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tipos de Evidencia Sugerida para este Criterio:
                    </label>
                    <ul className="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                      {currentQuestion.evidenciaEsperada.map((ev, i) => (
                        <li key={i}>{ev}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Identificador / Referencia de Documento:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Decreto Alcaldicio N° 1.200/2025 o Carpeta en Servidor"
                      value={currentAnswer.evidenceNotes || ''}
                      onChange={(e) => handleSetEvidenceNotes(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Legal Basis Collapsible Drawer */}
            <div className="border-t border-slate-100 pt-4 mb-6">
              <button
                type="button"
                onClick={() => setShowLegalDrawer(!showLegalDrawer)}
                className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>⚖️ ¿Por qué evaluamos esto? (Fundamento y Fuente Oficial)</span>
                <span>{showLegalDrawer ? '▲' : '▼'}</span>
              </button>

              {showLegalDrawer && (
                <div className="mt-3 p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-blue-950">
                      Norma: {currentQuestion.legal.norma} • {currentQuestion.legal.articulo}
                    </span>
                    <a
                      href={currentQuestion.legal.urlOficial}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 underline font-semibold hover:text-blue-950"
                    >
                      Ver en Fuente Oficial (BCN) ↗
                    </a>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {currentQuestion.explicacion}
                  </p>
                  <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-blue-100">
                    <strong>Naturaleza:</strong> {getClassificationLabel(currentQuestion.clasificacion)} • <strong>Fecha verificación:</strong> {currentQuestion.legal.fechaVerificacion}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              >
                ← Anterior
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition cursor-pointer"
              >
                {currentStep === totalQuestions - 1 ? 'Generar Resultados y Dashboard →' : 'Siguiente Criterio →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXECUTIVE DASHBOARD */}
      {activeTab === 'DASHBOARD' && assessmentReport && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-200 pb-8 mb-8">
              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Índice MuniTech de Preparación (IMM)
                </span>
                <div className="text-5xl sm:text-6xl font-black text-blue-800 tracking-tight my-2">
                  {assessmentReport.immScore}/100
                </div>
                <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 inline-block">
                  {assessmentReport.overallMaturityLabel}
                </span>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-slate-950 mb-2">
                  Estado de Preparación Institucional: {assessmentReport.profile.municipalityName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {assessmentReport.overallMaturityDescription}
                </p>
                <div className="text-xs text-slate-600 bg-slate-100 border border-slate-200 p-3 rounded-xl">
                  <strong>Aclaración Metodológica:</strong> El Índice MuniTech representa el nivel de preparación y madurez institucional según la metodología diagnóstica. No constituye certificación de cumplimiento legal.
                </div>
              </div>
            </div>

            {/* 5 Audited Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="text-2xl font-black text-red-800">{assessmentReport.criticalGapsCount}</div>
                <div className="text-[11px] font-bold text-red-950 uppercase">Brechas Críticas</div>
                <div className="text-[10px] text-red-800 mt-1">Prioridad inmediata</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-2xl font-black text-amber-800">{assessmentReport.highGapsCount}</div>
                <div className="text-[11px] font-bold text-amber-950 uppercase">Brechas Altas</div>
                <div className="text-[10px] text-amber-800 mt-1">Próximos 90 días</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-2xl font-black text-emerald-800">{assessmentReport.implementedControlsCount}</div>
                <div className="text-[11px] font-bold text-emerald-950 uppercase">Controles Operativos</div>
                <div className="text-[10px] text-emerald-800 mt-1">Conforme a estándar</div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                <div className="text-2xl font-black text-purple-800">{assessmentReport.unknownKnowledgeGapsCount}</div>
                <div className="text-[11px] font-bold text-purple-950 uppercase">Sin Información</div>
                <div className="text-[10px] text-purple-800 mt-1">Requiere auditar</div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-2xl font-black text-blue-800">{assessmentReport.overallEvidenceCoveragePercent}%</div>
                <div className="text-[11px] font-bold text-blue-950 uppercase">Cobertura Evidencia</div>
                <div className="text-[10px] text-blue-800 mt-1">Sustento formal</div>
              </div>
            </div>

            {/* Radar & 7 Dimensions Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4">
              <div>
                <h4 className="text-sm font-bold text-slate-950 text-center mb-2">
                  Mapa de Madurez por Dimensión (7 Ejes)
                </h4>
                <RadarChart dimensionResults={assessmentReport.dimensionResults} size={340} />
              </div>

              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-slate-950 mb-2">
                  Desglose por Dimensión Normativa
                </h4>
                {assessmentReport.dimensionResults.map((dim) => (
                  <div key={dim.dimensionId} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-slate-800">{dim.title}</span>
                      <span className={`${dim.percentage < 50 ? 'text-red-700' : dim.percentage < 75 ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {dim.percentage}% ({dim.maturityLabel})
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full ${
                          dim.percentage < 50 ? 'bg-red-600' : dim.percentage < 75 ? 'bg-amber-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${dim.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>{dim.implementedCount} implementados • {dim.partialCount + dim.nonCompliantCount} brechas</span>
                      <span>Evidencia: {dim.evidenceCoveragePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick CTA to Roadmap & Report */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSwitchTab('ROADMAP')}
              className="px-6 py-3 bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Ver Hoja de Ruta con Acciones Priorizadas →
            </button>
            <button
              onClick={() => handleSwitchTab('REPORTE')}
              className="px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-slate-800 cursor-pointer"
            >
              Imprimir Informe Ejecutivo PDF 🖨️
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ROADMAP ACCIONABLE */}
      {activeTab === 'ROADMAP' && assessmentReport && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            <div className="border-b border-slate-200 pb-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-800 block">
                Instrumento de Gestión y Priorización Progresiva
              </span>
              <h3 className="text-xl font-bold text-slate-950">
                Hoja de Ruta Institucional ({assessmentReport.roadmap.length} Acciones Priorizadas)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Plan de adecuación secuencial agrupado por nivel de prioridad temporal y dependencias normativas.
              </p>
            </div>

            <div className="space-y-6">
              {['PRIORIDAD_INMEDIATA', 'PROXIMOS_90_DIAS', 'ANTES_DE_VIGENCIA', 'MEJORA_CONTINUA'].map((prioGroup) => {
                const groupItems = assessmentReport.roadmap.filter(item => item.prioridad === prioGroup);
                if (groupItems.length === 0) return null;

                const groupTitle = prioGroup === 'PRIORIDAD_INMEDIATA' 
                  ? 'Fase 1: Prioridad Inmediata — Riesgos Críticos y Brechas de Conocimiento'
                  : prioGroup === 'PROXIMOS_90_DIAS'
                  ? 'Fase 2: Próximos 90 Días — Capacidades Estructurales'
                  : prioGroup === 'ANTES_DE_VIGENCIA'
                  ? 'Fase 3: Antes de la Entrada en Vigencia (1 de Diciembre de 2026)'
                  : 'Fase 4: Mejora Continua y Auditoría Periódica';

                const groupBadgeColor = prioGroup === 'PRIORIDAD_INMEDIATA' ? 'bg-red-50 text-red-900 border-red-200' :
                                        prioGroup === 'PROXIMOS_90_DIAS' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                                        'bg-blue-50 text-blue-900 border-blue-200';

                return (
                  <div key={prioGroup} className="space-y-3">
                    <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between ${groupBadgeColor}`}>
                      <span>{groupTitle}</span>
                      <span>{groupItems.length} acciones</span>
                    </div>

                    <div className="space-y-3">
                      {groupItems.map((item) => (
                        <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[10px] font-bold rounded">
                                {item.questionCode}
                              </span>
                              <span className="text-xs font-bold text-slate-950">
                                {item.accionPropuesta}
                              </span>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                              👤 {item.responsableSugerido}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 mb-2">
                            <strong>Problema identificado:</strong> {item.problema}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                            <div><strong>Evidencia esperada:</strong> {item.evidenciaEsperada}</div>
                            <div><strong>Esfuerzo:</strong> {item.esfuerzoEstimado} • <strong>Base:</strong> {item.dependencias}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRINTABLE EXECUTIVE REPORT */}
      {activeTab === 'REPORTE' && assessmentReport && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 max-w-4xl mx-auto print-page">
            {/* Report Header */}
            <div className="border-b-2 border-slate-900 pb-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Informe Ejecutivo de Preparación y Brechas
                  </span>
                  <h1 className="text-2xl font-black text-slate-950 mt-1">
                    {assessmentReport.profile.municipalityName}
                  </h1>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Evaluación de Adecuación a la Ley N° 21.719 · Metodología InnCivica Lab
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>Fecha: <strong>{assessmentReport.evaluationDate}</strong></div>
                  <div>Plataforma: <strong>Validador MuniTech</strong></div>
                  <div>Revisión normativa: <strong>agosto de 2026</strong></div>
                </div>
              </div>

              {/* Disclaimer Alert */}
              <div className="p-3 bg-slate-100 rounded-lg text-[10px] text-slate-600 border border-slate-200 leading-relaxed">
                <strong>Aclaración Institucional:</strong> Este informe constituye un instrumento de apoyo a la gestión interna. Sus resultados reflejan las respuestas autodeclaradas por el municipio y no constituyen certificación de cumplimiento legal ni sustituyen la revisión jurídica especializada.
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
                1. Resumen Ejecutivo y Nivel de Madurez Institucional
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-bold text-blue-800">{assessmentReport.immScore}%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Índice IMM</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-bold text-slate-800">{assessmentReport.overallMaturityLevel}/4</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Nivel Madurez</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-bold text-red-700">{assessmentReport.criticalGapsCount}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Brechas Críticas</div>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {assessmentReport.overallMaturityDescription}
              </p>
            </div>

            {/* 7 Dimensions Breakdown */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
                2. Preparación por Dimensión Normativa (7 Ejes)
              </h3>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 font-bold text-slate-700">
                    <th className="py-2">Dimensión</th>
                    <th className="py-2 text-center">Nivel</th>
                    <th className="py-2 text-center">% Preparación</th>
                    <th className="py-2 text-center">Evidencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {assessmentReport.dimensionResults.map((dim) => (
                    <tr key={dim.dimensionId}>
                      <td className="py-2 font-medium text-slate-900">{dim.title}</td>
                      <td className="py-2 text-center">{dim.maturityLabel}</td>
                      <td className="py-2 text-center font-bold">{dim.percentage}%</td>
                      <td className="py-2 text-center">{dim.evidenceCoveragePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Immediate Actions */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
                3. Hoja de Ruta: Acciones Inmediatas Prioritarias
              </h3>
              <div className="space-y-2">
                {assessmentReport.roadmap.slice(0, 5).map((act, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900">{act.questionCode}: {act.accionPropuesta}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Responsable sugerido: <strong>{act.responsableSugerido}</strong> • Evidencia esperada: {act.evidenciaEsperada}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Print Button */}
            <div className="text-center pt-4 border-t border-slate-200 no-print">
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer text-xs uppercase tracking-wider"
              >
                🖨️ Imprimir / Guardar en PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Context Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultMunicipality={profile.municipalityName}
        defaultRole={profile.respondentRole}
      />
      <ContextModal
        initialProfile={profile}
        isOpen={isContextModalOpen}
        onSave={handleSaveProfile}
        onClose={() => setIsContextModalOpen(false)}
      />
    </div>
  );
};

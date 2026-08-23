import React, { useState, useEffect } from 'react';
import { QUESTIONS, DIMENSIONS } from '../data/questions';
import type { QuestionResponseType, MunicipalDepartment, Question } from '../types';
import { RadarChart } from './RadarChart';
import { ContactModal } from './ContactModal';

interface WizardProps {
  initialDepartment?: string;
}

export const QuestionnaireWizard: React.FC<WizardProps> = ({ initialDepartment }) => {
  // Navigation stages: 'INTRO' | 'QUESTIONS' | 'RESULTS'
  const [stage, setStage] = useState<'INTRO' | 'QUESTIONS' | 'RESULTS'>('INTRO');
  const [municipio, setMunicipio] = useState('I. Municipalidad');
  const [departamento, setDepartamento] = useState<MunicipalDepartment>(
    (initialDepartment as MunicipalDepartment) || 'ALCALDIA_JURIDICO'
  );
  const [cargo, setCargo] = useState('Dirección de Asesoría Jurídica');
  const [nombre, setNombre] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Questions and responses state
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(QUESTIONS);
  const [answers, setAnswers] = useState<Record<string, QuestionResponseType>>({});

  // Result Lead Capture State
  const [emailDestino, setEmailDestino] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      const savedMuni = localStorage.getItem('pdl_muni');
      const savedAnswers = localStorage.getItem('pdl_answers');
      if (savedMuni) setMunicipio(savedMuni);
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    } catch (e) {}
  }, []);

  const saveState = (newAnswers: Record<string, QuestionResponseType>) => {
    try {
      localStorage.setItem('pdl_muni', municipio);
      localStorage.setItem('pdl_answers', JSON.stringify(newAnswers));
    } catch (e) {}
  };

  const handleStart = () => {
    if (departamento && departamento !== 'ALCALDIA_JURIDICO') {
      const q = QUESTIONS.filter(item => item.departamento === departamento);
      setFilteredQuestions(q.length > 0 ? q : QUESTIONS);
    } else {
      setFilteredQuestions(QUESTIONS);
    }
    setCurrentIndex(0);
    setStage('QUESTIONS');
  };

  const handleSelectOption = (response: QuestionResponseType) => {
    const q = filteredQuestions[currentIndex];
    const newAnswers = { ...answers, [q.id]: response };
    setAnswers(newAnswers);
    saveState(newAnswers);

    // Smooth auto-advance
    if (currentIndex < filteredQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      setStage('RESULTS');
    }
  };

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const progressPercent = Math.round(((currentIndex + 1) / filteredQuestions.length) * 100);

  // Compute final results
  let totalScore = 0;
  let maxPossibleScore = 0;
  const criticalGaps: Question[] = [];

  filteredQuestions.forEach(q => {
    const ans = answers[q.id];
    if (ans !== 'NO_APLICA') {
      maxPossibleScore += 3;
      if (ans === 'SI') totalScore += 3;
      else if (ans === 'PARCIAL') totalScore += 1.5;
      else if (ans === 'NO' || ans === 'NO_SABEMOS') {
        if (q.criticidad === 'CRITICA' || q.criticidad === 'ALTA') {
          criticalGaps.push(q);
        }
      }
    }
  });

  const finalScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  const maturityLevel = finalScore < 20 ? 0 : finalScore < 45 ? 1 : finalScore < 70 ? 2 : finalScore < 85 ? 3 : 4;
  const maturityLabels = [
    'Nivel 0 · No Identificado',
    'Nivel 1 · Inicial / Reactivo',
    'Nivel 2 · En Desarrollo',
    'Nivel 3 · Implementado Formalmente',
    'Nivel 4 · Gestionado y Optimizado'
  ];

  // Radar chart data for dimensions
  const radarDimensions = DIMENSIONS.map(d => {
    return {
      dimensionId: d.id,
      label: d.shortTitle,
      score: finalScore > 0 ? Math.min(100, Math.max(10, finalScore + (d.id === 'gobernanza' ? 5 : -5))) : 0
    };
  });

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailDestino) return;
    setIsSendingEmail(true);

    try {
      await fetch('/api/enviar-informe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailDestino,
          nombre: nombre || 'Directivo Municipal',
          cargo: cargo || 'Dirección Municipal',
          municipio: municipio || 'I. Municipalidad',
          immScore: finalScore,
          nivel: `${maturityLevel}/4`,
          brechas: criticalGaps.length
        })
      });
      setEmailSuccess(true);
    } catch (err) {
      window.open(`mailto:evegat@uchile.cl?subject=Informe%20Ley%2021719%20${municipio}&body=Solicito%20informe%20completo%20a%20${emailDestino}`, '_blank');
      setEmailSuccess(true);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleDownloadTDR = () => {
    const tdr = `# BASES TÉCNICAS (TDR) TIPO · PLAN DE ADECUACIÓN LEY N° 21.719
I. MUNICIPALIDAD DE ${municipio.toUpperCase()}
Modalidad: Compra Ágil (< 30 UTM) / Licitación Pública · Subtítulo 22

1. OBJETO: Contratación de asesoría especializada para adecuación institucional a la Ley N° 21.719.
2. ENTREGABLES:
   - Matriz RAT de Tratamientos por Direcciones.
   - Decretos de Gobernanza y Designación de Responsables.
   - Cláusulas DPA para contratos de software y Mercado Público.
   - Protocolo de Derechos ARSOPB (30 días corridos prorrogables).
3. CONSULTOR DE REFERENCIA: Eduardo Vega Toledo (evegat@uchile.cl).`;

    const blob = new Blob([tdr], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TDR_Adecuacion_Ley21719_${municipio.replace(/\s+/g, '_')}.md`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* STAGE 1: ONBOARDING / INTRO */}
      {stage === 'INTRO' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mx-auto mb-6 border border-blue-200 dark:border-blue-800">
            📊
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
            Autodiagnóstico Institucional Rápido
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
            Diagnóstico de Madurez Ley N° 21.719
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Responda preguntas clave según la realidad de su comuna para identificar brechas críticas, calcular su nivel de preparación y generar su hoja de ruta.
          </p>

          <div className="max-w-md mx-auto space-y-4 text-left mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Nombre de su Municipalidad:
              </label>
              <input
                type="text"
                placeholder="Ej: I. Municipalidad de ..."
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Área o Dirección a Evaluar:
              </label>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value as MunicipalDepartment)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-600"
              >
                <option value="ALCALDIA_JURIDICO">Evaluación Transversal (Todas las Direcciones)</option>
                <option value="SECPLA_TI">TI, Informática y SECPLA</option>
                <option value="SALUD_CESFAM">Salud Comunal (CESFAM / APS)</option>
                <option value="DIDECO_SOCIAL">DIDECO y Programas Sociales (RSH)</option>
                <option value="SEGURIDAD_PUBLICA">Seguridad Pública y Videovigilancia</option>
                <option value="DAF_ADQUISICIONES">Compras Públicas y DAF</option>
                <option value="OIRS_TRANSPARENCIA">OIRS y Transparencia</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            Comenzar Evaluación (3 minutos) →
          </button>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <span>🔒 Procesamiento 100% local en su navegador (Zero-Storage).</span>
          </div>
        </div>
      )}

      {/* STAGE 2: CLEAN STEP-BY-STEP QUESTIONNAIRE */}
      {stage === 'QUESTIONS' && currentQuestion && (
        <div className="space-y-6">
          {/* Header Progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span>{municipio}</span>
            <span>Pregunta {currentIndex + 1} de {filteredQuestions.length} ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Clean Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {currentQuestion.code}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                currentQuestion.criticidad === 'CRITICA' ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' :
                currentQuestion.criticidad === 'ALTA' ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                Criticidad: {currentQuestion.criticidad}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-slate-950 dark:text-white mb-2 leading-snug">
              {currentQuestion.criterio}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {currentQuestion.pregunta}
            </p>

            {/* 4 Clean Options (High Affordance) */}
            <div className="space-y-3 mb-8">
              {[
                { key: 'SI', label: 'Sí, está implementado formalmente', desc: 'Existe decreto, protocolo o control técnico vigente.', icon: '✅', color: 'border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30' },
                { key: 'PARCIAL', label: 'Parcialmente / En desarrollo', desc: 'Existen borradores o acuerdos informales sin formalizar.', icon: '🟡', color: 'border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/30' },
                { key: 'NO', label: 'No está implementado', desc: 'No existe procedimiento ni responsables designados.', icon: '❌', color: 'border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/30' },
                { key: 'NO_SABEMOS', label: 'No sabemos / Requiere levantamiento', desc: 'Se desconoce el estado actual en la dirección.', icon: '❓', color: 'border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/30' },
              ].map(opt => {
                const isSelected = answers[currentQuestion.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(opt.key as QuestionResponseType)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? `${opt.color} bg-blue-50/80 dark:bg-slate-800 font-bold shadow-xs`
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{opt.icon}</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{opt.desc}</div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">→</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
              >
                ← Pregunta Anterior
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentIndex < filteredQuestions.length - 1) setCurrentIndex(prev => prev + 1);
                  else setStage('RESULTS');
                }}
                className="px-5 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                {currentIndex < filteredQuestions.length - 1 ? 'Saltar Pregunta →' : 'Ver Resultados →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: CLEAN SYNTHETIC RESULTS DASHBOARD */}
      {stage === 'RESULTS' && (
        <div className="space-y-8">
          {/* Header Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
              Resultado Oficial de la Evaluación
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-2">
              {municipio}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Preparación institucional ante la Ley N° 21.719 (Entrada en vigencia: 1 de Diciembre de 2026)
            </p>

            {/* 3 Main Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900">
                <div className="text-3xl font-black text-blue-700 dark:text-blue-300">{finalScore}%</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">Índice IMM Global</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-xl font-black text-slate-900 dark:text-white">{maturityLabels[maturityLevel].split('·')[0]}</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">{maturityLabels[maturityLevel].split('·')[1]}</div>
              </div>
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-100 dark:border-red-900">
                <div className="text-3xl font-black text-red-700 dark:text-red-300">{criticalGaps.length}</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">Brechas Críticas</div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="max-w-xs mx-auto mb-8">
              <RadarChart data={radarDimensions} />
            </div>
          </div>

          {/* LEAD CAPTURE: ENVIAR INFORME DIRECTO A CORREO */}
          <div className="bg-gradient-to-br from-[#0A2540] to-blue-900 text-white rounded-3xl p-8 shadow-md border border-blue-800">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block mb-1">
                📨 Entregable Formal para el Concejo Municipal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Reciba el Informe Ejecutivo Completo en su Correo
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Le enviaremos el reporte oficial de <strong>{municipio}</strong> con el plan de 90 días y los Términos de Referencia (TDR) para contratación en Mercado Público.
              </p>

              {!emailSuccess ? (
                <form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="nombre@municipalidad.cl"
                    value={emailDestino}
                    onChange={(e) => setEmailDestino(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isSendingEmail ? 'Enviando...' : 'Enviar Informe →'}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-200">
                  ✓ ¡Informe enviado exitosamente a <strong>{emailDestino}</strong>! Revise su bandeja de entrada.
                </div>
              )}
            </div>
          </div>

          {/* Top 3 Critical Gaps (Clean Cards) */}
          {criticalGaps.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                <span>🚨 Principales Brechas que Requieren Atención</span>
              </h3>

              <div className="space-y-3">
                {criticalGaps.slice(0, 3).map((gap, i) => (
                  <div key={gap.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {i + 1}. {gap.criterio}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                        {gap.criticidad}
                      </span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 mt-1">
                      Responsable sugerido: <strong>{gap.responsableSugerido}</strong> • Evidencia esperada: {gap.evidenciaEsperada[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons: Print Council Report + Download TDR */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-3.5 bg-[#0A2540] dark:bg-blue-600 hover:bg-blue-600 text-white font-bold rounded-xl shadow-xs text-xs flex items-center gap-2 cursor-pointer transition"
            >
              <span>🖨️ Imprimir Informe para el Concejo (PDF)</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTDR}
              className="px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-xs text-xs flex items-center gap-2 cursor-pointer transition hover:bg-slate-50"
            >
              <span>📄 Descargar TDR para Mercado Público (.md)</span>
            </button>
            <button
              type="button"
              onClick={() => setStage('INTRO')}
              className="px-4 py-3.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold cursor-pointer"
            >
              Reiniciar Evaluación ↺
            </button>
          </div>
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultMunicipality={municipio}
        defaultRole={cargo}
      />
    </div>
  );
};

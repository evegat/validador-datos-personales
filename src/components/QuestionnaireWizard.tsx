import React, { useState, useEffect } from 'react';
import { QUESTIONS, DIMENSIONS } from '../data/questions';
import type { QuestionResponseType, MunicipalDepartment, Question, DimensionAssessmentResult } from '../types';
import { RadarChart } from './RadarChart';
import { ContactModal } from './ContactModal';

interface WizardProps {
  initialDepartment?: string;
}

export const QuestionnaireWizard: React.FC<WizardProps> = ({ initialDepartment }) => {
  // Navigation stages: 'INTRO' (Registro) | 'QUESTIONS' | 'RESULTS'
  const [stage, setStage] = useState<'INTRO' | 'QUESTIONS' | 'RESULTS'>('INTRO');
  
  // Registration Profile State
  const [municipio, setMunicipio] = useState('');
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('Dirección de Asesoría Jurídica');
  const [email, setEmail] = useState('');
  const [departamento, setDepartamento] = useState<MunicipalDepartment>(
    (initialDepartment as MunicipalDepartment) || 'ALCALDIA_JURIDICO'
  );
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);
  const [botCheck, setBotCheck] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Questions and responses state
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(QUESTIONS);
  const [answers, setAnswers] = useState<Record<string, QuestionResponseType>>({});

  // Result Lead Capture State
  const [emailDestino, setEmailDestino] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Load persistence
  useEffect(() => {
    try {
      const savedMuni = localStorage.getItem('pdl_muni');
      const savedNombre = localStorage.getItem('pdl_nombre');
      const savedCargo = localStorage.getItem('pdl_cargo');
      const savedEmail = localStorage.getItem('pdl_email');
      const savedAnswers = localStorage.getItem('pdl_answers');

      if (savedMuni) setMunicipio(savedMuni);
      if (savedNombre) setNombre(savedNombre);
      if (savedCargo) setCargo(savedCargo);
      if (savedEmail) {
        setEmail(savedEmail);
        setEmailDestino(savedEmail);
      }
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    } catch (e) {}
  }, []);

  const saveState = (newAnswers: Record<string, QuestionResponseType>) => {
    try {
      localStorage.setItem('pdl_muni', municipio);
      localStorage.setItem('pdl_nombre', nombre);
      localStorage.setItem('pdl_cargo', cargo);
      localStorage.setItem('pdl_email', email);
      localStorage.setItem('pdl_answers', JSON.stringify(newAnswers));
    } catch (e) {}
  };

  const handleRegisterAndStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!municipio.trim() || !email.trim() || !nombre.trim()) return;

    setIsSubmittingReg(true);

    try {
      // Registrar traza en backend
      await fetch('/api/registro-acceso.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          municipio: municipio.trim(),
          nombre: nombre.trim(),
          cargo: cargo.trim(),
          departamento: departamento,
          email: email.trim(),
          bot_check: botCheck
        })
      });
    } catch (err) {
      console.warn('Registro local persistido offline');
    } finally {
      setIsSubmittingReg(false);
    }

    // Save profile locally
    try {
      localStorage.setItem('pdl_muni', municipio);
      localStorage.setItem('pdl_nombre', nombre);
      localStorage.setItem('pdl_cargo', cargo);
      localStorage.setItem('pdl_email', email);
      setEmailDestino(email);
    } catch (err) {}

    // Filter questions based on department
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

  // Compute final results across all dimensions
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

  const dimensionResults: DimensionAssessmentResult[] = DIMENSIONS.map(d => {
    const dimQuestions = filteredQuestions.filter(q => q.dimensionId === d.id);
    let dimScore = 0;
    let dimMax = 0;

    dimQuestions.forEach(q => {
      const ans = answers[q.id];
      if (ans !== 'NO_APLICA') {
        dimMax += 3;
        if (ans === 'SI') dimScore += 3;
        else if (ans === 'PARCIAL') dimScore += 1.5;
      }
    });

    const pct = dimMax > 0 ? Math.round((dimScore / dimMax) * 100) : (finalScore > 0 ? finalScore : 10);

    return {
      dimensionId: d.id,
      dimensionCode: d.code,
      title: d.title,
      shortTitle: d.shortTitle,
      score: dimScore,
      maxScorePossible: dimMax > 0 ? dimMax : 3,
      percentage: pct,
      maturityLevel: pct < 20 ? 0 : pct < 45 ? 1 : pct < 70 ? 2 : pct < 85 ? 3 : 4,
      maturityLabel: pct < 20 ? 'Nivel 0' : pct < 45 ? 'Nivel 1' : pct < 70 ? 'Nivel 2' : pct < 85 ? 'Nivel 3' : 'Nivel 4',
      criticalGapsCount: dimQuestions.filter(q => (answers[q.id] === 'NO' || answers[q.id] === 'NO_SABEMOS') && (q.criticidad === 'CRITICA' || q.criticidad === 'ALTA')).length,
      highGapsCount: 0,
      evidenceCoveragePercent: 50,
      primaryRoles: d.primaryRoles
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

  const handleDownloadWordTDR = () => {
    const title = `Bases Técnicas TDR - Ley 21.719 - ${municipio}`;
    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${title}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #111; margin: 2.5cm; }
          h1 { font-size: 16pt; color: #0A2540; border-bottom: 2pt solid #0A2540; padding-bottom: 4pt; margin-bottom: 12pt; text-transform: uppercase; }
          h2 { font-size: 13pt; color: #1e40af; margin-top: 14pt; margin-bottom: 6pt; }
          p, li { font-size: 11pt; margin-bottom: 6pt; text-align: justify; }
          .callout { background: #f1f5f9; border-left: 4pt solid #1e40af; padding: 8pt 12pt; margin: 10pt 0; font-size: 10pt; }
          .footer { font-size: 9pt; color: #64748b; border-top: 1pt solid #cbd5e1; padding-top: 6pt; margin-top: 20pt; }
          table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
          th, td { border: 1pt solid #94a3b8; padding: 6pt 8pt; text-align: left; font-size: 10pt; }
          th { background: #f8fafc; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Bases Técnicas y Términos de Referencia (TDR) Tipo</h1>
        <p><strong>REQUERIMIENTO:</strong> Contratación de Asesoría Especializada para la Puesta al Día y Adecuación Municipal a la Ley N° 21.719 de Protección de Datos Personales.</p>
        <p><strong>MUNICIPALIDAD:</strong> ${municipio.toUpperCase()}</p>
        <p><strong>FECHA DE EMISIÓN:</strong> ${new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div class='callout'>
          <strong>VÍAS DE CONTRATACIÓN PROCEDENTES SEGÚN NORMATIVA:</strong><br>
          • <strong>Vía 1:</strong> Honorarios a Suma Alzada por Cometido Específico (Art. 4° Ley N° 18.883, Estatuto Administrativo Municipal).<br>
          • <strong>Vía 2:</strong> Compra Ágil / Mercado Público (&lt; 30 UTM - Ley N° 19.886 y Ley N° 21.634, Subtítulo 22).
        </div>

        <h2>1. Objetivos del Servicio</h2>
        <p>Prestar asistencia técnica y jurídica integral para levantar las brechas de cumplimiento, estructurar la gobernanza interna, diseñar el Registro de Actividades de Tratamiento (RAT) y redactar los instrumentos administrativos exigidos antes del hito de vigencia legal del 1 de diciembre de 2026.</p>

        <h2>2. Productos y Entregables Formales</h2>
        <table>
          <tr><th>N°</th><th>Entregable Requerido</th><th>Plazo Estimado</th></tr>
          <tr><td>1</td><td>Informe Ejecutivo de Diagnóstico de Brechas por Dirección Municipal</td><td>Día 15</td></tr>
          <tr><td>2</td><td>Matriz RAT de Tratamientos por Direcciones (Salud, Social, Tránsito, TI, DAF)</td><td>Día 30</td></tr>
          <tr><td>3</td><td>Paquete de Decretos Alcaldicios (Designación DPO y Comité de Privacidad)</td><td>Día 40</td></tr>
          <tr><td>4</td><td>Cláusulas Contractuales de Encargado (DPA) para Contratos de Software en Mercado Público</td><td>Día 50</td></tr>
          <tr><td>5</td><td>Taller de Capacitación en Deber de Secreto para Funcionarios y Directores</td><td>Día 60</td></tr>
        </table>

        <h2>3. Perfil del Consultor de Referencia</h2>
        <p>Profesional universitario con postgrado o especialización en gestión pública y derecho de las tecnologías. Consultor de referencia para consultas técnicas: <strong>Eduardo Vega Toledo</strong> (Consultor en Gestión Pública, Universidad de Chile · Contacto: <code>evegat@uchile.cl</code>).</p>

        <div class='footer'>
          Documento generado mediante la plataforma ProtegeDatosLocal · ProtegeDatosLocal (protegedatoslocal.protegedatoslocal.cloud)
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TDR_Adecuacion_Ley21719_${municipio.replace(/\s+/g, '_')}.doc`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* STAGE 1: REGISTRO INSTITUCIONAL PREVIO AL DIAGNÓSTICO */}
      {stage === 'INTRO' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mx-auto mb-5 border border-blue-200 dark:border-blue-800 shadow-xs">
            🏛️
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
            Registro de Acceso Institucional · Ley N° 21.719
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mb-3 tracking-tight">
            Autodiagnóstico de Madurez Municipal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Ingrese los antecedentes de su municipio para personalizar la evaluación, trazar sus brechas críticas y emitir el informe ejecutivo para el Concejo.
          </p>

          <form onSubmit={handleRegisterAndStart} className="max-w-lg mx-auto space-y-4 text-left mb-8">
            {/* Honeypot anti-bot invisible (100% gratuito y sin cookies de terceros) */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website_url_check"
                value={botCheck}
                onChange={(e) => setBotCheck(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Municipalidad: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: I. Municipalidad de ..."
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Su Nombre y Apellido: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Patricia Soto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Cargo / Dirección: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Asesoría Jurídica / SECPLA"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Correo Institucional: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="nombre@municipalidad.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Área o Enfoque del Diagnóstico:
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

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-[11px] text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  defaultChecked={true}
                  className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  Autorizo el tratamiento de mis datos de contacto institucional exclusivamente para la emisión del informe y seguimiento técnico, conforme al Art. 13 de la <a href="/privacidad" target="_blank" className="text-blue-600 dark:text-blue-400 underline font-bold">Ley N° 21.719</a>.
                </span>
              </label>
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmittingReg}
                className="w-full sm:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isSubmittingReg ? 'Registrando acceso...' : 'Iniciar Evaluación Municipal (5 minutos) →'}
              </button>
            </div>
          </form>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <span>🔒 Sus antecedentes se procesan bajo estricto secreto profesional y confidencialidad.</span>
          </div>
        </div>
      )}

      {/* STAGE 2: CLEAN STEP-BY-STEP QUESTIONNAIRE */}
      {stage === 'QUESTIONS' && currentQuestion && (
        <div className="space-y-6">
          {/* Header Progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span>{municipio} · {nombre} ({cargo})</span>
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
                { key: 'NO_SABEMOS', label: 'No sabe / No responde (Requiere levantamiento)', desc: 'Se desconoce el estado actual o no se dispone de antecedentes.', icon: '❓', color: 'border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' },
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-1">
              {municipio}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Solicitado por: <strong>{nombre}</strong> ({cargo}) · Preparación Ley N° 21.719
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
            <div className="max-w-sm mx-auto mb-8 flex justify-center">
              <RadarChart dimensionResults={dimensionResults} size={320} />
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
                Le enviaremos el reporte oficial de <strong>{municipio}</strong> con el plan de 90 días y las Bases Técnicas (TDR) para contratación mediante <strong>Honorarios a Suma Alzada (Art. 4° Ley N° 18.883)</strong> o <strong>Mercado Público (&lt; 30 UTM)</strong>.
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
                    {isSendingEmail ? 'Enviando...' : 'Enviar Informe a mi Correo →'}
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

          
          {/* SECCIÓN DE CONSECUENCIAS LEGALES Y AFECTACIÓN INSTITUCIONAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta 1: Consecuencias del Incumplimiento */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900/60 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                <span>⚖️ Régimen Sancionatorio Municipal</span>
                <span className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded text-[10px] border border-red-200 dark:border-red-800">Ley N° 21.719</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3">
                Consecuencias Reales de no Adecuar el Municipio
              </h3>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">1.</span>
                  <div>
                    <strong>Sumarios de Contraloría (CGR):</strong> El Título IV de la ley establece que las infracciones graves de directivos y jefaturas dan lugar a sumarios administrativos instruidos por la CGR por falta de servicio.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">2.</span>
                  <div>
                    <strong>Indemnizaciones Civiles por Daño Moral:</strong> Los vecinos pueden demandar directamente al municipio ante tribunales ordinarios si se filtran antecedentes de salud (CESFAM) o socioeconómicos (RSH).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">3.</span>
                  <div>
                    <strong>Nulidad y Vicios en Contrataciones:</strong> Contratos con proveedores de software que carezcan de cláusulas de encargado (DPA) serán objetados en auditorías de compras públicas.
                  </div>
                </li>
              </ul>
            </div>

            {/* Tarjeta 2: Quiénes se ven Afectados */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-blue-900/60 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                <span>👥 Impacto por Estamentos</span>
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] border border-blue-200 dark:border-blue-800">Mapa de Riesgo</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-3">
                ¿Quiénes se ven Afectados Directamente?
              </h3>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">🏛️</span>
                  <div>
                    <strong>Alcaldía y Administrador Municipal:</strong> Responsabilidad política y jurídica en el mando; riesgo de acusaciones por notable abandono de deberes.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">⚖️</span>
                  <div>
                    <strong>Directores de Servicio (Jurídico, SECPLA, TI, DAF):</strong> Exposición disciplinaria personal por omisión de medidas técnicas y organizativas.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">🏥</span>
                  <div>
                    <strong>Equipos Clínicos y Asistentes Sociales (Salud / DIDECO):</strong> Exposición de médicos, enfermeros y asistentes por manejo no protocolizado de datos sensibles.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">🏘️</span>
                  <div>
                    <strong>Vecinos y Titulares de Datos:</strong> Vulneración de su privacidad, usurpación de identidad o discriminación arbitraria en subsidios comunales.
                  </div>
                </li>
              </ul>
            </div>
          </div>


          
          {/* DISCLAIMER Y DESLINDE DE RESPONSABILIDAD METODOLÓGICA */}
          <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 text-xs mb-1.5">
              <span>⚖️ Aclaración Metodológica y Deslinde de Responsabilidad</span>
            </div>
            <p>
              El Índice de Madurez Municipal (IMM) y los hallazgos presentados en este informe derivan <strong>estrictamente de las respuestas declaradas bajo propia responsabilidad por la persona o funcionario que contestó el autodiagnóstico</strong>. Este resultado constituye una estimación técnica orientativa de gestión interna y podría no corresponder a la situación fáctica, jurídica o tecnológica exhaustiva de la municipalidad, siendo de exclusiva responsabilidad del declarante la veracidad de los antecedentes ingresados. No constituye auditoría vinculante ni certificación oficial de cumplimiento ante la Contraloría General de la República (CGR) ni ante la Agencia de Protección de Datos Personales (APDP).
            </p>
          </div>


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
              onClick={handleDownloadWordTDR}
              className="px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl shadow-xs text-xs flex items-center gap-2 cursor-pointer transition hover:bg-slate-50"
            >
              <span>📥 Descargar TDR en Word (.doc)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                localStorage.removeItem('pdl_answers');
                setStage('INTRO');
              }}
              className="px-4 py-3.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold cursor-pointer"
            >
              Nueva Evaluación ↺
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

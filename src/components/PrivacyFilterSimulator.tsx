import React, { useState } from 'react';

export const PrivacyFilterSimulator: React.FC = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [direccionSolicitante, setDireccionSolicitante] = useState('DIDECO_SOCIAL');
  const [tipoIniciativa, setTipoIniciativa] = useState('NUEVO_TRAMITE_WEB');
  const [trataSensibles, setTrataSensibles] = useState(false);
  const [tieneBaseLegal, setTieneBaseLegal] = useState(true);
  const [softwareTercero, setSoftwareTercero] = useState(true);
  const [tieneDPA, setTieneDPA] = useState(false);
  const [generado, setGenerado] = useState(false);

  // Risk evaluation logic
  let nivelRiesgo: 'ALTO' | 'MEDIO' | 'BAJO' = 'BAJO';
  const recomendaciones: string[] = [];

  if (trataSensibles) {
    nivelRiesgo = 'ALTO';
    recomendaciones.push('Requiere Evaluación de Impacto en Protección de Datos (EIPD) obligatoria por tratar datos sensibles (Salud / RSH / Menores).');
  }

  if (softwareTercero && !tieneDPA) {
    nivelRiesgo = 'ALTO';
    recomendaciones.push('ALERTA CRÍTICA: Debe incluir obligatoriamente el Anexo Contractual DPA (KIT-02) en las bases de licitación en Mercado Público antes de adjudicar.');
  }

  if (!tieneBaseLegal) {
    nivelRiesgo = 'ALTO';
    recomendaciones.push('Requiere pronunciamiento previo de la Dirección Jurídica para fijar la base de licitud bajo la Ley N° 18.695 o requerir consentimiento explícito.');
  }

  if (recomendaciones.length === 0) {
    recomendaciones.push('La iniciativa cumple con los principios de licitud y proporcionalidad. Proceder a registrar en el RAT Municipal.');
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
          ⚡ Módulo SaaS: Privacidad desde el Diseño (Privacy by Design)
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
          Filtro Preventivo de Nuevos Trámites, Licitaciones y Proyectos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          La <strong>Ley N° 21.719</strong> obliga a que todo nuevo servicio, software, formulario web o licitación pase por un análisis preventivo de privacidad antes de entrar en producción. Utilice este filtro para evaluar el impacto y generar el <strong>Dictamen Técnico Preventivo</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Evaluador de Iniciativa */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Datos de la Iniciativa Municipal
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nombre del Trámite, Software o Proyecto *
            </label>
            <input
              type="text"
              placeholder="Ej: Plataforma de Postulación a Subsidios de Emergencia"
              value={nombreProyecto}
              onChange={(e) => setNombreProyecto(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dirección Solicitante
              </label>
              <select
                value={direccionSolicitante}
                onChange={(e) => setDireccionSolicitante(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              >
                <option value="DIDECO_SOCIAL">DIDECO (Social)</option>
                <option value="SALUD_DISAM">Salud Municipal (DISAM/CESFAM)</option>
                <option value="SECPLA_TI">Informática / SECPLA</option>
                <option value="TRANSITO_RENTAS">Tránsito / Rentas</option>
                <option value="SEGURIDAD_PUBLICA">Seguridad Pública (Cámaras)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo de Iniciativa
              </label>
              <select
                value={tipoIniciativa}
                onChange={(e) => setTipoIniciativa(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              >
                <option value="NUEVO_TRAMITE_WEB">Nuevo Formulario / Portal Web</option>
                <option value="LICITACION_SOFTWARE">Licitación de Software / ERP / SaaS</option>
                <option value="SISTEMA_VIGILANCIA">Cámaras / Drones / Lectores LPR</option>
                <option value="PROGRAMA_SOCIAL">Nuevo Beneficio Social / Ayuda</option>
              </select>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 border-t border-slate-100 pt-4 pb-1">
            2. Filtro de Factores Críticos (Ley 21.719)
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 block">¿Recolectará Datos Sensibles?</span>
                <span className="text-[11px] text-slate-500">Salud, diagnósticos, menores de edad, ingresos o RSH</span>
              </div>
              <input
                type="checkbox"
                checked={trataSensibles}
                onChange={(e) => setTrataSensibles(e.target.checked)}
                className="w-4 h-4 text-blue-800 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 block">¿Participa un Proveedor Externo de Software / Nube?</span>
                <span className="text-[11px] text-slate-500">Empresa que alojará o procesará bases de vecinos</span>
              </div>
              <input
                type="checkbox"
                checked={softwareTercero}
                onChange={(e) => setSoftwareTercero(e.target.checked)}
                className="w-4 h-4 text-blue-800 rounded cursor-pointer"
              />
            </label>

            {softwareTercero && (
              <label className="flex items-center justify-between p-3 rounded-xl border border-blue-200 bg-blue-50/60 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-blue-950 block">¿Las bases incluyen Cláusula DPA (KIT-02)?</span>
                  <span className="text-[11px] text-blue-800">Contrato obligatorio de Encargado de Tratamiento</span>
                </div>
                <input
                  type="checkbox"
                  checked={tieneDPA}
                  onChange={(e) => setTieneDPA(e.target.checked)}
                  className="w-4 h-4 text-blue-800 rounded cursor-pointer"
                />
              </label>
            )}
          </div>

          <button
            onClick={() => setGenerado(true)}
            className="w-full py-3 bg-slate-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            ⚡ Ejecutar Filtro y Emitir Dictamen Preventivo
          </button>
        </div>

        {/* Right Column: Dictamen Preventivo Generado */}
        <div className="lg:col-span-6">
          {generado ? (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm print-page">
              <div className="border-b-2 border-slate-900 pb-4 mb-4 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    Dictamen Técnico Preventivo de Privacidad
                  </span>
                  <h3 className="text-base font-extrabold text-slate-950 mt-0.5">
                    {nombreProyecto || 'Iniciativa Municipal Sin Nombre'}
                  </h3>
                  <div className="text-xs text-slate-600 mt-1">
                    Dirección: <strong>{direccionSolicitante}</strong> • Fecha: <strong>{new Date().toLocaleDateString('es-CL')}</strong>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  nivelRiesgo === 'ALTO' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  Riesgo: {nivelRiesgo}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Dictamen y Medidas de Adecuación Exigibles:
                </h4>
                <ul className="space-y-2.5">
                  {recomendaciones.map((rec, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed flex items-start gap-2">
                      <span className="text-blue-800 font-bold shrink-0">📌</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl text-[11px] text-slate-600 border border-slate-200 leading-relaxed mb-6">
                <strong>Validez Institucional:</strong> Este dictamen acredita la aplicación del principio de Responsabilidad Proactiva (Art. 14 Ley N° 21.719) ante revisiones de la Dirección de Control y auditorías de la Contraloría.
              </div>

              <div className="flex gap-3 no-print">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer text-center"
                >
                  🖨️ Imprimir Dictamen Preventivo
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                Simulador del Filtro Preventivo SaaS
              </h4>
              <p className="text-xs max-w-sm mx-auto leading-relaxed">
                Complete los datos de la iniciativa a la izquierda y presione <strong>"Ejecutar Filtro"</strong> para generar el dictamen técnico preventivo en tiempo real.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

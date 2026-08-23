import React, { useState } from 'react';
import { ACTIONABLE_KITS, type TemplateKit } from '../data/downloadableKits';
import { ContactModal } from './ContactModal';

export const ActionKitsView: React.FC = () => {
  const [selectedKit, setSelectedKit] = useState<TemplateKit>(ACTIONABLE_KITS[0]);
  const [filterRole, setFilterRole] = useState<string>('TODOS');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const filteredKits = filterRole === 'TODOS'
    ? ACTIONABLE_KITS
    : ACTIONABLE_KITS.filter(k => k.targetRole.toLowerCase().includes(filterRole.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
              📦 Kits y Plantillas de Apoyo a la Implementación
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Kits y Modelos de Apoyo Institucional
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Modelos e instrumentos metodológicos desarrollados para apoyar la preparación institucional municipal frente a la Ley N° 21.719. Deben ser adaptados al contexto y revisados por la unidad jurídica del municipio.
            </p>
          </div>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-5 py-3 bg-slate-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-2"
          >
            <span>🤝 Solicitar Acompañamiento Técnico</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Kits List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Modelos Disponibles ({filteredKits.length})
            </h3>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-slate-50 font-medium text-slate-700 focus:ring-2 focus:ring-blue-800"
            >
              <option value="TODOS">Todos los Roles</option>
              <option value="Alcaldía">Alcaldía / Administrador</option>
              <option value="Jurídico">Dirección Jurídica</option>
              <option value="Informática">Informática / TI</option>
              <option value="Adquisiciones">Compras / DAF</option>
              <option value="OIRS">OIRS / Transparencia</option>
            </select>
          </div>

          {filteredKits.map((kit) => {
            const isSelected = selectedKit.id === kit.id;
            return (
              <div
                key={kit.id}
                onClick={() => setSelectedKit(kit)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {kit.code} • {kit.fileFormat}
                  </span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    Herramienta de Gestión
                  </span>
                </div>

                <h4 className={`text-sm font-bold leading-snug ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                  {kit.title}
                </h4>
                <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {kit.subtitle}
                </p>

                <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[11px] ${
                  isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>👤 {kit.targetRole.split('/')[0]}</span>
                  <span className={`font-semibold ${isSelected ? 'text-blue-300' : 'text-blue-800'}`}>
                    {isSelected ? 'Ver ficha técnica →' : 'Ver detalles'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Protected Deliverable Card & Acquisition CTA */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header Viewer */}
            <div className="p-6 bg-slate-950 text-white border-b border-slate-850">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                  {selectedKit.code} — {selectedKit.fileFormat}
                </span>
                <span className="text-xs text-slate-400">
                  Base Legal: <strong className="text-slate-200">{selectedKit.legalBasis}</strong>
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {selectedKit.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {selectedKit.description}
              </p>
            </div>

            {/* Content Structure Outline */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Estructura y Contenido del Instrumento:
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                  Modelo Metodológico
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {selectedKit.structurePreview.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-emerald-700 font-bold shrink-0">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Consultation Card */}
              <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 rounded-xl border border-blue-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-md">
                  <div className="text-xs font-bold text-blue-300 mb-1">
                    Adaptación e Implementación Técnica en su Municipio
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Estos instrumentos se entregan adaptados y visados para su comuna en el marco de los servicios de consultoría y acompañamiento técnico disponibles.
                  </p>
                </div>

                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer shrink-0"
                >
                  🤝 Solicitar Acompañamiento →
                </button>
              </div>
            </div>

            {/* Footer Guidance */}
            <div className="p-4 bg-white flex items-center justify-between text-xs text-slate-600">
              <span>Coordinación: <strong>Eduardo Vega Toledo</strong></span>
              <a href="mailto:evega.ap@gmail.com" className="text-blue-800 hover:underline font-semibold">
                evega.ap@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultMunicipality=""
        defaultRole="Equipo Directivo Municipal"
      />
    </div>
  );
};

import React, { useState } from 'react';
import type { MunicipalProfile } from '../types';

interface ContextModalProps {
  initialProfile: MunicipalProfile;
  isOpen: boolean;
  onSave: (profile: MunicipalProfile) => void;
  onClose: () => void;
}

export const ContextModal: React.FC<ContextModalProps> = ({
  initialProfile,
  isOpen,
  onSave,
  onClose
}) => {
  const [profile, setProfile] = useState<MunicipalProfile>(initialProfile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-700 block">
              Paso 1: Contexto Institucional
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Perfil y Alcance de la Municipalidad
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          El diagnóstico adaptará dinámicamente las preguntas según las características y servicios que realmente opera tu municipio, evitando evaluar áreas que no correspondan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre de la Municipalidad *
              </label>
              <input
                type="text"
                required
                value={profile.municipalityName}
                onChange={(e) => setProfile({ ...profile, municipalityName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Región *
              </label>
              <select
                value={profile.region}
                onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Región Metropolitana">Región Metropolitana</option>
                <option value="Región de Valparaíso">Región de Valparaíso</option>
                <option value="Región del Biobío">Región del Biobío</option>
                <option value="Región de La Araucanía">Región de La Araucanía</option>
                <option value="Región de Los Lagos">Región de Los Lagos</option>
                <option value="Región de Coquimbo">Región de Coquimbo</option>
                <option value="Región de Antofagasta">Región de Antofagasta</option>
                <option value="Otra Región">Otra Región</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dotación Funcionaria Estimada
              </label>
              <select
                value={profile.headcountBand}
                onChange={(e) => setProfile({ ...profile, headcountBand: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="< 100">Menos de 100 funcionarios</option>
                <option value="100 - 500">100 a 500 funcionarios</option>
                <option value="500 - 1500">500 a 1.500 funcionarios</option>
                <option value="> 1500">Más de 1.500 funcionarios</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipología SUBDERE
              </label>
              <select
                value={profile.typologySUBDERE}
                onChange={(e) => setProfile({ ...profile, typologySUBDERE: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Tipo 1 (Grandes Metropolitanas)">Tipo 1: Grandes Metropolitanas con Alto Desarrollo</option>
                <option value="Tipo 2 (Grandes / Intermedias)">Tipo 2: Grandes / Intermedias Mayores</option>
                <option value="Tipo 3 (Medianas)">Tipo 3: Medianas</option>
                <option value="Tipo 4 (Semi-rurales)">Tipo 4: Semi-rurales</option>
                <option value="Tipo 5 (Rurales / Extremas)">Tipo 5: Rurales / Extremas con Menor Desarrollo</option>
              </select>
            </div>
          </div>

          {/* Service Switches */}
          <div className="pt-3 border-t border-slate-100">
            <span className="block text-xs font-bold text-slate-800 mb-3">
              Servicios y Sistemas Operados por el Municipio:
            </span>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">🏥 Salud Primaria (CESFAM / CECOSF / DISAM)</span>
                  <span className="text-[11px] text-slate-500">¿El municipio administra directamente centros de salud con fichas clínicas?</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.operatesCESFAM}
                  onChange={(e) => setProfile({ ...profile, operatesCESFAM: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">📹 Cámaras de Televigilancia / Drones / Lectores LPR</span>
                  <span className="text-[11px] text-slate-500">¿Seguridad Pública opera central de cámaras o lectores de patentes?</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.operatesCCTV_Drones}
                  onChange={(e) => setProfile({ ...profile, operatesCCTV_Drones: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">☁️ Software y Plataformas SaaS Tercerizadas</span>
                  <span className="text-[11px] text-slate-500">¿Utiliza ERP, permisos de circulación o sistemas web provistos por terceros en la nube?</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.usesOutsourcedSaaS}
                  onChange={(e) => setProfile({ ...profile, usesOutsourcedSaaS: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Contact Details */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre del Funcionario Evaluador
              </label>
              <input
                type="text"
                placeholder="Ej: Carolina Rojas"
                value={profile.respondentName}
                onChange={(e) => setProfile({ ...profile, respondentName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cargo / Dirección
              </label>
              <input
                type="text"
                placeholder="Ej: Administrador Municipal / Jurídico"
                value={profile.respondentRole}
                onChange={(e) => setProfile({ ...profile, respondentRole: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow cursor-pointer transition"
            >
              Guardar y Continuar Diagnóstico →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

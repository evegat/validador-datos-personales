import React, { useState } from 'react';
import { ContactModal } from './ContactModal';

interface RatItem {
  id: string;
  direccion: string;
  nombre: string;
  finalidad: string;
  baseLicitud: string;
  normaRespaldo: string;
  titulares: string;
  datosSensibles: string;
  destinatarios: string;
  plazoConservacionMeses: number;
  medidasSeguridad: string;
}

const INITIAL_RAT: RatItem[] = [
  {
    id: 'RAT-001',
    direccion: 'Salud (DISAM)',
    nombre: 'Gestión de Fichas Clínicas en CESFAM/CECOSF',
    finalidad: 'Prestación de asistencia sanitaria primaria, entrega de fármacos y seguimiento de pacientes.',
    baseLicitud: 'Cumplimiento de Obligación Legal / Asistencia Sanitaria',
    normaRespaldo: 'Ley N° 20.584 y Art. 16 bis Ley N° 21.719',
    titulares: 'Pacientes de la red comunal de salud',
    datosSensibles: 'Diagnósticos médicos, recetas, tratamientos farmacológicos, alergias',
    destinatarios: 'Proveedor de Software HIS (Encargado DPA), MINSAL (estadísticas)',
    plazoConservacionMeses: 180,
    medidasSeguridad: 'Cifrado en reposo, RBAC asistencial estricto, Logs inmutables de auditoría'
  },
  {
    id: 'RAT-002',
    direccion: 'Social (DIDECO)',
    nombre: 'Gestión del Registro Social de Hogares (RSH)',
    finalidad: 'Estratificación socioeconómica y asignación de subsidios y ayudas sociales comunales.',
    baseLicitud: 'Cumplimiento de Obligación Legal',
    normaRespaldo: 'Ley N° 19.949 Art. 6 / DS N° 160 y DS N° 22',
    titulares: 'Vecinos y grupos familiares postulantes de la comuna',
    datosSensibles: 'Situación socioeconómica, ingresos familiares, vulnerabilidad',
    destinatarios: 'Ministerio de Desarrollo Social y Familia (MDSF)',
    plazoConservacionMeses: 120,
    medidasSeguridad: 'Convenio obligatorio de deber de secreto, acceso por VPN, bloqueo de exportación masiva'
  },
  {
    id: 'RAT-003',
    direccion: 'Seguridad Pública',
    nombre: 'Monitoreo por Videovigilancia y Cámaras LPR',
    finalidad: 'Prevención comunitaria del delito y apoyo en el resguardo de espacios públicos.',
    baseLicitud: 'Ejercicio de Funciones Públicas / LOCM',
    normaRespaldo: 'Ley N° 18.695 (Seguridad Comunal) / EIPD Art. 26 Ley N° 21.719',
    titulares: 'Transeúntes y conductores en espacios públicos comunales',
    datosSensibles: 'Ninguno por diseño (salvo captación incidental)',
    destinatarios: 'Carabineros de Chile, PDI, Ministerio Público (ante requerimiento formal)',
    plazoConservacionMeses: 1,
    medidasSeguridad: 'Bóveda física de almacenamiento, borrado automático tras 30 días, acceso restringido'
  },
  {
    id: 'RAT-004',
    direccion: 'Tránsito y Patentes',
    nombre: 'Otorgamiento y Renovación de Licencias de Conducir',
    finalidad: 'Evaluación médica, psicométrica y otorgamiento legal de licencias de conducir.',
    baseLicitud: 'Cumplimiento de Obligación Legal',
    normaRespaldo: 'Ley de Tránsito N° 18.290',
    titulares: 'Conductores solicitantes de la comuna',
    datosSensibles: 'Examen visual y psicométrico (aptitud médica para conducir)',
    destinatarios: 'Registro Civil e Identificación / Juzgados de Policía Local',
    plazoConservacionMeses: 60,
    medidasSeguridad: 'Perfiles de usuario validados, carpetas físicas con llave, sistema institucional cerrado'
  },
  {
    id: 'RAT-005',
    direccion: 'Recursos Humanos',
    nombre: 'Control de Asistencia y Gestión de Personal',
    finalidad: 'Cómputo de jornada laboral, pago de remuneraciones y cumplimiento estatutario.',
    baseLicitud: 'Relación Estatutaria / Obligación Legal',
    normaRespaldo: 'Ley N° 18.883 (Estatuto Administrativo Municipal)',
    titulares: 'Funcionarios municipales (planta, contrata, honorarios)',
    datosSensibles: 'Datos biométricos (si se usa huella/rostro con alternativa)',
    destinatarios: 'Proveedor de Software de RRHH, Contraloría General de la República (SIAPER)',
    plazoConservacionMeses: 60,
    medidasSeguridad: 'Consentimiento y alternativa no biométrica disponible, cifrado de liquidaciones'
  }
];

export const InteractiveRatManager: React.FC = () => {
  const [ratList, setRatList] = useState<RatItem[]>(INITIAL_RAT);
  const [filterDept, setFilterDept] = useState<string>('TODAS');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [newItem, setNewItem] = useState<Partial<RatItem>>({
    direccion: 'Social (DIDECO)',
    nombre: '',
    finalidad: '',
    baseLicitud: 'Cumplimiento de Obligación Legal',
    normaRespaldo: 'Ley N° 18.695',
    titulares: 'Vecinos de la comuna',
    datosSensibles: 'Ninguno',
    destinatarios: 'Dirección de Control / CGR',
    plazoConservacionMeses: 36,
    medidasSeguridad: 'Control de acceso RBAC'
  });

  const filtered = ratList.filter(item => {
    const matchesDept = filterDept === 'TODAS' || item.direccion.toLowerCase().includes(filterDept.toLowerCase());
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.finalidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleExportCsv = () => {
    const headers = ['id_tratamiento', 'direccion_municipal', 'nombre_actividad', 'finalidad', 'base_licitud', 'norma_respaldo', 'titulares', 'datos_sensibles', 'destinatarios', 'plazo_meses', 'medidas_seguridad'];
    const rows = ratList.map(item => [
      item.id,
      `"${item.direccion}"`,
      `"${item.nombre}"`,
      `"${item.finalidad}"`,
      `"${item.baseLicitud}"`,
      `"${item.normaRespaldo}"`,
      `"${item.titulares}"`,
      `"${item.datosSensibles}"`,
      `"${item.destinatarios}"`,
      item.plazoConservacionMeses,
      `"${item.medidasSeguridad}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,﻿' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Matriz_RAT_Municipal_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify({
      rat_metadata: {
        institucion: 'Ilustre Municipalidad',
        fecha_exportacion: new Date().toISOString(),
        total_tratamientos: ratList.length,
        version_esquema: '2026.1'
      },
      actividades_tratamiento: ratList
    }, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Matriz_RAT_Municipal_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.nombre || !newItem.finalidad) return;

    const itemToAdd: RatItem = {
      id: `RAT-00${ratList.length + 1}`,
      direccion: newItem.direccion || 'General',
      nombre: newItem.nombre || '',
      finalidad: newItem.finalidad || '',
      baseLicitud: newItem.baseLicitud || 'Ejercicio de Competencias Legales',
      normaRespaldo: newItem.normaRespaldo || 'Ley N° 18.695',
      titulares: newItem.titulares || 'Vecinos',
      datosSensibles: newItem.datosSensibles || 'Ninguno',
      destinatarios: newItem.destinatarios || 'Uso interno',
      plazoConservacionMeses: Number(newItem.plazoConservacionMeses) || 36,
      medidasSeguridad: newItem.medidasSeguridad || 'Control RBAC'
    };

    setRatList([...ratList, itemToAdd]);
    setShowAddModal(false);
    setNewItem({
      direccion: 'Social (DIDECO)',
      nombre: '',
      finalidad: '',
      baseLicitud: 'Cumplimiento de Obligación Legal',
      normaRespaldo: 'Ley N° 18.695',
      titulares: 'Vecinos de la comuna',
      datosSensibles: 'Ninguno',
      destinatarios: 'Dirección de Control / CGR',
      plazoConservacionMeses: 36,
      medidasSeguridad: 'Control de acceso RBAC'
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
              📊 Inventario y Trazabilidad Municipal (Formato RAT)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Matriz de Actividades de Tratamiento (RAT)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Mapee, audite y exporte el inventario de bases de datos por dirección municipal. Cada registro acredita la finalidad legítima, la base legal habilitante y las medidas de seguridad adoptadas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <span>📥 Exportar CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              className="px-4 py-2.5 bg-slate-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <span>⚙️ Exportar JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Filtrar por Área:</span>
          {['TODAS', 'Salud', 'Social', 'Seguridad', 'Tránsito', 'Recursos Humanos'].map(dept => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                filterDept === dept
                  ? 'bg-blue-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre o finalidad..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
          >
            + Registrar Tratamiento
          </button>
        </div>
      </div>

      {/* RAT Cards Table */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 text-xs font-bold rounded-md">
                    {item.id}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    🏛️ {item.direccion}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ⚖️ {item.baseLicitud}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950">
                  {item.nombre}
                </h3>
              </div>

              <div className="text-right text-xs text-slate-500">
                <span>Retención: <strong>{item.plazoConservacionMeses} meses</strong> ({Math.round(item.plazoConservacionMeses / 12)} años)</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Finalidad declarada:</strong> {item.finalidad}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Titulares & Datos:</span>
                <div className="text-slate-600">👤 {item.titulares}</div>
                <div className="text-red-700 font-semibold mt-1">⚠️ Sensibles: {item.datosSensibles}</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Destinatarios & Sustento:</span>
                <div className="text-slate-600">🏢 {item.destinatarios}</div>
                <div className="text-blue-800 font-semibold mt-1">📜 {item.normaRespaldo}</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Medidas de Seguridad:</span>
                <div className="text-slate-600">🛡️ {item.medidasSeguridad}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Treatment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-950 mb-3">
              + Registrar Nueva Actividad de Tratamiento (RAT)
            </h3>
            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dirección Propietaria:</label>
                <select
                  value={newItem.direccion}
                  onChange={e => setNewItem({ ...newItem, direccion: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50"
                >
                  <option value="Salud (DISAM)">Salud (DISAM / CESFAM)</option>
                  <option value="Social (DIDECO)">Social (DIDECO)</option>
                  <option value="Seguridad Pública">Seguridad Pública</option>
                  <option value="Tránsito y Patentes">Tránsito y Patentes</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Secretaría Municipal">Secretaría Municipal</option>
                  <option value="Rentas y Finanzas">Rentas y Finanzas</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre de la Actividad / Base de Datos:</label>
                <input
                  type="text"
                  placeholder="Ej: Registro de Beneficiarios de Becas Municipales"
                  value={newItem.nombre}
                  onChange={e => setNewItem({ ...newItem, nombre: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Finalidad Específica:</label>
                <textarea
                  rows={2}
                  placeholder="Describa para qué fin exclusivo se recolectan los datos..."
                  value={newItem.finalidad}
                  onChange={e => setNewItem({ ...newItem, finalidad: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base de Licitud:</label>
                  <input
                    type="text"
                    value={newItem.baseLicitud}
                    onChange={e => setNewItem({ ...newItem, baseLicitud: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plazo Retención (meses):</label>
                  <input
                    type="number"
                    value={newItem.plazoConservacionMeses}
                    onChange={e => setNewItem({ ...newItem, plazoConservacionMeses: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
                >
                  Guardar en Matriz RAT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultMunicipality=""
        defaultRole="Responsable RAT Municipal"
      />
    </div>
  );
};

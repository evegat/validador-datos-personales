import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMunicipality?: string;
  defaultRole?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultMunicipality = '',
  defaultRole = ''
}) => {
  const [municipio, setMunicipio] = useState(defaultMunicipality);
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState(defaultRole);
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoServicio, setTipoServicio] = useState('Plan de Puesta al Día Rápido (Compra Ágil Mercado Público)');
  const [mensaje, setMensaje] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare mailto link
    const subject = encodeURIComponent(`[MuniTech] Requerimiento de Acompañamiento - ${municipio || 'Municipalidad'}`);
    const body = encodeURIComponent(
      `Estimado Eduardo Vega Toledo,

` +
      `Me contacto desde la plataforma Validador MuniTech para solicitar información y cotización sobre el servicio de acompañamiento institucional.

` +
      `DATOS DE CONTACTO MUNICIPAL:
` +
      `- Municipalidad: ${municipio}
` +
      `- Funcionario(a): ${nombre}
` +
      `- Cargo / Dirección: ${cargo}
` +
      `- Correo Institucional: ${correo}
` +
      `- Teléfono: ${telefono}
` +
      `- Modalidad de Interés: ${tipoServicio}

` +
      `DETALLE DEL REQUERIMIENTO:
` +
      `${mensaje || 'Solicitamos coordinar una reunión técnica para revisar la propuesta y los Términos de Referencia para Compra Ágil en Mercado Público.'}

` +
      `Saludos cordiales,
${nombre}`
    );

    window.open(`mailto:evega.ap@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 block">
              Acompañamiento Técnico Especializado
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Solicitar Reunión o Cotización Municipal
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

        {sent ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
              ✉️
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              ¡Mensaje Preparado!
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Se ha abierto tu cliente de correo para enviar el requerimiento directamente a <strong>evega.ap@gmail.com</strong>. Te responderemos en un plazo máximo de 24 horas hábiles.
            </p>
            <button
              onClick={() => { setSent(false); onClose(); }}
              className="px-6 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete los datos para coordinar una sesión de trabajo técnico o remitir los Términos de Referencia (TDR) listos para <strong>Compra Ágil en Mercado Público (Mercado Público)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Municipalidad *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: I. Municipalidad de ..."
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Funcionario(a) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carolina Rojas"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cargo / Dirección *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Administrador / Jurídico / Control"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo Institucional *</label>
                <input
                  type="email"
                  required
                  placeholder="nombre@municipio.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Modalidad de Acompañamiento</label>
              <select
                value={tipoServicio}
                onChange={(e) => setTipoServicio(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Plan de Puesta al Día Rápido (Compra Ágil Mercado Público)">Plan de Puesta al Día Rápido (Compra Ágil Mercado Público — 30 días)</option>
                <option value="Servicio de DPO Externo / Asesoría Mensual Continua">Servicio de DPO Externo / Asesoría Mensual Continua</option>
                <option value="Taller de Capacitación Funcionaria y Deber de Secreto">Taller de Capacitación Funcionaria y Deber de Secreto</option>
                <option value="Reunión Técnica de Orientación Inicial (Gratuita)">Reunión Técnica de Orientación Inicial (Gratuita)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Comentarios o Urgencia Específica</label>
              <textarea
                rows={2}
                placeholder="Ej: Necesitamos levantar el RAT de DIDECO y redactar el decreto de DPO para el próximo mes."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              ></textarea>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Directo: <strong>evega.ap@gmail.com</strong>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow cursor-pointer transition flex items-center gap-1.5"
                >
                  <span>Enviar Solicitud</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

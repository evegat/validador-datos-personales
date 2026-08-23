import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMunicipality?: string;
  defaultRole?: string;
  reportContext?: {
    immScore?: number;
    criticalGaps?: number;
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultMunicipality = '',
  defaultRole = 'Equipo Directivo Municipal',
  reportContext
}) => {
  const [municipio, setMunicipio] = useState(defaultMunicipality);
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState(defaultRole);
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoServicio, setTipoServicio] = useState('Plan de Puesta al Día Acelerado (Mercado Público)');
  const [enviado, setEnviado] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In local zero-storage mode, open mailto with prefilled executive summary
    const subject = encodeURIComponent(`[ProtegeDatosLocal] Solicitud de Acompañamiento - ${municipio || 'Municipalidad'}`);
    const body = encodeURIComponent(`SOLICITUD DE ACOMPAÑAMIENTO TÉCNICO LEY N° 21.719
InnCivica Lab / Eduardo Vega Toledo

DATOS INSTITUCIONALES:
- Municipalidad: ${municipio}
- Solicitante: ${nombre}
- Cargo/Dirección: ${cargo}
- Correo Institucional: ${email}
- Teléfono: ${telefono}
- Servicio de Interés: ${tipoServicio}
${reportContext?.immScore !== undefined ? `- Índice IMM Obtenido: ${reportContext.immScore}/100 (${reportContext.criticalGaps} brechas críticas)` : ''}

Por favor coordinar reunión técnica o remitir TDR tipo para contratación.`);

    window.open(`mailto:evegat@uchile.cl?cc=evega.ap@gmail.com&subject=${subject}&body=${body}`, '_blank');
    setEnviado(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
        {!enviado ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                  InnCivica Lab · Acompañamiento Técnico
                </span>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  Solicitar Informe Completo y Términos de Referencia (TDR)
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Complete los antecedentes para recibir la propuesta de acompañamiento técnico y los TDR prediseñados para contratación mediante Mercado Público.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Municipalidad:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: I. Municipalidad de ..."
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-850"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Su Nombre y Apellido:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Juan Pérez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cargo / Dirección:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Dirección Jurídica / SECPLA"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-850"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Correo Institucional:</label>
                  <input
                    type="email"
                    required
                    placeholder="nombre@municipalidad.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-850"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Modalidad de Interés:</label>
                <select
                  value={tipoServicio}
                  onChange={(e) => setTipoServicio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Honorarios a Suma Alzada por Cometido Específico (Art. 4° Ley N° 18.883)">Honorarios a Suma Alzada por Cometido Específico (Art. 4° Ley N° 18.883)</option>
                  <option value="Compra Ágil / Mercado Público (< 30 UTM - Ley N° 19.886)">Compra Ágil / Mercado Público (&lt; 30 UTM - Ley N° 19.886)</option>
                  <option value="Licitación Pública / Menor (Mercado Público)">Licitación Pública / Menor (Mercado Público)</option>
                  <option value="Auditoría Especializada Salud (CESFAM) y Social (RSH)">Auditoría Especializada Salud (CESFAM) y Social (RSH)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">
                  Respuesta técnica en menos de 24 horas hábiles.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xs cursor-pointer transition"
                >
                  Enviar Requerimiento →
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              ✓
            </div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1">
              ¡Requerimiento Preparado Exitosamente!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Se ha generado la comunicación formal dirigida al equipo de InnCivica Lab y a Eduardo Vega Toledo. Nos contactaremos a <strong>{email}</strong> a la brevedad.
            </p>
            <button
              onClick={() => { setEnviado(false); onClose(); }}
              className="px-6 py-2 bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs rounded-xl"
            >
              Cerrar Ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

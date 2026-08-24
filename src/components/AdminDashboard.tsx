import React, { useState, useEffect } from 'react';

interface LeadItem {
  fecha: string;
  municipio: string;
  nombre: string;
  cargo: string;
  rol_estamento?: string;
  canal_origen?: string;
  departamento?: string;
  email: string;
  hash_ip?: string;
}

interface TelemetryData {
  total_hits: number;
  sources: Record<string, number>;
  daily: Record<string, { hits: number; sources: Record<string, number> }>;
}

interface KpisData {
  total_leads: number;
  total_municipios: number;
  total_visitas: number;
  roles: Record<string, number>;
}

export const AdminDashboard: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [kpis, setKpis] = useState<KpisData | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('TODOS');

  const fetchAdminData = async (enteredPin: string) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin-data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: enteredPin })
      });

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setIsAuthenticated(true);
        setKpis(data.kpis);
        setLeads(data.leads || []);
        setTelemetry(data.telemetry || null);
        try {
          sessionStorage.setItem('pdl_admin_pin', enteredPin);
        } catch (e) {}
      } else {
        setError(data.message || 'PIN de acceso incorrecto');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedPin = sessionStorage.getItem('pdl_admin_pin');
      if (savedPin) {
        setPin(savedPin);
        fetchAdminData(savedPin);
      }
    } catch (e) {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    fetchAdminData(pin.trim());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    try {
      sessionStorage.removeItem('pdl_admin_pin');
    } catch (e) {}
  };

  // Filtrado de leads
  const filteredLeads = leads.filter(item => {
    const matchesSearch = 
      item.municipio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cargo?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (roleFilter === 'TODOS') return true;
    if (roleFilter === 'DIRECTIVO') return item.rol_estamento === 'DIRECTIVO' || !item.rol_estamento;
    if (roleFilter === 'CONCEJAL') return item.rol_estamento === 'CONCEJAL';
    if (roleFilter === 'FUNCIONARIO_OPERATIVO') return item.rol_estamento === 'FUNCIONARIO_OPERATIVO';

    return true;
  });

  // Exportar a CSV (Compatible directo con Excel y Google Sheets)
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ["N°", "Fecha y Hora", "Municipalidad", "Funcionario", "Cargo / Función", "Estamento / Rol", "Área Evaluada", "Correo Institucional", "Canal de Origen"];
    const rows = leads.map((lead, idx) => [
      idx + 1,
      `"${lead.fecha || '-'}"`,
      `"${lead.municipio || '-'}"`,
      `"${lead.nombre || '-'}"`,
      `"${lead.cargo || '-'}"`,
      `"${lead.rol_estamento || 'DIRECTIVO'}"`,
      `"${lead.departamento || 'General'}"`,
      `"${lead.email || '-'}"`,
      `"${lead.canal_origen || 'directo'}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Leads_ProtegeDatosLocal_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* PANTALLA DE LOGIN POR PIN */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-200 dark:border-blue-800">
            🔒
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-2">
            Panel de Control Privado
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Acceso exclusivo para Eduardo Vega Toledo (`evegat@uchile.cl`)
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 text-left mb-1.5">
                Ingrese su PIN Maestro:
              </label>
              <input
                type="password"
                required
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verificando PIN...' : 'Ingresar al Panel →'}
            </button>
          </form>

          <div className="mt-6 text-[11px] text-slate-400">
            Protección de acceso con Rate Limiting anti-fuerza bruta activo.
          </div>
        </div>
      ) : (
        /* DASHBOARD PRINCIPAL EN VIVO */
        <div className="space-y-8">
          {/* Header Superior */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
                🛡️ Portal Administrativo Oficial
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Control de Leads y Prospección Municipal
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Consultor Principal: <strong>Eduardo Vega Toledo</strong> (`evegat@uchile.cl`) · Enlace en Vivo con Hostinger
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchAdminData(pin)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <span>🔄 Actualizar</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <span>📥 Descargar Planilla Excel (.csv)</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Salir
              </button>
            </div>
          </div>

          {/* Tarjetas de Métricas Clave (KPIs) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                👥 Total Visitas Web
              </span>
              <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                {kpis?.total_visitas || leads.length}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Telemetría Zero-Cookie</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                🏛️ Municipios Registrados
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
                {kpis?.total_municipios || 0}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Comunas Únicas</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                👔 Equipos Directivos
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
                {kpis?.roles?.DIRECTIVO || 0}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Alcaldía / Jurídico / SECPLA</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                ⚖️ Concejales & Operativos
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
                {(kpis?.roles?.CONCEJAL || 0) + (kpis?.roles?.FUNCIONARIO_OPERATIVO || 0)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Promotores Internos</span>
            </div>
          </div>

          {/* Desglose de Fuentes de Tráfico (Telemetría) */}
          {telemetry && telemetry.sources && Object.keys(telemetry.sources).length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                <span>📈 Rendimiento por Canal de Difusión (`?src=...`)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Object.entries(telemetry.sources).map(([srcKey, count]) => (
                  <div key={srcKey} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block truncate">
                      {srcKey}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                      {count} <span className="text-xs font-normal text-slate-400">clics</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabla de Leads en Tiempo Real */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Barra de Filtros y Búsqueda */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[240px] max-w-md">
                <input
                  type="text"
                  placeholder="🔍 Buscar por municipio, nombre o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { id: 'TODOS', label: 'Todos' },
                  { id: 'DIRECTIVO', label: '👔 Directivos' },
                  { id: 'CONCEJAL', label: '⚖️ Concejales' },
                  { id: 'FUNCIONARIO_OPERATIVO', label: '👥 Operativos' }
                ].map(rf => (
                  <button
                    key={rf.id}
                    onClick={() => setRoleFilter(rf.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      roleFilter === rf.id
                        ? 'bg-slate-900 dark:bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {rf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Listado de Registros */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Fecha / Hora</th>
                    <th className="py-3 px-4">Municipalidad</th>
                    <th className="py-3 px-4">Funcionario(a)</th>
                    <th className="py-3 px-4">Cargo / Función</th>
                    <th className="py-3 px-4">Estamento</th>
                    <th className="py-3 px-4">Correo Institucional</th>
                    <th className="py-3 px-4">Canal</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {lead.fecha}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-950 dark:text-white">
                          {lead.municipio}
                        </td>
                        <td className="py-3.5 px-4 font-semibold">
                          {lead.nombre}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                          {lead.cargo}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lead.rol_estamento === 'CONCEJAL'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : lead.rol_estamento === 'FUNCIONARIO_OPERATIVO'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            {lead.rol_estamento || 'DIRECTIVO'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                          <a href={`mailto:${lead.email}`} className="hover:underline">
                            {lead.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                            {lead.canal_origen || 'directo'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <a
                            href={`mailto:${lead.email}?subject=Asistencia%20Puesta%20al%20D%C3%ADa%20Ley%2021.719%20-${encodeURIComponent(lead.municipio)}&body=Estimado(a)%20${encodeURIComponent(lead.nombre)}%2C%0A%0ACon%20motivo%20de%20su%20reciente%20evaluaci%C3%B3n%20en%20ProtegeDatosLocal%2C%20le%20contacto%20para%20ofrecer%20acompa%C3%B1amiento%20t%C3%A9cnico%20y%20revisar%20las%20bases%20para%20la%20adecuaci%C3%B3n%20municipal.%0A%0ASaludos%20cordiales%2C%0AEduardo%20Vega%20Toledo`}
                            className="px-3 py-1 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-[11px] font-bold hover:bg-blue-600 transition inline-block"
                          >
                            Contactar
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No se encontraron registros que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

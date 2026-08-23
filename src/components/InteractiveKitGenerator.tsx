import React, { useState } from 'react';
import { ContactModal } from './ContactModal';

interface KitDefinition {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  targetRole: string;
  legalBasis: string;
  template: (vars: Record<string, string>) => string;
}

const KITS_DATABASE: KitDefinition[] = [
  {
    id: 'kit-01',
    code: 'KIT-01',
    title: 'Decreto Alcaldicio Tipo: Nombramiento de DPO y Comité de Privacidad',
    subtitle: 'Modelo para formalizar la gobernanza de datos y designar al Delegado conforme al modelo facultativo de la Ley 21.719.',
    targetRole: 'Alcaldía / Administrador / Dirección Jurídica',
    legalBasis: 'Arts. 14 y 48 de la Ley N° 21.719 / Ley N° 18.695 (LOCM)',
    template: (v) => `DECRETO ALCALDICIO EXENTO N° ___________/
${v.comuna || 'Santiago'}, ${v.fecha || '22 de Agosto de 2026'}

VISTOS:
1. Lo dispuesto en la Constitución Política de la República, en particular en su artículo 19 N° 4, que garantiza a todas las personas la protección de sus datos personales.
2. Lo establecido en la Ley N° 18.695, Orgánica Constitucional de Municipalidades (DFL N° 1 de 2006).
3. Las disposiciones de la Ley N° 19.628 y sus modificaciones introducidas por la Ley N° 21.719, que entra en vigencia plena el 1 de diciembre de 2026.
4. Las facultades inherentes a mi cargo como Alcalde/sa de la Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}.

CONSIDERANDO:
1. Que las Municipalidades se encuentran plenamente sujetas al principio de responsabilidad proactiva y licitud en el tratamiento de datos de vecinos y funcionarios.
2. Que, conforme al artículo 48 de la Ley N° 21.719, los responsables del tratamiento de datos personales podrán designar un Delegado de Protección de Datos (DPO) para coordinar la adecuación institucional.
3. Que se hace necesario constituir una instancia de gobernanza transversal para conducir el plan de adecuación municipal.

DECRETO:

ARTÍCULO PRIMERO: DESÍGNESE a contar de la fecha del presente decreto al/a la funcionario/a ${v.dpoNombre || 'Juan Pérez González'}, RUT ${v.dpoRut || '12.345.678-9'}, de profesión ${v.dpoProfesion || 'Abogado / Administrador Público'}, quien se desempeña en la calidad jurídica de ${v.dpoCalidad || 'Contrata'} en la dirección de ${v.dpoDireccion || 'Dirección Jurídica / Control'}, como Delegado de Protección de Datos (DPO) de la Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}.

ARTÍCULO SEGUNDO: El Delegado de Protección de Datos municipal ejercerá sus funciones con estricta autonomía técnica y funcional, reportando directamente a la Alcaldía y al Administrador Municipal.

ARTÍCULO TERCERO: Serán funciones del DPO:
1. Supervisar internamente la observancia de la Ley N° 21.719 y las normas de la APDP.
2. Actuar como punto de enlace institucional ante la Agencia de Protección de Datos Personales.
3. Coordinar la tramitación y respuesta oportuna de los derechos ARSOPB de los ciudadanos en los plazos legales (30 días corridos generales).
4. Mantener y auditar semestralmente el Registro de Actividades de Tratamiento (RAT) municipal.

ARTÍCULO CUARTO: CONSTITÚYASE el Comité de Privacidad Comunal, integrado por:
1. El/La Administrador/a Municipal (Presidente).
2. El/La Delegado/a de Protección de Datos (Secretario Técnico).
3. El/La Director/a de la Dirección Jurídica.
4. El/La Director/a de Informática / TI.
5. El/La Director/a de Desarrollo Comunitario (DIDECO).
6. El/La Director/a de Salud Municipal (DISAM).
7. El/La Director/a de Seguridad Pública.

ANÓTESE, COMUNÍQUESE, PUBLÍQUESE EN TRANSPARENCIA ACTIVA Y ARCHÍVESE.

_________________________________                   _________________________________
${v.alcalde || 'Alcalde/sa Titular'}                                 ${v.secretario || 'Secretario/a Municipal'}
Alcalde/sa                                            Secretario/a Municipal
Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}               Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}`
  },
  {
    id: 'kit-02',
    code: 'KIT-02',
    title: 'Anexo DPA Tipo: Convenio de Encargado de Tratamiento para Mercado Público',
    subtitle: 'Cláusulas obligatorias de protección de datos para bases de licitación y contratos con proveedores de software y servicios Cloud.',
    targetRole: 'DAF / Adquisiciones / Informática / Jurídico',
    legalBasis: 'Art. 25 de la Ley N° 19.628 (reformada por Ley N° 21.719)',
    template: (v) => `ANEXO N° _____: CONVENIO DE ENCARGADO DE TRATAMIENTO DE DATOS PERSONALES (DPA)

En ${v.comuna || 'Santiago'}, a ${v.fecha || '22 de Agosto de 2026'}, entre la ILUSTRE MUNICIPALIDAD DE ${v.municipio || 'Valparaíso'}, RUT ${v.muniRut || '69.010.100-5'}, representada por su Alcalde/sa don/ña ${v.alcalde || 'Alcalde/sa Titular'}, en adelante "el Responsable"; y por la otra parte ${v.proveedor || 'Empresa de Software SpA'}, RUT ${v.provRut || '76.543.210-K'}, representada por don/ña ${v.provRep || 'Representante Legal'}, en adelante "el Encargado"; se acuerda:

PRIMERA: Objeto y Ámbito.
El presente Convenio regula las obligaciones y medidas de seguridad que asume el Encargado respecto de los datos personales tratados con ocasión del contrato "${v.licitacion || 'Servicio de Plataforma y Soporte Tecnológico'}", ID Mercado Público ${v.licitacionId || '2450-12-LR26'}.

SEGUNDA: Instrucciones del Responsable.
El Encargado tratará los datos única y exclusivamente conforme a las instrucciones escritas de la Municipalidad. Queda expresamente prohibido ceder, comunicar, transferir o utilizar los datos para fines comerciales, analítica propia o entrenamiento de modelos de inteligencia artificial no autorizados.

TERCERA: Medidas de Seguridad Exigibles.
El Encargado se obliga a aplicar medidas técnicas proporcionales:
1. Control de accesos basado en roles (RBAC) con registro de actividad (Logs inmutables).
2. Cifrado de datos en reposo y en tránsito.
3. Soberanía de datos: Almacenamiento en territorio nacional o en países con nivel adecuado de protección según la APDP.
4. Respaldos periódicos con planes de restauración probados.

CUARTA: Notificación de Brechas de Seguridad.
Ante cualquier incidente de seguridad que afecte los datos municipales, el Encargado deberá notificar a la Municipalidad a ${v.dpoEmail || 'dpo@municipalidad.cl'} en un plazo no mayor a 24 horas corridas desde su detección.

QUINTA: Destino de los Datos al Término del Servicio.
Al finalizar el contrato, el Encargado deberá devolver íntegramente las bases de datos en formato estructurado estándar (JSON/CSV) y certificar la destrucción irreversible de todas las copias en sus servidores.

_________________________________                   _________________________________
Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}               ${v.proveedor || 'Empresa de Software SpA'}
Responsable del Tratamiento                          Encargado del Tratamiento`
  },
  {
    id: 'kit-03',
    code: 'KIT-03',
    title: 'Protocolo y Formulario JSON de Notificación de Brechas de Seguridad',
    subtitle: 'Flujograma de respuesta rápida y plantilla JSON estandarizada para reporte ante la APDP y el CSIRT Nacional.',
    targetRole: 'Dirección de Informática / Seguridad de la Información',
    legalBasis: 'Art. 27 Ley N° 19.628 / Ley N° 21.663 de Ciberseguridad (DS 295)',
    template: (v) => `PROTOCOLO DE REPORTE Y GESTIÓN DE BRECHAS DE SEGURIDAD
Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}

ESTRUCTURA DE REPORTE TÉCNICO OFICIAL (FORMATO JSON):
{
  "cabecera_incidente": {
    "institucion_emisora": "Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}",
    "rut_institucion": "${v.muniRut || '69.010.100-5'}",
    "dpo_responsable": "${v.dpoNombre || 'Juan Pérez González'}",
    "contacto_dpo": "${v.dpoEmail || 'dpo@municipalidad.cl'}",
    "fecha_reporte": "${v.fecha || '2026-08-22'}"
  },
  "descripcion_brecha": {
    "fecha_ocurrencia": "2026-08-22T08:30:00-04:00",
    "origen_detectado": "Acceso no autorizado / Falla en servicio tercerizado",
    "descripcion_tecnica": "Detección de anomalía en servidor de base de datos comunal.",
    "estado_actual": "Contenido y aislado en red perimetral"
  },
  "datos_y_titulares_afectados": {
    "volumen_estimado": 1500,
    "perfil_titulares": "Vecinos usuarios de trámites digitales",
    "tipos_de_datos": ["RUT", "Nombres", "Dirección", "Teléfono"],
    "presencia_datos_sensibles": "No",
    "datos_menores_edad": "No"
  },
  "medidas_mitigacion_adoptadas": [
    "Aislamiento preventivo del servidor y bloqueo de credenciales",
    "Restauración de integridad desde copia de seguridad inmutable",
    "Activación de monitoreo reforzado en logs de cortafuegos"
  ]
}`
  },
  {
    id: 'kit-04',
    code: 'KIT-04',
    title: 'Convenio de Confidencialidad y Deber de Secreto RSH (DIDECO)',
    subtitle: 'Acuerdo de firma obligatoria para operadores y funcionarios que gestionan datos socioeconómicos de vecinos en el Registro Social de Hogares.',
    targetRole: 'DIDECO / Desarrollo Social / Recursos Humanos',
    legalBasis: 'Art. 6 Ley N° 19.949 / DS N° 160 / Art. 58 letra h Ley N° 18.883',
    template: (v) => `COMPROMISO DE CONFIDENCIALIDAD Y DEBER DE SECRETO FUNCIONARIO EN TRATAMIENTO DE DATOS DEL REGISTRO SOCIAL DE HOGARES (RSH)

En ${v.comuna || 'Santiago'}, a ${v.fecha || '22 de Agosto de 2026'}, el/la funcionario/a ${v.operadorNombre || 'María Silva Torres'}, RUT ${v.operadorRut || '15.987.654-3'}, de la Dirección de Desarrollo Comunitario (DIDECO) de la I. Municipalidad de ${v.municipio || 'Valparaíso'}, declara:

PRIMERO: Deber de Secreto Permanente.
Me comprometo a guardar estricta reserva sobre todos los datos personales y antecedentes socioeconómicos de los habitantes de la comuna a los que acceda con motivo de mis funciones. Este deber prohíbe capturar pantallas, compartir información por mensajería instantánea o facilitar datos a terceros ajenos a la tramitación de beneficios.

SEGUNDO: Limitación de Finalidad.
Utilizaré los accesos al sistema del Registro Social de Hogares exclusivamente para los trámites asignados, quedando prohibida la consulta de fichas por motivos de curiosidad personal, familiar o vecinal.

TERCERO: Responsabilidad Funcionaria.
Declaro conocer que el incumplimiento del deber de secreto constituye falta grave sancionada con medidas disciplinarias según la Ley N° 18.883 (Estatuto Administrativo Municipal), sin perjuicio de las responsabilidades civiles y penales correspondientes.

_________________________________
${v.operadorNombre || 'María Silva Torres'}
RUT: ${v.operadorRut || '15.987.654-3'}
Funcionario/a Operador DIDECO
I. Municipalidad de ${v.municipio || 'Valparaíso'}`
  },
  {
    id: 'kit-05',
    code: 'KIT-05',
    title: 'Pauta de Resguardo y Auditoría Clínica DISAM / CESFAM',
    subtitle: 'Checklist de verificación operativa para la reserva de Fichas Clínicas y accesos en centros de salud comunales.',
    targetRole: 'Salud Municipal (DISAM) / Directores CESFAM',
    legalBasis: 'Ley N° 20.584 (Ficha Clínica) / Ley N° 21.719 (Datos de Salud)',
    template: (v) => `PAUTA DE VERIFICACIÓN Y AUDITORÍA DE DATOS DE SALUD (CESFAM / CECOSF)
Ilustre Municipalidad de ${v.municipio || 'Valparaíso'} — Dirección de Salud Municipal

DIMENSIÓN 1: RESERVA Y ACCESO A LA FICHA CLÍNICA (Ley N° 20.584)
[ ] 1.1 ¿El sistema HIS restringe el acceso al expediente clínico únicamente al personal con rol asistencial directo?
[ ] 1.2 ¿Está prohibido que personal administrativo consulte diagnósticos o antecedentes médicos de pacientes?
[ ] 1.3 ¿Se registran logs inmutables con fecha, usuario y motivo de cada consulta a la ficha clínica?

DIMENSIÓN 2: TRASPASO Y ESTUDIOS EPIDEMIOLÓGICOS
[ ] 2.1 ¿Los reportes estadísticos a SEREMI o MINSAL aplican algoritmos de anonimización irreversible de RUTs y nombres?
[ ] 2.2 ¿Los convenios de investigación con universidades cuentan con consentimiento explícito previo de los titulares?

DIMENSIÓN 3: SEGURIDAD TÉCNICA Y DISPOSITIVOS
[ ] 3.1 ¿Se encuentra bloqueada la descarga de listados de pacientes en planillas Excel en computadores locales?
[ ] 3.2 ¿Las conexiones remotas o domiciliarias de profesionales de salud operan bajo redes VPN cifradas?

Fecha de Evaluación: ${v.fecha || '22 de Agosto de 2026'}
Evaluador/a Responsable: _________________________________`
  },
  {
    id: 'kit-06',
    code: 'KIT-06',
    title: 'Términos de Referencia Tipo (TDR): Puesta al Día Acelerada en Mercado Público',
    subtitle: 'Bases prediseñadas para contratar el servicio de consultoría, levantamiento de RAT y adecuación en compras públicas.',
    targetRole: 'SECPLA / DAF / Adquisiciones / Jurídico',
    legalBasis: 'Ley N° 19.886 / Directivas ChileCompra / Ley N° 21.719',
    template: (v) => `TÉRMINOS DE REFERENCIA (TDR) TIPO
SERVICIO DE ASESORÍA Y PUESTA AL DÍA ACELERADA LEY N° 21.719
Ilustre Municipalidad de ${v.municipio || 'Valparaíso'}

1. OBJETIVO DEL REQUERIMIENTO:
Contratar un servicio profesional especializado para ejecutar el diagnóstico institucional, levantamiento de la matriz de tratamientos (RAT), redacción de decretos de gobernanza, cláusulas para proveedores (DPA) y capacitación a funcionarios antes de la entrada en vigencia del 1 de diciembre de 2026.

2. PRODUCTOS Y ENTREGABLES EXIGIDOS:
- Entregable 1: Informe Ejecutivo de Diagnóstico de Brechas por Dirección Municipal.
- Entregable 2: Matriz de Inventario y Trazabilidad de Tratamientos (Formato RAT estructurado).
- Entregable 3: Paquete de Actos Administrativos (Decreto de DPO, Comité de Privacidad y Política Interna).
- Entregable 4: Modelos de Cláusulas Contractuales de Encargado de Tratamiento (DPA).
- Entregable 5: Taller de Capacitación en Deber de Secreto para Funcionarios y Directores.

3. PERFIL DEL CONSULTOR:
Profesional con experiencia acreditada en gestión pública, derecho de la información y tecnologías de gobernanza municipal.

4. PLAZO DE EJECUCIÓN:
30 a 60 días corridos contados desde la emisión de la Orden de Compra.`
  }
];

export const InteractiveKitGenerator: React.FC = () => {
  // Helper para evitar concatenaciones repetidas como 'Ilustre Municipalidad de Ilustre Municipalidad de...'
  const getCleanMuniName = (raw: string) => {
    const trimmed = (raw || '').trim();
    const withoutPrefix = trimmed.replace(/^(I\.\s*Municipalidad\s+de\s+|Ilustre\s+Municipalidad\s+de\s+|Municipalidad\s+de\s+)/i, '').trim();
    return withoutPrefix || 'su Comuna';
  };

  const [selectedKitId, setSelectedKitId] = useState<string>('kit-01');
  const [formData, setFormData] = useState({
    municipio: 'Ilustre Municipalidad de Quilpué',
    comuna: 'Quilpué',
    fecha: new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
    alcalde: 'Alcalde/sa Titular',
    secretario: 'Secretario/a Municipal',
    muniRut: '69.050.800-1',
    dpoNombre: 'Rodrigo Morales Valdés',
    dpoRut: '14.230.120-K',
    dpoProfesion: 'Abogado / Administrador Público',
    dpoCalidad: 'Contrata Directiva',
    dpoDireccion: 'Dirección Jurídica',
    dpoEmail: 'dpo@quilpue.cl',
    proveedor: 'Servicios Cloud Municipal SpA',
    provRut: '77.890.120-3',
    provRep: 'Carlos Mendoza Silva',
    licitacion: 'Soporte y Plataforma de Atención Vecinal',
    licitacionId: '2450-18-LR26',
    operadorNombre: 'Patricia Carrasco Soto',
    operadorRut: '16.540.321-4'
  });

  const [copied, setCopied] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const selectedKit = KITS_DATABASE.find(k => k.id === selectedKitId) || KITS_DATABASE[0];
  const generatedText = selectedKit.template(formData);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedKit.code}_${formData.comuna.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
              ⚙️ Generador Interactivo de Instrumentos Municipales
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Generador y Personalizador de Kits Legales
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Complete los datos de su municipalidad para previsualizar, personalizar y descargar los borradores de decretos, contratos DPA y protocolos conforme a la Ley N° 21.719.
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

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Kit Selector & Municipal Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Kit Selector Tabs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Seleccione el Instrumento a Generar:
            </label>
            <div className="space-y-1.5">
              {KITS_DATABASE.map(kit => (
                <button
                  key={kit.id}
                  onClick={() => setSelectedKitId(kit.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-start justify-between gap-2 ${
                    selectedKitId === kit.id
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${selectedKitId === kit.id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-800'}`}>
                        {kit.code}
                      </span>
                      <span>{kit.title.split(':')[0]}</span>
                    </div>
                    <div className={`text-[11px] mt-1 font-normal line-clamp-1 ${selectedKitId === kit.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {kit.targetRole}
                    </div>
                  </div>
                  <span className="text-xs">{selectedKitId === kit.id ? '✓' : '→'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Parameters */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Variables Institucionales de su Comuna:
              </h3>
              <span className="text-[10px] text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                Actualización en vivo
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Municipalidad:</label>
                <input
                  type="text"
                  value={formData.municipio}
                  onChange={e => setFormData({ ...formData, municipio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Comuna:</label>
                  <input
                    type="text"
                    value={formData.comuna}
                    onChange={e => setFormData({ ...formData, comuna: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">RUT Municipio:</label>
                  <input
                    type="text"
                    value={formData.muniRut}
                    onChange={e => setFormData({ ...formData, muniRut: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nombre Alcalde/sa:</label>
                  <input
                    type="text"
                    value={formData.alcalde}
                    onChange={e => setFormData({ ...formData, alcalde: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Secretario/a Municipal:</label>
                  <input
                    type="text"
                    value={formData.secretario}
                    onChange={e => setFormData({ ...formData, secretario: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="block font-bold text-slate-800 mb-2">Datos del Delegado (DPO) / Responsable:</span>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Nombre DPO:</label>
                    <input
                      type="text"
                      value={formData.dpoNombre}
                      onChange={e => setFormData({ ...formData, dpoNombre: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">RUT DPO:</label>
                    <input
                      type="text"
                      value={formData.dpoRut}
                      onChange={e => setFormData({ ...formData, dpoRut: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Correo Oficial DPO:</label>
                  <input
                    type="email"
                    value={formData.dpoEmail}
                    onChange={e => setFormData({ ...formData, dpoEmail: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Document Previewer & Actions */}
        <div className="lg:col-span-7 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header Info */}
            <div className="p-5 bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-850">
              <div>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs font-bold rounded border border-blue-400/30">
                  {selectedKit.code} • Previsualización Oficial
                </span>
                <h2 className="text-base font-bold text-white mt-1">
                  {selectedKit.title}
                </h2>
                <div className="text-[11px] text-slate-400">
                  Sustento Legal: <strong className="text-slate-200">{selectedKit.legalBasis}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>{copied ? '✅ ¡Copiado!' : '📋 Copiar'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>📥 Descargar .md</span>
                </button>
              </div>
            </div>

            {/* Document Content Box */}
            <div className="p-6 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-[540px] leading-relaxed whitespace-pre-wrap selection:bg-blue-600 selection:text-white">
              {generatedText}
            </div>

            {/* Bottom Support Banner */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span>
                ¿Requiere visar este instrumento con su Dirección Jurídica?
              </span>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-blue-800 font-bold hover:underline cursor-pointer"
              >
                Solicitar Acompañamiento con Eduardo Vega Toledo →
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultMunicipality={formData.municipio}
        defaultRole="Equipo Directivo Municipal"
      />
    </div>
  );
};

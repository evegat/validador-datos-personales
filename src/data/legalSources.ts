export interface LegalSourceItem {
  id: string;
  norma: string;
  tituloOficial: string;
  autoridadEspecializada: string;
  vigencia: string;
  bcnUrl: string;
  tipoFundamento: string;
  fechaVerificacion: string;
  resumenAplicacionMunicipal: string;
  observaciones: string;
}

export const OFFICIAL_LEGAL_SOURCES: LegalSourceItem[] = [
  {
    id: 'ley-21719',
    norma: 'Ley N° 21.719',
    tituloOficial: 'Regula la Protección y el Tratamiento de los Datos Personales y crea la Agencia de Protección de Datos Personales',
    autoridadEspecializada: 'Agencia de Protección de Datos Personales (APDP). La CGR conserva las competencias de control y funciones específicas que le confiere el ordenamiento.',
    vigencia: '1 de diciembre de 2026 (Publicada en D.O. el 13 de diciembre de 2024)',
    bcnUrl: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
    tipoFundamento: 'Obligación legal',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Fija el nuevo régimen de protección de datos personales. En su Título IV contempla el régimen específico de responsabilidad aplicable a órganos públicos y autoridades, la tramitación de derechos de las personas en un plazo general de 30 días corridos (prorrogable por otros 30 días corridos) y el deber de secreto.',
    observaciones: 'Para órganos públicos rige el régimen disciplinario y sancionatorio específico establecido en el Título IV. La designación de un delegado es una facultad (podrá designar).'
  },
  {
    id: 'ley-19628-reforma',
    norma: 'Ley N° 19.628 (Texto reformado por Ley 21.719)',
    tituloOficial: 'Sobre Protección de la Vida Privada (Texto vigente desde el 1 de diciembre de 2026)',
    autoridadEspecializada: 'Agencia de Protección de Datos Personales (APDP)',
    vigencia: 'Vigencia desde 1 de diciembre de 2026',
    bcnUrl: 'https://www.bcn.cl/leychile/Navegar?idNorma=141599&idVersion=2026-12-01',
    tipoFundamento: 'Obligación legal',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Establece los principios rectores (licitud, finalidad, proporcionalidad, seguridad y responsabilidad), las reglas de tratamiento de órganos públicos dentro de sus competencias, los derechos de los titulares y la obligación de comunicar determinadas vulneraciones sin dilaciones indebidas.',
    observaciones: 'El tratamiento por órganos de la Administración del Estado es lícito cuando se efectúa en el ejercicio de sus competencias legales.'
  },
  {
    id: 'ley-21663',
    norma: 'Ley N° 21.663',
    tituloOficial: 'Ley Marco de Ciberseguridad e Infraestructura Crítica de la Información',
    autoridadEspecializada: 'Agencia Nacional de Ciberseguridad (ANCI) / CSIRT Nacional',
    vigencia: 'Vigente. Normas reglamentarias dictadas, incluido el reglamento de reporte de incidentes (DS N° 295).',
    bcnUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=1202434',
    tipoFundamento: 'Obligación legal',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Aplica a las municipalidades como órganos de la Administración del Estado. Fija el esquema escalonado de reporte de incidentes de ciberseguridad ante el CSIRT Nacional (alerta temprana en 3 horas, actualización en 72 horas e informe final en 15 días corridos).',
    observaciones: 'Régimen de reporte de ciberseguridad diferenciado del régimen de protección de datos personales.'
  },
  {
    id: 'reglamento-incidentes-ds295',
    norma: 'Decreto Supremo N° 295 (Ministerio del Interior)',
    tituloOficial: 'Reglamento sobre Notificación y Gestión de Incidentes de Ciberseguridad',
    autoridadEspecializada: 'ANCI / CSIRT Nacional',
    vigencia: 'Vigente',
    bcnUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=1211466',
    tipoFundamento: 'Obligación legal',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Regula los plazos, formularios y contenidos exigibles para la alerta temprana (3 h), segundo reporte (72 h) e informe de cierre (15 días) ante incidentes de ciberseguridad significativos.',
    observaciones: 'Aplica a instituciones obligadas del sector público conforme a la Ley 21.663.'
  },
  {
    id: 'ley-18695',
    norma: 'Ley N° 18.695',
    tituloOficial: 'Ley Orgánica Constitucional de Municipalidades (LOCM)',
    autoridadEspecializada: 'Contraloría General de la República (CGR)',
    vigencia: 'Texto refundido vigente',
    bcnUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=30077',
    tipoFundamento: 'Obligación legal',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Delimita las funciones privativas y compartidas del municipio. Permite identificar las competencias legales dentro de las cuales el tratamiento de datos resulta lícito conforme a la Ley 19.628 reformada.',
    observaciones: 'La LOCM delimita competencias; la licitud de cada tratamiento específico debe analizarse conforme a las reglas de la ley de protección de datos.'
  },
  {
    id: 'ley-20584',
    norma: 'Ley N° 20.584',
    tituloOficial: 'Regula los derechos y deberes que tienen las personas en relación con acciones vinculadas a su atención en salud',
    autoridadEspecializada: 'Superintendencia de Salud / CGR',
    vigencia: 'Vigente',
    bcnUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=1039348',
    tipoFundamento: 'Obligación legal sectorial',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Art. 12 y siguientes: Regula la reserva de la ficha clínica en la atención primaria municipal (CESFAM/CECOSF), restringiendo el acceso a terceros no vinculados con la atención de salud, sin perjuicio de las excepciones legales.',
    observaciones: 'El control de acceso es una obligación legal; los mecanismos específicos de logging y auditoría constituyen controles técnicos recomendados de gestión.'
  },
  {
    id: 'registro-informacion-social',
    norma: 'Ley N° 19.949 (Art. 6) / DS N° 160 y DS N° 22',
    tituloOficial: 'Marco Normativo del Registro de Información Social y Sistema de Selección de Beneficiarios (RSH)',
    autoridadEspecializada: 'Ministerio de Desarrollo Social y Familia (MDSF) / CGR',
    vigencia: 'Vigente',
    bcnUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=268571',
    tipoFundamento: 'Obligación legal sectorial',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Regula el acceso, convenios de transferencia, uso específico y confidencialidad de la información socioeconómica de los hogares gestionada por las unidades de DIDECO en el Registro Social de Hogares.',
    observaciones: 'Fija el deber de reserva y secreto funcionaria sobre antecedentes de vulnerabilidad social.'
  },
  {
    id: 'ley-transparencia-cplt',
    norma: 'Ley N° 20.285 e Instrucciones CPLT',
    tituloOficial: 'Sobre Acceso a la Información Pública e Instrucción General del Consejo para la Transparencia',
    autoridadEspecializada: 'Consejo para la Transparencia (CPLT) / CGR',
    vigencia: 'Vigente (Instrucción General CPLT 2026)',
    bcnUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=1221720',
    tipoFundamento: 'Obligación legal / Instrucción vinculante',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Art. 21 y principio de divisibilidad (Art. 11 letra e): Obliga a tarjar o anonimizar datos personales y sensibles antes de la entrega o publicación de documentos públicos requeridos por solicitudes de transparencia (SAI) o transparencia activa.',
    observaciones: 'Distingue causales de reserva, principio de divisibilidad y directrices de anonimización emitidas por el CPLT.'
  },
  {
    id: 'chilecompra-contratacion',
    norma: 'Ley N° 19.886 / Ley N° 21.634 y Directivas ChileCompra',
    tituloOficial: 'Ley de Bases sobre Contratos Administrativos de Suministro y Prestación de Servicios',
    autoridadEspecializada: 'Dirección de Compras y Contratación Pública (ChileCompra) / CGR',
    vigencia: 'Vigente (Reformas graduales 2024–2026)',
    bcnUrl: 'https://www.chilecompra.cl/compraagil/',
    tipoFundamento: 'Marco contractual público',
    fechaVerificacion: '2026-08-22',
    resumenAplicacionMunicipal: 'Regula los procedimientos de compra pública (incluida la Compra Ágil hasta 100 UTM según directivas vigentes). En contratos de software y servicios en la nube, el municipio debe coordinar las exigencias de compras con las obligaciones de encargado de tratamiento derivadas de la Ley 21.719.',
    observaciones: 'Las cláusulas de encargado de tratamiento derivan del régimen de protección de datos y deben articularse con las bases de licitación caso a caso.'
  }
];

export interface TemplateKit {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  targetRole: string;
  effortToImplement: string;
  legalBasis: string;
  description: string;
  structurePreview: string[];
  fileFormat: 'DOCX Visado' | 'XLSX Parametrizado' | 'PDF Normativo';
}

export const ACTIONABLE_KITS: TemplateKit[] = [
  {
    id: 'kit-decreto-dpo',
    code: 'KIT-01',
    title: 'Decreto Alcaldicio Tipo: Nombramiento de DPO y Comité de Privacidad',
    subtitle: 'Acto administrativo formal para cumplir con la gobernanza institucional',
    targetRole: 'Alcaldía / Administrador Municipal / Jurídico',
    effortToImplement: 'Listo para firma alcaldicia y visación jurídica',
    legalBasis: 'Ley N° 18.695 (LOCM) y Arts. 14 y 48 Ley N° 21.719',
    fileFormat: 'DOCX Visado',
    description: 'Decreto Alcaldicio formalizado que designa al Oficial de Protección de Datos (DPO), define sus facultades reglamentarias, establece el canal de atención ciudadana y constituye la Mesa Técnica Interdepartamental de Privacidad y Ciberseguridad.',
    structurePreview: [
      'Vistos legales y concordancias con Ley 18.695, 21.719 y 21.663',
      'Artículo 1°: Designación formal del Oficial/Delegado de Protección de Datos',
      'Artículo 2°: Catálogo de 6 funciones y atribuciones fiscalizadoras internas',
      'Artículo 3°: Creación y reglamento del Comité de Seguridad y Privacidad',
      'Artículo 4°: Publicidad y registro en Secretaría Municipal'
    ]
  },
  {
    id: 'kit-clausula-dpa',
    code: 'KIT-02',
    title: 'Anexo DPA Tipo para Bases de Licitación en Mercado Público',
    subtitle: 'Cláusula obligatoria de Encargado de Tratamiento para compras de software',
    targetRole: 'DAF / Unidad de Adquisiciones / SECPLA / Jurídico',
    effortToImplement: 'Incorporable directamente en bases de licitación',
    legalBasis: 'Art. 25 Ley N° 21.719 y Ley N° 19.886 de Compras Públicas',
    fileFormat: 'DOCX Visado',
    description: 'Anexo contractual estándar que blinda al municipio frente a empresas de software (ERP, permisos, teleasistencia, cámaras). Establece la propiedad exclusiva de los datos para el municipio, prohíbe el uso secundario por el proveedor, exige medidas de ciberseguridad y obliga a la devolución y borrado certificado al término del contrato.',
    structurePreview: [
      'Cláusula 1ª: Objeto del encargo y prohibición expresa de uso secundario',
      'Cláusula 2ª: Propiedad exclusiva municipal y deber de reserva perpetuo',
      'Cláusula 3ª: Estándares de seguridad exigibles (cifrado AES-256 y TLS 1.3)',
      'Cláusula 4ª: Obligación perentoria de notificación de brechas en 24 horas',
      'Cláusula 5ª: Devolución estructurada y Certificado de Destrucción Segura'
    ]
  },
  {
    id: 'kit-protocolo-brechas',
    code: 'KIT-03',
    title: 'Protocolo de Notificación de Brechas de Seguridad en 72 Horas',
    subtitle: 'Flujograma operativo y plantilla de reporte ante ciberataques o filtraciones',
    targetRole: 'Informática / TI / Administrador Municipal / Jurídico',
    effortToImplement: 'Aprobable mediante circular o resolución interna',
    legalBasis: 'Art. 27 Ley N° 21.719 y Arts. 8 y 11 Ley N° 21.663 (ANCI)',
    fileFormat: 'PDF Normativo',
    description: 'Guía paso a paso para directores municipales ante la sospecha o confirmación de una filtración de datos, ransomware o acceso no autorizado. Incluye matriz de clasificación de severidad, plantilla de reporte al CSIRT Nacional / APDP y formato de comunicación a vecinos afectados si existe alto riesgo.',
    structurePreview: [
      'Fase 1: Detección temprana y aislamiento técnico (Horas 0 a 12)',
      'Fase 2: Evaluación de impacto en datos sensibles (Horas 12 a 24)',
      'Fase 3: Formato oficial de notificación legal ante APDP y ANCI (Horas 24 a 72)',
      'Fase 4: Pauta de comunicación preventiva a vecinos afectados'
    ]
  },
  {
    id: 'kit-matriz-rat',
    code: 'KIT-04',
    title: 'Matriz Parametrizada: Registro de Actividades de Tratamiento (RAT)',
    subtitle: 'Inventario estructurado pre-configurado con los 20 trámites municipales más comunes',
    targetRole: 'SECPLA / Informática / Secretaría Municipal / Todas las Direcciones',
    effortToImplement: 'Planilla lista para validación con directores de área',
    legalBasis: 'Art. 23 Ley N° 21.719',
    fileFormat: 'XLSX Parametrizado',
    description: 'Estructura estándar de RAT recomendada para municipios. Viene pre-configurada con los tratamientos más habituales de DIDECO (RSH, subsidios), Tránsito (licencias, permisos), Rentas (patentes comerciales), Salud (fichas clínicas) y Seguridad (cámaras de televigilancia), con sus respectivas bases legales bajo la Ley 18.695.',
    structurePreview: [
      'Identificación de dirección, responsable interno y sistema informático',
      'Mapeo de 20 trámites comunales típicos con base legal de licitud (LOCM 18.695)',
      'Categorización de datos generales vs sensibles (Salud / RSH / Menores)',
      'Destinatarios, transferencias interinstitucionales y plazos de conservación',
      'Matriz de controles y medidas de seguridad técnicas aplicadas'
    ]
  },
  {
    id: 'kit-formulario-arcop',
    code: 'KIT-05',
    title: 'Formulario y Procedimiento Ciudadano ARCOP+P para OIRS',
    subtitle: 'Ventanilla formal de ejercicio de derechos con control de 30 días',
    targetRole: 'OIRS / Oficina de Partes / Transparencia / Jurídico',
    effortToImplement: 'Habilitable en mesones de atención y portal web',
    legalBasis: 'Arts. 5 a 12 Ley N° 21.719',
    fileFormat: 'DOCX Visado',
    description: 'Formulario oficial de ingreso de solicitudes ciudadanas (Acceso, Rectificación, Supresión, Oposición, Portabilidad). Incluye comprobante de recepción con fecha/hora para cómputo de plazos y modelo de resolución para derivación interna y respuesta fundada.',
    structurePreview: [
      'Formulario unificado con identificación del titular y derecho invocado',
      'Talón desprendible con timbre de ingreso y cómputo de 30 días corridos',
      'Flujograma interno de derivación entre OIRS, Jurídico y áreas operativas',
      'Modelos de resoluciones de respuesta (Acoge / Deniega fundadamente)'
    ]
  },
  {
    id: 'kit-tdr-compra-agil',
    code: 'KIT-06',
    title: 'Términos de Referencia Oficiales: Compra Ágil en Mercado Público (< 100 UTM)',
    subtitle: 'Bases técnicas simplificadas listas para subir a Mercado Público y contratar consultoría en 48 horas',
    targetRole: 'Administrador Municipal / SECPLA / Jurídico / DAF',
    effortToImplement: 'Subir a Mercado Público en 15 minutos',
    legalBasis: 'Ley N° 19.886 y Ley N° 21.634 (Nueva Ley de Compras Públicas < 100 UTM)',
    fileFormat: 'DOCX Visado',
    description: 'Bases y Términos de Referencia (TDR) prediseñados para que el municipio pueda contratar mediante Compra Ágil (hasta 100 UTM / ~$6.800.000 CLP) el servicio integral de puesta al día, levantamiento del RAT, redacción de decretos y capacitación funcionaria con prioridad legal para Empresas de Menor Tamaño (EMT).',
    structurePreview: [
      'Definición del requerimiento bajo modalidad Compra Ágil (< 100 UTM)',
      'Detalle de los 5 entregables contractuales obligatorios para recepción conforme',
      'Plazo de ejecución perentorio de 30 días corridos',
      'Perfil y requisitos de idoneidad del consultor especializado',
      'Condiciones de pago contra informe de conformidad de Administrador/Jurídico'
    ]
  },
  {
    id: 'kit-tdr-honorarios-hsa',
    code: 'KIT-07',
    title: 'Términos de Referencia: Contratación a Honorarios a Suma Alzada (Art. 4° Ley 18.883)',
    subtitle: 'Bases técnicas para Decreto Alcaldicio de Honorarios por Cometido Específico con valorización desglosada',
    targetRole: 'Alcaldía / Administrador Municipal / Jurídico / DAF',
    effortToImplement: 'Listo para visación jurídica y Decreto Alcaldicio',
    legalBasis: 'Artículo 4° de la Ley N° 18.883 (Estatuto Administrativo Municipal) / Ley N° 21.719',
    fileFormat: 'DOCX Visado',
    description: 'Términos de referencia formalizados para contratar la consultoría experta de puesta al día mediante honorarios a suma alzada. Incluye fundamentación jurídica CGR sobre cometido accidental no habitual y calendario de pagos valorizado en 3 hitos (65 UTM / ~$4.400.000 CLP bruto).',
    structurePreview: [
      'Justificación jurídica del cometido accidental y transitorio (Ley 21.719 / CGR)',
      'Objetivos, alcance en 30 días y 5 productos entregables',
      'Valorización presupuestaria: 65 UTM (~$4.400.000 CLP bruto)',
      'Calendario de 3 hitos de pago contra informe de conformidad técnica (30% / 40% / 30%)',
      'Cláusula de confidencialidad, propiedad intelectual y entrega en formatos abiertos'
    ]
  },
  {
    id: 'kit-convenio-secreto-rsh',
    code: 'KIT-08',
    title: 'Convenio de Deber de Secreto y Confidencialidad Funcional (DIDECO / RSH)',
    subtitle: 'Acuerdo individual obligatorio de reserva legal para personal con acceso a datos sociales sensibles',
    targetRole: 'DIDECO / Jurídico / Recursos Humanos',
    effortToImplement: 'Firma individual de funcionarios y personal a honorarios',
    legalBasis: 'Art. 7 y 16 bis Ley N° 21.719 / Ley N° 20.379 (RSH) / Dictámenes CGR D224N26',
    fileFormat: 'DOCX Visado',
    description: 'Convenio de confidencialidad estricta para asistentes sociales y personal administrativo que trata fichas del Registro Social de Hogares (RSH), subsidios y programas de infancia (OLN). Prohíbe la divulgación por WhatsApp, exportación a pendrives y traspaso a concejales sin habilitación legal.',
    structurePreview: [
      'Reconocimiento expreso de la naturaleza sensible de la información socioeconómica',
      'Catálogo de 5 prohibiciones específicas (WhatsApp, capturas, descargas en Excel local)',
      'Deber de reserva permanente e indefinido tras el cese de funciones',
      'Régimen de sanciones concurrentes (Sumario CGR, Destitución y Responsabilidad Civil/Penal)'
    ]
  },
  {
    id: 'kit-pauta-auditoria-cesfam',
    code: 'KIT-09',
    title: 'Pauta de Resguardo y Auditoría Clínica para Salud Municipal (CESFAM / APS)',
    subtitle: 'Checklist operativo para directores de salud comunal sobre ficha clínica y sistemas HIS',
    targetRole: 'Dirección de Salud (DISAM) / Directores de CESFAM / Informática Salud',
    effortToImplement: 'Checklist trimestral de verificación interna',
    legalBasis: 'Ley N° 20.584 / Art. 16 bis Ley N° 21.719 / Dictamen CGR N° 8.113/2020',
    fileFormat: 'DOCX Visado',
    description: 'Guía técnica y checklist de control de acceso para la ficha clínica electrónica (Rayén/Omesh/SIS-Salud), SOME y farmacia comunal. Asegura control de roles RBAC, trazabilidad de logs, prohibición de entrega de diagnósticos a autoridades comunales y regulación de biometría.',
    structurePreview: [
      'Matriz de control de acceso por roles clínicos (médico, enfermero, SOME, TENS)',
      'Protocolo de entrega de antecedentes a tribunales y fiscalía',
      'Checklist de contratos SaaS con proveedores de software médico (DPA y residencia de datos)',
      'Normativa de control de asistencia con alternativa no biométrica obligatoria'
    ]
  }
];

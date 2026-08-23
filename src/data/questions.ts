import type { Dimension, Question } from '../types';

export const DIMENSIONS: Dimension[] = [
  {
    id: 'gobernanza',
    code: 'DIM-1',
    title: '1. Gobernanza y Responsabilidades Institucionales',
    shortTitle: 'Gobernanza & Roles',
    description: 'Estructura de mando, definición de roles, responsables internos, políticas de privacidad, coordinación interdepartamental y capacitación funcionaria; DPO o delegado si el municipio decide establecerlo.',
    weight: 0.15,
    primaryRoles: ['Alcaldía', 'Administrador Municipal', 'Dirección Jurídica', 'Control']
  },
  {
    id: 'inventario_trazabilidad',
    code: 'DIM-2',
    title: '2. Inventario y Trazabilidad de Tratamientos',
    shortTitle: 'Inventario de Tratamientos',
    description: 'Mapeo de tratamientos por dirección municipal: datos tratados, finalidades, competencias habilitantes de la LOCM N° 18.695, licitud, destinatarios, plazos de conservación y deber de información.',
    weight: 0.15,
    primaryRoles: ['SECPLA', 'Informática / TI', 'Secretaría Municipal', 'Jurídico']
  },
  {
    id: 'derechos_personas',
    code: 'DIM-3',
    title: '3. Derechos de las Personas',
    shortTitle: 'Derechos de los Titulares',
    description: 'Capacidad operativa para recibir, derivar, tramitar y responder fundadamente solicitudes de Acceso, Rectificación, Supresión, Oposición, Portabilidad y Bloqueo en el plazo general de 30 días corridos (sujeto a prórroga legal).',
    weight: 0.15,
    primaryRoles: ['OIRS', 'Oficina de Partes', 'Unidad de Transparencia', 'Jurídico']
  },
  {
    id: 'seguridad_incidentes',
    code: 'DIM-4',
    title: '4. Seguridad de la Información y Gestión de Incidentes',
    shortTitle: 'Seguridad & Incidentes',
    description: 'Medidas de seguridad proporcionales al riesgo, controles de acceso (RBAC), respaldos, registros de actividad (logs), cifrado cuando corresponda y protocolos diferenciados de gestión y reporte ante el CSIRT/ANCI y la APDP.',
    weight: 0.15,
    primaryRoles: ['Dirección de Informática / TI', 'Administrador de Redes', 'Seguridad de la Información']
  },
  {
    id: 'datos_sensibles',
    code: 'DIM-5',
    title: '5. Datos Sensibles y Servicios Críticos Comunales',
    shortTitle: 'Salud & Desarrollo Social',
    description: 'Regímenes especiales y medidas reforzadas en Fichas Clínicas (Ley 20.584), Registro Social de Hogares (Ley 19.949 / DS 160 / DS 22) y protección de niñas, niños y adolescentes.',
    weight: 0.15,
    primaryRoles: ['Salud Municipal (DISAM/CESFAM)', 'DIDECO', 'Oficina de la Niñez']
  },
  {
    id: 'proveedores_encargados',
    code: 'DIM-6',
    title: '6. Proveedores y Encargados de Tratamiento',
    shortTitle: 'Proveedores & Contratos',
    description: 'Controles contractuales para proveedores de software (SaaS, ERP, nube), cláusulas de encargado de tratamiento (DPA), subcontratación y acuerdos de devolución/destrucción al término del servicio.',
    weight: 0.10,
    primaryRoles: ['DAF / Adquisiciones', 'SECPLA', 'Informática / TI', 'Jurídico']
  },
  {
    id: 'alto_riesgo_eipd',
    code: 'DIM-7',
    title: '7. Tratamientos de Alto Riesgo y Evaluación de Impacto (EIPD)',
    shortTitle: 'Alto Riesgo & EIPD',
    description: 'Identificación y evaluación previa de tratamientos de alto riesgo: videovigilancia, monitoreo sistemático de espacios públicos, lectores de patentes (LPR), biometría y decisiones automatizadas.',
    weight: 0.15,
    primaryRoles: ['Seguridad Pública', 'Dirección Jurídica', 'Informática / TI', 'Administración Municipal']
  }
];

export const QUESTIONS: Question[] = [
  // ==========================================
  // DIMENSIÓN 1: GOBERNANZA Y RESPONSABILIDADES
  // ==========================================
  {
    id: 'GOB-01',
    dimensionId: 'gobernanza',
    subdimension: 'Liderazgo y Estructura Organizativa',
    code: 'GOB-01',
    criterio: 'Formalización de Responsabilidades Institucionales y/o Delegado',
    pregunta: '¿Ha formalizado la municipalidad los roles y responsabilidades internas para la gestión de protección de datos (mediante decreto o acto administrativo), incluyendo la designación de un delegado si el municipio decide adoptar dicha figura?',
    explicacion: 'La Ley 21.719 promueve modelos de gobernanza y rendición de cuentas (accountability). El responsable puede designar a un delegado de protección de datos (facultad legal) o estructurar un equipo interno con facultades claras para coordinar a las direcciones municipales.',
    clasificacion: 'RECOMENDACION_DE_GESTION',
    fundamento: 'Principio de Responsabilidad Proactiva (Art. 14 Ley N° 21.719) y Art. 48 sobre modelos de cumplimiento y delegados de protección de datos.',
    criticidad: 'CRITICA',
    responsableSugerido: 'Alcaldía / Administrador Municipal / Dirección Jurídica',
    departamento: 'ALCALDIA_JURIDICO',
    evidenciaEsperada: [
      'Decreto Alcaldicio o resolución que formaliza roles de protección de datos',
      'Acto de designación de Delegado (DPO) si se adopta el modelo',
      'Manual de organización o funciones actualizado'
    ],
    legal: {
      tipo: 'RECOMENDACION_DE_GESTION',
      norma: 'Ley N° 21.719',
      articulo: 'Arts. 14 y 48',
      organismo: 'Agencia de Protección de Datos Personales (APDP)',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'La ley dispone que el responsable podrá designar un delegado; no constituye una obligación legal universal para todas las municipalidades.'
    }
  },
  {
    id: 'GOB-02',
    dimensionId: 'gobernanza',
    subdimension: 'Políticas y Reglamentación Interna',
    code: 'GOB-02',
    criterio: 'Política y Lineamientos Internos de Protección de Datos',
    pregunta: '¿Dispone la municipalidad de una política o lineamientos formales de protección de datos personales aprobados por la autoridad y difundidos a los equipos directivos y funcionarios?',
    explicacion: 'La política interna constituye un instrumento de gestión y evidencia para establecer pautas claras de recolección, confidencialidad, uso legítimo y plazos de conservación en todas las dependencias municipales.',
    clasificacion: 'RECOMENDACION_DE_GESTION',
    fundamento: 'Deber de transparencia y principio de lealtad en el tratamiento (Art. 14 Ley N° 21.719).',
    criticidad: 'ALTA',
    responsableSugerido: 'Dirección Jurídica / Secretaría Municipal',
    departamento: 'ALCALDIA_JURIDICO',
    evidenciaEsperada: [
      'Decreto o resolución que aprueba los lineamientos de privacidad',
      'Publicación en el portal web municipal',
      'Registro de difusión a directores de área'
    ],
    legal: {
      tipo: 'RECOMENDACION_DE_GESTION',
      norma: 'Ley N° 21.719',
      articulo: 'Art. 14 y Art. 14 bis',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'El responsable debe acreditar la adopción de medidas eficaces de transparencia y cumplimiento.'
    }
  },
  {
    id: 'GOB-03',
    dimensionId: 'gobernanza',
    subdimension: 'Capacitación y Cultura Funcionaria',
    code: 'GOB-03',
    criterio: 'Programa de Formación en Deber de Secreto y Protección de Datos',
    pregunta: '¿Se han ejecutado acciones de capacitación para funcionarios (planta, contrata y honorarios) sobre el deber de secreto estatutario y las obligaciones de protección de datos personales?',
    explicacion: 'El factor humano es clave en la prevención de filtraciones y accesos no autorizados. Los funcionarios deben conocer sus obligaciones de secreto estatutario y las responsabilidades administrativas aplicables.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Deber estatutario de secreto (Art. 58 letra h Ley N° 18.883) y Título IV de la Ley N° 21.719 (Responsabilidad de Órganos Públicos).',
    criticidad: 'ALTA',
    responsableSugerido: 'Recursos Humanos / Capacitación Municipal',
    departamento: 'ALCALDIA_JURIDICO',
    evidenciaEsperada: [
      'Plan Anual de Capacitación Municipal ejecutado',
      'Registros de asistencia y evaluaciones de talleres',
      'Material informativo o pauta de deber de secreto entregada'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 18.883 / Ley N° 21.719',
      articulo: 'Art. 58 letra h) Ley 18.883 y Título IV Ley 21.719',
      organismo: 'Contraloría General de la República (CGR)',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: 'Vigente / 2026-12-01',
      notaInterpretativa: 'Obligación funcionaria de guardar reserva de los asuntos de que tome conocimiento por razón de su cargo.'
    }
  },

  // ==========================================
  // DIMENSIÓN 2: INVENTARIO Y TRAZABILIDAD
  // ==========================================
  {
    id: 'RAT-01',
    dimensionId: 'inventario_trazabilidad',
    subdimension: 'Mapeo de Tratamientos Institucionales',
    code: 'RAT-01',
    criterio: 'Inventario y Mapeo de Actividades de Tratamiento (Formato RAT)',
    pregunta: '¿Cuenta el municipio con un inventario o matriz que identifique los tratamientos de datos personales realizados por cada dirección, sus finalidades, sistemas y responsables?',
    explicacion: 'Mantener un inventario estructurado (metodología RAT) es una herramienta de gestión y accountability esencial para conocer qué datos se tratan, en qué sistemas residen y con qué terceros se comparten.',
    clasificacion: 'PRACTICA_DE_GESTION',
    fundamento: 'Principio de Responsabilidad Proactiva y Deber de Seguridad (Art. 14 Ley N° 21.719).',
    criticidad: 'CRITICA',
    responsableSugerido: 'SECPLA / Dirección de Informática / Secretaría Municipal',
    departamento: 'SECPLA_TI',
    evidenciaEsperada: [
      'Matriz de inventario de tratamientos consolidada (Formato RAT)',
      'Fichas de levantamiento de datos por dirección municipal',
      'Catálogo de sistemas y bases de datos en producción'
    ],
    legal: {
      tipo: 'PRACTICA_DE_GESTION',
      norma: 'Ley N° 21.719',
      articulo: 'Art. 14 (Responsabilidad Proactiva)',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'El inventario es un instrumento metodológico de gestión para acreditar el control de los tratamientos.'
    }
  },
  {
    id: 'RAT-02',
    dimensionId: 'inventario_trazabilidad',
    subdimension: 'Competencia y Base de Licitud',
    code: 'RAT-02',
    criterio: 'Análisis de Licitud y Competencias Habilitantes (LOCM N° 18.695)',
    pregunta: '¿Se encuentran identificadas las competencias legales específicas (de la LOCM N° 18.695 u otras normas sectoriales) que sustentan el tratamiento de datos en los trámites comunales?',
    explicacion: 'Conforme al régimen de la Ley 19.628 reformada, los órganos públicos pueden tratar datos personales lícitamente en el ejercicio de sus competencias legales.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Regla de tratamiento por órganos públicos dentro de sus competencias (Art. 13 Ley N° 19.628 reformada y Ley N° 18.695).',
    criticidad: 'ALTA',
    responsableSugerido: 'Dirección Jurídica',
    departamento: 'ALCALDIA_JURIDICO',
    evidenciaEsperada: [
      'Informe jurídico de competencias habilitantes por servicio',
      'Matriz de sustento legal de formularios y sistemas',
      'Mecanismos de consentimiento en actividades no comprendidas en competencias legales'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada) / Ley N° 18.695',
      articulo: 'Art. 13 Ley 19.628 reformada y Arts. 3, 4 y 5 Ley 18.695',
      organismo: 'APDP / CGR',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=141599&idVersion=2026-12-01',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'El tratamiento por órganos públicos es lícito cuando se efectúa en el ejercicio de sus competencias.'
    }
  },
  {
    id: 'RAT-03',
    dimensionId: 'inventario_trazabilidad',
    subdimension: 'Transparencia e Información Ciudadana',
    code: 'RAT-03',
    criterio: 'Avisos de Privacidad e Información en Puntos de Captura',
    pregunta: '¿Los formularios físicos y digitales de atención comunal (patentes, subsidios, audiencias) informan con claridad la finalidad de la recolección y las vías para ejercer derechos?',
    explicacion: 'El deber de información exige poner a disposición del titular información concisa y transparente sobre la finalidad del tratamiento y los canales habilitados para ejercer sus derechos.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Deber de información al titular (Art. 14 Ley N° 21.719).',
    criticidad: 'ALTA',
    responsableSugerido: 'OIRS / Comunicaciones / Informática',
    departamento: 'OIRS_TRANSPARENCIA',
    evidenciaEsperada: [
      'Cláusulas informativas al pie de formularios impresos',
      'Avisos de privacidad en trámites web municipales',
      'Cartelería informativa en mesones OIRS'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 21.719',
      articulo: 'Art. 14',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Deber de poner a disposición del titular información concisa, transparente e inteligible.'
    }
  },

  // ==========================================
  // DIMENSIÓN 3: DERECHOS DE LAS PERSONAS
  // ==========================================
  {
    id: 'ARC-01',
    dimensionId: 'derechos_personas',
    subdimension: 'Recepción y Tramitación de Solicitudes',
    code: 'ARC-01',
    criterio: 'Canales y Procedimiento para Ejercicio de Derechos de los Titulares',
    pregunta: '¿Cuenta el municipio con canales y un procedimiento formal para recibir, registrar y derivar solicitudes de acceso, rectificación, supresión, oposición, portabilidad y bloqueo?',
    explicacion: 'La ley reconoce a las personas el derecho a solicitar información sobre sus datos, rectificar inexactitudes o pedir su supresión cuando proceda legalmente.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Catálogo de derechos de los titulares (Arts. 5 a 11 Ley N° 19.628 reformada por Ley 21.719).',
    criticidad: 'CRITICA',
    responsableSugerido: 'OIRS / Oficina de Partes / Dirección Jurídica',
    departamento: 'OIRS_TRANSPARENCIA',
    evidenciaEsperada: [
      'Formulario de solicitud de derechos habilitado en mesón y web',
      'Procedimiento interno de derivación y trazabilidad de expedientes',
      'Registro de solicitudes ingresadas y estados de respuesta'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada)',
      articulo: 'Arts. 5, 6, 7, 8, 9, 10 y 11',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=141599&idVersion=2026-12-01',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'La ley fija los derechos y plazos; los canales específicos (OIRS, web) son opciones de implementación municipal.'
    }
  },
  {
    id: 'ARC-02',
    dimensionId: 'derechos_personas',
    subdimension: 'Plazos de Respuesta y Prórroga',
    code: 'ARC-02',
    criterio: 'Control del Plazo Legal General de 30 Días Corridos y Prórrogas',
    pregunta: '¿Dispone la municipalidad de un sistema de control para responder fundadamente las solicitudes dentro del plazo general de 30 días corridos, gestionando la prórroga legal cuando resulte procedente?',
    explicacion: 'El responsable debe pronunciarse en el plazo general de 30 días corridos, el cual puede prorrogarse fundadamente una vez, por hasta otros 30 días corridos, conforme a las causales legales aplicables.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Procedimiento y plazos para el ejercicio de derechos (Art. 12 Ley N° 19.628 reformada).',
    criticidad: 'CRITICA',
    responsableSugerido: 'Secretaría Municipal / Oficina de Partes / Jurídico',
    departamento: 'ALCALDIA_JURIDICO',
    evidenciaEsperada: [
      'Sistema o planilla de seguimiento con cómputo de 30 días corridos',
      'Plantillas de resolución fundadas (Acoge / Deniega / Prórroga legal)',
      'Registro de notificaciones formales a solicitantes'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada)',
      articulo: 'Art. 12',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=141599&idVersion=2026-12-01',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Plazo legal general de 30 días corridos, prorrogable una vez por hasta otros 30 días corridos conforme a la ley.'
    }
  },
  {
    id: 'ARC-03',
    dimensionId: 'derechos_personas',
    subdimension: 'Transparencia y Principio de Divisibilidad',
    code: 'ARC-03',
    criterio: 'Anonimización y Tarjado de Datos en Solicitudes de Transparencia (SAI)',
    pregunta: '¿Aplica la Unidad de Transparencia y Jurídico pautas rigurosas de anonimización y tarjado de datos personales y sensibles antes de entregar documentos públicos requeridos por terceros?',
    explicacion: 'En las solicitudes de acceso a la información pública (Ley 20.285), debe aplicarse el principio de divisibilidad para proteger los datos personales y sensibles de vecinos o funcionarios.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Principio de divisibilidad (Art. 11 letra e Ley N° 20.285), causal de reserva (Art. 21) e Instrucciones del CPLT.',
    criticidad: 'ALTA',
    responsableSugerido: 'Unidad de Transparencia / Dirección Jurídica',
    departamento: 'OIRS_TRANSPARENCIA',
    evidenciaEsperada: [
      'Pauta interna de tarjado documental de datos personales y sensibles',
      'Resoluciones que aplican el principio de divisibilidad',
      'Herramientas o mecanismos técnicos de tarjado irreversible'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 20.285 / Instrucciones CPLT',
      articulo: 'Art. 11 letra e) y Art. 21 Ley 20.285',
      organismo: 'Consejo para la Transparencia (CPLT) / CGR',
      urlOficial: 'https://www.bcn.cl/leychile/navegar?idNorma=1221720',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: 'Vigente',
      notaInterpretativa: 'Distingue causales de reserva, principio de divisibilidad e instrucciones vigentes del CPLT.'
    }
  },

  // ==========================================
  // DIMENSIÓN 4: SEGURIDAD Y GESTIÓN DE INCIDENTES
  // ==========================================
  {
    id: 'SEG-01',
    dimensionId: 'seguridad_incidentes',
    subdimension: 'Control de Accesos y Privilegios',
    code: 'SEG-01',
    criterio: 'Controles de Acceso Basados en Rol (RBAC) y Gestión de Cuentas',
    pregunta: '¿Se restringe el acceso a bases de datos y carpetas municipales según el principio de privilegio mínimo (RBAC), con deshabilitación oportuna al cesar funciones de un empleado o prestador?',
    explicacion: 'Las medidas técnicas deben ser proporcionales al riesgo para evitar accesos no autorizados y permitir la individualización de responsabilidades.',
    clasificacion: 'CONTROL_TECNICO_RECOMENDADO',
    fundamento: 'Principio de Seguridad (Art. 14 Ley N° 21.719) y Art. 8 Ley N° 21.663 de Ciberseguridad.',
    criticidad: 'CRITICA',
    responsableSugerido: 'Dirección de Informática / TI',
    departamento: 'SECPLA_TI',
    evidenciaEsperada: [
      'Matriz de perfiles de usuario según rol y funciones',
      'Procedimiento coordinado de baja de cuentas con Recursos Humanos',
      'Registros de auditoría de autenticación y doble factor (MFA) en sistemas centrales'
    ],
    legal: {
      tipo: 'CONTROL_TECNICO_RECOMENDADO',
      norma: 'Ley N° 21.719 / Ley N° 21.663',
      articulo: 'Art. 14 Ley 21.719 y Art. 8 Ley 21.663',
      organismo: 'ANCI / APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Control técnico de seguridad basado en el análisis de riesgo institucional.'
    }
  },
  {
    id: 'SEG-02',
    dimensionId: 'seguridad_incidentes',
    subdimension: 'Gestión y Reporte de Incidentes de Ciberseguridad',
    code: 'SEG-02',
    criterio: 'Protocolo de Notificación de Incidentes de Ciberseguridad (CSIRT Nacional / ANCI)',
    pregunta: '¿Cuenta el municipio con un protocolo para detectar, contener y reportar incidentes de ciberseguridad significativos al CSIRT Nacional conforme al esquema escalonado de la Ley N° 21.663 (alerta temprana en 3 h, segundo reporte en 72 h e informe en 15 días)?',
    explicacion: 'La Ley Marco de Ciberseguridad (21.663) y su reglamento DS 295 obligan a los órganos públicos a reportar incidentes significativos ante la autoridad de ciberseguridad en plazos específicos.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Art. 11 Ley N° 21.663 y Reglamento de Notificación de Incidentes DS N° 295.',
    criticidad: 'CRITICA',
    responsableSugerido: 'Dirección de Informática / TI / Seguridad de la Información',
    departamento: 'SECPLA_TI',
    evidenciaEsperada: [
      'Protocolo formal de notificación de incidentes de ciberseguridad',
      'Puntos de contacto y enlaces designados ante el CSIRT Nacional',
      'Registros de simulacros o reportes de incidentes'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 21.663 / DS N° 295',
      articulo: 'Art. 11 Ley 21.663 y DS N° 295',
      organismo: 'Agencia Nacional de Ciberseguridad (ANCI) / CSIRT',
      urlOficial: 'https://www.bcn.cl/leychile/navegar?idNorma=1211466',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: 'Vigente',
      notaInterpretativa: 'Régimen de reporte de ciberseguridad: alerta temprana (3 h), segundo reporte (72 h) e informe final (15 días corridos).'
    }
  },
  {
    id: 'SEG-03',
    dimensionId: 'seguridad_incidentes',
    subdimension: 'Vulneraciones a la Protección de Datos',
    code: 'SEG-03',
    criterio: 'Comunicación de Vulneraciones de Datos Personales (APDP)',
    pregunta: '¿Existe un procedimiento para identificar vulneraciones de seguridad que afecten datos personales y comunicarlas a la Agencia (APDP) sin dilaciones indebidas, así como a los titulares cuando exista alto riesgo?',
    explicacion: 'En materia de protección de datos, la Ley 19.628 reformada establece la obligación de comunicar a la autoridad competente las vulneraciones de seguridad que afecten derechos de las personas sin dilaciones indebidas.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Obligación de comunicación de vulneraciones de seguridad de datos personales (Art. 27 Ley N° 19.628 reformada por Ley 21.719).',
    criticidad: 'ALTA',
    responsableSugerido: 'Dirección Jurídica / Informática / Responsable de Datos',
    departamento: 'SECPLA_TI',
    evidenciaEsperada: [
      'Procedimiento interno de gestión de brechas de datos personales',
      'Pauta de evaluación de riesgo para los derechos de los titulares',
      'Modelos de aviso a la APDP y comunicación a vecinos afectados'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada por Ley 21.719)',
      articulo: 'Art. 27 Ley 19.628 reformada',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'La ley exige comunicar determinadas vulneraciones de datos sin dilaciones indebidas (régimen diferenciado de ANCI).'
    }
  },

  // ==========================================
  // DIMENSIÓN 5: DATOS SENSIBLES Y SERVICIOS CRÍTICOS
  // ==========================================
  {
    id: 'ESP-01',
    dimensionId: 'datos_sensibles',
    subdimension: 'Salud Primaria (CESFAM / CECOSF)',
    code: 'ESP-01',
    criterio: 'Régimen Especial de Reserva y Acceso a Fichas Clínicas',
    pregunta: '¿Los sistemas y centros de salud municipal (CESFAM/CECOSF) aplican las reglas especiales de reserva de la Ley N° 20.584, restringiendo el acceso a terceros no vinculados con la atención de salud?',
    explicacion: 'La ficha clínica está sometida a un régimen legal estricto de reserva. Deben evaluarse perfiles de acceso, justificación de consultas y medidas de seguridad conformes a la normativa sanitaria.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Reserva legal de la ficha clínica (Arts. 12 y 13 Ley N° 20.584) y datos sensibles de salud (Ley N° 21.719).',
    criticidad: 'CRITICA',
    responsableSugerido: 'Dirección de Salud Municipal (DISAM) / Directores CESFAM',
    departamento: 'SALUD_CESFAM',
    conditionalCategory: 'SALUD_CESFAM',
    evidenciaEsperada: [
      'Perfiles de acceso configurados según rol asistencial',
      'Convenios de confidencialidad y secreto médico firmados por el personal',
      'Pautas de entrega de información ante requerimientos judiciales'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 20.584 / Ley N° 21.719',
      articulo: 'Arts. 12 y 13 Ley 20.584',
      organismo: 'Superintendencia de Salud / CGR',
      urlOficial: 'https://www.bcn.cl/leychile/navegar?idNorma=1039348',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: 'Vigente',
      notaInterpretativa: 'El acceso de terceros no vinculados con la atención médica está legalmente restringido.'
    }
  },
  {
    id: 'ESP-02',
    dimensionId: 'datos_sensibles',
    subdimension: 'Desarrollo Comunitario (DIDECO)',
    code: 'ESP-02',
    criterio: 'Confidencialidad de Antecedentes del Registro Social de Hogares (RSH)',
    pregunta: '¿Aplica la DIDECO medidas de confidencialidad y control sobre los antecedentes del Registro Social de Hogares conforme a su marco regulatorio de acceso, uso y convenios?',
    explicacion: 'La información socioeconómica de los hogares gestionada por la DIDECO está sujeta a deber de secreto y convenios específicos que prohíben su uso para fines no autorizados.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Art. 6 Ley N° 19.949, DS N° 160 (Registro de Información Social) y DS N° 22 (RSH).',
    criticidad: 'CRITICA',
    responsableSugerido: 'Dirección de Desarrollo Comunitario (DIDECO)',
    departamento: 'DIDECO_SOCIAL',
    evidenciaEsperada: [
      'Compromisos de confidencialidad RSH suscritos por el personal',
      'Procedimiento de asignación de ayudas sociales paliativas',
      'Convenios de transferencia de datos con el Ministerio de Desarrollo Social'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.949 / DS N° 160 / DS N° 22',
      articulo: 'Art. 6 Ley 19.949 y DS N° 160',
      organismo: 'Ministerio de Desarrollo Social y Familia (MDSF)',
      urlOficial: 'https://www.bcn.cl/leychile/navegar?idNorma=268571',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: 'Vigente',
      notaInterpretativa: 'Deber de secreto funcionaria y reserva de datos del Registro de Información Social.'
    }
  },
  {
    id: 'ESP-03',
    dimensionId: 'datos_sensibles',
    subdimension: 'Infancia y Adolescencia',
    code: 'ESP-03',
    criterio: 'Protección de Datos de Niñas, Niños y Adolescentes',
    pregunta: '¿Existen directrices específicas para el resguardo de datos psicosociales e imágenes de menores de edad en programas de infancia (OLN, jardines VTF, talleres)?',
    explicacion: 'El principio del interés superior de la niñez exige cuidados reforzados en el tratamiento de datos y difusión de imágenes de menores en redes y actividades municipales.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Ley N° 21.430 sobre Garantías y Protección Integral de los Derechos de la Niñez y Ley N° 21.719.',
    criticidad: 'ALTA',
    responsableSugerido: 'DIDECO / Oficina Local de la Niñez (OLN)',
    departamento: 'DIDECO_SOCIAL',
    conditionalCategory: 'DIDECO_INFANCIA',
    evidenciaEsperada: [
      'Protocolo de resguardo de informes psicosociales de menores',
      'Formatos de autorización de apoderados para registro fotográfico',
      'Instrucciones a unidades de comunicaciones'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 21.430 / Ley N° 21.719',
      articulo: 'Arts. 33 y 34 Ley 21.430',
      organismo: 'APDP / Subsecretaría de la Niñez',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Protección reforzada de la privacidad e intimidad de niños, niñas y adolescentes.'
    }
  },

  // ==========================================
  // DIMENSIÓN 6: PROVEEDORES Y ENCARGADOS
  // ==========================================
  {
    id: 'COM-01',
    dimensionId: 'proveedores_encargados',
    subdimension: 'Contratos con Proveedores Tecnológicos',
    code: 'COM-01',
    criterio: 'Cláusulas de Encargado de Tratamiento (DPA) en Contratos y Licitaciones',
    pregunta: '¿Se incorporan cláusulas que regulen las obligaciones de los proveedores de software o servicios que tratan datos por cuenta del municipio (prohibición de uso secundario, seguridad y restitución)?',
    explicacion: 'Cuando un tercero provee software o soporte tratando datos por cuenta del municipio, la relación debe regularse contractualmente para exigir medidas de seguridad y prohibir usos no autorizados.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Relación entre responsable y encargado de tratamiento (Art. 25 Ley N° 19.628 reformada por Ley 21.719).',
    criticidad: 'CRITICA',
    responsableSugerido: 'DAF / Adquisiciones / Dirección Jurídica / SECPLA',
    departamento: 'DAF_ADQUISICIONES',
    conditionalCategory: 'SOFTWARE_TERCERIZADO',
    evidenciaEsperada: [
      'Modelos de cláusulas de encargado de tratamiento en bases de licitación',
      'Contratos de software suscritos con estipulaciones de privacidad',
      'Convenios de confidencialidad con empresas de soporte'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada)',
      articulo: 'Art. 25',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'El tratamiento por cuenta de un responsable debe estar regulado contractualmente.'
    }
  },
  {
    id: 'COM-02',
    dimensionId: 'proveedores_encargados',
    subdimension: 'Término de Servicios y Destino de Datos',
    code: 'COM-02',
    criterio: 'Acuerdos de Devolución y Eliminación de Datos al Término del Contrato',
    pregunta: '¿Establecen los contratos con empresas de software la obligación de devolver los datos en formato estructurado y certificar la eliminación segura de copias al finalizar el servicio?',
    explicacion: 'Asegura que el proveedor saliente no conserve antecedentes comunales y previene el bloqueo o retención indebida de bases de datos.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Obligaciones del encargado de tratamiento al término del servicio (Art. 25 letra g Ley N° 19.628 reformada).',
    criticidad: 'ALTA',
    responsableSugerido: 'Dirección Jurídica / Informática / Adquisiciones',
    departamento: 'DAF_ADQUISICIONES',
    conditionalCategory: 'SOFTWARE_TERCERIZADO',
    evidenciaEsperada: [
      'Cláusula contractual de devolución en formato estándar y acta de borrado',
      'Actas de recepción final de contratos con acreditación de devolución',
      'Procedimiento de transición de proveedores tecnológicos'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada)',
      articulo: 'Art. 25 letra g)',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Obligación del encargado de suprimir o devolver los datos personales tras finalizar la prestación.'
    }
  },

  // ==========================================
  // DIMENSIÓN 7: ALTO RIESGO Y EVALUACIÓN DE IMPACTO (EIPD)
  // ==========================================
  {
    id: 'EIP-01',
    dimensionId: 'alto_riesgo_eipd',
    subdimension: 'Videovigilancia y Espacios Públicos',
    code: 'EIP-01',
    criterio: 'Evaluación de Impacto en Monitoreo Sistemático y Videovigilancia (CCTV / LPR)',
    pregunta: '¿Ha evaluado el municipio los riesgos y la proporcionalidad en la operación de cámaras de televigilancia, drones o lectores de patentes (LPR), regulando su entrega a fiscalía/policías y evitando captar recintos privados?',
    explicacion: 'La Ley 21.719 contempla la evaluación de impacto en protección de datos (EIPD) para tratamientos que presenten alto riesgo, incluyendo expresamente el monitoreo sistemático a gran escala de zonas de acceso público.',
    clasificacion: 'OBLIGACION_LEGAL',
    fundamento: 'Evaluación de Impacto en Protección de Datos en tratamientos de alto riesgo (Art. 26 Ley N° 19.628 reformada por Ley 21.719).',
    criticidad: 'CRITICA',
    responsableSugerido: 'Dirección de Seguridad Pública / Jurídico / Informática',
    departamento: 'SEGURIDAD_PUBLICA',
    conditionalCategory: 'SEGURIDAD_CAMARAS',
    evidenciaEsperada: [
      'Evaluación de Impacto o informe de proporcionalidad de cámaras y lectores LPR',
      'Reglamento de funcionamiento de la Central de Televigilancia',
      'Registro de requerimientos de imágenes del Ministerio Público o Tribunales'
    ],
    legal: {
      tipo: 'OBLIGACION_LEGAL',
      norma: 'Ley N° 19.628 (reformada por Ley 21.719)',
      articulo: 'Art. 26 (Evaluación de Impacto)',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Exige EIPD cuando un tratamiento implique monitoreo sistemático de zonas de acceso público u otros supuestos de alto riesgo.'
    }
  },
  {
    id: 'EIP-02',
    dimensionId: 'alto_riesgo_eipd',
    subdimension: 'Tecnologías Emergentes y Decisiones Automatizadas',
    code: 'EIP-02',
    criterio: 'Análisis Preventivo en Biometría, Perfilamiento o Algoritmos',
    pregunta: '¿Dispone la municipalidad de un filtro o análisis previo para proyectos que utilicen biometría, perfilamiento de vecinos o decisiones automatizadas antes de su puesta en marcha?',
    explicacion: 'El uso de sistemas automatizados, IA o biometría para la asignación de cupos o subsidios requiere verificar previamente que no generen discriminaciones arbitrarias y cumplan con el principio de explicabilidad.',
    clasificacion: 'RECOMENDACION_DE_GESTION',
    fundamento: 'Principio de Privacidad desde el Diseño y Evaluación de Impacto (Arts. 14 y 26 Ley N° 21.719).',
    criticidad: 'ALTA',
    responsableSugerido: 'SECPLA / Informática / Dirección Jurídica',
    departamento: 'SECPLA_TI',
    evidenciaEsperada: [
      'Pauta o matriz de filtro preventivo de privacidad en nuevos proyectos',
      'Informes técnicos de explicabilidad algorítmica',
      'Registro de decisiones con intervención humana'
    ],
    legal: {
      tipo: 'RECOMENDACION_DE_GESTION',
      norma: 'Ley N° 21.719',
      articulo: 'Arts. 14 y 26',
      organismo: 'APDP',
      urlOficial: 'https://www.bcn.cl/leychile/Navegar?idNorma=1209272',
      fechaVerificacion: '2026-08-22',
      vigenciaDesde: '2026-12-01',
      notaInterpretativa: 'Mecanismo preventivo para verificar la procedencia de EIPD y medidas de mitigación.'
    }
  }
];

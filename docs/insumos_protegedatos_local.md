# INSUMOS DE CUMPLIMIENTO LEY N° 21.719 PARA GOBIERNOS LOCALES (CHILE)
## PLATAFORMA PROTEGEDATOSLOCAL — PAQUETE DE ACTIVACIÓN Y ADECUACIÓN ACELERADA
---
> **AVISO DE COMPATIBILIDAD CON AGENTES (AGENTE ANTIGRAVITY / DEVS):** Este documento ha sido diseñado con delimitadores semánticos estandarizados (`---BEGIN [CODIGO]---` y `---END [CODIGO]---`) y variables entre llaves dobles (ej. `{{MUNICIPIO_NOMBRE}}`) para permitir su parseo automatizado, inyección directa en bases de datos relacionales o estructuradas, o compilación directa en formatos imprimibles (DOCX/PDF).
---

## ÍNDICE DE INSTRUMENTOS INCLUIDOS:
1. **KIT-01 • DECRETO ALCALDICIO TIPO:** Nombramiento de Delegado de Protección de Datos (DPO) y Constitución del Comité de Privacidad Comunal.
2. **KIT-02 • ANEXO DPA TIPO (DATA PROCESSING AGREEMENT):** Cláusulas obligatorias de Encargado de Tratamiento (Art. 15 bis) para bases de licitación y contratación directa en Mercado Público.
3. **KIT-03 • PROTOCOLO DE NOTIFICACIÓN DE BRECHAS DE SEGURIDAD:** Flujograma de respuesta rápida y plantilla de reporte ante incidentes de seguridad (Art. 14 sexies).
4. **KIT-04 • CONVENIO DE DEBER DE SECRETO Y CONFIDENCIALIDAD:** Acuerdo obligatorio para funcionarios y operadores de bases de datos altamente sensibles (Registro Social de Hogares - DIDECO).
5. **KIT-05 • PAUTA DE RESGUARDO Y AUDITORÍA CLÍNICA (DISAM / CESFAM):** Checklist operativo e hipótesis de licitud bajo el estándar de protección reforzada del Art. 16 bis.
6. **MATRIZ RAT • ESQUEMA DE BASE DE DATOS (JSON/CSV):** Estructura técnica de datos para almacenar el Registro de Actividades de Tratamiento (RAT) por dirección municipal.

---

## 1. KIT-01 • DECRETO ALCALDICIO TIPO: NOMBRAMIENTO DE DPO Y COMITÉ DE PRIVACIDAD
*Formato compatible con visación jurídica municipal e inscripción en el Registro Nacional de Sanciones y Cumplimiento de la Agencia de Protección de Datos Personales (APDP).*

---BEGIN KIT-01---
**DECRETO ALCALDICIO EXENTO N° ___________/**

**{{MUNICIPIO_COMUNA}}, {{FECHA_DECRETO}}**

**VISTOS:** 
1. Lo dispuesto en la Constitución Política de la República, en particular en su artículo 19 N° 4, que garantiza a todas las personas el respeto y protección a la vida privada y a la honra de su persona y su familia, así como la protección de sus datos personales.
2. Lo establecido en la Ley N° 18.695, Orgánica Constitucional de Municipalidades, cuyo texto refundido, coordinado y sistematizado fue fijado por el D.F.L. N° 1 de 2006 del Ministerio del Interior, especialmente en sus artículos 1, 3, 5, 56 y 63.
3. Lo dispuesto en la Ley N° 18.575, Orgánica Constitucional de Bases Generales de la Administración del Estado, cuyo texto refundido, coordinado y sistematizado fue fijado por el D.F.L. N° 1/19.653 de 2000 del Ministerio Secretaría General de la Presidencia.
4. Las disposiciones de la Ley N° 19.628 sobre Protección de la Vida Privada, y sus modificaciones introducidas por la Ley N° 21.719, que regula la protección y el tratamiento de los datos personales y crea la Agencia de Protección de Datos Personales (APDP), con vigencia plena a partir del 1 de diciembre de 2026.
5. El Oficio Circular N° 711 de 11 de diciembre de 2023 del Ministerio de Ciencia, Tecnología, Conocimiento e Innovación, que establece lineamientos sobre privacidad, uso de datos y transparencia algorítmica para los órganos de la Administración del Estado.
6. La Resolución Exenta N° 372 de 12 de agosto de 2024 del Consejo para la Transparencia, que aprueba las Recomendaciones sobre Transparencia Algorítmica y Sistemas de Decisiones Automatizadas (SDA) aplicables a las Municipalidades.
7. Las facultades inherentes a mi cargo como Alcalde de la Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}.

**CONSIDERANDO:**
1. Que las Municipalidades, en tanto órganos del Estado, se encuentran plenamente sujetas a las disposiciones de la Ley N° 19.628 (modificada por la Ley N° 21.719), aplicándose sus exigencias y principios de licitud, lealtad, finalidad, proporcionalidad, seguridad, responsabilidad proactiva y confidencialidad al tratamiento de datos de vecinos, contribuyentes, usuarios y funcionarios que realizan sus distintas direcciones.
2. Que la Ley N° 21.719 introduce un nuevo estándar de cumplimiento demostrable (*accountability*), requiriendo de los órganos públicos la implementación de medidas organizativas, técnicas y jurídicas idóneas para evitar el tratamiento ilícito, la pérdida, filtración o acceso no autorizado a los datos de carácter personal que custodian.
3. Que, conforme al artículo 50 de la Ley N° 19.628 (texto reformado por la Ley N° 21.719), los responsables del tratamiento de datos personales podrán designar un Delegado de Protección de Datos (DPO), cuya función principal será supervisar de manera independiente el cumplimiento normativo interno, actuar como enlace oficial ante la Agencia de Protección de Datos Personales (APDP), atender las solicitudes y consultas de los titulares de datos, y asesorar a la administración municipal en la gestión de riesgos de privacidad.
4. Que, para asegurar la efectividad del Delegado de Protección de Datos, la máxima autoridad edilicia debe garantizar su autonomía funcional, dotarlo de los recursos técnicos, financieros y de personal necesarios para el ejercicio de su función, y asegurar que reporte directamente a la Alcaldía y al Administrador Municipal, evitando la asignación de tareas operativas que generen conflictos de interés (como la dirección directa del departamento de Tecnologías de la Información o auditorías de sus propios sistemas).
5. Que se hace indispensable formalizar una instancia de gobernanza transversal e interdepartamental que aborde de manera coordinada la transición jurídica y tecnológica del municipio hacia el nuevo régimen sancionatorio de la ley, el cual establece multas de hasta 10.000 UTM por infracciones graves y 20.000 UTM por infracciones gravísimas, aplicables según el régimen de responsabilidad de los órganos públicos.

**DECRETO:**

**ARTÍCULO PRIMERO:** **DESÍGNESE** a contar de la fecha del presente decreto al/a la funcionario/a **{{FUNCIONARIO_DPO_NOMBRE}}**, RUT **{{FUNCIONARIO_DPO_RUT}}**, de profesión **{{FUNCIONARIO_DPO_PROFESION}}**, quien se desempeña en la calidad jurídica de **{{FUNCIONARIO_DPO_CALIDAD}}** en la dirección de **{{FUNCIONARIO_DPO_DIRECCION}}**, como **Delegado de Protección de Datos (DPO)** de la Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}.

**ARTÍCULO SEGUNDO:** El Delegado de Protección de Datos (DPO) municipal ejercerá sus funciones con estricta **autonomía técnica y funcional**, no estando sujeto a instrucciones ni presiones jerárquicas directas en lo relativo a sus evaluaciones, auditorías o dictámenes sobre cumplimiento de la normativa de datos personales. Se le garantiza:
1. **Acceso Directo:** Comunicación y reporte directo con el/la Alcalde/sa y el/la Administrador/a Municipal.
2. **Independencia de Criterio:** Protección frente a cualquier remoción, sanción administrativa o represalia motivada exclusivamente por el ejercicio técnico y riguroso de sus funciones legales.
3. **Ausencia de Conflictos de Interés:** El DPO no podrá ejercer funciones directivas, de administración o de control operativo en áreas de tecnologías de la información (TI), informática, seguridad de la información, recursos humanos o bases de datos asistenciales.

**ARTÍCULO TERCERO:** Serán **funciones y deberes específicos** del Delegado de Protección de Datos:
1. **Supervisión y Auditoría:** Velar permanentemente por la aplicación y observancia de la Ley N° 19.628 (modificada por la Ley N° 21.719), las normas generales de la APDP y las políticas comunales de privacidad.
2. **Punto de Contacto con la APDP:** Actuar como enlace institucional exclusivo ante la Agencia de Protección de Datos Personales, respondiendo requerimientos y coordinando procesos de fiscalización o auditoría regulatoria.
3. **Atención de Derechos ARCOP:** Supervisar y visar las respuestas municipales ante solicitudes de ejercicio de derechos de Acceso, Rectificación, Cancelación/Supresión, Oposición, Portabilidad y Bloqueo temporal de los ciudadanos en los plazos legales (30 días corridos generales, y 2 días hábiles para bloqueo temporal).
4. **Evaluaciones de Impacto (EIPD):** Asesorar jurídicamente y coordinar técnicamente la realización de las Evaluaciones de Impacto en Protección de Datos Personales exigidas por el artículo 15 ter de la ley, especialmente ante proyectos de videovigilancia pública, biometría funcionaria o uso de sistemas inteligentes de seguridad comunal.
5. **Registro de Actividades de Tratamiento (RAT):** Mantener, auditar y actualizar al menos de forma semestral el Registro de Actividades de Tratamiento (RAT) del municipio, asegurando que cada base de datos cuente con una base de licitud documentada.

**ARTÍCULO CUARTO:** **CONSTITÚYASE** el **Comité de Privacidad y Seguridad de Datos Personales Comunal** de {{MUNICIPIO_NOMBRE}}, órgano colegiado de carácter consultivo y de coordinación estratégica que tendrá por misión dirigir la implementación del Modelo de Cumplimiento en Privacidad Municipal. Este comité estará integrado por los siguientes directores y jefaturas, o quienes les subroguen legalmente:
1. **El/La Administrador/a Municipal**, quien lo presidirá.
2. **El/La Delegado/a de Protección de Datos (DPO)**, quien actuará como secretario técnico.
3. **El/La Director/a de la Dirección Jurídica**.
4. **El/La Director/a de la Dirección de Informática / Tecnologías de la Información**.
5. **El/La Director/a de la Dirección de Desarrollo Comunitario (DIDECO)**.
6. **El/La Director/a de la Dirección de Salud Municipal (DISAM)**.
7. **El/La Director/a de la Dirección de Seguridad Pública**.

**ARTÍCULO QUINTO:** El Comité de Privacidad sesionará de manera ordinaria una vez cada dos meses, y de forma extraordinaria ante incidentes de ciberseguridad o brechas de datos que amenacen la integridad de la información comunal. El Comité tendrá las siguientes atribuciones:
1. Aprobar la Matriz de Riesgos de Datos Personales Municipal y monitorear los planes de tratamiento de riesgos de nivel "Muy Alto" y "Alto".
2. Revisar e instruir la inclusión obligatoria del Anexo DPA en todas las bases de licitación de software que impliquen tratamiento de datos personales de vecinos o funcionarios.
3. Coordinar las respuestas operativas de contención ante brechas de seguridad, ordenando las notificaciones oportunas a la APDP y a los titulares de datos según lo exigido por el artículo 14 sexies.
4. Definir las directrices de Transparencia Algorítmica aplicables a los sistemas automatizados del municipio (SDA), según las recomendaciones del Consejo para la Transparencia.

**ARTÍCULO SEXTO:** **ORDÉNASE** a todas las Direcciones, Departamentos y Unidades de la Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}} prestar la máxima colaboración, facilitar el acceso irrestricto a los registros físicos y lógicos, y entregar de manera oportuna la información que requiera el Delegado de Protección de Datos para el cumplimiento de las funciones encomendadas por la ley y el presente acto.

**ARTÍCULO SÉPTIMO:** **PUBLÍQUESE** el presente decreto exento en el Portal de Transparencia Activa de la Municipalidad, en la sección de "Actos y Resoluciones con efectos sobre terceros", y notifíquese formalmente a todos los directores y funcionarios municipales señalados para su debido conocimiento y cumplimiento.

**ANÓTESE, COMUNÍQUESE, NOTIFÍQUESE Y ARCHÍVESE.**



_________________________________                   _________________________________
**{{ALCALDE_NOMBRE}}**                               **{{SECRETARIO_MUNICIPAL_NOMBRE}}**
Alcalde/sa                                            Secretario/a Municipal
Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}        Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}

---END KIT-01---

---

## 2. KIT-02 • ANEXO DPA TIPO (DATA PROCESSING AGREEMENT) PARA MERCADO PÚBLICO
*Cláusulas obligatorias de Encargado de Tratamiento aplicables a bases de licitación o contratación directa en Mercado Público, redactadas conforme al Artículo 15 bis de la Ley N° 19.628 (texto reformado por Ley N° 21.719).*

---BEGIN KIT-02---
**ANEXO N° _____: CONVENIO DE ENCARGADO DE TRATAMIENTO DE DATOS PERSONALES (DATA PROCESSING AGREEMENT - DPA)**

Conste por el presente instrumento el Convenio de Encargado de Tratamiento de Datos Personales, que se celebra entre la **ILUSTRE MUNICIPALIDAD DE {{MUNICIPIO_NOMBRE}}**, RUT **{{MUNICIPIO_RUT}}**, representada para estos efectos por su Alcalde/sa don/ña **{{ALCALDE_NOMBRE}}**, con domicilio en **{{MUNICIPIO_DIRECCION}}**, comuna de {{MUNICIPIO_COMUNA}}, en adelante indistintamente "el Responsable" o "la Municipalidad"; y por la otra parte **{{PROVEEDOR_RAZON_SOCIAL}}**, RUT **{{PROVEEDOR_RUT}}**, representada por don/ña **{{PROVEEDOR_REPRESENTANTE}}**, cédula de identidad N° **{{PROVEEDOR_REPRESENTANTE_RUT}}**, ambos domiciliados para estos efectos en **{{PROVEEDOR_DIRECCION}}**, en adelante indistintamente "el Encargado" o "el Adjudicatario"; quienes han convenido lo siguiente:

**ANTECEDENTES:**
1. Que en el marco de la licitación pública/contratación directa denominada **"{{LICITACION_NOMBRE}}"**, ID **{{LICITACION_ID}}**, la Municipalidad ha contratado al Adjudicatario para la prestación del servicio de **"{{SERVICIO_DESCRIPCION}}"**, cuya ejecución requiere necesariamente que el Adjudicatario tenga acceso y realice operaciones de tratamiento de datos personales de titularidad de la Municipalidad (comunes y/o sensibles de vecinos, usuarios, pacientes o funcionarios).
2. Que el artículo 15 bis de la Ley N° 19.628 (modificada por la Ley N° 21.719) establece que la relación entre el Responsable del tratamiento (la Municipalidad) y el Encargado del tratamiento (el Adjudicatario) debe regularse formalmente mediante un contrato escrito, el cual debe fijar el objeto, la duración, la finalidad, las categorías de datos y las obligaciones de seguridad aplicables, respondiendo el Encargado de forma solidaria ante infracciones de la ley si actúa fuera de las instrucciones del Responsable.

**CLÁUSULAS:**

**PRIMERA: Objeto y Duración.** 
El presente Convenio tiene por objeto regular las obligaciones y responsabilidades que asume el Encargado respecto de la protección, confidencialidad y seguridad de los datos personales a los que tenga acceso o trate con ocasión de la ejecución del contrato principal de prestación de servicios de {{LICITACION_NOMBRE}}. La vigencia de este Convenio será idéntica y accesoria a la vigencia del contrato principal antes individualizado.

**SEGUNDA: Instrucciones del Responsable.**
El Encargado se obliga a realizar operaciones de tratamiento de datos personales única y exclusivamente siguiendo las instrucciones por escrito de la Municipalidad, las que se entienden incorporadas en las bases de licitación, términos de referencia y el contrato principal. Queda expresamente prohibido al Encargado utilizar los datos para una finalidad distinta, accesoria o incompatible con la prestación del servicio contratado, así como cederlos, comunicarlos o transferirlos a terceros bajo ningún título, incluso para fines de almacenamiento, analítica o perfilamiento comercial. Si el Encargado destina los datos a otra finalidad, los comunica o los utiliza infringiendo las instrucciones de la Municipalidad, será considerado Responsable del tratamiento, asumiendo de manera personal y solidaria las responsabilidades administrativas, civiles y penales que correspondan.

**TERCERA: Categorías de Datos y Titulares.**
Para la ejecución del servicio, el Encargado tratará las siguientes categorías de datos personales custodiados por el municipio:
1. **Categorías de Titulares:** {{Escribir ej: Vecinos de la comuna / Pacientes de CESFAM / Funcionarios Municipales / Contribuyentes de Patentes}}.
2. **Tipos de Datos Personales Comunes:** {{Escribir ej: Nombre, RUT, domicilio, teléfono, correo electrónico, registro de pagos}}.
3. **Tipos de Datos Personales Sensibles/Especiales:** {{Escribir ej: Diagnósticos médicos, datos de salud, fichas socioeconómicas del RSH, datos biométricos de huella dactilar, videograbaciones de seguridad}}.

**CUARTA: Obligaciones de Seguridad (Art. 14 quinquies).**
El Encargado se obliga a implementar e implementar permanentemente medidas técnicas, físicas y organizativas de seguridad proporcionales a los riesgos del tratamiento de datos personales, considerando el estado del arte de la tecnología, de manera de resguardar la confidencialidad, integridad, disponibilidad y resiliencia de la información. Dichas medidas deben incluir, como mínimo:
1. **Control de Acceso (RBAC):** Restringir el acceso a los datos personales estrictamente al personal del Encargado que por necesidad del cargo lo requiera (*Need-to-Know*), manteniendo un registro lógico o Log inmutable de auditoría de todos los accesos.
2. **Cifrado de Datos:** Cifrar de forma robusta todos los datos personales, tanto en reposo (bases de datos, discos de almacenamiento, respaldos) como en tránsito (redes de comunicación interna y externa, protocolos HTTPS/SSL).
3. **Soberanía y Residencia de Datos:** Almacenar y procesar las bases de datos exclusivamente en servidores ubicados dentro del territorio de la República de Chile o, en su defecto, en países declarados con "nivel adecuado de protección" por la Agencia de Protección de Datos Personales (APDP), asumiendo que los servicios en la nube (Cloud) contratados deben cumplir estrictamente con las Cláusulas Contractuales Modelo (CCM) aprobadas por la autoridad chilena.
4. **Respaldos y Resiliencia:** Mantener copias de seguridad periódicas de los datos, con mecanismos de restauración probados, asegurando que la pérdida física o lógica pueda ser revertida a la brevedad.

**QUINTA: Deber de Confidencialidad y Secreto (Art. 7).**
El Encargado garantiza que todas las personas bajo su dependencia directa o indirecta (empleados, consultores, subcontratistas) que tengan acceso a los datos personales de la Municipalidad se han comprometido de manera formal, mediante la firma de anexos de contrato laboral vigentes, a guardar absoluto secreto y confidencialidad respecto de dicha información. Esta obligación de confidencialidad es de carácter permanente y subsistirá con posterioridad a la terminación del contrato principal y de este convenio, sin límite de tiempo.

**SEXTA: Subcontratación.**
El Encargado no podrá subcontratar con terceros ninguna de las actividades de tratamiento de datos personales encomendadas por este instrumento, salvo que cuente con la **autorización expresa y por escrito** de la Municipalidad. En caso de contar con dicha autorización, el subcontratista técnico asumirá la calidad de subencargado, debiendo el Encargado celebrar un contrato con él bajo términos y estándares de ciberseguridad y protección de datos equivalentes o superiores a los establecidos en este Convenio. El Encargado será plenamente responsable ante la Municipalidad del cumplimiento de las obligaciones por parte de los subencargados que contrate.

**SÉPTIMA: Cooperación y Apoyo en Derechos ARCOP.**
El Encargado se compromete a asistir y cooperar con la Municipalidad, mediante medidas técnicas y organizativas adecuadas, en la atención y respuesta oportuna de los derechos de Acceso, Rectificación, Cancelación/Supresión, Oposición, Portabilidad y Bloqueo (Derechos ARCOP) ejercidos por los titulares de datos ante el municipio. El Encargado deberá:
1. Notificar a la Municipalidad en un plazo no mayor a **24 horas corridas** toda solicitud de derechos ARCOP que reciba de manera directa de un titular de datos, sin proceder a responderla de forma autónoma.
2. Facilitar al municipio de manera inmediata y gratuita toda la información personal del titular requirente que se encuentre almacenada en sus sistemas de soporte.

**OCTAVA: Notificación de Brechas de Seguridad (Art. 14 sexies).**
Ante la ocurrencia de cualquier incidente de seguridad, ciberataque, filtración, pérdida o acceso no autorizado que afecte la confidencialidad, integridad o disponibilidad de los datos personales de la Municipalidad, el Encargado deberá:
1. **Notificar de forma inmediata** y, en todo caso, dentro de un plazo máximo de **24 horas corridas** desde la detección del incidente, al Delegado de Protección de Datos (DPO) municipal mediante correo electrónico oficial a **{{MUNICIPIO_DPO_CORREO}}**.
2. Remitir un informe técnico preliminar que detalle: (a) la naturaleza de la brecha; (b) las categorías y número estimado de titulares afectados; (c) los tipos de datos personales comprometidos (especialmente si hay datos sensibles, de salud, de niños o financieros); (d) las medidas correctivas de contención implementadas de forma urgente.
3. El Encargado indemnizará a la Municipalidad y asumirá los costos asociados a las multas y reparaciones si la brecha es consecuencia directa de su negligencia o falta de implementación de las medidas de seguridad contractualmente exigidas.

**NOVENA: Destino de los Datos al Término del Contrato.**
A la terminación de la prestación de los servicios del contrato principal por cualquier causa (vencimiento del plazo, resciliación, término anticipado), el Encargado deberá, a elección exclusiva de la Municipalidad:
1. **Devolver de manera íntegra y segura** a la Municipalidad todas las bases de datos personales que mantenga bajo su control, en un formato estructurado, de uso común, interoperable y de lectura mecánica (ej. JSON, CSV, SQL).
2. **Destruir o suprimir de forma irreversible** todas las copias de los datos personales que se encuentren en sus servidores físicos, servidores Cloud, respaldos temporales o soportes locales, emitiendo un Certificado de Destrucción Seguro firmado por su representante legal.
Este deber no se aplicará cuando una norma legal o reglamentaria obligue expresamente al Encargado a conservar los datos de manera temporal, en cuyo caso deberá proceder a su bloqueo absoluto impidiendo cualquier tratamiento posterior.

**DÉCIMA: Facultades de Auditoría.**
La Municipalidad, a través de su Delegado de Protección de Datos (DPO) o un auditor externo independiente debidamente calificado, tendrá la facultad de realizar auditorías, inspecciones técnicas o revisiones del código y configuraciones de seguridad de los sistemas del Encargado, con el fin de verificar el estricto cumplimiento de las obligaciones contractuales pactadas en este DPA. El Encargado facilitará el acceso a sus instalaciones y entregará la documentación necesaria para la auditoría, previo aviso de al menos 5 días hábiles.

Para constancia de lo convenido, las partes firman el presente instrumento de forma electrónica y en dos ejemplares de igual tenor.



_________________________________                   _________________________________
**Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}**    **{{PROVEEDOR_RAZON_SOCIAL}}**
Responsable del Tratamiento                          Encargado del Tratamiento
Representado por: {{ALCALDE_NOMBRE}}                 Representado por: {{PROVEEDOR_REPRESENTANTE}}

---END KIT-02---

---

## 3. KIT-03 • PROTOCOLO DE NOTIFICACIÓN DE BRECHAS DE SEGURIDAD EN 72 HORAS
*Instrucciones operativas estandarizadas para la Dirección de Informática / TI, visadas para responder coordinadamente al artículo 14 sexies de la Ley N° 19.628 (reforma Ley 21.719) y la Ley Marco de Ciberseguridad N° 21.663.*

---BEGIN KIT-03---
### PROTOCOLO INTERNO MUNICIPAL DE GESTIÓN Y REPORTE DE BRECHAS DE DATOS PERSONALES

#### 1. ALCANCE Y CONTEXTO NORMATIVO
Este protocolo regula las acciones de la Dirección de Informática y Tecnologías de la Información de la Municipalidad ante incidentes que afecten la confidencialidad, integridad o disponibilidad de datos personales. 
*   **Ley N° 19.628 (Art. 14 sexies):** Exige reportar a la Agencia de Protección de Datos Personales (APDP) de forma inmediata y **"sin dilaciones indebidas"** cualquier vulneración de seguridad que ocasione alteración, pérdida, filtración o acceso no autorizado a los datos, cuando exista un riesgo razonable para los derechos de las personas. Si afecta a datos sensibles (salud, socioeconómicos) o datos financieros, exige además **comunicar obligatoriamente a los ciudadanos afectados**.
*   **Ley N° 21.663 (Ley Marco de Ciberseguridad):** Para municipalidades calificadas como prestadoras de servicios esenciales u operadores de importancia vital, establece la obligación de reportar alertas tempranas en **3 horas** e informes de incidentes significativos en **72 horas** ante el CSIRT Nacional o la ANCI.

#### 2. FLUJOGRAMA OPERATIVO DE RESPUESTA

```
  [ INCIDENTE DETECTADO ]
            │
            ▼
┌───────────────────────────────┐
│     ETAPA 1: DETECCIÓN        │  <-- El personal TI o el Proveedor detecta anomalía / ciberataque.
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   ETAPA 2: CLASIFICACIÓN      │  <-- Se define el tipo de dato afectado:
│                               │      - Comunes: Alerta Media.
│                               │      - Sensibles (Salud/RSH/Infancia): Alerta ALTA / CRÍTICA.
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│    ETAPA 3: CONTENCIÓN        │  <-- Plazo: Máximo 4 horas desde detección.
│                               │      Se aíslan servidores, se cierran puertos o revocan accesos.
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ ETAPA 4: ANÁLISIS E INFORME   │  <-- El DPO y la Dirección Jurídica redactan el reporte oficial.
└───────────────┬───────────────┘
                │
                ├───> [ ¿Hay Riesgo a Derechos? ] ──( No )──> Se registra internamente en Log RAT.
                │              │
                │            ( Sí )
                ▼              ▼
┌───────────────────────────────┐      ┌───────────────────────────────┐
│  ETAPA 5: REPORTE A LA APDP   │      │ ETAPA 6: NOTIFICACIÓN VECINOS │
│                               │      │                               │
│  Notificación sin dilaciones  │      │ Obligatoria si se comprometió │
│  (Plazo interno recomendado:  │      │ información sensible (Salud, │
│  antes de 72 horas).          │      │ RSH, Infancia) o financiera.   │
└───────────────────────────────┘      └───────────────────────────────┘
```

#### 3. FORMULARIO TIPO DE REPORTE OFICIAL PARA LA APDP
*(A ser completado por el DPO municipal y enviado a través del portal de la Agencia en caso de brecha)*

```json
{
  "cabecera_incidente": {
    "institucion_emisora": "Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}",
    "rut_institucion": "{{MUNICIPIO_RUT}}",
    "dpo_responsable": "{{FUNCIONARIO_DPO_NOMBRE}}",
    "contacto_dpo": "{{MUNICIPIO_DPO_CORREO}}",
    "fecha_registro_incidente": "2026-08-22T18:30:24-07:00"
  },
  "descripcion_brecha": {
    "fecha_y_hora_ocurrencia": "{{FECHA_HORA_VULNERACION}}",
    "origen_detectado": "{{Ej: Ataque externo ransomware / Acceso indebido de credenciales / Pérdida física de soporte}}",
    "descripcion_tecnica": "{{Breve descripción del exploit o evento que afectó el sistema de bases de datos}}",
    "estado_actual": "Contenido e identificado en fase de análisis forense"
  },
  "datos_y_titulares_afectados": {
    "volumen_titulares_estimados": "{{Numero_Titulares_Afectados}}",
    "perfil_titulares": "{{Ej: Vecinos de la comuna beneficiarios de ayudas sociales / Pacientes del CESFAM}}",
    "tipos_de_datos_comprometidos": [
      "RUT",
      "Nombres",
      "Dirección Residencial",
      "Datos de Vulnerabilidad Socioeconómica",
      "Datos Clínicos / Diagnósticos (Si aplica)"
    ],
    "presencia_de_datos_sensibles": "Sí",
    "datos_menores_de_14_anos": "{{Sí/No}}"
  },
  "medidas_mitigacion": {
    "acciones_contencion_urgentes": [
      "Suspensión de credenciales comprometidas y reseteo forzado de contraseñas de red municipal",
      "Aislamiento de la subred del servidor afectado mediante cortafuegos",
      "Activación del plan de restauración de base de datos desde copia de seguridad inmutable fuera de línea"
    ],
    "comunicacion_a_titulares": {
      "estado": "Pendiente de envío masivo / Enviado",
      "medio_utilizado": "Envío de carta formal e-mail en lenguaje claro informando medidas preventivas para el usuario",
      "fecha_comunicacion": "{{FECHA_NOTIFICACION_VECINOS}}"
    }
  }
}
```
---END KIT-03---

---

## 4. KIT-04 • CONVENIO DE DEBER DE SECRETO Y CONFIDENCIALIDAD (RSH)
*Convenio de firma obligatoria para funcionarios municipales, contratistas y personal de apoyo de la Dirección de Desarrollo Comunitario (DIDECO) que operen datos del Registro Social de Hogares (RSH) y subsidios sociales. Fundamentado en el Artículo 7 de la Ley N° 19.628 (reforma Ley 21.719).*

---BEGIN KIT-04---
**CONVENIO ESPECÍFICO DE COMPROMISO, DEBER DE SECRETO Y CONFIDENCIALIDAD EN EL TRATAMIENTO DE DATOS SENSIBLES DEL REGISTRO SOCIAL DE HOGARES**

En {{MUNICIPIO_COMUNA}}, a {{FECHA_FIRMA}}, el/la funcionario/a abajo firmante, don/ña **{{FUNCIONARIO_OPERADOR_NOMBRE}}**, cédula de identidad N° **{{FUNCIONARIO_OPERADOR_RUT}}**, de profesión u oficio **{{FUNCIONARIO_OPERADOR_PROFESION}}**, quien se desempeña en la calidad jurídica de **{{FUNCIONARIO_OPERADOR_CALIDAD}}** en la Dirección de Desarrollo Comunitario (DIDECO) de la Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}, en adelante "el Operador", declara conocer, aceptar y obligarse al cumplimiento del presente compromiso normativo de confidencialidad de datos:

**ANTECEDENTES:**
1. Que por la naturaleza de las funciones encomendadas al Operador en el área de estratificación social, asignación de subsidios y programas comunitarios de DIDECO, este tiene acceso permanente, consulta y realiza operaciones de tratamiento sobre bases de datos que contienen información socioeconómica de los habitantes de la comuna, específicamente la base de datos del **Registro Social de Hogares (RSH)** (creada por la Ley N° 20.379) y otros sistemas de información social del Estado.
2. Que la Ley N° 19.628, sobre Protección de la Vida Privada (modificada sustancialmente por la Ley N° 21.719), define en su artículo 2 letra g) que la **"situación socioeconómica"** es un **dato personal de carácter sensible**, teniendo un estándar de protección legal reforzado que prohíbe de manera general su tratamiento salvo consentimiento expreso del titular o habilitación legal específica.
3. Que el artículo 7 de la Ley N° 19.628 prescribe la obligación legal de guardar estricto **decreto o secreto profesional** sobre los datos de carácter personal que no provengan de fuentes accesibles al público, obligación que recae sobre todas las personas que trabajen en su tratamiento, tanto en organismos públicos como privados, y que **no cesa por haber terminado sus funciones o relación contractual** con la institución.

**CONVENIO Y DECLARACIONES:**

**PRIMERO: Deber de Secreto Absoluto.**
El Operador se compromete formalmente a mantener el más estricto secreto, reserva y confidencialidad respecto de todos los datos personales comunes y sensibles (fichas socioeconómicas, ingresos familiares, diagnósticos de salud, antecedentes familiares, datos de menores de edad, etc.) de los que tome conocimiento en el ejercicio de sus funciones. Este deber prohíbe revelar, difundir, fotografiar, capturar pantallas, transmitir por aplicaciones de mensajería (como WhatsApp, Telegram), o facilitar copias de planillas con información personal a compañeros de trabajo que no requieran dicha información, familiares o terceros ajenos al municipio.

**SEGUNDO: Limitación de Finalidad.**
El Operador declara que utilizará los accesos otorgados al sistema del Registro Social de Hogares (RSH) y otras plataformas asistenciales municipales única y exclusivamente para cumplir con las finalidades específicas de su puesto de trabajo (atención ciudadana, evaluación de subsidios, etc.). Queda estrictamente prohibido realizar búsquedas o consultas informales por motivos de curiosidad personal, familiar, vecinal o de amistad respecto de personas naturales conocidas o de interés público.

**TERCERO: Medidas de Cuidado de Credenciales.**
El Operador asume la responsabilidad exclusiva de resguardar y mantener la confidencialidad de sus credenciales personales de acceso (usuarios, claves de seguridad, token) de los sistemas institucionales y ministeriales del RSH. Se obliga a:
1. No compartir bajo ningún pretexto sus claves personales con otros funcionarios, ni anotarlas en lugares visibles o accesibles.
2. Bloquear la sesión de pantalla de su computador de trabajo cada vez que se ausente de su escritorio, para evitar que terceros operen bajo su usuario.
3. No descargar, exportar ni almacenar bases de datos con RUTs y nombres en discos duros locales de computadores, pendrives o correos personales.

**CUARTO: Reporte de Anomalías.**
El Operador tiene la obligación de reportar de forma inmediata al Delegado de Protección de Datos (DPO) municipal cualquier vulnerabilidad de seguridad que detecte en los sistemas de información, así como cualquier comportamiento inusual o sospecha de acceso no autorizado a los datos socioeconómicos de los vecinos.

**QUINTO: Responsabilidades y Sanciones.**
El Operador declara tener pleno conocimiento de que la infracción a las obligaciones de confidencialidad, deber de secreto y limitación de finalidad establecidas en este Convenio y en la Ley N° 19.628 constituirá una falta grave a los deberes funcionarios, la que será sancionada conforme a las siguientes responsabilidades concurrentes:
1. **Responsabilidad Administrativa:** Aplicación de medidas disciplinarias contempladas en la Ley N° 18.883, que aprueba el Estatuto Administrativo para Funcionarios Municipales, las que pueden incluir desde censura hasta la medida de **destitución** del cargo, previo sumario administrativo.
2. **Responsabilidad Civil:** Obligación de indemnizar de forma pecuniaria el daño patrimonial y extrapatrimonial (daño moral) causado a los vecinos afectados por la filtración de sus datos personales.
3. **Responsabilidad Penal:** Sanciones corporales y de inhabilitación contempladas en el Código Penal por revelación de secretos y violación de bases de datos públicas protegidas.

Para constancia de su aceptación y compromiso, firma el Operador:



_________________________________
**{{FUNCIONARIO_OPERADOR_NOMBRE}}**
RUT: {{FUNCIONARIO_OPERADOR_RUT}}
Operador / Funcionario DIDECO
Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}

---END KIT-04---

---

## 5. KIT-05 • PAUTA DE RESGUARDO Y AUDITORÍA CLÍNICA (DISAM / CESFAM)
*Checklist operativo obligatorio para directores de CESFAM, SAPU y COSAM municipales, para adecuar los sistemas de información de salud al artículo 16 bis de la Ley N° 19.628 (reforma Ley 21.719).*

---BEGIN KIT-05---
### CHECKLIST DE FISCALIZACIÓN Y RESGUARDO EN LA GESTIÓN DE DATOS DE SALUD COMUNALES

Esta pauta constituye el instrumento técnico de verificación y cumplimiento que los Directores de Salud Municipal (DISAM) y directores de centros asistenciales (CESFAM, SAPU, COSAM) de {{MUNICIPIO_NOMBRE}} deben aplicar trimestralmente para garantizar que el tratamiento de fichas clínicas y bases de datos sanitarias se adecue al estándar reforzado del artículo 16 bis de la Ley N° 21.719.

#### DIMENSIÓN A: VERIFICACIÓN DE LICITUD OPERATIVA (Art. 16 bis)
*Los datos de salud y perfil biológico solo pueden tratarse en las hipótesis específicas que la ley permite. Marque la presencia del rationale legal documentado por cada proceso.*

*   [ ] **1. Rationale del Sistema HIS (Hospital Information System):** ¿Se encuentra documentado que el tratamiento de la Ficha Clínica Electrónica municipal se realiza bajo la hipótesis de la letra e) del Art. 16 bis ("tratamiento necesario para fines de medicina preventiva o laboral, prestación de asistencia sanitaria o gestión de servicios de salud")?
*   [ ] **2. Rationale del Módulo de Farmacia y Entrega de Medicamentos:** ¿Existe una base de datos local de recetas? ¿Se encuentra justificada bajo las leyes de deberes y derechos de los pacientes (Ley N° 20.584) en conexión con el Art. 16 bis letra f) ("habilitación legal expresa")?
*   [ ] **3. Consentimiento en Convenios o Programas Piloto Externos:** Si el CESFAM participa en programas de investigación con universidades o laboratorios privados, ¿se cuenta con un consentimiento expreso, previo, escrito e independiente de los pacientes donde consientan el uso de sus datos?
*   [ ] **4. Protocolo de Anonimización en Estudios de Salud:** Si se exportan datos de salud de consultorios para informes estadísticos de la SEREMI o el MINSAL, ¿se aplica un algoritmo de disociación irreversible que elimine RUT, nombres y direcciones antes de la entrega de la información?

#### DIMENSIÓN B: CONTROLES TÉCNICOS Y TRAZABILIDAD (Art. 14 quinquies)
*El tratamiento de datos sensibles requiere medidas de seguridad técnicas avanzadas que impidan el acceso no autorizado del propio personal.*

*   [ ] **1. Trazabilidad Total del Expediente Clínico (Log de Accesos):** ¿El software de ficha clínica registra de forma inmutable la identidad de cada médico, enfermero, administrativo o técnico en farmacia que abre una ficha de paciente, junto con la fecha y la operación realizada? ¿Está prohibido que personal administrativo sin rol asistencial consulte diagnósticos médicos?
*   [ ] **2. Cifrado de Bases de Datos Sanitarias:** ¿Se cuenta con cifrado en reposo para las bases de datos SQL de los sistemas de laboratorio, HIS y agendamiento clínico? ¿Las conexiones remotas de los funcionarios se realizan bajo redes privadas virtuales (VPN) cifradas?
*   [ ] **3. Bloqueo de Almacenamiento Local:** ¿Se encuentra bloqueada técnicamente la posibilidad de que los funcionarios de admisión descarguen listas de pacientes con sus diagnósticos clínicos en planillas Excel en computadores locales o memorias USB?

#### DIMENSIÓN C: LIMITACIONES BIOMÉTRICAS Y ALTERNATIVAS (Art. 16 ter)
*El control de asistencia de los funcionarios y la autenticación de pacientes mediante huella o rostro involucra datos biométricos (datos sensibles).*

*   [ ] **1. Voluntariedad de la Biometría Funcionaria:** ¿Existe un sistema alternativo de registro de asistencia no biométrico (tarjeta de aproximación, clave, PIN o firma de libro de asistencia física) disponible y equivalente para aquellos funcionarios del consultorio que ejerzan su derecho a no entregar o revocar su consentimiento biométrico?
*   [ ] **2. Consentimiento Biométrico Documentado:** Para el personal que sí utiliza el control de huella, ¿se cuenta con un anexo de contrato firmado donde se declare haber sido informado sobre: la identificación del sistema, el período de retención, las finalidades de control y la forma de ejercer derechos ARCOP?

---END KIT-05---

---

## 6. MATRIZ RAT • ESQUEMA DE BASE DE DATOS (JSON/CSV)
*Modelo técnico de base de datos en formato JSON estruturado y CSV equivalente para almacenar y estructurar el Registro de Actividades de Tratamiento (RAT) por dirección municipal, conforme a los principios de lealtad, finalidad y responsabilidad proactiva.*

---BEGIN MATRIZ-RAT---

### A. ESQUEMA DE DATOS JSON (ESTRUCTURA DE TABLA RAT)
*Este JSON puede ser inyectado directamente en el backend de tu software para definir los inputs de los formularios de levantamiento por departamento.*

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "RegistroActividadesTratamientoMunicipal",
  "type": "object",
  "properties": {
    "rat_metadata": {
      "type": "object",
      "properties": {
        "id_municipio": { "type": "string", "example": "MUNI-01" },
        "nombre_municipio": { "type": "string", "example": "Ilustre Municipalidad de {{MUNICIPIO_NOMBRE}}" },
        "fecha_ultima_declaracion": { "type": "string", "format": "date" },
        "dpo_responsable": { "type": "string", "example": "{{FUNCIONARIO_DPO_NOMBRE}}" }
      },
      "required": ["id_municipio", "nombre_municipio", "fecha_ultima_declaracion", "dpo_responsable"]
    },
    "actividades_tratamiento": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id_tratamiento": { "type": "string", "pattern": "^RAT-[0-9]{3}$" },
          "direccion_municipal_propietaria": { "type": "string", "enum": ["Salud (DISAM)", "Social (DIDECO)", "Tránsito", "Rentas y Patentes", "Seguridad Pública", "Recursos Humanos (RRHH)"] },
          "nombre_actividad_tratamiento": { "type": "string" },
          "finalidad_especifica": { "type": "string" },
          "base_licitud_legal": { "type": "string", "enum": ["Ley Organica N°18.695", "Cumplimiento Obligacion Legal (Indicar Ley)", "Ejecucion Contrato", "Consentimiento Expreso del Titular", "Interes Legitimo", "Salvaguarda de la vida (Salud)"] },
          "ley_especifica_respaldo": { "type": "string" },
          "categorias_titulares": { "type": "array", "items": { "type": "string" } },
          "tipos_datos_comunes": { "type": "array", "items": { "type": "string" } },
          "tipos_datos_sensibles": { "type": "array", "items": { "type": "string" } },
          "terceros_destinatarios_o_encargados": { "type": "array", "items": { "type": "string" } },
          "transferencias_internacionales": {
            "type": "object",
            "properties": {
              "aplica": { "type": "boolean" },
              "pais_destino": { "type": "string" },
              "garantia_legal_usada": { "type": "string" }
            },
            "required": ["aplica"]
          },
          "plazo_conservacion_meses": { "type": "integer" },
          "criterio_eliminacion": { "type": "string" },
          "medidas_seguridad": { "type": "array", "items": { "type": "string" } },
          "decisiones_automatizadas_o_perfiles": { "type": "boolean" }
        },
        "required": [
          "id_tratamiento", 
          "direccion_municipal_propietaria", 
          "nombre_actividad_tratamiento", 
          "finalidad_especifica", 
          "base_licitud_legal", 
          "categorias_titulares", 
          "tipos_datos_comunes", 
          "transferencias_internacionales", 
          "plazo_conservacion_meses", 
          "medidas_seguridad", 
          "decisiones_automatizadas_o_perfiles"
        ]
      }
    }
  }
}
```

### B. EJEMPLO DE REGISTRO EN FORMATO CSV (TABLA RAT POBLADA)
*Los siguientes campos representan la data estructurada de los tres tratamientos municipales más críticos y que alimentan el backend de tu app.*

```csv
id_tratamiento;direccion_municipal_propietaria;nombre_actividad_tratamiento;finalidad_especifica;base_licitud_legal;ley_especifica_respaldo;categorias_titulares;tipos_datos_comunes;tipos_datos_sensibles;terceros_destinatarios_o_encargados;transferencias_internacionales_aplica;plazo_conservacion_meses;medidas_seguridad;decisiones_automatizadas_o_perfiles
RAT-001;Salud (DISAM);Gestion de Fichas Clinicas;Prestacion de servicios de salud primaria en CESFAM;Cumplimiento Obligacion Legal (Indicar Ley);Ley N° 20.584 y Ley N° 19.628 Art. 16 bis;Pacientes del sistema de salud comunal;Nombre,RUT,Direccion,Contacto,Prevision de Salud;Diagnosticos medicos,Alergias,Tratamientos farmacologicos;Proveedor de Software HIS (SaaS adjudicado);FALSE;180;Cifrado de datos en reposo,Control de acceso RBAC asistencial,Log inmutable de auditoria;FALSE
RAT-002;Social (DIDECO);Gestion del Registro Social de Hogares;Asignacion de beneficios estatales y subsidios comunales;Cumplimiento Obligacion Legal (Indicar Ley);Ley N° 20.379 y Art. 16 bis de la Ley N° 19.628;Vecinos postulantes de la comuna;Nombre,RUT,Direccion,Grupo Familiar;Situacion socioeconomica,Ingresos del hogar;Ministerio de Desarrollo Social y Familia;FALSE;120;Log inmutable de auditoria,Convenio obligatorio de secreto funcionario,Acceso VPN;FALSE
RAT-003;Seguridad Pública;Monitoreo por Videovigilancia y Camaras;Prevencion del delito y resguardo de la seguridad comunal;Interes Legitimo;Ley N° 18.695 (Seguridad Comunal);Vecinos en espacios publicos de la comuna;Patentes vehiculares,Registro en video de transito publico;Ninguno (Salvo deteccion fortuita de datos sensibles);Carabineros de Chile,Fiscalia Local;FALSE;1;Camaras protegidas con acceso SSH restrictivo,Boveda fisica de almacenamiento,Borrado automatico a los 30 dias;FALSE
```
---END MATRIZ-RAT---

<?php
// HARDENED & ENRICHED ENVIAR INFORME API (OWASP & LEY 21.719 COMPLIANT)
header("Content-Type: application/json; charset=UTF-8");

$allowed_origins = [
    "https://protegedatoslocal.inncivica.cloud",
    "https://inncivica.cloud",
    "http://localhost:4321",
    "http://localhost:3000"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: https://protegedatoslocal.inncivica.cloud");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Metodo no permitido"]);
    exit;
}

// Rate Limiting por IP (Máximo 5 envíos por minuto)
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rate_file = sys_get_temp_dir() . "/pdl_mail_rate_" . md5($ip) . ".tmp";
$current_time = time();

if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true);
    if ($rate_data && ($current_time - $rate_data['time']) < 60) {
        if ($rate_data['count'] >= 5) {
            http_response_code(429);
            echo json_encode(["status" => "error", "message" => "Demasiados envíos. Espere un momento."]);
            exit;
        }
        $rate_data['count']++;
        @file_put_contents($rate_file, json_encode($rate_data));
    } else {
        @file_put_contents($rate_file, json_encode(["time" => $current_time, "count" => 1]));
    }
} else {
    @file_put_contents($rate_file, json_encode(["time" => $current_time, "count" => 1]));
}

$input = json_decode(file_get_contents("php://input"), true);
if (!$input || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Correo institucional requerido"]);
    exit;
}

$email_raw = str_replace(["\r", "\n"], '', trim($input['email']));
if (!filter_var($email_raw, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Formato de correo inválido"]);
    exit;
}

$email = htmlspecialchars($email_raw, ENT_QUOTES, 'UTF-8');
$municipio = htmlspecialchars(strip_tags($input['municipio'] ?? 'Municipalidad'), ENT_QUOTES, 'UTF-8');
$nombre = htmlspecialchars(strip_tags($input['nombre'] ?? 'Funcionario Directivo'), ENT_QUOTES, 'UTF-8');
$cargo = htmlspecialchars(strip_tags($input['cargo'] ?? 'Dirección Municipal'), ENT_QUOTES, 'UTF-8');
$immScore = htmlspecialchars(strip_tags((string)($input['immScore'] ?? '0')), ENT_QUOTES, 'UTF-8');
$nivel = htmlspecialchars(strip_tags((string)($input['nivel'] ?? '0/4')), ENT_QUOTES, 'UTF-8');
$brechas = htmlspecialchars(strip_tags((string)($input['brechas'] ?? '0')), ENT_QUOTES, 'UTF-8');
$fecha = date("d/m/Y H:i");

$to_consultor = "evegat@uchile.cl, evega.ap@gmail.com";
$subject_admin = "=?UTF-8?B?" . base64_encode("[ProtegeDatosLocal] Nuevo Diagnóstico Formal - " . $municipio) . "?=";

$message_admin = "
<html>
<head>
<style>
body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 13px; }
.card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin: 15px 0; }
.score { font-size: 26px; font-weight: bold; color: #1e40af; }
</style>
</head>
<body>
<h2>🛡️ Solicitud de Informe de Madurez Municipal</h2>
<p>Se ha generado una evaluación formal para <strong>{$municipio}</strong>.</p>
<div class='card'>
  <p><strong>Solicitante:</strong> {$nombre}</p>
  <p><strong>Cargo / Dirección:</strong> {$cargo}</p>
  <p><strong>Correo Institucional:</strong> <a href='mailto:{$email}'>{$email}</a></p>
  <p><strong>Fecha y Hora:</strong> {$fecha}</p>
  <hr style='border: none; border-top: 1px solid #cbd5e1; margin: 12px 0;'>
  <p><strong>Índice IMM Obtenido:</strong> <span class='score'>{$immScore}%</span> (Nivel {$nivel})</p>
  <p><strong>Brechas Críticas:</strong> {$brechas}</p>
</div>
</body>
</html>
";

$headers_admin = [
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=UTF-8",
    "From: ProtegeDatosLocal <no-reply@inncivica.cloud>",
    "Reply-To: " . $email,
    "X-Mailer: PDL-Security/2.0"
];

@mail($to_consultor, $subject_admin, $message_admin, implode("\r\n", $headers_admin));

// CORREO EJECUTIVO DETALLADO PARA EL FUNCIONARIO
$subject_user = "=?UTF-8?B?" . base64_encode("Informe Ejecutivo de Madurez Ley N° 21.719 · " . $municipio) . "?=";

$message_user = "
<html>
<head>
<style>
body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6; font-size: 13px; background-color: #f1f5f9; margin: 0; padding: 20px; }
.container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
.header { background: #0A2540; color: #ffffff; padding: 32px 28px; text-align: left; }
.header h1 { font-size: 20px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px; }
.header p { font-size: 12px; color: #93c5fd; margin: 0; }
.content { padding: 28px; }
.kpi-grid { display: table; width: 100%; margin: 20px 0; }
.kpi-col { display: table-cell; width: 33.33%; padding: 12px; text-align: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
.kpi-val { font-size: 26px; font-weight: 900; color: #1e40af; display: block; margin-bottom: 2px; }
.kpi-lbl { font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; }
.section-title { font-size: 15px; font-weight: 800; color: #0A2540; margin: 24px 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
.dimension-table { width: 100%; border-collapse: collapse; margin: 12px 0 20px 0; font-size: 12px; }
.dimension-table th { background: #f1f5f9; text-align: left; padding: 8px 10px; border-bottom: 2px solid #cbd5e1; color: #334155; font-weight: 700; }
.dimension-table td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
.callout-warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 14px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 12px; color: #991b1b; }
.callout-roadmap { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 12px; color: #1e40af; }
.badge { background: #0284c7; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
.footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; font-size: 11px; color: #64748b; text-align: center; }
</style>
</head>
<body>
<div class='container'>
  <!-- Header con Membrete -->
  <div class='header'>
    <span style='background: rgba(59, 130, 246, 0.2); color: #bfdbfe; font-size: 10px; font-weight: bold; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;'>
      Informe Ejecutivo Oficial · Ley N° 21.719
    </span>
    <h1>{$municipio}</h1>
    <p>Solicitado por: <strong>{$nombre}</strong> ({$cargo}) · Fecha: {$fecha}</p>
  </div>

  <div class='content'>
    <p>Estimado(a) <strong>{$nombre}</strong>:</p>
    <p>A continuación remitimos el <strong>Informe Ejecutivo de Diagnóstico de Madurez</strong> de la <strong>{$municipio}</strong> para la adecuación institucional obligatoria a la nueva Ley N° 21.719 de Protección de Datos Personales, cuya vigencia plena rige a contar del <strong>1 de diciembre de 2026</strong>.</p>

    <!-- Resumen de Métricas -->
    <div class='kpi-grid'>
      <div class='kpi-col' style='border-right: none;'>
        <span class='kpi-val'>{$immScore}%</span>
        <span class='kpi-lbl'>Índice IMM Global</span>
      </div>
      <div class='kpi-col' style='border-right: none;'>
        <span class='kpi-val' style='font-size: 18px; line-height: 26px; color: #334155;'>Nivel {$nivel}</span>
        <span class='kpi-lbl'>Nivel de Madurez</span>
      </div>
      <div class='kpi-col'>
        <span class='kpi-val' style='color: #dc2626;'>{$brechas}</span>
        <span class='kpi-lbl'>Brechas Críticas</span>
      </div>
    </div>

    <!-- Desglose por 7 Dimensiones -->
    <div class='section-title'>1. Evaluación por Dimensiones Clave de la Ley</div>
    <table class='dimension-table'>
      <tr>
        <th style='width: 30%;'>Dimensión</th>
        <th style='width: 45%;'>Estado y Requerimiento</th>
        <th style='width: 25%;'>Dirección Responsable</th>
      </tr>
      <tr>
        <td><strong>1. Gobernanza y DPO</strong></td>
        <td>Designación formal de Delegado (DPO) y Comité de Privacidad Comunal.</td>
        <td>Alcaldía / Jurídico</td>
      </tr>
      <tr>
        <td><strong>2. Inventario (RAT)</strong></td>
        <td>Mapeo de actividades de tratamiento, finalidades y plazos de conservación.</td>
        <td>SECPLA / TI / Secretaría</td>
      </tr>
      <tr>
        <td><strong>3. Derechos ARSOPB</strong></td>
        <td>Procedimiento para tramitar derechos ciudadanos en 30 días corridos prorrogables.</td>
        <td>OIRS / Transparencia</td>
      </tr>
      <tr>
        <td><strong>4. Seguridad e Incidentes</strong></td>
        <td>Protocolo de notificación obligatoria de brechas ante la APDP.</td>
        <td>Informática / TI</td>
      </tr>
      <tr>
        <td><strong>5. Datos Sensibles</strong></td>
        <td>Resguardo de fichas clínicas (CESFAM) y vulnerabilidad social (DIDECO/RSH).</td>
        <td>Salud / DIDECO</td>
      </tr>
      <tr>
        <td><strong>6. Proveedores (DPA)</strong></td>
        <td>Cláusulas obligatorias de encargado en contratos de software y Mercado Público.</td>
        <td>DAF / Adquisiciones</td>
      </tr>
      <tr>
        <td><strong>7. Alto Riesgo / EIPD</strong></td>
        <td>Filtro preventivo de impacto para cámaras de televigilancia, LPR y biometría.</td>
        <td>Seguridad Pública</td>
      </tr>
    </table>

    <!-- Consecuencias del Incumplimiento -->
    <div class='section-title'>2. Consecuencias Institucionales y Régimen Legal</div>
    <div class='callout-warning'>
      <strong>⚠️ Riesgos Críticos para el Municipio:</strong><br>
      • <strong>Sumarios Administrativos de la CGR:</strong> El Título IV de la Ley N° 21.719 establece responsabilidad administrativa directa de directores y jefaturas ante faltas graves de servicio.<br>
      • <strong>Demandas de Indemnización Civil:</strong> Vecinos afectados por filtraciones de datos médicos o socioeconómicos pueden accionar directamente contra el patrimonio comunal ante tribunales ordinarios.<br>
      • <strong>Objeciones en Compras Públicas:</strong> Contratos con proveedores TIC sin cláusulas de encargado (DPA) serán objetados en auditorías de Contraloría.
    </div>

    <!-- Hoja de Ruta de 90 Días -->
    <div class='section-title'>3. Plan de Puesta al Día Acelerada (90 Días)</div>
    <div class='callout-roadmap'>
      • <strong>Mes 1 (Días 1 a 30):</strong> Levantamiento de la Matriz RAT comunal y auditoría de datos sensibles (Salud y Social).<br>
      • <strong>Mes 2 (Días 31 a 60):</strong> Redacción del Decreto Alcaldicio de Gobernanza (DPO) y anexos DPA para contratos de software.<br>
      • <strong>Mes 3 (Días 61 a 90):</strong> Capacitación funcionaria en deber de secreto y habilitación del canal OIRS para derechos ARSOPB.
    </div>

    <!-- Vías de Contratación -->
    <div class='section-title'>4. Vías de Contratación Pública Procedentes</div>
    <p style='font-size: 12px; margin-bottom: 6px;'>Para ejecutar este plan con apoyo técnico especializado de <strong>InnCivica Lab</strong>, los mecanismos aplicables son:</p>
    <ul style='font-size: 12px; color: #334155; padding-left: 20px; margin-top: 0;'>
      <li><strong>Honorarios a Suma Alzada por Cometido Específico:</strong> Conforme al <em>Art. 4° de la Ley N° 18.883</em> (Estatuto Administrativo Municipal, Subtítulo 21).</li>
      <li><strong>Compra Ágil en Mercado Público:</strong> Para montos inferiores a 30 UTM conforme a la <em>Ley N° 19.886 y Ley N° 21.634</em> (Subtítulo 22).</li>
    </ul>

    <!-- Contacto Directo -->
    <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 24px; text-align: center;'>
      <span style='font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 4px;'>Consultor Principal de Referencia</span>
      <strong style='font-size: 14px; color: #0A2540;'>Eduardo Vega Toledo</strong><br>
      <span style='font-size: 12px; color: #475569;'>Consultor en Gestión Pública · Universidad de Chile</span><br>
      <a href='mailto:evegat@uchile.cl' style='color: #1e40af; font-weight: bold; font-size: 12px;'>evegat@uchile.cl</a> | <a href='https://protegedatoslocal.inncivica.cloud' style='color: #1e40af; font-size: 12px;'>protegedatoslocal.inncivica.cloud</a>
    </div>
  </div>

  <div class='footer'>
    <strong>InnCivica Lab · Tecnologías de Gestión Pública</strong><br>
    Este informe constituye un instrumento referencial de orientación técnica interna para la toma de decisiones del Concejo y la Alcaldía, derivado estrictamente de las declaraciones ingresadas por el usuario bajo su propia responsabilidad. No constituye auditoría vinculante ni certificación oficial de cumplimiento ante la CGR ni la APDP.
  </div>
</div>
</body>
</html>
";

$headers_user = [
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=UTF-8",
    "From: InnCivica Lab <no-reply@inncivica.cloud>",
    "Reply-To: evegat@uchile.cl",
    "X-Mailer: PDL-Security/2.0"
];

@mail($email, $subject_user, $message_user, implode("\r\n", $headers_user));

echo json_encode([
    "status" => "success",
    "message" => "Informe detallado enviado exitosamente a " . $email
]);

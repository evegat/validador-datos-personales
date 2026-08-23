<?php
// HARDENED ENVIAR INFORME API (OWASP & LEY 21.719 COMPLIANT)
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

// Rate Limiting
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rate_file = sys_get_temp_dir() . "/pdl_mail_rate_" . md5($ip) . ".tmp";
$current_time = time();

if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true);
    if ($rate_data && ($current_time - $rate_data['time']) < 60) {
        if ($rate_data['count'] >= 5) {
            http_response_code(429);
            echo json_encode(["status" => "error", "message" => "Demasiados envios. Espere un momento."]);
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
    echo json_encode(["status" => "error", "message" => "Formato de correo invalido"]);
    exit;
}

$email = htmlspecialchars($email_raw, ENT_QUOTES, 'UTF-8');
$municipio = htmlspecialchars(strip_tags($input['municipio'] ?? 'Municipalidad'), ENT_QUOTES, 'UTF-8');
$nombre = htmlspecialchars(strip_tags($input['nombre'] ?? 'Funcionario Directivo'), ENT_QUOTES, 'UTF-8');
$cargo = htmlspecialchars(strip_tags($input['cargo'] ?? 'Direccion Municipal'), ENT_QUOTES, 'UTF-8');
$immScore = htmlspecialchars(strip_tags((string)($input['immScore'] ?? '0')), ENT_QUOTES, 'UTF-8');
$nivel = htmlspecialchars(strip_tags((string)($input['nivel'] ?? '0/4')), ENT_QUOTES, 'UTF-8');
$brechas = htmlspecialchars(strip_tags((string)($input['brechas'] ?? '0')), ENT_QUOTES, 'UTF-8');
$fecha = date("d-m-Y H:i");

$to_consultor = "evegat@uchile.cl, evega.ap@gmail.com";
$subject_admin = "=?UTF-8?B?" . base64_encode("[ProtegeDatosLocal] Informe Solicitado - " . $municipio) . "?=";

$message_admin = "
<html>
<head>
<style>
body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.5; }
.card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
.score { font-size: 28px; font-weight: bold; color: #1e40af; }
</style>
</head>
<body>
<h2>🛡️ Solicitud de Informe de Madurez Municipal</h2>
<div class='card'>
  <p><strong>Solicitante:</strong> {$nombre}</p>
  <p><strong>Cargo / Dirección:</strong> {$cargo}</p>
  <p><strong>Municipalidad:</strong> {$municipio}</p>
  <p><strong>Correo Institucional:</strong> <a href='mailto:{$email}'>{$email}</a></p>
  <p><strong>Fecha de Evaluación:</strong> {$fecha}</p>
  <hr style='border: none; border-top: 1px solid #cbd5e1; margin: 15px 0;'>
  <p><strong>Índice IMM:</strong> <span class='score'>{$immScore}%</span> (Nivel {$nivel})</p>
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

$subject_user = "=?UTF-8?B?" . base64_encode("Informe Ejecutivo de Madurez Ley N° 21.719 - " . $municipio) . "?=";
$message_user = "
<html>
<head>
<style>
body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.5; }
.card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
.footer { font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
</style>
</head>
<body>
<h2>🛡️ ProtegeDatosLocal · InnCivica Lab</h2>
<p>Estimado(a) <strong>{$nombre}</strong> ({$cargo} - {$municipio}):</p>
<p>Hemos recibido correctamente su autodiagnóstico de preparación ante la <strong>Ley N° 21.719 de Protección de Datos Personales</strong>.</p>
<div class='card'>
  <h3>Resumen Ejecutivo de su Comuna:</h3>
  <p>• <strong>Índice de Madurez Municipal (IMM):</strong> {$immScore}% (Nivel {$nivel})</p>
  <p>• <strong>Brechas Críticas Detectadas:</strong> {$brechas}</p>
  <p>• <strong>Hito de Vigencia Legal:</strong> 1 de Diciembre de 2026</p>
</div>
<p>Nuestro equipo técnico encabezado por <strong>Eduardo Vega Toledo</strong> (Consultor en Gestión Pública, Universidad de Chile) revisará los antecedentes y se pondrá en contacto con usted para remitir la propuesta técnica de acompañamiento y las bases tipo para contratación mediante <strong>Honorarios a Suma Alzada (Art. 4° Ley N° 18.883)</strong> o <strong>Mercado Público / Compra Ágil (< 30 UTM)</strong>.</p>
<div class='footer'>
  InnCivica Lab · Tecnologías de Gestión Pública<br>
  Contacto: <a href='mailto:evegat@uchile.cl'>evegat@uchile.cl</a> | <a href='https://protegedatoslocal.inncivica.cloud'>protegedatoslocal.inncivica.cloud</a>
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
    "message" => "Informe y confirmacion enviados exitosamente a " . $email
]);

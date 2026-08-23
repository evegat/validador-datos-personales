<?php
// HARDENED REGISTRO ACCESO API (OWASP & LEY 21.719 COMPLIANT)
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

// Rate Limiting por IP (Máximo 10 peticiones por minuto)
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rate_file = sys_get_temp_dir() . "/pdl_rate_" . md5($ip) . ".tmp";
$current_time = time();

if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true);
    if ($rate_data && ($current_time - $rate_data['time']) < 60) {
        if ($rate_data['count'] >= 10) {
            http_response_code(429);
            echo json_encode(["status" => "error", "message" => "Limite de solicitudes excedido. Intente en un minuto."]);
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

// Sanitización y Validación Estricta
$input = json_decode(file_get_contents("php://input"), true);
if (!$input || empty($input['email']) || empty($input['municipio']) || empty($input['nombre'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Campos obligatorios incompletos"]);
    exit;
}

$email_raw = str_replace(["\r", "\n"], '', trim($input['email']));
if (!filter_var($email_raw, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Formato de correo electronico invalido"]);
    exit;
}

$email = htmlspecialchars($email_raw, ENT_QUOTES, 'UTF-8');
$municipio = htmlspecialchars(strip_tags($input['municipio'] ?? 'Municipalidad'), ENT_QUOTES, 'UTF-8');
$nombre = htmlspecialchars(strip_tags($input['nombre'] ?? 'Funcionario'), ENT_QUOTES, 'UTF-8');
$cargo = htmlspecialchars(strip_tags($input['cargo'] ?? 'Direccion Municipal'), ENT_QUOTES, 'UTF-8');
$departamento = htmlspecialchars(strip_tags($input['departamento'] ?? 'General'), ENT_QUOTES, 'UTF-8');
$fecha = date("d-m-Y H:i:s");

// ALMACENAMIENTO SEGURO FUERA DE PUBLIC_HTML
// Intenta guardar en directorio privado ~/pdl_secure_data/ o sys_get_temp_dir
$home_dir = getenv("HOME") ?: sys_get_temp_dir();
$secure_dir = $home_dir . "/pdl_secure_data";
if (!is_dir($secure_dir)) {
    @mkdir($secure_dir, 0700, true);
}

$log_file = is_dir($secure_dir) ? ($secure_dir . "/traza_accesos.log") : (sys_get_temp_dir() . "/pdl_traza_accesos.log");

$entry = [
    "fecha" => $fecha,
    "municipio" => $municipio,
    "nombre" => $nombre,
    "cargo" => $cargo,
    "departamento" => $departamento,
    "email" => $email,
    "hash_ip" => substr(md5($ip . 'SECRET_SALT_2026'), 0, 10)
];

@file_put_contents($log_file, json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX);

// Notificación por Correo Seguro (Prevenir Header Injection)
$to = "evegat@uchile.cl, evega.ap@gmail.com";
$subject = "=?UTF-8?B?" . base64_encode("[ProtegeDatosLocal] Nuevo Acceso - " . $municipio) . "?=";

$message = "
<html>
<head>
<style>
body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.5; }
.card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
.tag { background: #0284c7; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
</style>
</head>
<body>
<h2>🏛️ Nuevo Acceso Registrado al Diagnóstico</h2>
<div class='card'>
  <p><strong>Municipalidad:</strong> {$municipio}</p>
  <p><strong>Funcionario(a):</strong> {$nombre}</p>
  <p><strong>Cargo / Dirección:</strong> {$cargo}</p>
  <p><strong>Área a Evaluar:</strong> <span class='tag'>{$departamento}</span></p>
  <p><strong>Correo Institucional:</strong> <a href='mailto:{$email}'>{$email}</a></p>
  <p><strong>Fecha y Hora:</strong> {$fecha}</p>
</div>
<p><em>ProtegeDatosLocal · InnCivica Lab</em></p>
</body>
</html>
";

$headers = [
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=UTF-8",
    "From: ProtegeDatosLocal <no-reply@inncivica.cloud>",
    "Reply-To: " . $email,
    "X-Mailer: PDL-Security/2.0"
];

@mail($to, $subject, $message, implode("\r\n", $headers));

echo json_encode([
    "status" => "success",
    "message" => "Acceso registrado correctamente para " . $municipio
]);

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || empty($input['email']) || empty($input['municipio'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit;
}

$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$municipio = htmlspecialchars($input['municipio'] ?? 'Municipalidad');
$nombre = htmlspecialchars($input['nombre'] ?? 'Funcionario');
$cargo = htmlspecialchars($input['cargo'] ?? 'Dirección Municipal');
$departamento = htmlspecialchars($input['departamento'] ?? 'General');
$fecha = date("d-m-Y H:i:s");
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

// 1. Guardar registro en archivo JSON local de traza
$log_file = __DIR__ . "/traza_accesos.json";
$registros = [];
if (file_exists($log_file)) {
    $contenido = file_get_contents($log_file);
    $registros = json_decode($contenido, true) ?: [];
}

$nuevo_registro = [
    "fecha" => $fecha,
    "municipio" => $municipio,
    "nombre" => $nombre,
    "cargo" => $cargo,
    "departamento" => $departamento,
    "email" => $email,
    "ip_anonimizada" => substr(md5($ip), 0, 8)
];

$registros[] = $nuevo_registro;
@file_put_contents($log_file, json_encode($registros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 2. Notificación inmediata a los correos del consultor
$to = "evegat@uchile.cl, evega.ap@gmail.com";
$subject = "[ProtegeDatosLocal] Nuevo Acceso Iniciado - " . $municipio;

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
<h2>🏛️ Nuevo Funcionario Iniciando Diagnóstico</h2>
<p>Un directivo o funcionario municipal ha ingresado sus antecedentes para iniciar la evaluación.</p>
<div class='card'>
  <p><strong>Municipalidad:</strong> {$municipio}</p>
  <p><strong>Funcionario(a):</strong> {$nombre}</p>
  <p><strong>Cargo / Dirección:</strong> {$cargo}</p>
  <p><strong>Área a Evaluar:</strong> <span class='tag'>{$departamento}</span></p>
  <p><strong>Correo Institucional:</strong> <a href='mailto:{$email}'>{$email}</a></p>
  <p><strong>Fecha y Hora:</strong> {$fecha}</p>
</div>
<p><em>Traza registrada en el portal ProtegeDatosLocal (InnCivica Lab).</em></p>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: ProtegeDatosLocal <no-reply@inncivica.cloud>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

@mail($to, $subject, $message, $headers);

echo json_encode([
    "status" => "success",
    "message" => "Acceso registrado correctamente para " . $municipio
]);

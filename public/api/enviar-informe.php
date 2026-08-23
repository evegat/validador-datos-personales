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

if (!$input || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Correo institucional requerido"]);
    exit;
}

$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$municipio = htmlspecialchars($input['municipio'] ?? 'Municipalidad');
$nombre = htmlspecialchars($input['nombre'] ?? 'Funcionario Directivo');
$cargo = htmlspecialchars($input['cargo'] ?? 'Dirección Municipal');
$immScore = htmlspecialchars($input['immScore'] ?? '0');
$nivel = htmlspecialchars($input['nivel'] ?? '0/4');
$brechas = htmlspecialchars($input['brechas'] ?? '0');
$fecha = date("d-m-Y H:i");

$to_consultor = "evegat@uchile.cl, evega.ap@gmail.com";
$subject_admin = "[ProtegeDatosLocal] Nuevo Diagnóstico Municipal - " . $municipio;

$message_admin = "
<html>
<head>
<style>
body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.5; }
.card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
.badge { background: #1e40af; color: white; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; }
.score { font-size: 28px; font-weight: bold; color: #1e40af; }
</style>
</head>
<body>
<h2>🛡️ Nuevo Informe de Madurez Municipal Generado</h2>
<p>Se ha generado una solicitud de informe formal para la <strong>{$municipio}</strong>.</p>
<div class='card'>
  <p><strong>Solicitante:</strong> {$nombre}</p>
  <p><strong>Cargo / Dirección:</strong> {$cargo}</p>
  <p><strong>Correo Institucional:</strong> <a href='mailto:{$email}'>{$email}</a></p>
  <p><strong>Fecha de Evaluación:</strong> {$fecha}</p>
  <hr style='border: none; border-top: 1px solid #cbd5e1; margin: 15px 0;'>
  <p><strong>Índice IMM Obtenido:</strong> <span class='score'>{$immScore}%</span> (Nivel {$nivel})</p>
  <p><strong>Brechas Críticas Identificadas:</strong> {$brechas}</p>
</div>
<p><em>Este requerimiento ha sido registrado en la plataforma ProtegeDatosLocal (InnCivica Lab).</em></p>
</body>
</html>
";

$headers_admin  = "MIME-Version: 1.0\r\n";
$headers_admin .= "Content-type: text/html; charset=UTF-8\r\n";
$headers_admin .= "From: ProtegeDatosLocal <no-reply@inncivica.cloud>\r\n";
$headers_admin .= "Reply-To: " . $email . "\r\n";

// Enviar al consultor
mail($to_consultor, $subject_admin, $message_admin, $headers_admin);

// Enviar copia ejecutiva de confirmación al funcionario
$subject_user = "Informe Ejecutivo de Madurez Ley N° 21.719 - " . $municipio;
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
<p>Nuestro equipo técnico encabezado por <strong>Eduardo Vega Toledo</strong> (Consultor en Gestión Pública, Universidad de Chile) revisará los antecedentes y se pondrá en contacto con usted para remitir la propuesta técnica de acompañamiento y los Términos de Referencia (TDR) para Mercado Público / Compra Ágil.</p>
<div class='footer'>
  InnCivica Lab · Tecnologías de Gestión Pública<br>
  Contacto: <a href='mailto:evegat@uchile.cl'>evegat@uchile.cl</a> | <a href='https://protegedatoslocal.inncivica.cloud'>protegedatoslocal.inncivica.cloud</a>
</div>
</body>
</html>
";

$headers_user  = "MIME-Version: 1.0\r\n";
$headers_user .= "Content-type: text/html; charset=UTF-8\r\n";
$headers_user .= "From: InnCivica Lab <no-reply@inncivica.cloud>\r\n";
$headers_user .= "Reply-To: evegat@uchile.cl\r\n";

mail($email, $subject_user, $message_user, $headers_user);

echo json_encode([
    "status" => "success",
    "message" => "Informe y confirmación enviados exitosamente a " . $email
]);

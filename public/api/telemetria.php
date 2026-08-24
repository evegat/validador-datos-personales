<?php
// TELEMETRÍA ZERO-COOKIE & ZERO-STORAGE (LEY 21.719 / OWASP COMPLIANT)
header("Content-Type: application/json; charset=UTF-8");

$allowed_origins = [
    "https://protegedatoslocal.inncivica.cloud",
    "https://inncivica.cloud",
    "https://protegedatoslocal.evegat.cl",
    "https://validador.evegat.cl",
    "https://evegat.cl",
    "http://localhost:4321",
    "http://localhost:3000"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: *");
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

$input = json_decode(file_get_contents("php://input"), true);
$source = htmlspecialchars(strip_tags($input['source'] ?? 'directo'), ENT_QUOTES, 'UTF-8');
$path = htmlspecialchars(strip_tags($input['path'] ?? '/'), ENT_QUOTES, 'UTF-8');
$today = date("Y-m-d");

$home_dir = getenv("HOME") ?: sys_get_temp_dir();
$secure_dir = $home_dir . "/pdl_secure_data";
if (!is_dir($secure_dir)) {
    @mkdir($secure_dir, 0700, true);
}

$telemetry_file = is_dir($secure_dir) ? ($secure_dir . "/telemetria_resumen.json") : (sys_get_temp_dir() . "/pdl_telemetria.json");

$data = [];
if (file_exists($telemetry_file)) {
    $content = @file_get_contents($telemetry_file);
    if ($content) {
        $data = json_decode($content, true) ?: [];
    }
}

if (!isset($data['total_hits'])) {
    $data['total_hits'] = 0;
}
$data['total_hits']++;

if (!isset($data['sources'][$source])) {
    $data['sources'][$source] = 0;
}
$data['sources'][$source]++;

if (!isset($data['daily'][$today])) {
    $data['daily'][$today] = ["hits" => 0, "sources" => []];
}
$data['daily'][$today]['hits']++;
if (!isset($data['daily'][$today]['sources'][$source])) {
    $data['daily'][$today]['sources'][$source] = 0;
}
$data['daily'][$today]['sources'][$source]++;

@file_put_contents($telemetry_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

echo json_encode(["status" => "success"]);

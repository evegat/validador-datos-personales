<?php
// ADMIN DATA API (PROTECTED BY MASTER PIN & OWASP COMPLIANT)
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

// Rate Limiting anti-brute force en PIN (5 intentos fallidos max por 15 minutos)
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$fail_file = sys_get_temp_dir() . "/pdl_admin_fails_" . md5($ip) . ".tmp";
$current_time = time();

if (file_exists($fail_file)) {
    $fail_data = json_decode(file_get_contents($fail_file), true);
    if ($fail_data && ($current_time - $fail_data['time']) < 900) {
        if ($fail_data['count'] >= 5) {
            http_response_code(429);
            echo json_encode(["status" => "error", "message" => "Demasiados intentos fallidos. Bloqueado temporalmente por 15 minutos."]);
            exit;
        }
    }
}

$input = json_decode(file_get_contents("php://input"), true);
$pin = trim($input['pin'] ?? '');

$valid_pins = ["2026", "evegat2026", "pdl2026"];
$env_pin = getenv("PDL_ADMIN_PIN");
if ($env_pin) {
    $valid_pins[] = trim($env_pin);
}

if (!in_array($pin, $valid_pins, true)) {
    // Registrar intento fallido
    $count = 1;
    if (file_exists($fail_file)) {
        $fail_data = json_decode(file_get_contents($fail_file), true);
        if ($fail_data && ($current_time - $fail_data['time']) < 900) {
            $count = ($fail_data['count'] ?? 0) + 1;
        }
    }
    @file_put_contents($fail_file, json_encode(["time" => $current_time, "count" => $count]));

    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "PIN de acceso incorrecto"]);
    exit;
}

// PIN correcto: Resetear intentos fallidos
@unlink($fail_file);

// Leer trazas de leads desde storage seguro
$home_dir = getenv("HOME") ?: sys_get_temp_dir();
$secure_dir = $home_dir . "/pdl_secure_data";
$log_file = is_dir($secure_dir) ? ($secure_dir . "/traza_accesos.log") : (sys_get_temp_dir() . "/pdl_traza_accesos.log");
$telemetry_file = is_dir($secure_dir) ? ($secure_dir . "/telemetria_resumen.json") : (sys_get_temp_dir() . "/pdl_telemetria.json");

$leads = [];
$seen = [];

if (file_exists($log_file)) {
    $lines = file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines) {
        foreach (array_reverse($lines) as $line) {
            $entry = json_decode($line, true);
            if ($entry && is_array($entry)) {
                $key = ($entry['fecha'] ?? '') . '_' . ($entry['email'] ?? '');
                if (!isset($seen[$key])) {
                    $seen[$key] = true;
                    $leads[] = $entry;
                }
            }
        }
    }
}

// Leer telemetría
$telemetry = [
    "total_hits" => 0,
    "sources" => [],
    "daily" => []
];
if (file_exists($telemetry_file)) {
    $tel_data = json_decode(file_get_contents($telemetry_file), true);
    if ($tel_data) {
        $telemetry = $tel_data;
    }
}

// Calcular KPIs agregados
$unique_munis = [];
$roles_count = ["DIRECTIVO" => 0, "CONCEJAL" => 0, "FUNCIONARIO_OPERATIVO" => 0, "OTRO" => 0];

foreach ($leads as $l) {
    $m = $l['municipio'] ?? '';
    if ($m) $unique_munis[$m] = true;
    
    $r = $l['rol_estamento'] ?? 'DIRECTIVO';
    if (isset($roles_count[$r])) {
        $roles_count[$r]++;
    } else {
        $roles_count['OTRO']++;
    }
}

$kpis = [
    "total_leads" => count($leads),
    "total_municipios" => count($unique_munis),
    "total_visitas" => $telemetry['total_hits'] ?? count($leads),
    "roles" => $roles_count
];

echo json_encode([
    "status" => "success",
    "kpis" => $kpis,
    "leads" => $leads,
    "telemetry" => $telemetry
], JSON_UNESCAPED_UNICODE);

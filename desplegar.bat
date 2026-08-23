@echo off
title Desplegar Validador MuniTech a Hostinger
cd /d "%~dp0"
echo ===================================================
echo 1. Compilando proyecto Astro en produccion...
echo ===================================================
call npm run build
if %errorlevel% neq 0 (
    echo Error en la compilacion. Abortando despliegue.
    pause
    exit /b %errorlevel%
)

echo ===================================================
echo 2. Subiendo archivos a Hostinger por SSH...
echo ===================================================
scp -i "%USERPROFILE%\.ssh\id_rsa" -P 65002 -r dist/* u622167336@185.211.7.75:domains/aliceblue-dogfish-345779.hostingersite.com/public_html/

echo ===================================================
echo Despliegue completado con exito!
echo Visita: https://aliceblue-dogfish-345779.hostingersite.com
echo ===================================================
pause

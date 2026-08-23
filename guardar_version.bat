@echo off
chcp 65001 > nul
echo ========================================================
echo   GUARDAR NUEVA VERSIÓN DEL PROYECTO (GIT)
echo ========================================================
set /p mensaje="Escribe una breve descripción del cambio (o presiona ENTER): "
if "%mensaje%"=="" set mensaje=Actualización automática %date% %time%

git add .
git commit -m "%mensaje%"
echo.
echo [OK] Versión guardada exitosamente en el historial de Git.
pause

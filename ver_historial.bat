@echo off
chcp 65001 > nul
echo ========================================================
echo   HISTORIAL DE VERSIONES DISPONIBLES
echo ========================================================
git log --oneline -n 10
echo.
echo Para volver a una versión específica sin perder nada, usa:
echo   git checkout [codigo_commit]
echo.
pause

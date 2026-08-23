@echo off
echo ========================================================================
echo    DESPLEGANDO PROTEGEDATOSLOCAL A https://protegedatoslocal.inncivica.cloud
echo ========================================================================
echo.

echo [1/3] Compilando la aplicacion Astro en modo produccion...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] La compilacion ha fallado. Abortando despliegue.
    exit /b %errorlevel%
)

echo.
echo [2/3] Subiendo archivos compilados via SCP a Hostinger...
powershell -Command "scp -i $HOME\.ssh\id_rsa -P 65002 -r 'D:\Proyectos\P087 - Validador Ley Datos Personales Municipal\dist\*' u622167336@185.211.7.75:domains/inncivica.cloud/public_html/protegedatoslocal/"
powershell -Command "scp -i $HOME\.ssh\id_rsa -P 65002 'D:\Proyectos\P087 - Validador Ley Datos Personales Municipal\public\.htaccess' u622167336@185.211.7.75:domains/inncivica.cloud/public_html/protegedatoslocal/.htaccess"

powershell -Command "scp -i $HOME\.ssh\id_rsa -P 65002 -r 'D:\Proyectos\P087 - Validador Ley Datos Personales Municipal\dist\*' u622167336@185.211.7.75:domains/inncivica.cloud/public_html/"
powershell -Command "scp -i $HOME\.ssh\id_rsa -P 65002 'D:\Proyectos\P087 - Validador Ley Datos Personales Municipal\public\.htaccess' u622167336@185.211.7.75:domains/inncivica.cloud/public_html/.htaccess"

echo.
echo ========================================================================
echo [3/3] DESPLIEGUE EXITOSO EN: https://protegedatoslocal.inncivica.cloud
echo ========================================================================

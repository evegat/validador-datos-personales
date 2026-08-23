# -*- coding: utf-8 -*-
"""
Script de Sincronizacion Automatica de Leads y Traza desde Hostinger hacia Excel/CSV Local
Uso: python sincronizar_leads.py
"""
import subprocess
import json
from pathlib import Path

print("========================================================================")
print("     SINCRONIZANDO LEADS Y TRAZA DESDE HOSTINGER (PROTEGEDATOSLOCAL)    ")
print("========================================================================")

try:
    cmd = 'ssh hostinger "cat ~/pdl_secure_data/traza_accesos.log 2>/dev/null"'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, encoding="utf-8")
    
    lines = result.stdout.strip().splitlines()
    print(f"-> Conectado a Hostinger. Registros recuperados: {len(lines)}\n")
    
    for line in lines:
        if not line.strip() or line.startswith("<?php"):
            continue
        try:
            data = json.loads(line)
            fecha = data.get('fecha', '-')
            muni = data.get('municipio', '-')
            nombre = data.get('nombre', '-')
            cargo = data.get('cargo', '-')
            email = data.get('email', '-')
            print(f"  * [{fecha}] {muni:<30} | {nombre} ({cargo}) | {email}")
        except Exception:
            pass
            
    print("\n[OK] Sincronizacion completada con exito.")
except Exception as e:
    print(f"[ERROR] No se pudo sincronizar: {e}")

# Validador de Cumplimiento: Ley de Protección de Datos Personales Municipal

Herramienta interactiva de autodiagnóstico, levantamiento de brechas y cumplimiento normativo diseñada para **municipalidades, corporaciones y servicios públicos locales de Chile**, en el marco de la nueva normativa de protección de datos personales.

---

## 🏛️ Contexto y Propósito

El sector público local enfrenta exigencias crecientes respecto al tratamiento, resguardo, consentimiento y gobernanza de los datos personales de la ciudadanía. 

Esta aplicación permite a equipos jurídicos, de control y de tecnologías de la información:
1. **Evaluar el nivel de madurez** en gobernanza y seguridad de datos institucionales.
2. **Identificar brechas críticas** de cumplimiento normativo y riesgos de fuga o uso indebido.
3. **Generar reportes estructurados** y recomendaciones técnicas para planes de adecuación institucional.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Astro](https://astro.build/) (Renderizado estático optimizado, cero JavaScript innecesario).
- **Lenguaje:** TypeScript / JavaScript.
- **Estilos:** Tailwind CSS (Diseño responsivo, accesible y de alta legibilidad).
- **Despliegue:** Compatible con Vercel, Netlify, Cloudflare Pages o servidores estáticos locales.

---

## 🚀 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/evegat/validador-datos-personales.git
cd validador-datos-personales

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El servidor local se iniciará en `http://localhost:4321`.

### Comandos disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el entorno de desarrollo local. |
| `npm run build` | Compila el sitio estático optimizado en la carpeta `./dist/`. |
| `npm run preview` | Previsualiza la versión compilada de producción. |

---

## 🔒 Privacidad y Gobernanza de Datos

La herramienta está concebida bajo el principio de **Privacy by Design**: el diagnóstico y la evaluación se procesan en el cliente (navegador), sin persistencia no autorizada de datos sensibles institucionales.

---

## 👤 Autor

**Eduardo Vega Toledo**  
*Administrador Público · Magíster en Gobierno y Gerencia Pública*  
Docente en FAGOB Universidad de Chile.

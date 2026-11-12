# Cristian Camilo Muñoz Rodríguez — Portfolio Web

> Portafolio profesional de ingeniería de software desarrollado con **React 19**, **Vite**, **Motion** (`motion.dev`), **Three.js** y principios de diseño de alta artesanía (*Craft* y *Anti-AI*).

[![Deploy Portfolio to GitHub Pages](https://github.com/Cristixn04/Cristixn04.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Cristixn04/Cristixn04.github.io/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Demo-cristixn04.github.io-00e575?style=flat&logo=github)](https://cristixn04.github.io/)

---

## ⚡ Stack Tecnológico

- **Frontend Core**: React 19 LTS, Vite 8, JavaScript moderno (ES6+).
- **Coreografía de Movimiento**: Motion (`motion.dev` / Motion 14) con curvas de física de resorte (*Emil Kowalski*).
- **Escena 3D Paramétrica**: Three.js (núcleo geométrico interactivo con dispersión y desensamblaje en partículas según scroll y seguimiento inercial de cursor).
- **Sistema de Diseño**: Dark obsidian (`#060807`), verde esmeralda quirúrgico (`#00e575`), tipografías *Space Grotesk* y *JetBrains Mono*, cero emojis.
- **Internacionalización**: Contexto reactivo multilenguaje bilingüe (`ES` / `EN`) con persistencia en `localStorage`.
- **Despliegue Continuo**: GitHub Actions automatizado con despliegue a GitHub Pages (`Cristixn04.github.io`).

---

## 📂 Estructura del Proyecto

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml        # Pipeline de CI/CD para GitHub Pages
├── public/
│   ├── docs/
│   │   └── CV_Cristian_Munoz.pdf # Hoja de vida oficial descargable
│   ├── img/                  # Imágenes de proyectos y foto de perfil
│   ├── .nojekyll             # Bypass de Jekyll para GitHub Pages
│   └── 404.html              # Manejador de rutas y fallback SPA
├── src/
│   ├── components/           # Componentes modulares de interfaz
│   │   ├── About.jsx         # Perfil profesional y dominio de idiomas
│   │   ├── Contact.jsx       # Canales de comunicación directa y WhatsApp
│   │   ├── Education.jsx     # Trayectoria y acreditaciones con iluminación scroll
│   │   ├── Footer.jsx        # Pie de página y créditos
│   │   ├── Hero.jsx          # Sección de inicio con marco HUD y métricas
│   │   ├── HeroScene.jsx     # Escena interactiva Three.js con dispersión 3D
│   │   ├── Icons.jsx         # Iconos vectoriales limpios (GitHub, LinkedIn)
│   │   ├── IntroSplash.jsx   # Pantalla de bienvenida 3D interactiva
│   │   ├── Navbar.jsx        # Navegación con indicador layoutId y switch ES/EN
│   │   ├── ProjectCarousel.jsx # Carrusel interactivo con gestos y físicas
│   │   ├── ProjectModal.jsx  # Modal de inspección de arquitectura de proyectos
│   │   ├── Projects.jsx      # Catálogo y filtros de proyectos destacados
│   │   ├── ScrollProgress.jsx # Barra superior ligada al progreso de scroll
│   │   ├── Skills.jsx        # Stack oficial de 11 tecnologías y principios
│   │   └── SoftSkills.jsx    # Módulo de 9 habilidades blandas oficiales
│   ├── data/
│   │   └── projects.js       # Registro estructurado de proyectos y arquitecturas
│   ├── i18n/
│   │   ├── LanguageContext.jsx # Proveedor de contexto para lenguaje ES/EN
│   │   └── translations.js   # Diccionarios de traducción completos
│   ├── styles/
│   │   └── index.css         # Tokens de diseño, reset y animaciones
│   ├── App.jsx               # Contenedor raíz de la aplicación
│   └── main.jsx              # Punto de entrada de React 19
├── _legacy_backup/           # Archivo histórico del portafolio anterior
├── index.html                # Plantilla base HTML para Vite
├── package.json              # Dependencias y scripts de ejecución
├── pnpm-lock.yaml            # Bloqueo de dependencias reproducibles
├── vite.config.js            # Configuración de compilación y chunk splitting
└── README.md
```

---

## 🚀 Desarrollo Local

Requisitos:
- **Node.js**: `v20+` o `v22+`
- **pnpm**: `v10+` o `v12+`

```bash
# 1. Clonar el repositorio
git clone https://github.com/Cristixn04/Cristixn04.github.io.git
cd Cristixn04.github.io

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo local
pnpm run dev

# 4. Compilar para producción
pnpm run build

# 5. Previsualizar la compilación de producción localmente
pnpm run preview
```

---

## 🌐 Reglas de Despliegue en GitHub Pages

Este portafolio se aloja en el dominio raíz de GitHub Pages: `https://cristixn04.github.io/`.

Para garantizar un funcionamiento sin fallos, se aplican las siguientes reglas:
1. **GitHub Actions**: El archivo `.github/workflows/deploy.yml` compila el proyecto con Vite y despacha la carpeta `./dist` directamente a GitHub Pages.
2. **Archivo `.nojekyll`**: Ubicado en `public/.nojekyll`, se transfiere a `dist/` para desactivar el procesamiento de Jekyll en GitHub Pages, evitando errores 404 en recursos estáticos.
3. **Manejo de rutas (`404.html`)**: Fallback de redirección automática en `public/404.html` para prevenir errores de navegación en la SPA.
4. **Rutas Relativas (`base: './'`)**: Configurado en `vite.config.js` para asegurar que los bundles de scripts, fuentes e imágenes resuelvan de forma determinista.

---

## 📄 Licencia

© 2026 Cristian Camilo Muñoz Rodríguez. Desarrollado con disciplina de ingeniería y artesanía visual.

/**
 * i18n.js — Sistema de Internacionalización (Español / Inglés)
 * Portafolio Cristian Camilo Muñoz
 */

(function () {
  'use strict';

  const translations = {
    es: {
      meta: {
        title: "Cristian Camilo Muñoz | Desarrollador Full Stack & IA",
        description: "Portafolio de Cristian Camilo Muñoz, Desarrollador Full Stack con enfoque en Back End, Automatización con Inteligencia Artificial y soluciones escalables.",
        ogTitle: "Cristian Camilo Muñoz | Desarrollador Full Stack & IA",
        ogDescription: "Desarrollador Full Stack con enfoque en Back End, Automatización e Inteligencia Artificial. Construyo soluciones que generan impacto real."
      },
      nav: {
        about: "Sobre mí",
        skills: "Habilidades",
        projects: "Proyectos",
        education: "Educación",
        vision: "Visión & Misión",
        contact: "Contacto",
        toggleOpen: "Abrir menú",
        toggleClose: "Cerrar menú"
      },
      hero: {
        available: '<span class="tag-dot"></span>Disponible para trabajar',
        greeting: "Hola, soy",
        roles: [
          "Desarrollador Full Stack",
          "Backend Developer",
          "Automatización con IA",
          "Constructor de Soluciones"
        ],
        desc: 'Desarrollador Full Stack con enfoque en <span class="highlight">back end</span>, automatización e <span class="highlight">inteligencia artificial</span>. Construyo soluciones que generan impacto real.',
        btnProjects: "Ver proyectos",
        btnContact: "Contáctame",
        btnCv: "Descargar CV",
        statProjects: "Proyectos",
        statTech: "Tecnologías",
        statCommitment: "Compromiso",
        codeCardComment: "// IA + Automatización",
        codeCardReturn: '"impacto real"',
        scroll: "Scroll"
      },
      about: {
        tag: "01 — Sobre mí",
        title: "¿Quién soy?",
        bio1: 'Soy desarrollador de software <strong>Full Stack</strong> con enfoque en desarrollo <strong>back end</strong> y una gran pasión por crear soluciones escalables que generen impacto real. Disfruto resolver problemas mediante el desarrollo de aplicaciones web, la automatización de procesos y la implementación de <strong>agentes de inteligencia artificial</strong>.',
        bio2: 'Me caracterizo por aprender con rapidez, adaptarme a nuevos desafíos y mantenerme en constante actualización para aportar soluciones innovadoras y eficientes.',
        tagBackend: "🚀 Backend-first",
        tagAi: "🤖 IA & Automatización",
        tagFullstack: "🌐 Full Stack",
        tagLearning: "⚡ Aprendizaje continuo",
        infoName: "Nombre",
        infoRole: "Rol",
        infoRoleVal: "Desarrollador Full Stack",
        infoFocus: "Enfoque",
        infoFocusVal: "Back End / IA / Automatización",
        infoAvail: "Disponibilidad",
        infoAvailVal: '<span class="dot-green"></span>Disponible',
        btnMessage: "Enviar mensaje",
        btnCv: "Descargar CV"
      },
      skills: {
        tag: "02 — Habilidades",
        title: "Stack técnico & habilidades blandas",
        techColTitle: '<span class="col-icon">⚙️</span> Habilidades técnicas por área',
        softColTitle: '<span class="col-icon">🧠</span> Habilidades blandas',
        catBackendTitle: "Backend & Bases de Datos",
        catBackendBadge: "Especialidad",
        catBackendDesc: "Diseño de APIs RESTful, lógica de negocio y arquitectura de datos relacionales.",
        catFrontendTitle: "Frontend & Interfaces Web",
        catFrontendBadge: "UI / UX",
        catFrontendDesc: "Creación de experiencias web dinámicas, componentes accesibles y diseño responsivo.",
        catAutomationTitle: "Automatización & IA",
        catAutomationBadge: "Enfoque",
        catAutomationDesc: "Desarrollo de flujos de automatización con n8n y despliegue de agentes inteligentes.",
        catToolsTitle: "Herramientas & Entorno",
        catToolsBadge: "Flujo de trabajo",
        catToolsDesc: "Control de versiones, sistemas Linux, gestión de repositorios y trabajo colaborativo.",
        soft1: {
          title: "Liderazgo",
          desc: "Capacidad de guiar equipos hacia objetivos comunes"
        },
        soft2: {
          title: "Trabajo en equipo",
          desc: "Colaboración efectiva en entornos dinámicos"
        },
        soft3: {
          title: "Comunicación efectiva",
          desc: "Ideas claras, escucha activa y feedback constructivo"
        },
        soft4: {
          title: "Creatividad",
          desc: "Soluciones originales ante problemas complejos"
        },
        soft5: {
          title: "Adaptabilidad",
          desc: "Respuesta ágil ante cambios y nuevos retos"
        },
        soft6: {
          title: "Resolución de problemas",
          desc: "Análisis estructurado y toma de decisiones efectiva"
        },
        soft7: {
          title: "Empatía & Tolerancia",
          desc: "Comprensión genuina del entorno y las personas"
        }
      },
      projects: {
        tag: "03 — Proyectos",
        title: "Lo que he construido",
        overlayBtn: "Ver en GitHub →",
        repoLink: 'Ver repositorio <span class="arrow">→</span>',
        p1: {
          title: "Ecommerce Ropa",
          desc: "Tienda de ropa en línea donde el usuario puede explorar prendas, añadirlas al carrito y completar el proceso de compra de forma sencilla e intuitiva."
        },
        p2: {
          title: "ACME Bank",
          desc: "Interfaz bancaria completa donde el usuario puede iniciar sesión, consultar movimientos, retirar, consignar dinero y pagar facturas de manera segura."
        },
        p3: {
          title: "Herramienta de registro de notas",
          desc: "Herramienta que recibe las notas de cursos y las guarda, a la vez que califica por promedio y genera un ranking de estudiantes con mejor promedio."
        }
      },
      education: {
        tag: "04 — Educación",
        title: "Mi formación",
        item1: {
          year: "Actual",
          title: "Técnico en Desarrollo de Software",
          place: "Formación técnica en programación, bases de datos y desarrollo de aplicaciones web.",
          tagAi: "IA"
        },
        item2: {
          year: "Previo",
          title: "Técnico en BPO",
          place: "Formación en gestión de procesos de negocio, atención al cliente y operaciones empresariales.",
          tagProcesses: "Procesos",
          tagManagement: "Gestión"
        },
        item3: {
          year: "Base",
          title: "Bachiller",
          place: "Educación media completa — fundamento de mi formación académica y profesional.",
          tagGraduated: "Graduado"
        }
      },
      vm: {
        tag: "05 — Propósito",
        title: "Visión & Misión",
        missionTitle: "Misión",
        missionText: "Desarrollar soluciones tecnológicas innovadoras mediante software, automatización e inteligencia artificial, creando herramientas eficientes que resuelvan problemas reales y generen valor para las personas y las empresas.",
        visionTitle: "Visión",
        visionText: "Consolidarme como un desarrollador de software e inteligencia artificial reconocido por crear soluciones escalables e innovadoras, contribuyendo a la transformación digital de las organizaciones mientras continúo creciendo profesional y personalmente."
      },
      contact: {
        tag: "06 — Contacto",
        title: "Hablemos",
        sub: "¿Tienes un proyecto en mente? Estoy disponible para colaborar."
      },
      footer: {
        copy: "© 2026 Cristian Camilo Muñoz Rodríguez — Todos los derechos reservados."
      }
    },

    en: {
      meta: {
        title: "Cristian Camilo Muñoz | Full Stack & AI Developer",
        description: "Portfolio of Cristian Camilo Muñoz, Full Stack Developer focused on Back End, AI Automation, and scalable software solutions.",
        ogTitle: "Cristian Camilo Muñoz | Full Stack & AI Developer",
        ogDescription: "Full Stack Developer focused on Back End, Automation, and Artificial Intelligence. I build solutions that create real impact."
      },
      nav: {
        about: "About me",
        skills: "Skills",
        projects: "Projects",
        education: "Education",
        vision: "Vision & Mission",
        contact: "Contact",
        toggleOpen: "Open menu",
        toggleClose: "Close menu"
      },
      hero: {
        available: '<span class="tag-dot"></span>Available for work',
        greeting: "Hi, I'm",
        roles: [
          "Full Stack Developer",
          "Backend Developer",
          "AI Automation Engineer",
          "Solutions Builder"
        ],
        desc: 'Full Stack Developer focused on <span class="highlight">back end</span>, automation, and <span class="highlight">artificial intelligence</span>. I build solutions that create real impact.',
        btnProjects: "View projects",
        btnContact: "Get in touch",
        btnCv: "Download CV",
        statProjects: "Projects",
        statTech: "Technologies",
        statCommitment: "Commitment",
        codeCardComment: "// AI + Automation",
        codeCardReturn: '"real impact"',
        scroll: "Scroll"
      },
      about: {
        tag: "01 — About me",
        title: "Who am I?",
        bio1: 'I am a <strong>Full Stack</strong> software developer with a strong focus on <strong>back end</strong> development and a passion for crafting scalable solutions that drive real impact. I enjoy solving complex challenges through web applications, process automation, and deploying <strong>artificial intelligence agents</strong>.',
        bio2: 'I pride myself on learning quickly, adapting to new challenges, and staying continuously updated to deliver innovative and efficient solutions.',
        tagBackend: "🚀 Backend-first",
        tagAi: "🤖 AI & Automation",
        tagFullstack: "🌐 Full Stack",
        tagLearning: "⚡ Continuous learning",
        infoName: "Name",
        infoRole: "Role",
        infoRoleVal: "Full Stack Developer",
        infoFocus: "Focus",
        infoFocusVal: "Back End / AI / Automation",
        infoAvail: "Availability",
        infoAvailVal: '<span class="dot-green"></span>Available',
        btnMessage: "Send message",
        btnCv: "Download CV"
      },
      skills: {
        tag: "02 — Skills",
        title: "Tech Stack & Soft Skills",
        techColTitle: '<span class="col-icon">⚙️</span> Technical skills by area',
        softColTitle: '<span class="col-icon">🧠</span> Soft skills',
        catBackendTitle: "Backend & Databases",
        catBackendBadge: "Specialty",
        catBackendDesc: "RESTful API design, business logic implementation, and relational data architecture.",
        catFrontendTitle: "Frontend & Web UI",
        catFrontendBadge: "UI / UX",
        catFrontendDesc: "Crafting responsive web experiences, dynamic components, and modern clean layouts.",
        catAutomationTitle: "Automation & AI",
        catAutomationBadge: "Focus Area",
        catAutomationDesc: "Building automated workflows with n8n and orchestrating intelligent AI agents.",
        catToolsTitle: "Tools & Environment",
        catToolsBadge: "Workflow",
        catToolsDesc: "Version control, Linux systems, repository lifecycle, and collaborative engineering.",
        soft1: {
          title: "Leadership",
          desc: "Ability to guide teams toward shared goals"
        },
        soft2: {
          title: "Teamwork",
          desc: "Effective collaboration in dynamic environments"
        },
        soft3: {
          title: "Effective communication",
          desc: "Clear ideas, active listening, and constructive feedback"
        },
        soft4: {
          title: "Creativity",
          desc: "Original solutions for complex problems"
        },
        soft5: {
          title: "Adaptability",
          desc: "Agile response to changes and emerging challenges"
        },
        soft6: {
          title: "Problem solving",
          desc: "Structured analysis and effective decision-making"
        },
        soft7: {
          title: "Empathy & Tolerance",
          desc: "Genuine understanding of people and environment"
        }
      },
      projects: {
        tag: "03 — Projects",
        title: "Featured Projects",
        overlayBtn: "View on GitHub →",
        repoLink: 'View repository <span class="arrow">→</span>',
        p1: {
          title: "Clothing E-Commerce",
          desc: "Online clothing store where users can browse garments, add items to cart, and complete orders through an intuitive checkout experience."
        },
        p2: {
          title: "ACME Bank",
          desc: "Full-fledged banking interface allowing users to securely authenticate, check statements, withdraw/deposit funds, and pay utility bills."
        },
        p3: {
          title: "Grade Management Tool",
          desc: "Academic application that records course grades, computes grade point averages, and generates an automated student ranking."
        }
      },
      education: {
        tag: "04 — Education",
        title: "My Education",
        item1: {
          year: "Current",
          title: "Software Development Technician",
          place: "Technical training in programming, databases, and web application development.",
          tagAi: "AI"
        },
        item2: {
          year: "Previous",
          title: "BPO Technician",
          place: "Training in business process management, customer support, and enterprise operations.",
          tagProcesses: "Processes",
          tagManagement: "Management"
        },
        item3: {
          year: "Foundation",
          title: "High School Graduate",
          place: "Completed secondary education — foundation of academic and technical trajectory.",
          tagGraduated: "Graduated"
        }
      },
      vm: {
        tag: "05 — Purpose",
        title: "Vision & Mission",
        missionTitle: "Mission",
        missionText: "Develop innovative technological solutions through software, automation, and artificial intelligence, creating efficient tools that solve real problems and generate value for people and organizations.",
        visionTitle: "Vision",
        visionText: "Establish myself as a recognized software and artificial intelligence developer known for creating scalable and innovative solutions, contributing to the digital transformation of organizations while continuing to grow professionally and personally."
      },
      contact: {
        tag: "06 — Contact",
        title: "Let's Connect",
        sub: "Have a project in mind or an open role? I'm available to collaborate."
      },
      footer: {
        copy: "© 2026 Cristian Camilo Muñoz Rodríguez — All rights reserved."
      }
    }
  };

  /**
   * Resuelve una clave con notación de punto (ej. "about.bio1")
   */
  function resolveKey(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
  }

  /**
   * Obtiene el idioma preferido guardado o detecta el idioma del navegador
   */
  function getPreferredLanguage() {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved && (saved === 'es' || saved === 'en')) {
      return saved;
    }
    const navLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    return navLang.startsWith('en') ? 'en' : 'es';
  }

  let currentLang = getPreferredLanguage();

  /**
   * Aplica las traducciones al DOM
   */
  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    // Actualizar <title>, <meta name="description">, Open Graph y Twitter
    if (translations[lang].meta) {
      if (translations[lang].meta.title) {
        document.title = translations[lang].meta.title;
      }
      const setMeta = (selector, content) => {
        const el = document.querySelector(selector);
        if (el && content) el.setAttribute('content', content);
      };
      setMeta('meta[name="description"]', translations[lang].meta.description);
      setMeta('meta[property="og:title"]', translations[lang].meta.ogTitle || translations[lang].meta.title);
      setMeta('meta[property="og:description"]', translations[lang].meta.ogDescription || translations[lang].meta.description);
      setMeta('meta[property="og:locale"]', lang === 'en' ? 'en_US' : 'es_ES');
      setMeta('meta[name="twitter:title"]', translations[lang].meta.ogTitle || translations[lang].meta.title);
      setMeta('meta[name="twitter:description"]', translations[lang].meta.ogDescription || translations[lang].meta.description);
    }

    // Actualizar elementos con data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = resolveKey(translations[lang], key);
      if (text !== null && text !== undefined) {
        if (typeof text === 'string' && (text.includes('<') || el.hasAttribute('data-i18n-html'))) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Actualizar botones del switch de idioma
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Notificar al efecto de typing text en el hero
    if (typeof window.setTypingRoles === 'function') {
      window.setTypingRoles(translations[lang].hero.roles);
    }

    // Disparar evento personalizado por si otros módulos lo requieren
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  /**
   * Inicialización del módulo
   */
  function init() {
    // Escuchar clicks en los botones de idioma
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        applyLanguage(targetLang);
      }
    });

    // Aplicar el idioma inicial
    applyLanguage(currentLang);
  }

  // Exponer API pública en window.i18n
  window.i18n = {
    setLanguage: applyLanguage,
    getLanguage: () => currentLang,
    getTypingRoles: () => (translations[currentLang]?.hero?.roles || translations.es.hero.roles),
    translations
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

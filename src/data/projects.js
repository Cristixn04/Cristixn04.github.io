export const projectsData = [
  {
    id: "opscenter",
    category: "ai",
    featured: true,
    title: "Campuslands OpsCenter",
    subtitle: "Centro de Gestión Operativa & Triaje IA para Campus",
    summaryEs: "Sistema centralizado de operaciones de campus con triaje inteligente asistido por Google Gemini, control de aforo por aula en tiempo real y generación de credenciales QR de acceso.",
    summaryEn: "Central AI-assisted campus operations management platform featuring automated room capacity monitoring, Gemini structured incident triage, and real-time QR access passes.",
    image: "img/registro_notas.png", // Stand-in image hasta que el usuario entregue las fotos finales
    gallery: [
      "img/registro_notas.png",
      "img/sica-acme.png"
    ],
    tags: ["FastAPI", "React 19", "TypeScript", "PostgreSQL", "Gemini 3.8 Flash", "Docker"],
    repoUrl: "https://github.com/Cristixn04/Campuslands-OpsCenter-",
    demoUrl: null,
    architecture: {
      pattern: "Arquitectura Fullstack Desacoplada (Frontend React 19 + Backend FastAPI Async)",
      database: "PostgreSQL 16 con SQLAlchemy, Alembic y transaccionalidad ACID",
      highlightsEs: [
        "Triaje estructurado con Gemini SDK determinista: fallas con severidad ALTA o CRÍTICA deshabilitan automáticamente el aula en el catálogo.",
        "Aforo estricto por espacio con factor de tolerancia configurable y prevención de solapamiento horario de reservas.",
        "Generación y validación de pases de acceso mediante códigos QR dinámicos y alertas críticas vía Discord Webhooks."
      ],
      highlightsEn: [
        "Deterministic structured triage using Gemini SDK: critical severity incidents trigger automatic room lockouts in the catalog.",
        "Strict capacity enforcement with configurable tolerance thresholds and scheduling collision prevention.",
        "Dynamic QR code access badge generation and critical infrastructure alerts via Discord Webhooks."
      ],
      specs: [
        { key: "Backend", val: "Python 3.12 / FastAPI" },
        { key: "Frontend", val: "React 19 / TypeScript" },
        { key: "IA Engine", val: "Gemini 3.8 Flash (Structured)" },
        { key: "Base de Datos", val: "PostgreSQL 16 (ACID)" }
      ]
    }
  },
  {
    id: "rentatools",
    category: "backend",
    featured: true,
    title: "RentaTools Marketplace",
    subtitle: "Plataforma de Renta de Maquinaria Pesada & Herramientas",
    summaryEs: "Marketplace B2B/B2C con arquitectura hexagonal y Domain-Driven Design (DDD). Gestión de reservas con bloqueo pesimista (Pessimistic Locking), inspección física técnica y facturación electrónica OpenPDF.",
    summaryEn: "Enterprise heavy machinery rental marketplace featuring Domain-Driven Design (DDD), pessimistic lock reservation concurrency, and automated PDF invoice generation.",
    image: "img/acme-bank.png", // Stand-in image
    gallery: [
      "img/acme-bank.png",
      "img/ecommerce.png"
    ],
    tags: ["Java 21 LTS", "Spring Boot", "Arquitectura Hexagonal", "DDD", "PostgreSQL 4FN", "Spring Security 6"],
    repoUrl: "https://github.com/Leonardo4516/Proyecto_RentaHerramientas",
    demoUrl: null,
    architecture: {
      pattern: "Domain-Driven Design (DDD) & Arquitectura Hexagonal (domain, application, infrastructure)",
      database: "PostgreSQL 16 y MySQL 8.0 normalizados en Cuarta Forma Normal (4FN) con 18 entidades",
      highlightsEs: [
        "Control de concurrencia y prevención de solapamiento de fechas con bloqueo pesimista (Pessimistic Locking).",
        "Seguridad perimetral con Spring Security 6 y JWT con control de acceso granular basado en roles (RBAC).",
        "Generación automatizada de actas de recepción técnica y facturación electrónica en PDF con OpenPDF."
      ],
      highlightsEn: [
        "Strict concurrency control with pessimistic database locking preventing duplicate machinery bookings.",
        "Perimeter security with Spring Security 6 and JWT Role-Based Access Control (Admin, Provider, Client).",
        "Automated machinery intake technical inspection forms and PDF invoicing generated with OpenPDF."
      ],
      specs: [
        { key: "Core Engine", val: "Java 21 LTS / Spring Boot" },
        { key: "Arquitectura", val: "Hexagonal / DDD" },
        { key: "Concurrencia", val: "Pessimistic Locking" },
        { key: "Normalización", val: "4FN (18 Entidades)" }
      ]
    }
  },
  {
    id: "paddock-f1",
    category: "ai",
    featured: true,
    title: "Paddock Global F1 // Chatbot & Telemetría",
    subtitle: "Motor de Búsqueda Semántica 3072D & Análisis Asistido por IA",
    summaryEs: "Plataforma de Fórmula 1 orientada a captura de opiniones, clasificación objetiva de percepciones con Gemini v1beta, persistencia atómica en disco y motor de búsqueda vectorial con embeddings de 3072 dimensiones.",
    summaryEn: "Formula 1 motorsport analytics and conversational chatbot featuring a 3072-dimensional vector embedding search engine and Gemini v1beta contextual reasoning.",
    image: "img/swappy-20260924_185956.png",
    gallery: [
      "img/swappy-20260924_185956.png"
    ],
    tags: ["Python 3.12", "Streamlit", "LangChain", "Gemini API v1beta", "Embeddings 3072D", "Pydantic V2"],
    repoUrl: "https://github.com/Cristixn04",
    demoUrl: null,
    architecture: {
      pattern: "RAG Pipeline (Retrieval-Augmented Generation) + Cosine Vector Engine",
      database: "In-memory Vector Store con persistencia atómica local mediante tempfile y os.replace",
      highlightsEs: [
        "Indexación semántica de reglamentos FIA y telemetría de carrera con embeddings gemini-embedding-001 (3072D).",
        "Persistencia de caché atómica mediante tempfile y os.replace garantizando cero corrupción en lecturas concurrentes.",
        "Clasificación estructurada Pydantic V2 (positivo, negativo, neutro, mixto, ironía y pertinencia) y suite de pruebas Pytest."
      ],
      highlightsEn: [
        "Semantic indexing of telemetry and FIA sporting regulations with 3072-dimensional vector embeddings.",
        "Atomic filesystem cache persistence using tempfile/os.replace preventing race condition corruptions.",
        "Structured Pydantic V2 classification (sentiment, irony, relevance) backed by 13 automated Pytest test cases."
      ],
      specs: [
        { key: "Backend", val: "Python 3.12 / Streamlit" },
        { key: "Embeddings", val: "Gemini 3072D Vector" },
        { key: "Orquestador", val: "LangChain Core / Google GenAI" },
        { key: "Testing", val: "Pytest (13 tests unitarios)" }
      ]
    }
  },
  {
    id: "sica-acme",
    category: "desktop",
    featured: false,
    title: "SICA-ACME",
    subtitle: "Sistema de Control de Acceso & Auditoría Inmutable",
    summaryEs: "Software desktop de alta integridad para control de acceso, flujo de visitas mediante máquina de estados y auditoría inmutable en tiempo real.",
    summaryEn: "Desktop security and access control system enforcing deterministic visitor lifecycles via finite state machines and cryptographic audit trails.",
    image: "img/sica-acme.png",
    gallery: ["img/sica-acme.png"],
    tags: ["Java 21", "JavaFX", "PostgreSQL", "FXML", "State Machine"],
    repoUrl: "https://github.com/Cristixn04/SICA-ACME",
    demoUrl: null,
    architecture: {
      pattern: "Model-View-Controller (MVC) + Finite State Machine",
      database: "PostgreSQL 16 con triggers de auditoría inmutable",
      highlightsEs: [
        "Máquina de estados finitos que valida transiciones de acceso (INGRESO -> ACTIVO -> EN_MORA -> EGRESO).",
        "Pistas de auditoría forense inmutables con timestamps atómicos y registro criptográfico de firmas.",
        "Manejo de concurrencia y pool de conexiones optimizado mediante JDBC directo sin sobrecarga de ORMs."
      ],
      highlightsEn: [
        "Finite State Machine enforcing deterministic visitor lifecycles (ENTRY -> ACTIVE -> OVERDUE -> EXIT).",
        "Immutable forensic audit trails with atomic timestamps and cryptographic record signing.",
        "Optimized connection pooling and concurrent thread safety using direct JDBC with zero ORM bloat."
      ],
      specs: [
        { key: "Lenguaje", val: "Java 21 LTS" },
        { key: "UI Engine", val: "JavaFX 21 + SceneBuilder" },
        { key: "DB Engine", val: "PostgreSQL 16" },
        { key: "Arquitectura", val: "State Pattern / MVC" }
      ]
    }
  },
  {
    id: "acme-bank",
    category: "web",
    featured: false,
    title: "ACME Bank Core",
    subtitle: "Motor Bancario Web Transaccional",
    summaryEs: "Plataforma de servicios financieros con autenticación, validación de saldos en tiempo real, transferencias interbancarias y pago de facturas.",
    summaryEn: "Financial core banking application featuring authenticated sessions, real-time balance reconciliation, interbank transfers, and utility payments.",
    image: "img/acme-bank.png",
    gallery: ["img/acme-bank.png"],
    tags: ["JavaScript ES6+", "HTML5 Semántico", "CSS Architecture", "State Management"],
    repoUrl: "https://github.com/Cristixn04/ACME-BANK-PROYECT",
    demoUrl: "https://cristixn04.github.io/ACME-BANK-PROYECT/",
    architecture: {
      pattern: "Modular Vanilla Architecture with Reactive State Dispatcher",
      database: "LocalStorage Engine con hashing de PIN y aislamiento de cuentas",
      highlightsEs: [
        "Algoritmo de reconciliación transaccional con reversión automática en caso de saldo insuficiente.",
        "Histórico de movimientos paginado con filtros por fecha, tipo de movimiento y monto.",
        "Arquitectura 100% nativa sin dependencias externas, logrando puntuación de 100/100 en Lighthouse."
      ],
      highlightsEn: [
        "Transactional reconciliation algorithm with atomic rollback upon balance mismatch or validation failure.",
        "Paginated ledger history with real-time filters by timestamp, transfer type, and amount.",
        "100% zero-dependency frontend achieving a clean 100/100 Lighthouse performance benchmark."
      ],
      specs: [
        { key: "Core", val: "Modern JavaScript (ES6+)" },
        { key: "Seguridad", val: "Session token isolation" },
        { key: "Performance", val: "Lighthouse 100/100" },
        { key: "Despliegue", val: "GitHub Pages CDN" }
      ]
    }
  }
];

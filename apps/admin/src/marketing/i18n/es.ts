import type { LandingMessages } from "@/marketing/i18n/types"

export const es = {
  common: {
    home: "Inicio",
    tryFree: "Pruébelo gratis",
    viewPricing: "Ver precios",
    seePricing: "Ver precios",
    startFree: "Empezar gratis",
    contactUs: "Contáctenos",
    noCreditCard: "Sin tarjeta de crédito",
    cancelAnytime: "Cancele cuando quiera",
    noCreditCardCancelAnytime:
      "Sin tarjeta de crédito. Cancele cuando quiera.",
    commonQuestions: "Preguntas frecuentes",
    relatedResources: "Recursos relacionados",
    featured: "Destacado",
    latestBlogPosts: "Últimos artículos del blog",
    productResources: "Recursos del producto",
    readComparison: "Leer la comparación",
    viewSolution: "Ver la solución",
    seeFullFeatureList: "Ver todas las funciones",
  },
  setupPrompts: {
    title: "Deje que su asistente de IA lo configure",
    intro:
      "Copie un prompt y péguelo en su asistente. Lee nuestra documentación, le muestra un plan y se detiene cuando lo necesita.",
    copy: "Copiar prompt",
    copied: "Copiado",
    blocked: "Su navegador bloqueó la copia. Copie el prompt desde aquí:",
  },
  routes: {
    "/": {
      title: "Recepcionista con IA para pequeñas empresas | Ringwise",
      description:
        "Ringwise atiende las llamadas de su negocio 24/7, agenda citas en su calendario y transfiere las urgentes a su equipo. Código abierto, con plan gratuito.",
    },
    "/features/": {
      title: "Funciones de recepcionista con IA: llamadas, citas y alertas",
      description:
        "Conozca las funciones de Ringwise para atender llamadas, reservar citas, transferir llamadas, avisar al dueño y resumir cada conversación.",
    },
    "/pricing/": {
      title: "Precios de recepcionista con IA para pequeñas empresas",
      description:
        "Compare los planes Free, Starter, Pro y Enterprise de Ringwise: minutos de voz, facturación anual, alertas por SMS y tarifas por uso adicional.",
    },
    "/pricing/self-hosted/": {
      title: "Precios de la recepcionista con IA autoalojada | Ringwise",
      description:
        "Aloje gratis la recepcionista con IA de Ringwise con todas sus funciones, o añada Soporte Premium o Enterprise por correo o Slack y ayuda al actualizar.",
    },
    "/solutions/": {
      title: "Soluciones de recepcionista con IA | Ringwise",
      description:
        "Encuentre la recepcionista con IA de Ringwise para atender llamadas, reservar citas, cubrir fuera de horario, servicios del hogar, clínicas dentales, salones o autoalojamiento.",
    },
    "/solutions/ai-phone-answering/": {
      title: "Atención telefónica con IA para pequeñas empresas | Ringwise",
      description:
        "Atienda las llamadas de su negocio 24/7 con Ringwise. Califique a quien llama, recoja sus datos, reserve citas y pase las urgencias a la persona indicada.",
    },
    "/solutions/ai-appointment-scheduler/": {
      title: "Agenda de citas con IA y atención telefónica | Ringwise",
      description:
        "Ringwise atiende el teléfono y agenda citas. Reserva durante la llamada, toma los datos de quien llama, envía confirmaciones y deriva las urgencias.",
    },
    "/solutions/ai-receptionist-for-home-services/": {
      title: "Atención telefónica con IA para servicios del hogar | Ringwise",
      description:
        "Ringwise atiende las llamadas de climatización, plomería, electricidad, techos y jardinería mientras sus equipos están en la obra.",
    },
    "/missed-call-revenue-calculator/": {
      title: "Calculadora de ingresos perdidos por llamadas | Ringwise",
      description:
        "Calcule los ingresos semanales, mensuales y anuales en riesgo por llamadas perdidas, y cuánto podría recuperar con una recepcionista 24/7.",
    },
    "/blog/": {
      title: "Blog y novedades de Ringwise",
      description:
        "Novedades del producto y guías prácticas sobre recepcionistas con IA, atención telefónica, reserva de citas y automatización de llamadas para pequeñas empresas.",
    },
    "/changelog/": {
      title: "Registro de cambios de Ringwise",
      description:
        "Siga las versiones de Ringwise: mejoras de la recepcionista con IA, cambios en el panel, integraciones de reservas y telefonía, y nuevos flujos.",
    },
    "/docs/api/": {
      title: "Documentación de la API pública de Ringwise",
      description:
        "Consulte los endpoints públicos de Ringwise, metadatos OpenAPI, estado del servicio, grafos JSON-LD, RSS, recursos Markdown y documentación de integración.",
    },
    "/privacy/": {
      title: "Política de privacidad - Ringwise",
      description:
        "Política de privacidad de Ringwise: datos de llamadas, SMS, consentimiento, citas, cuentas, facturación, analíticas y soporte.",
    },
    "/cookie-policy/": {
      title: "Política de cookies - Ringwise",
      description:
        "Política de cookies de Ringwise: cookies necesarias, almacenamiento de analíticas, controles del navegador y preferencias de cookies.",
    },
    "/terms/": {
      title: "Términos del servicio - Ringwise",
      description:
        "Términos del servicio de Ringwise, la plataforma de recepcionista con IA para llamadas, alertas por SMS, reservas y transferencia de llamadas.",
    },
    "/search/": {
      title: "Búsqueda - Ringwise",
      description:
        "Busque en las páginas de Ringwise, artículos del blog, recursos del producto, precios y documentación pública para agentes.",
    },
    "/features/mcp/": {
      title: "Servidor MCP de recepcionista con IA para Claude y ChatGPT | Ringwise",
      description:
        "Conecte Claude, ChatGPT, Cursor o VS Code al servidor MCP de recepcionista con IA de Ringwise. Revise llamadas, reserve citas y cambie contactos y horarios.",
    },
    "/white-label/": {
      title: "Recepcionista IA de marca blanca y código abierto | Ringwise",
      description:
        "Revenda una recepcionista con IA de marca blanca con la marca y el dominio de su agencia. Cobre a sus clientes en su propio Stripe y empiece gratis.",
    },
    "/affiliate-program/": {
      title: "Programa de afiliados de Ringwise | 20% de comisión",
      description:
        "Recomiende los planes alojados de Ringwise y gane el 20% de sus pagos durante 12 meses. Sus referidos ahorran un 5% al registrarse. Pagos mensuales por PayPal.",
    },
    "/404/": {
      title: "Página no encontrada - Ringwise",
      description:
        "No encontramos la página de Ringwise que buscaba. Use la búsqueda o vuelva a la página de inicio.",
    },
  },
} satisfies LandingMessages

import type { LandingMessages } from "@/marketing/i18n/types"

export const fr = {
  common: {
    home: "Accueil",
    tryFree: "Essayer gratuitement",
    viewPricing: "Voir les tarifs",
    seePricing: "Voir les tarifs",
    startFree: "Commencer gratuitement",
    contactUs: "Nous contacter",
    noCreditCard: "Aucune carte bancaire requise",
    cancelAnytime: "Annulation possible à tout moment",
    noCreditCardCancelAnytime:
      "Aucune carte bancaire requise. Annulation possible à tout moment.",
    commonQuestions: "Questions fréquentes",
    relatedResources: "Ressources liées",
    featured: "À la une",
    latestBlogPosts: "Derniers articles",
    productResources: "Ressources produit",
    readComparison: "Lire la comparaison",
    viewSolution: "Voir la solution",
    seeFullFeatureList: "Voir toutes les fonctionnalités",
  },
  setupPrompts: {
    title: "Laissez votre assistant IA s'en charger",
    intro:
      "Copiez un prompt et collez-le dans votre assistant. Il lit notre documentation, vous montre un plan et s'arrête quand il a besoin de vous.",
    copy: "Copier le prompt",
    copied: "Copié",
    blocked: "Votre navigateur a bloqué la copie. Copiez le prompt ici :",
  },
  routes: {
    "/": {
      title: "Ringwise | Réceptionniste IA open source",
      description:
        "Ringwise est le réceptionniste IA open source qui répond aux appels, qualifie les demandes, planifie des rendez‑vous et transfère les urgences 24/7.",
    },
    "/features/": {
      title: "Fonctionnalités de réceptionniste IA",
      description:
        "Découvrez comment Ringwise répond aux appels, qualifie les demandes, planifie les rendez-vous, envoie des alertes SMS et transfère les urgences.",
    },
    "/pricing/": {
      title: "Tarifs de réceptionniste IA pour petites entreprises",
      description:
        "Comparez les forfaits Free, Starter, Pro et Enterprise de Ringwise, avec minutes vocales, facturation annuelle, SMS et dépassements transparents.",
    },
    "/pricing/self-hosted/": {
      title: "Tarifs de la réceptionniste IA auto-hébergée | Ringwise",
      description:
        "Auto-hébergez gratuitement la réceptionniste IA de Ringwise avec toutes ses fonctions, ou ajoutez le Support Premium ou Enterprise par courriel ou Slack.",
    },
    "/solutions/": {
      title: "Solutions de réceptionniste IA | Ringwise",
      description:
        "Explorez les solutions Ringwise pour répondre au téléphone, prendre des rendez‑vous, couvrir les appels hors horaires et servir les équipes de services.",
    },
    "/solutions/ai-phone-answering/": {
      title: "Réponse téléphonique IA pour petites entreprises",
      description:
        "Répondez aux appels 24/7 avec Ringwise, recueillez les détails, planifiez les rendez-vous et transférez les demandes urgentes à la bonne personne.",
    },
    "/solutions/ai-appointment-scheduler/": {
      title: "Planificateur de rendez‑vous IA pour petites entreprises",
      description:
        "Planifiez des rendez-vous pendant les appels avec Ringwise, vérifiez les disponibilités, recueillez les détails et envoyez les confirmations.",
    },
    "/solutions/ai-receptionist-for-home-services/": {
      title: "Réceptionniste IA pour services à domicile | Ringwise",
      description:
        "Ringwise répond aux appels de CVC, plomberie, électricité, toiture et autres services pendant que vos équipes travaillent sur le terrain.",
    },
    "/missed-call-revenue-calculator/": {
      title: "Calculateur de revenu perdu par appels manqués | Ringwise",
      description:
        "Estimez le revenu hebdomadaire, mensuel et annuel à risque lorsque votre entreprise manque des appels prêts à réserver.",
    },
    "/blog/": {
      title: "Blog et mises à jour produit Ringwise",
      description:
        "Mises à jour produit et guides pratiques sur les réceptionnistes IA, la réponse téléphonique, la prise de rendez‑vous et l’automatisation des appels.",
    },
    "/changelog/": {
      title: "Journal Ringwise du réceptionniste IA",
      description:
        "Suivez les versions Ringwise : réception téléphonique IA, tableau de bord, réservation, intégrations de téléphonie et nouveaux flux de travail.",
    },
    "/docs/api/": {
      title: "Documentation API publique Ringwise",
      description:
        "Explorez les endpoints publics Ringwise, les métadonnées OpenAPI, le statut, les graphes JSON-LD, le flux RSS et les ressources Markdown.",
    },
    "/privacy/": {
      title: "Politique de confidentialité - Ringwise",
      description:
        "Politique de confidentialité de Ringwise, couvrant appels, SMS, consentement, rendez‑vous, comptes, facturation, analytique et support.",
    },
    "/cookie-policy/": {
      title: "Politique relative aux cookies - Ringwise",
      description:
        "Politique relative aux cookies de Ringwise, couvrant cookies nécessaires, stockage analytique, contrôles navigateur et préférences cookies.",
    },
    "/terms/": {
      title: "Conditions d'utilisation - Ringwise",
      description:
        "Conditions d’utilisation de Ringwise, plateforme de réceptionniste IA pour appels, alertes SMS, prise de rendez‑vous et transferts d’appels.",
    },
    "/search/": {
      title: "Recherche - Ringwise",
      description:
        "Recherchez dans les pages Ringwise, les articles, les ressources produit, les tarifs et la documentation publique.",
    },
    "/features/mcp/": {
      title: "Serveur MCP de réceptionniste IA pour Claude et ChatGPT | Ringwise",
      description:
        "Connectez Claude, ChatGPT, Cursor ou VS Code au serveur MCP de réceptionniste IA de Ringwise. Consultez vos appels, réservez et modifiez contacts et heures.",
    },
    "/white-label/": {
      title: "Réceptionniste IA open source en marque blanche | Ringwise",
      description:
        "Revendez une réceptionniste IA en marque blanche sous le nom et le domaine de votre agence. Facturez vos clients sur votre Stripe et commencez gratuitement.",
    },
    "/affiliate-program/": {
      title: "Programme d'affiliation Ringwise | 20 % de commission",
      description:
        "Recommandez les forfaits Ringwise : recevez 20 % pendant 12 mois, offrez 5 % de réduction et obtenez des paiements PayPal mensuels.",
    },
    "/404/": {
      title: "Page introuvable - Ringwise",
      description:
        "La page Ringwise demandée est introuvable. Lancez une recherche ou revenez à l’accueil.",
    },
  },
} satisfies LandingMessages

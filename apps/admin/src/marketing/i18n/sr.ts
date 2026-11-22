import type { LandingMessages } from "@/marketing/i18n/types"

export const sr = {
  common: {
    home: "Početna",
    tryFree: "Isprobajte besplatno",
    viewPricing: "Pogledajte cene",
    seePricing: "Pogledajte cene",
    startFree: "Počnite besplatno",
    contactUs: "Kontaktirajte nas",
    noCreditCard: "Bez platne kartice",
    cancelAnytime: "Otkažite kad god želite",
    noCreditCardCancelAnytime:
      "Bez platne kartice. Otkažite kad god želite.",
    commonQuestions: "Česta pitanja",
    relatedResources: "Povezani resursi",
    featured: "Izdvojeno",
    latestBlogPosts: "Najnoviji članci",
    productResources: "Resursi o proizvodu",
    readComparison: "Pročitajte poređenje",
    viewSolution: "Pogledajte rešenje",
    seeFullFeatureList: "Pogledajte sve funkcije",
  },
  setupPrompts: {
    title: "Neka vaš AI asistent sve podesi",
    intro:
      "Kopirajte prompt i nalepite ga u svog asistenta. Pročitaće našu dokumentaciju, pokazati vam plan i stati kada mu zatrebate.",
    copy: "Kopiraj prompt",
    copied: "Kopirano",
    blocked: "Pregledač je blokirao kopiranje. Kopirajte prompt odavde:",
  },
  routes: {
    "/": {
      title: "AI recepcioner za mala preduzeća | Ringwise",
      description:
        "Ringwise se javlja na pozive Vaše firme 24/7, zakazuje termine u Vaš kalendar i preusmerava hitne pozive Vašem timu. Otvoren kod, uz besplatan paket.",
    },
    "/features/": {
      title: "Funkcije AI recepcionera za pozive, termine i obaveštenja",
      description:
        "Upoznajte funkcije Ringwise-a za javljanje na telefon, zakazivanje termina, preusmeravanje poziva, obaveštenja za vlasnika i rezimee poziva.",
    },
    "/pricing/": {
      title: "Cene AI recepcionera za mala preduzeća",
      description:
        "Uporedite Ringwise pakete Free, Starter, Pro i Enterprise: minuti razgovora, godišnja naplata, SMS obaveštenja i cene dodatne potrošnje.",
    },
    "/pricing/self-hosted/": {
      title: "Cene AI recepcionera za samostalno hostovanje | Ringwise",
      description:
        "Hostujte Ringwise AI recepcionera sami i besplatno, sa svim funkcijama, ili dodajte Premium ili Enterprise podršku putem e-pošte ili Slacka.",
    },
    "/solutions/": {
      title: "Rešenja sa AI recepcionerom | Ringwise",
      description:
        "Pronađite Ringwise AI recepcionera za javljanje na pozive, zakazivanje, pozive van radnog vremena, kućne usluge, stomatološke ordinacije, salone ili samostalno hostovanje.",
    },
    "/solutions/ai-phone-answering/": {
      title: "AI javljanje na telefon za mala preduzeća | Ringwise",
      description:
        "Javljajte se na poslovne pozive 24/7 uz Ringwise. Proverite pozivaoce, zabeležite podatke, zakažite termine i preusmerite hitne pozive pravoj osobi.",
    },
    "/solutions/ai-appointment-scheduler/": {
      title: "AI zakazivanje termina i javljanje na pozive | Ringwise",
      description:
        "Ringwise se javlja na telefon i zakazuje termine tokom poziva. Beleži podatke pozivalaca, šalje potvrde i preusmerava hitne zahteve.",
    },
    "/solutions/ai-receptionist-for-home-services/": {
      title: "AI javljanje na pozive za kućne usluge | Ringwise",
      description:
        "Ringwise je AI servis za javljanje na pozive za timove kućnih usluga. Prima pozive za klimatizaciju, vodoinstalacije, struju, krovove i baštu dok su ekipe na terenu.",
    },
    "/missed-call-revenue-calculator/": {
      title: "Kalkulator prihoda izgubljenog zbog propuštenih poziva",
      description:
        "Procenite nedeljni, mesečni i godišnji prihod koji gubite zbog propuštenih poziva i koliko biste mogli da vratite uz recepcionera 24/7.",
    },
    "/blog/": {
      title: "Ringwise blog i novosti o proizvodu",
      description:
        "Novosti o Ringwise-u i praktični vodiči o AI recepcionerima, javljanju na telefon, zakazivanju termina i automatizaciji poziva za mala preduzeća.",
    },
    "/changelog/": {
      title: "Dnevnik izmena Ringwise AI recepcionera",
      description:
        "Pratite Ringwise izdanja: poboljšanja AI recepcionera, izmene kontrolne table, integracije za zakazivanje i telefoniju i nove tokove rada.",
    },
    "/docs/api/": {
      title: "Dokumentacija javnog Ringwise API-ja",
      description:
        "Pregledajte javne Ringwise endpointe, OpenAPI metapodatke, status servisa, JSON-LD grafove, RSS, Markdown resurse i dokumentaciju za integracije.",
    },
    "/privacy/": {
      title: "Politika privatnosti - Ringwise",
      description:
        "Politika privatnosti Ringwise-a: podaci o pozivima, SMS porukama, saglasnostima, terminima, nalozima, naplati, analitici i podršci.",
    },
    "/cookie-policy/": {
      title: "Politika kolačića - Ringwise",
      description:
        "Politika kolačića Ringwise-a: neophodni kolačići, skladištenje analitike, podešavanja pregledača i podešavanja kolačića.",
    },
    "/terms/": {
      title: "Uslovi korišćenja - Ringwise",
      description:
        "Uslovi korišćenja Ringwise-a, platforme sa AI recepcionerom za pozive, SMS obaveštenja, zakazivanje termina i preusmeravanje poziva.",
    },
    "/search/": {
      title: "Pretraga - Ringwise",
      description:
        "Pretražite Ringwise stranice, članke sa bloga, resurse o proizvodu, cene i javnu dokumentaciju za AI agente.",
    },
    "/features/mcp/": {
      title: "MCP server za AI recepcionera za Claude i ChatGPT | Ringwise",
      description:
        "Povežite Claude, ChatGPT, Cursor ili VS Code sa Ringwise MCP serverom za AI recepcionera. Pregledajte pozive, zakazujte i menjajte kontakte i radno vreme.",
    },
    "/white-label/": {
      title: "White-label AI recepcioner otvorenog koda | Ringwise",
      description:
        "Prodajte white-label AI recepcionera pod brendom i domenom svoje agencije. Naplaćujte klijentima preko svog Stripe-a i počnite besplatno.",
    },
    "/affiliate-program/": {
      title: "Ringwise program preporuka | 20% provizije",
      description:
        "Preporučite hostovane Ringwise pakete i zaradite 20% njihovih uplata tokom 12 meseci. Preporučeni klijenti štede 5% pri registraciji. Mesečne isplate preko PayPal-a.",
    },
    "/404/": {
      title: "Stranica nije pronađena - Ringwise",
      description:
        "Nismo pronašli Ringwise stranicu koju ste tražili. Pretražite sajt ili se vratite na početnu stranicu.",
    },
  },
} satisfies LandingMessages

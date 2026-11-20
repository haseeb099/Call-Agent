import { GoogleIcon } from "@/marketing/components/GoogleIcon"
import { ButtonLink } from "@/marketing/components/system/ButtonLink"
import { appSignupUrl } from "@/marketing/lib/app-links"
import { getCopy, type Locale } from "@/marketing/i18n"
import type { ReactNode } from "react"

type HeroSectionProps = {
  children?: ReactNode
  locale?: Locale
}

const heroCopy = {
  en: {
    eyebrow: "AI front desk",
    h1Start: "Your AI front desk",
    h1Emphasis: "never misses",
    h1End: "a call.",
    googleSignup: "Sign up with Google",
    body: "Ringwise answers the phone, books the appointment, and hands the urgent calls to a person. The desk stays open after you lock the door.",
  },
  fr: {
    eyebrow: "Accueil IA",
    h1Start: "Votre accueil IA",
    h1Emphasis: "ne manque",
    h1End: "aucun appel.",
    googleSignup: "S’inscrire avec Google",
    body: "Ringwise répond au téléphone, réserve le rendez-vous et passe les appels urgents à une personne. Le standard reste ouvert après la fermeture.",
  },
  es: {
    eyebrow: "Recepción con IA",
    h1Start: "Su recepción con IA",
    h1Emphasis: "no deja pasar",
    h1End: "ninguna llamada.",
    googleSignup: "Regístrese con Google",
    body: "Ringwise atiende el teléfono, reserva la cita y pasa las llamadas urgentes a una persona. La recepción sigue abierta después de cerrar.",
  },
  sr: {
    eyebrow: "AI prijem",
    h1Start: "Vaš AI prijem",
    h1Emphasis: "ne propušta",
    h1End: "nijedan poziv.",
    googleSignup: "Registrujte se preko Google naloga",
    body: "Ringwise se javlja na telefon, zakazuje termin i hitne pozive prebacuje osobi. Prijem ostaje otvoren i pošto zaključate lokal.",
  },
} satisfies Record<Locale, Record<string, string>>

export function HeroSection({ children, locale = "en" }: HeroSectionProps) {
  const copy = getCopy(locale)
  const localCopy = heroCopy[locale]

  return (
    <section
      className="relative overflow-x-clip"
      id="hero"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top_left,oklch(0.9_0.05_55),transparent_62%)]" />
      <div className="relative mx-auto w-full max-w-site px-6 pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="grid min-w-0 items-center gap-8 md:gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-16">
          <div className="max-w-3xl min-w-0 text-left">
            <p className="animate-fade-up mb-4 font-sans text-[0.72rem] font-semibold tracking-[0.2em] text-primary uppercase">{localCopy.eyebrow}</p>
            <h1 className="animate-fade-up display-heading">
              {localCopy.h1Start} <span className="text-primary">{localCopy.h1Emphasis}</span> {localCopy.h1End}
            </h1>

            <p className="animate-fade-up mt-4 max-w-[34.5rem] text-lg leading-[1.6] text-muted-foreground stagger-2">
              {localCopy.body}
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap gap-2.5 stagger-3">
              <ButtonLink
                href={appSignupUrl(locale)}
                data-ph-signup-cta
                data-ph-capture-attribute-section="hero"
                data-ph-capture-attribute-action="try_for_free"
                data-ph-capture-attribute-destination={appSignupUrl(locale)}
              >
                {copy.common.tryFree}
              </ButtonLink>
              <ButtonLink
                href={appSignupUrl(locale, { google: true })}
                variant="secondary"
                data-ph-signup-cta
                data-ph-capture-attribute-section="hero"
                data-ph-capture-attribute-action="sign_up_google"
                data-ph-capture-attribute-destination={appSignupUrl(locale, { google: true })}
              >
                <GoogleIcon className="size-4" />
                {localCopy.googleSignup}
              </ButtonLink>
            </div>
            <p className="animate-fade-up fine-print mt-5 stagger-4">
              {copy.common.noCreditCard}
            </p>
          </div>

          <div className="animate-fade-up mx-auto flex w-full max-w-[22rem] min-w-0 justify-center stagger-5 md:max-w-[30rem] xl:mr-0 xl:max-w-[28rem]">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

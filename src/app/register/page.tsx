'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './preview.module.css'

const journeys = {
  worker: {
    label: 'Care worker', intro: 'See how you can review an offer and keep your provider connections together.',
    steps: [
      { title: 'Review an offer', description: 'Read the role, location, hours and proposed terms before deciding. This screenshot shows the prototype’s review screen; the button inside the image is not interactive.', image: 'worker-offer.png', alt: 'Worker prototype showing fictional offer terms and a review acceptance screen' },
      { title: 'See your connections', description: 'After an offer is accepted in the prototype, the provider appears in My Providers. The example records an engagement; it does not create a roster or an employment contract.', image: 'worker-providers.png', alt: 'Worker prototype My Providers screen showing a fictional confirmed engagement with Hunter Care Services' },
    ],
  },
  provider: {
    label: 'Care provider', intro: 'See how your team can follow recruitment, explore worker matches and view confirmed engagements.',
    steps: [
      { title: 'Your recruitment overview', description: 'The provider home screen brings workers awaiting review, interviews and outstanding offers into one overview.', image: 'provider-home.png', alt: 'Provider prototype dashboard with fictional organisation details and recruitment activity' },
      { title: 'Explore worker matches', description: 'Review example matches against a role, work area and availability. Match scores and eligibility labels here are fictional prototype results, not verified assessments.', image: 'provider-candidates.png', alt: 'Provider prototype showing fictional worker matches and filters' },
      { title: 'View your team connections', description: 'An accepted offer appears in the provider’s Team view and the worker’s My Providers view. Roster Ready is a demo status, not a live compliance or hiring approval.', image: 'provider-team.png', alt: 'Provider prototype Team screen showing fictional worker Alex Taylor and a confirmed engagement' },
    ],
  },
}

type Role = keyof typeof journeys

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('worker')
  const [step, setStep] = useState(0)
  useEffect(() => {
    const syncRole = () => {
      setRole(window.location.hash === '#provider' ? 'provider' : 'worker')
      setStep(0)
    }
    syncRole()
    window.addEventListener('hashchange', syncRole)
    return () => window.removeEventListener('hashchange', syncRole)
  }, [])
  const journey = journeys[role]
  const screen = journey.steps[step]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Central Alliance Care home"><img src="/home-assets/central-alliance-logo.png" alt="Central Alliance Care" width="848" height="722" /></Link>
        <Link href="/">← Back to website</Link>
      </header>
      <main>
        <section className={styles.intro}>
          <span className={styles.eyebrow}>A LOOK INSIDE CENTRAL ALLIANCE CARE</span>
          <h1>See how care<br />connections come together.</h1>
          <p>Explore screens from our current app prototype. Choose a worker or provider view to see how the journey works.</p>
          <div className={styles.notice}><strong>App preview · no signup required</strong><span>These are screenshots, not a live service. All people, organisations, offers and verification statuses shown are fictional demo data. No account is created or personal information collected on this page.</span></div>
        </section>
        <section className={styles.explorer} aria-label="Explore the app prototype">
          <div className={styles.guide}>
            <div className={styles.roles} aria-label="Choose app view">
              {(Object.keys(journeys) as Role[]).map(value => <button key={value} aria-pressed={role === value} onClick={() => { setRole(value); setStep(0) }}>{journeys[value].label}</button>)}
            </div>
            <h2>{journey.label} preview</h2>
            <p>{journey.intro}</p>
            <div className={styles.steps} aria-label="Choose a screenshot">
              {journey.steps.map((item, index) => <button key={item.image} aria-pressed={step === index} aria-controls="app-screen" onClick={() => setStep(index)}><span>{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span><span aria-hidden="true">→</span></button>)}
            </div>
            <div className={styles.description} aria-live="polite"><span className={styles.eyebrow}>SCREEN {step + 1} OF {journey.steps.length}</span><h3>{screen.title}</h3><p>{screen.description}</p><a href={'/app-preview/' + screen.image} target="_blank" rel="noopener noreferrer">Open full-size screenshot ↗</a></div>
          </div>
          <figure className={styles.figure} id="app-screen"><div className={styles.phone}><img src={'/app-preview/' + screen.image} alt={screen.alt} width="1206" height="2622" /></div><figcaption>{journey.label} · {screen.title}<br />Screenshot from the iOS prototype</figcaption></figure>
        </section>
        <section className={styles.overview}><span className={styles.eyebrow}>THE WIDER JOURNEY</span><h2>From a profile to a working relationship.</h2><div><article><b>01 · Introduce yourself</b><p>Workers share experience and availability. Providers describe their organisation and opportunities.</p></article><article><b>02 · Get to know each other</b><p>Review profiles, discuss the role and arrange an interview.</p></article><article><b>03 · Agree on the next step</b><p>Review offer details and keep the confirmed connection visible to both parties.</p></article></div><p className={styles.footnote}>The current iOS prototype runs locally on one device. Live registration, cross-device communication and production verification are not demonstrated by these screenshots.</p></section>
      </main>
      <footer className={styles.footer}><span>Central Alliance Care · App preview</span><Link href="/">Return to website ↑</Link></footer>
    </div>
  )
}

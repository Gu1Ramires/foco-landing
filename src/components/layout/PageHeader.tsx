import BlurText from '../fx/BlurText'
import Reveal from '../fx/Reveal'
import './pages.css'

/** Cabeçalho padrão das páginas internas (eyebrow + título + texto). */
export default function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="page-header container">
      <p className="eyebrow">{eyebrow}</p>
      <BlurText as="h1" className="section-title" text={title} />
      <Reveal delay={0.2}><p className="lead">{text}</p></Reveal>
    </header>
  )
}

import { motion } from 'motion/react'
import ScrollRevealText from '../fx/ScrollRevealText'
import Reveal from '../fx/Reveal'
import { pillars } from '../../data/content'
import './home.css'

/**
 * Anexos 5 e 6 — Uma frase grande por pilar, revelada no scroll.
 * A letra gigante faz o papel da foto da câmera; a frase acende palavra
 * por palavra; embaixo, números à esquerda e detalhes à direita.
 */
export default function Pillars() {
  return (
    <section className="pillars">
      {pillars.map((p, i) => (
        <article key={p.word} className="pillar" style={{ ['--pc' as string]: p.color }}>
          <div className="container pillar-inner">
            <motion.div
              className="pillar-letter"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              {p.letter}
              <span className="pillar-index">0{i + 1}</span>
            </motion.div>

            <p className="eyebrow pillar-eyebrow">{p.eyebrow}</p>
            <ScrollRevealText className="section-title pillar-title" text={p.title} />

            <Reveal><p className="lead pillar-text">{p.text}</p></Reveal>

            <Reveal className="pillar-grid" delay={0.1}>
              <div className="pillar-stats">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <strong>{s.value}</strong>
                    <small>{s.label}</small>
                  </div>
                ))}
              </div>
              <div className="pillar-details">
                {p.details.map((d) => (
                  <div key={d.title}>
                    <h4>{d.title}</h4>
                    {d.lines.map((l) => <p key={l}>{l}</p>)}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </article>
      ))}
    </section>
  )
}

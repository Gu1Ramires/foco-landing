import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/fx/Reveal'
import { pillars } from '../data/content'
import '../components/layout/pages.css'

/** Página 2 — o método F.O.C.O: os 4 pilares e a base em metacognição. */
export default function Metodo() {
  return (
    <>
      <PageHeader
        eyebrow="O método"
        title="Quatro pilares. Um jeito de estudar."
        text="F.O.C.O é a sigla de Filtrar, Organizar, Concentrar e Observar. Cada pilar vira uma parte do sistema, e juntos eles formam um ciclo que você repete toda semana."
      />

      <section className="container method-cycle">
        {pillars.map((p, i) => (
          <motion.article
            key={p.word}
            className="method-card"
            style={{ ['--pc' as string]: p.color }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -6 }}
          >
            <span className="method-letter">{p.letter}</span>
            <h3>{p.word}</h3>
            <p className="method-title">{p.title}</p>
            <p>{p.text}</p>
            <ul>
              {p.details.map((d) => <li key={d.title}><strong>{d.title}:</strong> {d.lines[0]}</li>)}
            </ul>
          </motion.article>
        ))}
      </section>

      <section className="container split">
        <Reveal>
          <p className="eyebrow">A base científica</p>
          <h2 className="split-title">Metacognição: pensar sobre como você aprende.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead">
            Pesquisas em psicologia cognitiva mostram que quem <strong>planeja, monitora e avalia</strong> o próprio estudo aprende melhor.
            O F.O.C.O transforma esse ciclo em ações simples: escolher prioridades (planejar), registrar sessões (monitorar) e olhar o Dashboard (avaliar).
          </p>
        </Reveal>
      </section>

      <section className="container callout">
        <Reveal>
          <h2 className="split-title">Não punitivo, por princípio.</h2>
          <p className="lead">
            Muitos apps de estudo punem dias parados com sequências que zeram e alertas de culpa. O F.O.C.O faz o contrário:
            <strong> nada se perde quando você para</strong>, e voltar é sempre o próximo passo natural.
          </p>
          <Link to="/funcionalidades" className="link-arrow" style={{ marginTop: 20 }}>Ver as funcionalidades →</Link>
        </Reveal>
      </section>
    </>
  )
}

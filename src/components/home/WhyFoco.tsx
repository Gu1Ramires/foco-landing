import { motion } from 'motion/react'
import BlurText from '../fx/BlurText'
import CountUp from '../fx/CountUp'
import Reveal from '../fx/Reveal'
import { FocoCard } from '../ui/Visuals'
import './home.css'

/**
 * Anexo 3 — Para que serve e por que usar.
 * Título curto e grande, parágrafo com palavras-chave em gradiente,
 * três números animados e os cards de Foco abrindo em leque.
 */
const fan = [
  { name: 'Inglês para TI', tag: 'Idiomas', progress: 45, color: '#b48cff', rotate: -10, x: -150 },
  { name: 'React + TypeScript', tag: 'Programação', progress: 72, color: '#f5b83d', rotate: 0, x: 0, star: true },
  { name: 'Banco de Dados', tag: 'Faculdade', progress: 30, color: '#5fd4a4', rotate: 10, x: 150 },
]

export default function WhyFoco() {
  return (
    <section className="why">
      <div className="container why-inner">
        <p className="eyebrow">Por que usar o F.O.C.O</p>
        <BlurText as="h2" className="section-title why-title" text="Muitos interesses. Um foco por vez." />

        <Reveal delay={0.1}>
          <p className="lead why-text">
            O F.O.C.O é uma <strong>plataforma de gestão de estudos</strong> para quem quer aprender muita coisa e acaba não avançando em nenhuma.
            Baseado em <span className="grad-1">psicologia cognitiva e metacognição</span>, ele ajuda você a
            <span className="grad-2"> escolher o que estudar agora</span>, registrar cada sessão e
            <span className="grad-3"> enxergar o próprio progresso</span>. Sem sequências que quebram, sem culpa:
            <strong> recomeçar faz parte do método.</strong>
          </p>
        </Reveal>

        <div className="why-divider" />

        <div className="why-stats">
          <div><small>Método com</small><strong><CountUp to={4} /> pilares</strong><small>Filtrar, Organizar, Concentrar, Observar</small></div>
          <div><small>Destaque para</small><strong><CountUp to={1} /> Foco principal</strong><small>com a Estrela Dourada</small></div>
          <div><small>Design com</small><strong><CountUp to={0} from={9} /> punições</strong><small>por dias sem estudar</small></div>
        </div>

        <div className="why-fan">
          {fan.map((c, i) => (
            <motion.div
              key={c.name}
              className="why-fan-card"
              initial={{ opacity: 0, x: 0, rotate: 0, y: 60 }}
              whileInView={{ opacity: 1, x: c.x, rotate: c.rotate, y: i === 1 ? -20 : 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 * i }}
              style={{ zIndex: i === 1 ? 2 : 1 }}
            >
              <FocoCard {...c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

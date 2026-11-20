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
// Leque com a pilha real: Estrela no meio, 2ª e 3ª posições nas laterais
const fan = [
  { name: 'Inglês para TI', hours: 31, goal: 168, color: '#a77bff', rotate: -10, x: -150 },
  { name: 'React + TypeScript', hours: 52, goal: 168, color: '#f5b83d', rotate: 0, x: 0, star: true },
  { name: 'Banco de Dados', hours: 9, goal: 168, color: '#3ecf8e', rotate: 10, x: 150 },
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
            <span className="grad-3"> enxergar o próprio progresso</span>. Sem ícones vermelhos nem avisos de "não concluído":
            <strong> um Foco deixado de lado vai para o Laboratório de Sonhos, com todas as horas guardadas.</strong>
          </p>
        </Reveal>

        <div className="why-divider" />

        <div className="why-stats">
          <div><small>Método com</small><strong><CountUp to={4} /> pilares</strong><small>Filtrar, Organizar, Concentrar, Observar</small></div>
          <div><small>Destaque para</small><strong><CountUp to={3} /> Focos</strong><small>no Top 3 da sua pilha</small></div>
          <div><small>Liberada com</small><strong><CountUp to={10} /> h de estudo</strong><small>a Estrela só vai para quem tem constância</small></div>
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

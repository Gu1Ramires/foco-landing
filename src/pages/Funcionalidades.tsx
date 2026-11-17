import { motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import { highlights, type Highlight } from '../data/content'
import { DashboardVisual, FocosVisual, LabVisual, StarVisual, Top3Visual, TimerVisual } from '../components/ui/Visuals'
import '../components/layout/pages.css'

/**
 * Página 3 — Funcionalidades em "bento grid" (inspirado no Magic Bento
 * do React Bits): um brilho segue o mouse dentro de cada card.
 */
const visuals: Record<Highlight['visual'], () => React.ReactNode> = {
  focos: () => <FocosVisual />,
  top3: () => <Top3Visual />,
  estrela: () => <StarVisual />,
  timer: () => <TimerVisual size={200} />,
  lab: () => <LabVisual />,
  dashboard: () => <DashboardVisual />,
}

export default function Funcionalidades() {
  // Atualiza as variáveis --mx/--my com a posição do mouse no card
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <>
      <PageHeader
        eyebrow="Funcionalidades"
        title="Tudo o que você precisa. Nada que distraia."
        text="Seis recursos pensados para a jornada do aluno, do primeiro Foco criado até o gráfico da semana."
      />

      <section className="container bento">
        {highlights.map((h, i) => (
          <motion.article
            key={h.id}
            className={`bento-card bento-${i}`}
            style={{ ['--tint' as string]: h.tint }}
            onMouseMove={onMove}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
          >
            <div className="bento-text">
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </div>
            <div className="bento-visual">{visuals[h.visual]()}</div>
          </motion.article>
        ))}
      </section>
    </>
  )
}

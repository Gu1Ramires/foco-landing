import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { highlights, type Highlight } from '../../data/content'
import { ObservarVisual, FocosVisual, LabVisual, StarVisual, Top3Visual, TimerVisual } from '../ui/Visuals'
import Modal from '../ui/Modal'
import VideoFrame from '../ui/VideoFrame'
import './home.css'

/**
 * Anexo 2 — "Comece pelos destaques."
 * Carrossel com avanço automático. O tempo de cada slide é controlado pela
 * animação CSS da barrinha de progresso: quando ela termina (onAnimationEnd),
 * vamos para o próximo slide. Pausar = pausar a animação CSS.
 * Também dá para arrastar com o dedo/mouse e clicar nos pontinhos.
 */
const SLIDE_MS = 5000

const visuals: Record<Highlight['visual'], () => React.ReactNode> = {
  focos: () => <FocosVisual />,
  top3: () => <Top3Visual />,
  estrela: () => <StarVisual />,
  timer: () => <TimerVisual />,
  lab: () => <LabVisual />,
  observar: () => <ObservarVisual />,
}

export default function Highlights() {
  const [index, setIndex] = useState(0)
  // Com "reduzir movimento" ligado, o carrossel começa pausado (RN31.2)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(!reduce)
  const [videoOpen, setVideoOpen] = useState(false)
  const dragStart = useRef<number | null>(null)

  const go = (i: number) => setIndex((i + highlights.length) % highlights.length)
  const next = () => go(index + 1)

  // Swipe: guarda onde o dedo começou e compara com onde terminou
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const delta = e.clientX - dragStart.current
    if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1))
    dragStart.current = null
  }

  return (
    <section className="highlights" id="destaques">
      <div className="container highlights-head">
        <h2 className="section-title">Comece pelos destaques.</h2>
        <button className="link-arrow" onClick={() => setVideoOpen(true)}>
          Assistir ao vídeo <span className="play-ic">▶</span>
        </button>
      </div>

      <div className="hl-viewport" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div className="hl-track" style={{ ['--i' as string]: index }}>
          {highlights.map((h, i) => (
            <article
              key={h.id}
              className={`hl-slide ${i === index ? 'is-active' : ''}`}
              style={{ ['--tint' as string]: h.tint }}
              onClick={() => i !== index && go(i)}
              aria-hidden={i !== index}
            >
              <p className="hl-text"><strong>{h.title}.</strong> {h.text}</p>
              <div className="hl-visual">
                {/* key muda quando o slide fica ativo → o visual anima de novo */}
                <AnimatePresence mode="wait">
                  {i === index && (
                    <motion.div key={`v-${index}`} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                      {visuals[h.visual]()}
                    </motion.div>
                  )}
                </AnimatePresence>
                {i !== index && <div className="hl-visual-ghost">{visuals[h.visual]()}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hl-controls">
        <div className="hl-dots" role="tablist" aria-label="Destaques">
          {highlights.map((h, i) => (
            <button
              key={h.id}
              role="tab"
              aria-selected={i === index}
              aria-label={h.title}
              className={`hl-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
            >
              {i === index && (
                <span
                  key={index}
                  className="hl-dot-fill"
                  style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: playing ? 'running' : 'paused' }}
                  onAnimationEnd={next}
                />
              )}
            </button>
          ))}
        </div>
        <button className="hl-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pausar' : 'Reproduzir'}>
          {playing ? '❚❚' : '▶'}
        </button>
      </div>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)}>
        <VideoFrame
          src="/videos/foco-demo.mp4"
          controls
          fallback={
            <div className="modal-fallback">
              <TimerVisual live size={240} />
              <p>O vídeo de demonstração entra aqui (public/videos/foco-demo.mp4).</p>
            </div>
          }
        />
      </Modal>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { palette } from '../../data/content'
import './ui.css'

/**
 * Visuals — "imagens" do produto desenhadas em HTML/CSS.
 * Enquanto não temos prints e vídeos reais do F.O.C.O, estes mocks fazem o
 * papel das fotos do iPhone na página da Apple. Eles seguem as regras da
 * monografia: Estrela em dourado na 1ª posição (RN10.2), posições 2 e 3 com
 * a cor escolhida (RN10.3), 4ª em diante neutra (RN10.4), Laboratório em
 * cinza com a data de arquivamento (RN10.5).
 */

type SampleFoco = { name: string; hours: number; goal: number; color: string; star?: boolean }

export const sampleFocos: SampleFoco[] = [
  { name: 'React + TypeScript', hours: 52, goal: 168, color: palette.dourado, star: true },
  { name: 'Inglês para TI', hours: 31, goal: 168, color: palette.roxo },
  { name: 'Banco de Dados', hours: 9, goal: 168, color: palette.verde },
  { name: 'Figma', hours: 4, goal: 168, color: palette.neutro },
  { name: 'Japonês', hours: 2, goal: 336, color: palette.neutro },
]

/** Progresso = horas ÷ meta × 100, arredondado para baixo (RN10.1). */
const progressOf = (f: { hours: number; goal: number }) => Math.min(100, Math.floor((f.hours / f.goal) * 100))

export function FocoCard({ name, hours, goal, color, star, compact }: SampleFoco & { compact?: boolean }) {
  const progress = progressOf({ hours, goal })
  return (
    <div className={`foco-card ${star ? 'is-star' : ''} ${compact ? 'is-compact' : ''}`} style={{ ['--c' as string]: star ? palette.dourado : color }}>
      <div className="foco-card-top">
        <strong>{name}</strong>
        {star && <span className="foco-star" title="Estrela Dourada">★</span>}
      </div>
      <div className="foco-bar"><span style={{ width: `${Math.max(progress, 2)}%` }} /></div>
      <small>{hours} h de {goal} h · {progress}%</small>
    </div>
  )
}

export function FocosVisual() {
  return (
    <div className="v-stack">
      {sampleFocos.slice(0, 3).map((f, i) => (
        <motion.div key={f.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, duration: 0.6 }}>
          <FocoCard {...f} />
        </motion.div>
      ))}
    </div>
  )
}

export function Top3Visual() {
  return (
    <div className="v-top3">
      {sampleFocos.slice(0, 4).map((f, i) => (
        <motion.div
          key={f.name}
          className={`v-top3-item ${i === 3 ? 'is-neutral' : ''}`}
          style={{ ['--c' as string]: f.color }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12 * i, type: 'spring' }}
        >
          <span className="v-top3-n">{i + 1}</span>
          <span>{f.name}</span>
          {f.star && <span className="foco-star">★</span>}
        </motion.div>
      ))}
      <div className="v-top3-rest">Do 4º Foco em diante: cor neutra</div>
    </div>
  )
}

/** Estrela: mostra as condições para recebê-la (RN13.1 a RN13.3). */
export function StarVisual() {
  const reduce = useReducedMotion()
  const checks = ['Está no Top 3', '12 h de estudo (mínimo de 10 h)', 'Nenhuma outra Estrela em uso']
  return (
    <div className="v-star">
      <motion.div
        className="v-star-glow"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <span className="v-star-icon">★</span>
      <ul className="v-star-checks">
        {checks.map((c, i) => (
          <motion.li key={c} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.15 }}>
            <span>✓</span> {c}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Anel do timer. Se `live`, conta de verdade (usado na seção de vídeo).
 * Com "reduzir movimento" ligado no sistema, fica parado (RN31.2).
 */
export function TimerVisual({ live = false, size = 260 }: { live?: boolean; size?: number }) {
  const reduce = useReducedMotion()
  const total = 25 * 60
  const [left, setLeft] = useState(total - 7 * 60 - 18)
  useEffect(() => {
    if (!live || reduce) return
    const id = setInterval(() => setLeft((s) => (s <= 0 ? total : s - 1)), 1000)
    return () => clearInterval(id)
  }, [live, reduce, total])

  const r = 46
  const circ = 2 * Math.PI * r
  const pct = left / total
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="v-timer" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} className="v-timer-track" />
        <circle cx="50" cy="50" r={r} className="v-timer-bar" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} />
      </svg>
      <div className="v-timer-center">
        <span className="v-timer-time">{mm}:{ss}</span>
        <span className="v-timer-label">React + TypeScript</span>
      </div>
    </div>
  )
}

/** Laboratório: Focos arquivados em cinza, com data e horas preservadas. */
export function LabVisual() {
  const archived = [
    { name: 'Aprender piano', hours: 14, date: '02/11' },
    { name: 'Fotografia', hours: 6, date: '18/10' },
    { name: 'Three.js', hours: 3, date: '27/09' },
  ]
  return (
    <div className="v-lab">
      {archived.map((f, i) => (
        <motion.div key={f.name} className="v-lab-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
          <div>
            <strong>{f.name}</strong>
            <small>{f.hours} h preservadas · arquivado em {f.date}</small>
          </div>
          {i === 0 && <span className="v-lab-btn">Resgatar e praticar</span>}
        </motion.div>
      ))}
    </div>
  )
}

/** Observar: indicadores, tempo por semana e mapa de constância (RN23.2). */
export function ObservarVisual() {
  const weeks = [35, 60, 45, 80, 55, 90]
  // 12 semanas × 7 dias, com intensidade "aleatória" fixa
  const days = Array.from({ length: 84 }, (_, i) => ((i * 37) % 11) % 4)
  return (
    <div className="v-obs">
      <div className="v-obs-kpis">
        <div><strong>12 h 40</strong><small>esta semana</small></div>
        <div><strong>18</strong><small>sessões</small></div>
        <div><strong>5 dias</strong><small>sequência atual</small></div>
      </div>
      <div className="v-obs-row">
        <div className="v-obs-bars" aria-label="Tempo por semana">
          {weeks.map((h, i) => (
            <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.06, duration: 0.7 }} />
          ))}
        </div>
        <div className="v-obs-map" aria-label="Mapa de constância">
          {days.map((d, i) => <span key={i} className={`l${d}`} />)}
        </div>
      </div>
    </div>
  )
}

/**
 * AppPreview — uma "janela" do F.O.C.O usada no seletor (anexo 4).
 * Mostra a pilha de Focos e ressalta a parte escolhida nas pílulas.
 */
export function AppPreview({ accent, focus }: { accent: string; focus: string }) {
  const stack = sampleFocos.map((f, i) => (i === 1 ? { ...f, color: accent } : f))
  const highlight = (i: number) =>
    (focus === 'estrela' && i === 0) ||
    (focus === 'cores' && i === 1) ||
    (focus === 'top3' && i < 3) ||
    focus === 'posicao'

  return (
    <div className="app-preview">
      <div className="app-bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="app-url">seufoco.com.br</span>
      </div>
      <div className="app-body">
        <aside className="app-side">
          <strong className="app-logo">F.O.C.O</strong>
          {['Organizar', 'Concentrar', 'Observar'].map((i, n) => (
            <span key={i} className={n === 0 ? 'on' : ''}>{i}</span>
          ))}
        </aside>
        <main className="app-main">
          <span className="app-label">Sua pilha de Focos</span>
          <ol className="app-stack">
            {stack.map((f, i) => (
              <motion.li key={f.name} layout className={`app-stack-item ${highlight(i) ? 'is-focus' : ''} ${i === 0 && focus === 'posicao' ? 'is-locked' : ''}`}>
                <span className="app-pos">{i + 1}º</span>
                <FocoCard {...f} compact />
              </motion.li>
            ))}
          </ol>
          <div className={`app-section ${focus === 'lab' ? 'is-focus' : ''}`}>
            <span className="app-label">Laboratório de Sonhos</span>
            <p className="app-lab-line">Aprender piano · 14 h · arquivado em 02/11</p>
          </div>
        </main>
      </div>
    </div>
  )
}

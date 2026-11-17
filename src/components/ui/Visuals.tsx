import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import './ui.css'

/**
 * Visuals — "imagens" do produto desenhadas em HTML/CSS.
 * Enquanto não temos prints e vídeos reais do F.O.C.O, estes mocks fazem o
 * papel das fotos do iPhone na página da Apple. Depois é só trocar por
 * <img> ou <video> com as telas reais.
 */

const sampleFocos = [
  { name: 'React + TypeScript', tag: 'Programação', progress: 72, color: '#7aa2ff', star: true },
  { name: 'Inglês para TI', tag: 'Idiomas', progress: 45, color: '#b48cff' },
  { name: 'Banco de Dados', tag: 'Faculdade', progress: 30, color: '#5fd4a4' },
]

export function FocoCard({ name, tag, progress, color, star, dim }: { name: string; tag: string; progress: number; color: string; star?: boolean; dim?: boolean }) {
  return (
    <div className={`foco-card ${dim ? 'is-dim' : ''}`} style={{ ['--c' as string]: color }}>
      <div className="foco-card-top">
        <span className="foco-tag">{tag}</span>
        {star && <span className="foco-star" title="Estrela Dourada">★</span>}
      </div>
      <strong>{name}</strong>
      <div className="foco-bar"><span style={{ width: `${progress}%` }} /></div>
      <small>{progress}% do objetivo</small>
    </div>
  )
}

export function FocosVisual() {
  return (
    <div className="v-stack">
      {sampleFocos.map((f, i) => (
        <motion.div key={f.name} initial={{ opacity: 0, y: 30, rotate: -4 + i * 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, duration: 0.6 }}>
          <FocoCard {...f} star={false} />
        </motion.div>
      ))}
    </div>
  )
}

export function Top3Visual() {
  return (
    <div className="v-top3">
      {[1, 2, 3].map((n, i) => (
        <motion.div key={n} className="v-top3-item" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.12 * i, type: 'spring' }}>
          <span className="v-top3-n">{n}</span>
          <span>{sampleFocos[i].name}</span>
        </motion.div>
      ))}
      <div className="v-top3-rest">+ 7 Focos guardados</div>
    </div>
  )
}

export function StarVisual() {
  return (
    <div className="v-star">
      <motion.div className="v-star-glow" animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />
      <span className="v-star-icon">★</span>
      <div className="v-star-lock">🔒 Travada por 10h · faltam 06:42</div>
    </div>
  )
}

/** Anel do timer. Se `live`, conta de verdade (usado na seção de vídeo). */
export function TimerVisual({ live = false, size = 260 }: { live?: boolean; size?: number }) {
  const total = 25 * 60
  const [left, setLeft] = useState(total - 7 * 60 - 18)
  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setLeft((s) => (s <= 0 ? total : s - 1)), 1000)
    return () => clearInterval(id)
  }, [live, total])

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

export function LabVisual() {
  const ideas = ['Aprender piano', 'Curso de Figma', 'Japonês', 'Fotografia', 'Three.js']
  return (
    <div className="v-lab">
      {ideas.map((t, i) => (
        <motion.span key={t} className="v-bubble" animate={{ y: [0, -10, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}>
          {t}
        </motion.span>
      ))}
    </div>
  )
}

export function DashboardVisual() {
  const bars = [40, 65, 30, 80, 55, 90, 70]
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
  return (
    <div className="v-dash">
      <div className="v-dash-kpis">
        <div><strong>12h40</strong><small>esta semana</small></div>
        <div><strong>18</strong><small>sessões</small></div>
      </div>
      <div className="v-dash-bars">
        {bars.map((h, i) => (
          <div key={i} className="v-dash-col">
            <motion.span initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.06, duration: 0.7 }} />
            <small>{days[i]}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * AppPreview — uma "janela" do F.O.C.O usada no seletor (anexo 4).
 * Recebe tema, cor de destaque e qual parte ressaltar.
 */
export function AppPreview({ theme, accent, focus }: { theme: 'dark' | 'light'; accent: string; focus: string }) {
  return (
    <div className={`app-preview theme-${theme}`} style={{ ['--accent' as string]: accent }}>
      <div className="app-bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="app-url">seufoco.com.br/painel</span>
      </div>
      <div className="app-body">
        <aside className="app-side">
          <strong className="app-logo">F.O.C.O</strong>
          {['Painel', 'Focos', 'Timer', 'Laboratório', 'Dashboard'].map((i, n) => (
            <span key={i} className={n === 0 ? 'on' : ''}>{i}</span>
          ))}
        </aside>
        <main className="app-main">
          <p className="app-hello">Bom estudo! 👋</p>
          <div className={`app-section ${focus === 'top3' || focus === 'cores' ? 'is-focus' : ''}`}>
            <span className="app-label">Top 3</span>
            <div className="app-cards">
              {sampleFocos.map((f, i) => (
                <FocoCard key={f.name} {...f} color={i === 0 ? accent : f.color} star={i === 0 && (focus === 'estrela' || focus === 'tema' || focus === 'cores' || focus === 'top3')} />
              ))}
            </div>
          </div>
          <div className="app-row">
            <div className={`app-section ${focus === 'estrela' ? 'is-focus' : ''}`}>
              <span className="app-label">Estrela Dourada</span>
              <p className="app-star-line">★ React + TypeScript · travada por 10h</p>
            </div>
            <div className={`app-section ${focus === 'lab' ? 'is-focus' : ''}`}>
              <span className="app-label">Laboratório de Sonhos</span>
              <p className="app-lab-line">Piano · Figma · Japonês</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

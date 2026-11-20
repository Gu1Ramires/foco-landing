import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import TrueFocus from '../fx/TrueFocus'
import { appLinks, pillars } from '../../data/content'
import './home.css'

/**
 * Anexo 1 — Hero.
 * No lugar do "PRO" cromado da Apple, o "FOCO" cromado com o efeito
 * TrueFocus: uma letra fica nítida por vez e embaixo aparece o pilar
 * correspondente (Filtrar → Organizar → Concentrar → Observar).
 */
export default function Hero() {
  const [active, setActive] = useState(0)
  const handleChange = useCallback((i: number) => setActive(i), [])
  const pillar = pillars[active]

  return (
    <section className="hero">
      {/* brilho de fundo que muda de cor com o pilar ativo */}
      <motion.div className="hero-glow" animate={{ background: `radial-gradient(circle at 50% 45%, ${pillar.color}33, transparent 60%)` }} transition={{ duration: 0.8 }} />

      <div className="hero-stage">
        <TrueFocus
          letters={pillars.map((p) => p.letter)}
          colors={pillars.map((p) => p.color)}
          onChange={handleChange}
        />

        <div className="hero-word" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={pillar.word}
              style={{ color: pillar.color }}
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.35 }}
            >
              {pillar.word}
            </motion.span>
          </AnimatePresence>
        </div>

      </div>

      <div className="container hero-bottom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
          <p className="hero-name">F.O.C.O</p>
          <h1 className="hero-title">Estude com foco.</h1>
        </motion.div>

        <motion.div className="hero-cta" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <span>
            <strong>Comece agora</strong>
            <small>Plataforma de gestão de estudos</small>
          </span>
          <Link to={appLinks.criarConta} className="btn btn-primary">Criar conta</Link>
        </motion.div>
      </div>
    </section>
  )
}

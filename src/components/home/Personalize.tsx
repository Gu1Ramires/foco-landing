import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppPreview } from '../ui/Visuals'
import Reveal from '../fx/Reveal'
import './home.css'

/**
 * Anexo 4 — Seletor que muda a prévia em tempo real.
 * Igual aos botões "Cores / Em dois tamanhos..." da Apple: você clica numa
 * pílula, ela se abre com a explicação e a janela do app à direita reage.
 */
const options = [
  { id: 'tema', label: 'Tema claro ou escuro', text: 'Estude de dia ou de madrugada. O painel acompanha você.' },
  { id: 'cores', label: 'Cores dos Focos', text: 'Cada Foco tem a sua cor, para você reconhecer de longe.' },
  { id: 'top3', label: 'Top 3', text: 'Só três Focos em destaque. O resto espera sem pesar.' },
  { id: 'estrela', label: 'Estrela Dourada', text: 'O Foco principal fica marcado e travado por 10 horas.' },
  { id: 'lab', label: 'Laboratório de Sonhos', text: 'As ideias que não cabem agora ficam guardadas aqui.' },
]

const swatches = ['#f5b83d', '#7aa2ff', '#b48cff', '#5fd4a4', '#ff7a7a']

export default function Personalize() {
  const [open, setOpen] = useState('tema')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [accent, setAccent] = useState(swatches[0])

  return (
    <section className="personalize">
      <div className="container">
        <p className="eyebrow">Personalização</p>
        <h2 className="section-title">Seu painel.<br />Do seu jeito.</h2>

        <Reveal className="pz-box">
          <ul className="pz-list">
            {options.map((o) => {
              const isOpen = open === o.id
              return (
                <motion.li key={o.id} layout className={`pz-pill ${isOpen ? 'is-open' : ''}`} transition={{ type: 'spring', stiffness: 400, damping: 34 }}>
                  <button className="pz-pill-btn" onClick={() => setOpen(o.id)} aria-expanded={isOpen}>
                    <motion.span className="pz-ic" layout>{isOpen ? '–' : '+'}</motion.span>
                    <motion.span layout>{o.label}</motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="pz-body" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <p>{o.text}</p>
                        {o.id === 'tema' && (
                          <div className="pz-seg" role="radiogroup">
                            {(['dark', 'light'] as const).map((t) => (
                              <button key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)} role="radio" aria-checked={theme === t}>
                                {t === 'dark' ? 'Escuro' : 'Claro'}
                              </button>
                            ))}
                          </div>
                        )}
                        {o.id === 'cores' && (
                          <div className="pz-swatches">
                            {swatches.map((c) => (
                              <button key={c} style={{ background: c }} className={accent === c ? 'on' : ''} onClick={() => setAccent(c)} aria-label={`Cor ${c}`} />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </ul>

          <div className="pz-preview">
            <AppPreview theme={theme} accent={accent} focus={open} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

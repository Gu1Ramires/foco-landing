import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppPreview } from '../ui/Visuals'
import Reveal from '../fx/Reveal'
import { palette } from '../../data/content'
import './home.css'

/**
 * Anexo 4 — Seletor que muda a prévia em tempo real.
 * Igual aos botões "Cores / Em dois tamanhos..." da Apple: você clica numa
 * pílula, ela se abre com a explicação e a pilha de Focos à direita reage.
 * Tudo aqui segue as regras do Organizar (RF10 a RF15).
 */
const options = [
  { id: 'cores', label: 'Cores dos Focos', text: 'Escolha a cor de cada Foco. Ela aparece enquanto ele estiver no Top 3.' },
  { id: 'top3', label: 'Top 3', text: 'As três primeiras posições ganham destaque. Do 4º Foco em diante, cor neutra.' },
  { id: 'estrela', label: 'Estrela Dourada', text: 'A prioridade máxima fica fixa no topo, em dourado. Só um Foco do Top 3 com 10 h ou mais de estudo pode recebê-la.' },
  { id: 'posicao', label: 'Mudar posição', text: 'Você decide a ordem da pilha escolhendo a nova posição de cada Foco. O 1º lugar fica reservado à Estrela.' },
  { id: 'lab', label: 'Laboratório de Sonhos', text: 'Arquive um Foco que ficou para depois. As horas e o histórico continuam guardados.' },
]

// Cores da paleta da plataforma (RN12.1). Sem dourado (RN12.3) e sem
// laranja/vermelho (RN12.5).
const swatches = [
  { name: 'Azul', value: palette.azul },
  { name: 'Roxo', value: palette.roxo },
  { name: 'Verde', value: palette.verde },
  { name: 'Ciano', value: palette.ciano },
  { name: 'Rosa', value: palette.rosa },
]

export default function Personalize() {
  const [open, setOpen] = useState('cores')
  const [accent, setAccent] = useState(palette.roxo)

  return (
    <section className="personalize">
      <div className="container">
        <p className="eyebrow">Organizar</p>
        <h2 className="section-title">Sua pilha.<br />Suas prioridades.</h2>

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
                        {o.id === 'cores' && (
                          <div className="pz-swatches">
                            {swatches.map((c) => (
                              <button key={c.value} style={{ background: c.value }} className={accent === c.value ? 'on' : ''} onClick={() => setAccent(c.value)} aria-label={c.name} title={c.name} />
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
            <AppPreview accent={accent} focus={open} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

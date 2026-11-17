import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import CountUp from '../fx/CountUp'
import Reveal from '../fx/Reveal'
import { compareFeatures, compareOptions, type CompareId } from '../../data/content'
import './home.css'

/**
 * Anexo 8 — "Vale trocar? Pode apostar."
 * A pessoa escolhe como estuda hoje e cada card mostra se aquele método
 * também oferece o recurso. Comparação honesta: sem números inventados.
 */
export default function Compare() {
  const [method, setMethod] = useState<CompareId>('caderno')
  const label = compareOptions.find((o) => o.id === method)!.label

  return (
    <section className="compare">
      <Reveal className="container cmp-box">
        <div className="cmp-head">
          <h2 className="cmp-title">Vale trocar?<br />Pode apostar.</h2>
          <label className="cmp-select">
            <span>Como você estuda hoje?</span>
            <select value={method} onChange={(e) => setMethod(e.target.value as CompareId)}>
              {compareOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </label>
        </div>

        <p className="cmp-sub">O que o <span className="grad-2">F.O.C.O</span> oferece:</p>

        <div className="cmp-grid">
          {compareFeatures.map((f) => {
            const has = f.has[method]
            return (
              <motion.div key={f.id} className="cmp-card" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                {f.big ? (
                  <strong className="cmp-big"><CountUp to={f.big.value} from={f.big.value === 0 ? 9 : 0} prefix={f.big.prefix} suffix={f.big.suffix} /></strong>
                ) : (
                  <span className="cmp-ic">✓</span>
                )}
                <p className="cmp-card-title">{f.title}</p>
                <small>{f.caption}</small>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={method}
                    className={`cmp-badge ${has ? 'yes' : 'no'}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {label}: {has ? 'também tem' : 'não tem'}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </Reveal>

      <div className="container final-cta">
        <h2 className="section-title center">Pronto para focar?</h2>
        <p className="lead center">Entre no beta e use o F.O.C.O de graça enquanto ele cresce.</p>
        <div className="final-actions">
          <Link to="/beta" className="btn btn-gold">Entrar no beta</Link>
          <Link to="/metodo" className="btn btn-ghost">Conhecer o método</Link>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { navLinks } from '../../data/content'
import './layout.css'

/**
 * Header com duas barras, igual à página da Apple:
 * 1) GlobalNav — fina, no topo, com os links das 5 páginas.
 * 2) LocalBar — a "pílula" flutuante "F.O.C.O · Explorar · Entrar no beta",
 *    que só aparece depois que você rola a página (fundo desfocado).
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const { pathname } = useLocation()

  // Fecha o menu mobile quando troca de página
  useEffect(() => setOpen(false), [pathname])

  // Mostra a barra flutuante depois de 500px de scroll
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="global-nav">
        <div className="container global-nav-inner">
          <Link to="/" className="brand" aria-label="F.O.C.O — início">
            <span className="brand-dot" /> F.O.C.O
          </Link>

          <nav className={`global-links ${open ? 'is-open' : ''}`} aria-label="Principal">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showBar && (
          <motion.div
            className="local-bar"
            initial={{ y: -80, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -80, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <strong>F.O.C.O</strong>
            <div className="local-bar-actions">
              <Link to="/funcionalidades" className="btn btn-ghost btn-sm">Explorar</Link>
              <Link to="/beta" className="btn btn-gold btn-sm">Entrar no beta</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

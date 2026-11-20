import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Metodo from './pages/Metodo'
import Funcionalidades from './pages/Funcionalidades'
import Sobre from './pages/Sobre'
import Comecar from './pages/Comecar'
import Entrar from './pages/Entrar'
import CriarConta from './pages/CriarConta'
import Termo from './pages/Termo'
import RecuperarSenha from './pages/RecuperarSenha'
import NaoConsigoAcessar from './pages/NaoConsigoAcessar'

/**
 * App — monta o layout (Header + página + Footer) e as 5 rotas.
 * A troca de página tem uma transição: a página antiga some com
 * desfoque e a nova aparece (AnimatePresence + key = caminho da URL).
 */
export default function App() {
  const location = useLocation()

  // Sempre que trocar de página, volta para o topo
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [location.pathname])

  return (
    // reducedMotion="user": se o sistema pedir menos movimento, o motion
    // desliga as animações de posição/escala (RNF11 e RN31.2)
    <MotionConfig reducedMotion="user">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/metodo" element={<Metodo />} />
            <Route path="/funcionalidades" element={<Funcionalidades />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/comecar" element={<Comecar />} />
            <Route path="/entrar" element={<Entrar />} />
            <Route path="/criar-conta" element={<CriarConta />} />
            <Route path="/termo" element={<Termo />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/nao-consigo-acessar" element={<NaoConsigoAcessar />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}

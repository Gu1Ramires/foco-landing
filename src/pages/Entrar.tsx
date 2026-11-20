import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import AuthLayout, { PasswordInput } from '../components/auth/AuthLayout'
import { appLinks } from '../data/content'
import { emailValido } from '../lib/senha'

/**
 * Entrar (RF02) — mesmos campos e links da tela de login do sistema.
 * Aqui a validação é só da tela: o login de verdade acontece no sistema,
 * com o Supabase. Quando a landing for integrada, o onSubmit chama o
 * Controller de autenticação do F.O.C.O.
 */
export default function Entrar() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [show, setShow] = useState(false)
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(false)
    // RN02.2: a mesma mensagem para qualquer problema nas credenciais
    if (!emailValido(email) || !senha) {
      setErro('E-mail ou senha inválidos.')
      return
    }
    setErro('')
    setEnviado(true)
  }

  return (
    <AuthLayout title="Entrar" subtitle="Bom te ver de novo. Continue de onde parou.">
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={!!erro} />
        </div>

        <div className="auth-field">
          <label htmlFor="senha">Senha</label>
          <PasswordInput id="senha" value={senha} onChange={setSenha} show={show} onToggle={() => setShow((v) => !v)} invalid={!!erro} autoComplete="current-password" />
        </div>

        <AnimatePresence>
          {erro && (
            <motion.p className="auth-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {erro}
            </motion.p>
          )}
        </AnimatePresence>

        <button type="submit" className="btn btn-primary auth-submit">Entrar</button>

        {enviado && (
          <p className="auth-note" role="status">Prévia da landing: no sistema, você entraria agora na sua área de Focos.</p>
        )}

        <div className="auth-links">
          <Link to={appLinks.recuperarSenha}>Esqueci minha senha</Link>
          <Link to={appLinks.suporte}>Não consigo acessar minha conta</Link>
        </div>

        <p className="auth-switch">Não tem conta? <Link to={appLinks.criarConta}>Cadastre-se</Link></p>
        <Link to="/" className="auth-back">← Voltar à página inicial</Link>
      </form>
    </AuthLayout>
  )
}

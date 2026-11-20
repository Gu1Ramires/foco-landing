import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { regrasDaSenha, forcaDaSenha } from '../../lib/senha'
import './auth.css'

/** Peças reaproveitadas pelos formulários de acesso (cadastro, recuperação, suporte). */

export function Field({ id, label, erro, children }: { id: string; label: string; erro?: string; children: ReactNode }) {
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      {children}
      <AnimatePresence>{erro && <ErrorText>{erro}</ErrorText>}</AnimatePresence>
    </div>
  )
}

export function ErrorText({ children }: { children: ReactNode }) {
  return (
    <motion.p className="auth-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      {children}
    </motion.p>
  )
}

/** Mensagem de sucesso em verde, como nas telas do sistema. */
export function SuccessText({ children }: { children: ReactNode }) {
  return (
    <motion.div className="auth-success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
      <span className="auth-success-ic">✓</span>
      {children}
    </motion.div>
  )
}

/** Texto de ajuda + barra de força + lista de requisitos da senha (RNF02). */
export function PasswordRules({ senha, nome = '', email = '', id }: { senha: string; nome?: string; email?: string; id?: string }) {
  const regras = regrasDaSenha(senha, nome, email)
  const forca = forcaDaSenha(senha, nome, email)
  return (
    <>
      <p className="auth-hint">8 a 20 caracteres, com letra maiúscula, letra minúscula e número, sem sequências (como 1234) e sem o seu nome ou e-mail.</p>
      {senha && (
        <div className="auth-strength" aria-live="polite">
          <div className="auth-strength-bar" data-level={forca.nivel}>
            {[1, 2, 3, 4].map((n) => <span key={n} className={n <= forca.nivel ? 'on' : ''} />)}
          </div>
          <small>{forca.rotulo}</small>
        </div>
      )}
      <ul id={id} className="auth-rules">
        {regras.map((r) => (
          <li key={r.id} className={r.ok ? 'ok' : ''}>
            <span aria-hidden>{r.ok ? '✓' : '•'}</span> {r.texto}
          </li>
        ))}
      </ul>
    </>
  )
}

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import './auth.css'

/**
 * AuthLayout — moldura das telas Entrar e Criar conta.
 * Um card centralizado sobre o fundo escuro, com o brilho azul da landing.
 */
export default function AuthLayout({ title, subtitle, children, wide }: { title: string; subtitle?: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className="auth">
      <div className="auth-glow" aria-hidden />
      <motion.div
        className={`auth-card ${wide ? 'is-wide' : ''}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="auth-brand"><img src="/brand-ring.png" alt="" className="brand-dot" /> F.O.C.O</p>
        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </motion.div>
    </section>
  )
}

/** Campo de senha com o botão de mostrar/ocultar (RN02.3). */
export function PasswordInput({
  id, value, onChange, show, onToggle, invalid, autoComplete, describedBy,
}: {
  id: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void
  invalid?: boolean; autoComplete: string; describedBy?: string
}) {
  return (
    <div className="auth-pass">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      />
      <button type="button" className="auth-eye" onClick={onToggle} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={show}>
        {show ? (
          <svg viewBox="0 0 24 24" aria-hidden><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 9 4.5 10 7-.4 1-1.3 2.4-2.6 3.7M6.2 6.2C4 7.6 2.6 9.7 2 12c1 2.5 5 7 10 7 1.7 0 3.3-.5 4.6-1.2" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden><path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7S3 14.5 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
        )}
      </button>
    </div>
  )
}

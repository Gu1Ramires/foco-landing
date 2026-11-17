import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import { compareOptions } from '../data/content'
import '../components/layout/pages.css'

/**
 * Página 5 — Cadastro no beta.
 * Formulário com validação simples e aceite da LGPD. Por enquanto ele não
 * envia para lugar nenhum: o próximo passo é gravar numa tabela do
 * Supabase (ex.: `beta_waitlist`).
 */
type Errors = Partial<Record<'nome' | 'email' | 'lgpd', string>>

export default function Beta() {
  const [form, setForm] = useState({ nome: '', email: '', metodo: 'caderno', lgpd: false })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const validate = (): Errors => {
    const e: Errors = {}
    if (form.nome.trim().length < 2) e.nome = 'Digite seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Digite um e-mail válido.'
    if (!form.lgpd) e.lgpd = 'É preciso aceitar para continuar.'
    return e
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Beta"
        title="Entre no beta do F.O.C.O."
        text="Cadastre-se para usar a plataforma de graça enquanto ela cresce. Você ajuda a moldar o produto com o seu uso real."
      />

      <section className="container beta-wrap">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form key="form" className="beta-form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}>
              <label className="field">
                <span>Nome</span>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" aria-invalid={!!errors.nome} />
                {errors.nome && <small className="err">{errors.nome}</small>}
              </label>

              <label className="field">
                <span>E-mail</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="voce@email.com" aria-invalid={!!errors.email} />
                {errors.email && <small className="err">{errors.email}</small>}
              </label>

              <label className="field">
                <span>Como você estuda hoje?</span>
                <select value={form.metodo} onChange={(e) => setForm({ ...form, metodo: e.target.value })}>
                  {compareOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
              </label>

              <label className="check">
                <input type="checkbox" checked={form.lgpd} onChange={(e) => setForm({ ...form, lgpd: e.target.checked })} />
                <span>Concordo com o uso dos meus dados para contato sobre o beta, conforme a LGPD (Lei 13.709/2018). Posso pedir a exclusão a qualquer momento.</span>
              </label>
              {errors.lgpd && <small className="err">{errors.lgpd}</small>}

              <button type="submit" className="btn btn-gold beta-submit">Quero entrar no beta</button>
            </motion.form>
          ) : (
            <motion.div key="ok" className="beta-ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
              <motion.span className="beta-ok-ic" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: 'spring' }}>★</motion.span>
              <h2>Tudo certo, {form.nome.split(' ')[0]}!</h2>
              <p>Você está na lista. Vamos avisar em {form.email} quando o seu acesso estiver liberado.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

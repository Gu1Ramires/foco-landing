import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import AuthLayout, { PasswordInput } from '../components/auth/AuthLayout'
import TermoModal from '../components/auth/TermoModal'
import { appLinks } from '../data/content'
import { emailValido, forcaDaSenha, regrasDaSenha } from '../lib/senha'

/**
 * Criar conta (RF01) — mesmos campos da tela de cadastro do sistema:
 * nome, e-mail, confirmar e-mail, senha, confirmar senha e aceite do Termo.
 * Regras aplicadas na tela:
 * - RN01.5: os e-mails precisam coincidir (sem diferenciar maiúsculas);
 * - RNF02: política de senha, com lista de requisitos e indicador de força;
 * - RF04: o Termo só pode ser aceito depois de lido até o fim.
 * O cadastro de verdade acontece no sistema, com o Supabase.
 */
type Campo = 'nome' | 'email' | 'email2' | 'senha' | 'senha2' | 'termo'

export default function CriarConta() {
  const [form, setForm] = useState({ nome: '', email: '', email2: '', senha: '', senha2: '' })
  const [show, setShow] = useState(false)
  const [aceitou, setAceitou] = useState(false)
  const [termoAberto, setTermoAberto] = useState(false)
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({})
  const [criada, setCriada] = useState(false)

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))
  const regras = regrasDaSenha(form.senha, form.nome, form.email)
  const forca = forcaDaSenha(form.senha, form.nome, form.email)

  const validar = () => {
    const e: Partial<Record<Campo, string>> = {}
    if (form.nome.trim().length < 2) e.nome = 'Digite o seu nome.'
    if (!emailValido(form.email)) e.email = 'Digite um e-mail válido.'
    if (form.email.trim().toLowerCase() !== form.email2.trim().toLowerCase()) e.email2 = 'Os e-mails não coincidem.'
    if (regras.some((r) => !r.ok)) e.senha = 'A senha não atende a todos os requisitos.'
    if (form.senha !== form.senha2) e.senha2 = 'As senhas não coincidem.'
    if (!aceitou) e.termo = 'Leia e aceite o Termo de Uso para continuar.'
    return e
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length === 0) {
      setCriada(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (criada) {
    return (
      <AuthLayout title="Conta criada!">
        <motion.div className="auth-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="auth-success-ic">✓</span>
          <p>Enviamos um e-mail de confirmação para <strong>{form.email}</strong>. Depois de confirmar, é só entrar e cadastrar o seu primeiro Foco.</p>
          <p className="auth-note">Prévia da landing: no sistema, a conta seria criada com o perfil Aluno.</p>
          <Link to={appLinks.entrar} className="btn btn-primary">Ir para o login</Link>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Leva menos de um minuto. Depois é só escolher o seu primeiro Foco.">
      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <Field id="nome" label="Nome" erro={erros.nome}>
          <input id="nome" value={form.nome} onChange={(e) => set('nome')(e.target.value)} autoComplete="name" aria-invalid={!!erros.nome} />
        </Field>

        <Field id="email" label="E-mail" erro={erros.email}>
          <input id="email" type="email" value={form.email} onChange={(e) => set('email')(e.target.value)} autoComplete="email" aria-invalid={!!erros.email} />
        </Field>

        <Field id="email2" label="Confirmar e-mail" erro={erros.email2}>
          <input id="email2" type="email" value={form.email2} onChange={(e) => set('email2')(e.target.value)} autoComplete="email" aria-invalid={!!erros.email2} />
        </Field>

        <Field id="senha" label="Senha" erro={erros.senha}>
          <PasswordInput id="senha" value={form.senha} onChange={set('senha')} show={show} onToggle={() => setShow((v) => !v)} invalid={!!erros.senha} autoComplete="new-password" describedBy="senha-regras" />
          <p className="auth-hint">8 a 20 caracteres, com letra maiúscula, letra minúscula e número, sem sequências (como 1234) e sem o seu nome ou e-mail.</p>

          {form.senha && (
            <div className="auth-strength" aria-live="polite">
              <div className="auth-strength-bar" data-level={forca.nivel}>
                {[1, 2, 3, 4].map((n) => <span key={n} className={n <= forca.nivel ? 'on' : ''} />)}
              </div>
              <small>{forca.rotulo}</small>
            </div>
          )}

          <ul id="senha-regras" className="auth-rules">
            {regras.map((r) => (
              <li key={r.id} className={r.ok ? 'ok' : ''}>
                <span aria-hidden>{r.ok ? '✓' : '•'}</span> {r.texto}
              </li>
            ))}
          </ul>
        </Field>

        <Field id="senha2" label="Confirmar senha" erro={erros.senha2}>
          <PasswordInput id="senha2" value={form.senha2} onChange={set('senha2')} show={show} onToggle={() => setShow((v) => !v)} invalid={!!erros.senha2} autoComplete="new-password" />
        </Field>

        <div className="auth-terms">
          <input
            id="termo"
            type="checkbox"
            checked={aceitou}
            // Marcar abre o Termo: o aceite só vale depois da leitura (RF04)
            onChange={(e) => (e.target.checked ? setTermoAberto(true) : setAceitou(false))}
          />
          <label htmlFor="termo">
            Li e aceito os{' '}
            <button type="button" className="auth-inline-link" onClick={() => setTermoAberto(true)}>
              Termos de Uso e Política de Privacidade
            </button>
          </label>
        </div>
        <AnimatePresence>{erros.termo && <ErrorText>{erros.termo}</ErrorText>}</AnimatePresence>

        <button type="submit" className="btn btn-primary auth-submit">Criar conta</button>

        <p className="auth-switch">Já tem conta? <Link to={appLinks.entrar}>Entrar</Link></p>
        <Link to="/" className="auth-back">← Voltar à página inicial</Link>
      </form>

      <TermoModal open={termoAberto} onClose={() => setTermoAberto(false)} onAccept={() => { setAceitou(true); setErros((e) => ({ ...e, termo: undefined })) }} />
    </AuthLayout>
  )
}

function Field({ id, label, erro, children }: { id: string; label: string; erro?: string; children: React.ReactNode }) {
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      {children}
      <AnimatePresence>{erro && <ErrorText>{erro}</ErrorText>}</AnimatePresence>
    </div>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <motion.p className="auth-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      {children}
    </motion.p>
  )
}

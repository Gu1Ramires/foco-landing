import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import AuthLayout from '../components/auth/AuthLayout'
import { Field, PasswordRules, SuccessText } from '../components/auth/FormBits'
import { appLinks } from '../data/content'
import { emailValido, regrasDaSenha } from '../lib/senha'

/**
 * Recuperar senha (RF06) — três etapas, como no sistema:
 * 1. informar o e-mail e pedir o código;
 * 2. digitar o código recebido e a nova senha;
 * 3. confirmação de senha redefinida.
 * Regras aplicadas na tela:
 * - a resposta é a mesma exista ou não a conta (não revela e-mails cadastrados);
 * - o código só pode ser reenviado depois de 60 segundos (RNF12);
 * - a nova senha segue a política do RNF02.
 * Aqui é só a prévia: no sistema, o código é enviado e conferido pelo Supabase.
 */
type Etapa = 'email' | 'codigo' | 'pronto'
const ESPERA = 60

export default function RecuperarSenha() {
  const [etapa, setEtapa] = useState<Etapa>('email')
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [espera, setEspera] = useState(0)
  const [erros, setErros] = useState<Record<string, string>>({})

  // Contagem regressiva do "Reenviar código"
  useEffect(() => {
    if (espera <= 0) return
    const id = setTimeout(() => setEspera((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [espera])

  const enviarCodigo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailValido(email)) return setErros({ email: 'Digite um e-mail válido.' })
    setErros({})
    setEtapa('codigo')
    setEspera(ESPERA)
  }

  const redefinir = (e: React.FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!/^\d{6}$/.test(codigo)) er.codigo = 'Digite o código de 6 números enviado ao seu e-mail.'
    if (regrasDaSenha(senha, '', email).some((r) => !r.ok)) er.senha = 'A senha não atende a todos os requisitos.'
    if (senha !== senha2) er.senha2 = 'As senhas não coincidem.'
    setErros(er)
    if (Object.keys(er).length === 0) {
      setEtapa('pronto')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle={
        etapa === 'email'
          ? 'Informe o e-mail da sua conta. Vamos enviar um código de verificação para redefinir a senha.'
          : etapa === 'codigo'
            ? 'Se houver uma conta com este e-mail, enviamos um código de verificação. Ele vale por 1 hora e só pode ser usado uma vez.'
            : undefined
      }
    >
      <AnimatePresence mode="wait">
        {etapa === 'email' && (
          <motion.form key="email" className="auth-form" onSubmit={enviarCodigo} noValidate {...fade}>
            <Field id="email" label="E-mail" erro={erros.email}>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={!!erros.email} />
            </Field>
            <button type="submit" className="btn btn-primary auth-submit">Enviar código</button>
            <Link to={appLinks.entrar} className="auth-back">← Voltar para o login</Link>
          </motion.form>
        )}

        {etapa === 'codigo' && (
          <motion.form key="codigo" className="auth-form" onSubmit={redefinir} noValidate {...fade}>
            <Field id="codigo" label="Código de verificação" erro={erros.codigo}>
              <input
                id="codigo"
                className="auth-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                aria-invalid={!!erros.codigo}
              />
            </Field>

            <Field id="senha" label="Nova senha" erro={erros.senha}>
              <input id="senha" type={mostrar ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" aria-invalid={!!erros.senha} aria-describedby="senha-regras" />
              <PasswordRules senha={senha} email={email} id="senha-regras" />
            </Field>

            <Field id="senha2" label="Confirmar nova senha" erro={erros.senha2}>
              <input id="senha2" type={mostrar ? 'text' : 'password'} value={senha2} onChange={(e) => setSenha2(e.target.value)} autoComplete="new-password" aria-invalid={!!erros.senha2} />
            </Field>

            <label className="auth-check">
              <input type="checkbox" checked={mostrar} onChange={(e) => setMostrar(e.target.checked)} />
              Mostrar senhas
            </label>

            <div className="auth-row">
              <button type="submit" className="btn btn-primary auth-submit">Redefinir senha</button>
              <button type="button" className="btn btn-ghost" disabled={espera > 0} onClick={() => setEspera(ESPERA)}>
                {espera > 0 ? `Reenviar código em ${espera}s` : 'Reenviar código'}
              </button>
            </div>

            <Link to={appLinks.entrar} className="auth-back">← Voltar para o login</Link>
          </motion.form>
        )}

        {etapa === 'pronto' && (
          <motion.div key="pronto" {...fade}>
            <SuccessText>
              <p className="auth-success-title">Senha redefinida. Você já está conectado.</p>
              <p className="auth-note">Prévia da landing: no sistema, este botão abre a sua área de Focos.</p>
              <a href={appLinks.plataforma} className="btn btn-primary">Entrar na plataforma</a>
            </SuccessText>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}

const fade = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.25 },
}

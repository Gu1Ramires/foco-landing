import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { Field, SuccessText } from '../components/auth/FormBits'
import { appLinks } from '../data/content'
import { emailValido } from '../lib/senha'

/**
 * Não consigo acessar minha conta (RF29, chamado sem login).
 * Para quem perdeu o acesso ao e-mail cadastrado. As respostas de
 * "Confirme que a conta é sua" são comparadas com os dados da conta pelo
 * Administrador; nunca pedimos a senha.
 * Aqui é só a prévia: no sistema, o pedido vira um chamado de suporte.
 */
const LIMITE = 1000

export default function NaoConsigoAcessar() {
  const [form, setForm] = useState({ emailConta: '', emailResposta: '', nome: '', criou: '', ultimoAcesso: '', focos: '', relato: '' })
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e: Record<string, string> = {}
    if (!emailValido(form.emailConta)) e.emailConta = 'Digite o e-mail cadastrado no F.O.C.O.'
    if (!emailValido(form.emailResposta)) e.emailResposta = 'Digite um e-mail válido para receber a resposta.'
    if (form.relato.trim().length < 10) e.relato = 'Conte em poucas palavras o que aconteceu.'
    setErros(e)
    if (Object.keys(e).length === 0) {
      setEnviado(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (enviado) {
    return (
      <AuthLayout title="Não consigo acessar minha conta">
        <SuccessText>
          <p className="auth-success-title">
            Pedido registrado. Recebemos sua solicitação. Se houver uma conta com o e-mail informado, a resposta será enviada ao e-mail de contato em até 5 dias úteis.
          </p>
          <p className="auth-note">Prévia da landing: no sistema, aqui aparece o número do chamado.</p>
          <Link to={appLinks.entrar} className="auth-back">← Voltar para o login</Link>
        </SuccessText>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Não consigo acessar minha conta" wide>
      <p className="auth-subtitle">
        Se você esqueceu a senha mas ainda acessa o seu e-mail, use a <Link to={appLinks.recuperarSenha} className="auth-inline-link">recuperação de senha</Link>.
        Se perdeu o acesso ao e-mail cadastrado, preencha o pedido abaixo.
      </p>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <Field id="emailConta" label="E-mail cadastrado no F.O.C.O." erro={erros.emailConta}>
          <input id="emailConta" type="email" value={form.emailConta} onChange={set('emailConta')} aria-invalid={!!erros.emailConta} />
        </Field>

        <Field id="emailResposta" label="E-mail para receber a resposta" erro={erros.emailResposta}>
          <input id="emailResposta" type="email" value={form.emailResposta} onChange={set('emailResposta')} autoComplete="email" aria-invalid={!!erros.emailResposta} />
        </Field>

        <fieldset className="auth-fieldset">
          <legend>Confirme que a conta é sua</legend>
          <p className="auth-hint">Responda o que lembrar. Comparamos estas respostas com os dados da conta antes de qualquer alteração. Nunca pedimos a sua senha.</p>

          <Field id="nome" label="Nome usado no cadastro">
            <input id="nome" value={form.nome} onChange={set('nome')} autoComplete="name" />
          </Field>
          <Field id="criou" label="Quando criou a conta (aproximado)">
            <input id="criou" value={form.criou} onChange={set('criou')} placeholder="Ex.: setembro de 2026" />
          </Field>
          <Field id="ultimoAcesso" label="Quando entrou pela última vez (aproximado)">
            <input id="ultimoAcesso" value={form.ultimoAcesso} onChange={set('ultimoAcesso')} placeholder="Ex.: semana passada, 10/11/2026" />
          </Field>
          <Field id="focos" label="Títulos de alguns dos seus Focos">
            <input id="focos" value={form.focos} onChange={set('focos')} placeholder="Separe por vírgula. Ex.: Inglês, Cálculo" />
          </Field>
        </fieldset>

        <Field id="relato" label="O que aconteceu?" erro={erros.relato}>
          <textarea id="relato" rows={5} maxLength={LIMITE} value={form.relato} onChange={set('relato')} aria-invalid={!!erros.relato} />
          <small className="auth-counter">{form.relato.length}/{LIMITE}</small>
        </Field>
        <p className="auth-hint auth-warn">Não informe senhas, documentos ou outros dados sensíveis na descrição.</p>

        <button type="submit" className="btn btn-primary auth-submit">Enviar solicitação</button>

        <Link to={appLinks.entrar} className="auth-back">← Voltar para o login</Link>
      </form>
    </AuthLayout>
  )
}

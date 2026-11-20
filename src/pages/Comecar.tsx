import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/fx/Reveal'
import { appLinks } from '../data/content'
import '../components/layout/pages.css'

/**
 * Página 5 — Comece agora (RF31).
 * Substitui a antiga "lista do beta": o cadastro de verdade acontece no
 * sistema (RF01), então aqui só explicamos o que vai ser pedido e levamos
 * a pessoa para "Criar conta" ou "Entrar".
 */
const steps = [
  { n: '1', title: 'Crie sua conta', text: 'Nome, e-mail e uma senha de 8 a 20 caracteres, com letra maiúscula, minúscula e número.' },
  { n: '2', title: 'Leia e aceite o Termo', text: 'O Termo de Uso e Política de Privacidade segue a LGPD. Você pode consultá-lo a qualquer momento.' },
  { n: '3', title: 'Confirme o e-mail', text: 'Enviamos um link de confirmação. Depois é só entrar e cadastrar o seu primeiro Foco.' },
]

export default function Comecar() {
  return (
    <>
      <PageHeader
        eyebrow="Comece agora"
        title="Seu primeiro Foco está a três passos."
        text="O F.O.C.O é gratuito. Crie a conta, escolha o que quer estudar e defina a meta de horas: de uma semana a um ano."
      />

      <section className="container start-steps">
        {steps.map((s, i) => (
          <motion.article
            key={s.n}
            className="start-step"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <span className="start-n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="container start-cta">
        <Reveal className="start-box">
          <h2 className="split-title">Pronto para começar?</h2>
          <div className="final-actions">
            <Link to={appLinks.criarConta} className="btn btn-primary">Criar conta</Link>
            <Link to={appLinks.entrar} className="btn btn-ghost">Entrar</Link>
          </div>
          <Link to={appLinks.termo} className="start-terms">Ler o Termo de Uso e Política de Privacidade</Link>
        </Reveal>
      </section>
    </>
  )
}

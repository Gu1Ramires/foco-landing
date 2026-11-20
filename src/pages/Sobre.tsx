import { motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/fx/Reveal'
import { tcc } from '../data/content'
import '../components/layout/pages.css'

/** Página 4 — Sobre nós (RF31): equipe, arquitetura, stack e próximos passos. */
const stack = [
  { name: 'React + TypeScript', role: 'Interface' },
  { name: 'Bootstrap', role: 'Layout responsivo' },
  { name: 'Supabase', role: 'Auth, banco e RLS' },
  { name: 'PostgreSQL', role: 'Dados e regras' },
  { name: 'Edge Functions', role: 'Funções no servidor' },
  { name: 'Resend', role: 'E-mails' },
  { name: 'Recharts', role: 'Gráficos do Observar' },
  { name: 'Picture-in-Picture', role: 'Janela flutuante' },
  { name: 'Web Audio', role: 'Alerta do timer' },
  { name: 'Vitest + PGlite', role: 'Testes' },
  { name: 'Vercel', role: 'Hospedagem' },
]

const roadmap = [
  { status: 'Já funciona', title: 'Jornada do Aluno', text: 'Pilha de Focos, Top 3, Estrela Dourada, confirmação reflexiva, Laboratório de Sonhos, timer com janela flutuante, registro de aprendizado e Observar.' },
  { status: 'Entrega final', title: 'Conta, suporte e rotinas', text: 'Recuperação de senha por código, área Minha conta com exportação e exclusão dos dados, arquivamento automático com aviso prévio, suporte e painel administrativo.' },
  { status: 'Trabalho futuro', title: 'Próximas ideias', text: 'Perfil Mentor, segundo fator de autenticação, tema claro, reordenação por arrastar e soltar e modo reduzido da janela flutuante.' },
]

export default function Sobre() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre nós"
        title="Um TCC feito para ser usado de verdade."
        text={`O F.O.C.O é o Projeto Final de Curso de ${tcc.curso} na ${tcc.universidade}. Nasceu de um problema real: ter interesse em tudo e não conseguir avançar em nada.`}
      />

      <section className="container about-grid">
        <Reveal className="about-card">
          <p className="eyebrow">Desenvolvimento</p>
          <h3>{tcc.autor}</h3>
          <p>Estudante de {tcc.curso}, designer e desenvolvedor front-end.</p>
        </Reveal>
        <Reveal className="about-card" delay={0.1}>
          <p className="eyebrow">Orientação</p>
          <h3>{tcc.orientador}</h3>
          <p>Coorientação: {tcc.coorientador}</p>
        </Reveal>
        <Reveal className="about-card" delay={0.2}>
          <p className="eyebrow">Arquitetura</p>
          <h3>Controller → Service → Repository</h3>
          <p>As regras de negócio ficam nos Services e são conferidas de novo no banco, com Row Level Security para cada aluno ver só os próprios dados.</p>
        </Reveal>
      </section>

      <section className="container">
        <Reveal><h2 className="split-title">Stack</h2></Reveal>
        <div className="stack">
          {stack.map((s, i) => (
            <motion.div
              key={s.name}
              className="stack-chip"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <strong>{s.name}</strong>
              <small>{s.role}</small>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container roadmap">
        <Reveal><h2 className="split-title">Roadmap</h2></Reveal>
        <ol>
          {roadmap.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <li className={`road-item ${i === 0 ? 'is-now' : ''}`}>
                <span className="road-status">{r.status}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  )
}

import { motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/fx/Reveal'
import { tcc } from '../data/content'
import '../components/layout/pages.css'

/** Página 4 — Sobre o projeto: TCC, equipe, stack e próximos passos. */
const stack = [
  { name: 'React', role: 'Interface' },
  { name: 'TypeScript', role: 'Tipagem' },
  { name: 'Vite', role: 'Build' },
  { name: 'Supabase', role: 'Auth + Banco' },
  { name: 'PostgreSQL', role: 'Dados + RLS' },
  { name: 'Vercel', role: 'Hospedagem' },
]

const roadmap = [
  { status: 'Agora', title: 'Jornada do Aluno', text: 'Focos, Top 3, Estrela Dourada, Timer, Laboratório de Sonhos e Dashboard.' },
  { status: 'Próximo', title: 'Painel administrativo', text: 'Gestão de usuários e métricas gerais da plataforma.' },
  { status: 'Futuro', title: 'Perfil Mentor', text: 'Acompanhamento de alunos por mentores (trabalho futuro do TCC).' },
]

export default function Sobre() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre o projeto"
        title="Um TCC feito para ser usado de verdade."
        text={`O F.O.C.O é o Projeto Final de Curso de ${tcc.curso} na ${tcc.universidade}. Nasceu de um problema real: ter interesse em tudo e não conseguir avançar em nada.`}
      />

      <section className="container about-grid">
        <Reveal className="about-card">
          <p className="eyebrow">Autor</p>
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
          <h3>Repository → Service → Controller</h3>
          <p>Três camadas separando acesso a dados, regras de negócio e a resposta para a interface.</p>
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
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
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

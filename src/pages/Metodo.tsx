import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/fx/Reveal'
import { appLinks, pillars } from '../data/content'
import '../components/layout/pages.css'

/** Página 2 — o método F.O.C.O: os 4 pilares, a metacognição e a confirmação reflexiva. */

const FRASE = 'EU ESCOLHO MUDAR MINHA PRIORIDADE'

export default function Metodo() {
  return (
    <>
      <PageHeader
        eyebrow="O método"
        title="Quatro pilares. Um jeito de estudar."
        text="F.O.C.O é a sigla de Filtrar, Organizar, Concentrar e Observar. Você filtra o que importa, organiza a pilha de prioridades, se concentra em uma sessão de cada vez e observa o que mudou."
      />

      <section className="container method-cycle">
        {pillars.map((p, i) => (
          <motion.article
            key={p.word}
            className="method-card"
            style={{ ['--pc' as string]: p.color }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -6 }}
          >
            <span className="method-letter">{p.letter}</span>
            <h3>{p.word}</h3>
            <p className="method-title">{p.title}</p>
            <p>{p.text}</p>
            <ul>
              {p.details.map((d) => <li key={d.title}><strong>{d.title}:</strong> {d.lines[0]}</li>)}
            </ul>
          </motion.article>
        ))}
      </section>

      <section className="container split">
        <Reveal>
          <p className="eyebrow">A base científica</p>
          <h2 className="split-title">Metacognição: pensar sobre como você aprende.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead">
            Flavell (1979) chama de metacognição o conhecimento que temos sobre os nossos próprios processos de pensamento.
            E Kahneman (2012) mostra que decisões como trocar de prioridade ou desistir costumam ser tomadas <strong>no impulso</strong>.
            Por isso, o F.O.C.O foi desenhado para levar você ao <strong>pensamento deliberado</strong> justamente nesses momentos.
          </p>
        </Reveal>
      </section>

      <ReflexiveDemo />

      <section className="container callout">
        <Reveal>
          <h2 className="split-title">Incentivo, não punição.</h2>
          <p className="lead">
            Nada de ícones vermelhos ou avisos de "não concluído". Um Foco que ficou parado vai para o
            <strong> Laboratório de Sonhos</strong> com todas as horas e o histórico preservados. Para voltar, é só
            resgatar e fazer uma sessão: o retorno é demonstrado na prática, não só declarado.
          </p>
          <Link to={appLinks.criarConta} className="btn btn-primary" style={{ marginTop: 24 }}>Criar conta</Link>
        </Reveal>
      </section>
    </>
  )
}

/**
 * Demonstração da confirmação reflexiva (RF14): para tirar a Estrela, o
 * sistema pede que você digite a frase. Como no sistema real, o campo só
 * aceita letras, mostra em maiúsculas, não aceita colar e ignora espaços extras.
 */
function ReflexiveDemo() {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const normalized = text.trim().replace(/\s+/g, ' ').toUpperCase()
  const ok = normalized === FRASE

  return (
    <section className="container reflex">
      <Reveal className="reflex-box">
        <div>
          <p className="eyebrow">Confirmação reflexiva</p>
          <h2 className="split-title">Decisões importantes pedem uma pausa.</h2>
          <p className="lead">
            Tirar a Estrela Dourada de um Foco não é um clique. Primeiro o F.O.C.O lembra que aquele Foco já foi a sua prioridade.
            Se você seguir, precisa digitar uma frase. A pequena fricção faz você <strong>pensar antes de decidir</strong>.
          </p>
        </div>

        <div className="reflex-demo">
          <p className="reflex-label">Experimente. Digite:</p>
          <p className="reflex-phrase">{FRASE}</p>
          <input
            value={text}
            onChange={(e) => { setDone(false); setText(e.target.value.replace(/[^a-zA-Z ]/g, '').replace(/ {2,}/g, ' ').slice(0, FRASE.length + 2)) }}
            onPaste={(e) => e.preventDefault()}
            placeholder="Digite a frase acima"
            aria-label="Frase de confirmação"
            style={{ textTransform: 'uppercase' }}
          />
          <button className="btn btn-danger" disabled={!ok} onClick={() => setDone(true)}>
            Remover a Estrela
          </button>
          {done && <motion.p className="reflex-ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>Pronto. No sistema, o Foco desceria para a 4ª posição e a Estrela ficaria livre.</motion.p>}
        </div>
      </Reveal>
    </section>
  )
}

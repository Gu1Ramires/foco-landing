import BlurText from '../fx/BlurText'
import Reveal from '../fx/Reveal'
import VideoFrame from '../ui/VideoFrame'
import { TimerVisual } from '../ui/Visuals'
import './home.css'

/**
 * Anexo 7 — "Cinemático. Mesmo depois da filmagem."
 * Uma "tela" com o vídeo do Timer rodando. Enquanto o vídeo real não
 * existe, aparece o timer animado (contando de verdade).
 */
const extras = [
  { title: 'Janela flutuante.', text: 'O timer fica por cima dos outros programas enquanto você lê, assiste à aula ou anota.' },
  { title: 'Sem "concluir antes".', text: 'A sessão só termina quando o tempo que você escolheu acaba. Pausar pode; o tempo pausado não conta.' },
  { title: 'O que você aprendeu?', text: 'No fim, um registro curto e privado da sessão, e as horas somam no seu Foco.' },
]

export default function VideoSection() {
  return (
    <section className="video-sec">
      <div className="container">
        <p className="eyebrow center">Concentrar</p>
        <BlurText as="h2" className="section-title center" text="Concentração. Do primeiro ao último minuto." />

        <Reveal className="screen">
          <div className="screen-inner">
            <VideoFrame
              className="screen-video"
              src="/videos/timer.mp4"
              fallback={
                <div className="screen-fallback">
                  <TimerVisual live size={280} />
                </div>
              }
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="lead center video-text">
            Escolha um Foco, defina de <strong>5 a 180 minutos</strong> e comece. Durante a sessão, o app fica
            <span className="grad-2"> bloqueado só no timer</span>, e um alerta sonoro avisa o fim. Depois,
            <span className="grad-3"> as horas somam no Foco e aparecem no Observar</span>.
          </p>
        </Reveal>

        <div className="video-extras">
          {extras.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1} className="video-extra">
              <p><strong>{e.title}</strong> {e.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

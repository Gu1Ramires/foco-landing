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
  { title: 'Pausar e retomar.', text: 'A sessão continua de onde parou, sem perder o tempo já estudado.' },
  { title: 'Histórico automático.', text: 'Cada sessão vai direto para o Foco certo e alimenta o Dashboard.' },
  { title: 'No navegador.', text: 'Funciona no computador e no celular, sem instalar nada.' },
]

export default function VideoSection() {
  return (
    <section className="video-sec">
      <div className="container">
        <p className="eyebrow center">Timer de foco</p>
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
            Escolha um Foco, aperte o play e <span className="grad-2">estude sem distração</span>. O F.O.C.O cuida do resto:
            <span className="grad-3"> registra a sessão, soma o tempo e mostra a evolução</span> no seu Dashboard.
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

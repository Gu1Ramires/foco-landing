import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * VideoFrame — toca um vídeo sem som, em loop, só enquanto está na tela
 * (economiza bateria e processamento, como a Apple faz).
 * Se o arquivo ainda não existir em /public/videos, mostra o `fallback`
 * (o mock animado). Quando você gravar o vídeo real, é só colocar o .mp4
 * na pasta public/videos com o mesmo nome.
 */
type Props = { src: string; poster?: string; fallback: ReactNode; className?: string; controls?: boolean }

export default function VideoFrame({ src, poster, fallback, className, controls = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || controls) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.3 })
    io.observe(video)
    return () => io.disconnect()
  }, [failed, controls])

  if (failed) return <>{fallback}</>

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted={!controls}
      loop={!controls}
      playsInline
      controls={controls}
      autoPlay={controls}
      preload="metadata"
      onError={() => setFailed(true)}
    />
  )
}

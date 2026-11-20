import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './fx.css'

/**
 * TrueFocus — inspirado no componente de mesmo nome do React Bits.
 * Todas as letras ficam desfocadas, menos a "ativa". Uma moldura com
 * cantos dourados desliza até a letra ativa, que muda sozinha a cada
 * `interval` ms. O componente avisa o pai (onChange) qual letra está
 * em foco, para o Hero mostrar a palavra (Filtrar, Organizar...).
 */
type Props = {
  letters: string[]
  interval?: number
  onChange?: (index: number) => void
  colors?: string[]
}

export default function TrueFocus({ letters, interval = 1800, onChange, colors = [] }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  // "Reduzir movimento" ligado: a letra só muda com o mouse (RN31.2)
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [frame, setFrame] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // 1) Troca a letra ativa num intervalo (para quando o mouse está em cima)
  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => setActive((i) => (i + 1) % letters.length), interval)
    return () => clearInterval(id)
  }, [paused, reduce, interval, letters.length])

  useEffect(() => onChange?.(active), [active, onChange])

  // 2) Mede a posição da letra ativa para posicionar a moldura
  useLayoutEffect(() => {
    const measure = () => {
      const el = letterRefs.current[active]
      const wrap = wrapRef.current
      if (!el || !wrap) return
      const a = el.getBoundingClientRect()
      const b = wrap.getBoundingClientRect()
      setFrame({ x: a.left - b.left, y: a.top - b.top, width: a.width, height: a.height })
    }
    measure()
    // mede de novo se o tamanho mudar (resize da janela ou fonte carregando)
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [active])

  const color = colors[active] ?? 'var(--gold)'

  return (
    <div
      className="true-focus"
      ref={wrapRef}
      onMouseLeave={() => setPaused(false)}
      aria-label={letters.join('.')}
    >
      {letters.map((l, i) => (
        <span
          key={i}
          ref={(el) => { letterRefs.current[i] = el }}
          className={`tf-letter ${i === active ? 'is-active' : ''}`}
          onMouseEnter={() => { setPaused(true); setActive(i) }}
        >
          {l}
        </span>
      ))}

      <motion.div
        className="tf-frame"
        animate={frame}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{ ['--tf-color' as string]: color }}
        aria-hidden
      >
        <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
      </motion.div>
    </div>
  )
}

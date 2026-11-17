import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

/**
 * CountUp — inspirado no React Bits. Conta de `from` até `to` quando o
 * número aparece na tela. Se `to` mudar (ex.: trocou a opção no "Vale
 * trocar?"), ele anima de novo a partir do valor atual.
 */
type Props = { to: number; from?: number; duration?: number; prefix?: string; suffix?: string }

export default function CountUp({ to, from = 0, duration = 1.4, prefix = '', suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(from)
  const current = useRef(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(current.current, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { current.current = v; setValue(v) },
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return <span ref={ref}>{prefix}{Math.round(value)}{suffix}</span>
}

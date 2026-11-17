import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

/**
 * ScrollRevealText — inspirado no Scroll Reveal do React Bits.
 * A frase começa apagada e cada palavra "acende" conforme você rola a
 * página. A animação é ligada ao scroll: rolou pra cima, ela apaga de novo.
 */
type Props = { text: string; className?: string }

export default function ScrollRevealText({ text, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  // progress vai de 0 (frase entrando por baixo) a 1 (frase no meio da tela)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] })
  const words = text.split(' ')

  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>
      })}
    </h2>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const blur = useTransform(progress, range, ['blur(6px)', 'blur(0px)'])
  return (
    <motion.span style={{ opacity, filter: blur, display: 'inline-block', marginRight: '0.25em' }}>
      {children}
    </motion.span>
  )
}

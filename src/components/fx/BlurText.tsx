import { motion } from 'motion/react'

/**
 * BlurText — inspirado no React Bits. Cada palavra entra desfocada e
 * sobe um pouco, uma depois da outra (stagger), quando aparece na tela.
 */
type Props = { text: string; as?: 'h1' | 'h2' | 'p'; className?: string; delay?: number }

export default function BlurText({ text, as = 'h2', className, delay = 0 }: Props) {
  const Tag = motion[as]
  const words = text.split(' ')

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
            show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {w}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}

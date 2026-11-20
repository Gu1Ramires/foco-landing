import { useEffect, useRef, useState } from 'react'
import Modal from '../ui/Modal'
import { termoHtml } from '../../data/termo'
import './auth.css'

/**
 * TermoModal (RF04) — mostra o Termo de Uso e Política de Privacidade.
 * O botão "Aceitar" só é liberado depois de rolar o texto até o fim
 * (RN04.1), e essa exigência recomeça toda vez que o modal é aberto (RN04.2).
 */
export default function TermoModal({ open, onClose, onAccept }: { open: boolean; onClose: () => void; onAccept: () => void }) {
  const [readAll, setReadAll] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  // Reabriu → precisa rolar de novo
  useEffect(() => { if (open) setReadAll(false) }, [open])

  const onScroll = () => {
    const el = boxRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) setReadAll(true)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="termo-modal">
        <h2>Termo de Uso e Política de Privacidade</h2>
        <div ref={boxRef} className="termo-text termo-scroll" onScroll={onScroll} tabIndex={0} dangerouslySetInnerHTML={{ __html: termoHtml }} />
        <div className="termo-actions">
          <small>{readAll ? 'Leitura concluída.' : 'Role o texto até o fim para liberar o aceite.'}</small>
          <div>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Fechar</button>
            <button type="button" className="btn btn-primary" disabled={!readAll} onClick={() => { onAccept(); onClose() }}>Aceitar</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

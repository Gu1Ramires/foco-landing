import PageHeader from '../components/layout/PageHeader'
import { termoHtml } from '../data/termo'
import '../components/auth/auth.css'

/** Termo de Uso e Política de Privacidade, só para leitura (RN04.5 e RN31.3). */
export default function Termo() {
  return (
    <>
      <PageHeader
        eyebrow="Documentos"
        title="Termo de Uso e Política de Privacidade"
        text="Como o F.O.C.O trata os seus dados, de acordo com a LGPD (Lei nº 13.709/2018)."
      />
      <section className="container termo-page">
        <article className="termo-text" dangerouslySetInnerHTML={{ __html: termoHtml }} />
      </section>
    </>
  )
}

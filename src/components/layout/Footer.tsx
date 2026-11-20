import { Link } from 'react-router-dom'
import { appLinks, navLinks, tcc } from '../../data/content'
import './layout.css'

/** Rodapé: páginas, conta, Termo de Uso (RN31.3) e créditos do TCC. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-note">
          F.O.C.O é um Projeto Final de Curso de {tcc.curso} — {tcc.universidade}. Protótipo acadêmico: algumas funcionalidades ainda estão em desenvolvimento.
        </p>

        <div className="footer-grid">
          <div>
            <h4>Navegar</h4>
            {navLinks.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div>
            <h4>Conta</h4>
            <Link to={appLinks.entrar}>Entrar</Link>
            <Link to={appLinks.criarConta}>Criar conta</Link>
            <Link to={appLinks.termo}>Termo de Uso e Política de Privacidade</Link>
          </div>
          <div>
            <h4>Créditos do TCC</h4>
            <span>Autor: {tcc.autor}</span>
            <span>Orientador: {tcc.orientador}</span>
            <span>Coorientador: {tcc.coorientador}</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {tcc.ano} F.O.C.O · Filtrar, Organizar, Concentrar, Observar.</span>
          <span>Feito com React + Vite</span>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { navLinks, tcc } from '../../data/content'
import './layout.css'

/** Rodapé com links das 5 páginas, GitHub e créditos do TCC (anexo 8). */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-note">
          F.O.C.O é um Projeto Final de Curso de {tcc.curso} — {tcc.universidade}. Funcionalidades em versão beta podem mudar antes do lançamento.
        </p>

        <div className="footer-grid">
          <div>
            <h4>Navegar</h4>
            {navLinks.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div>
            <h4>O projeto</h4>
            <a href={tcc.github} target="_blank" rel="noreferrer">GitHub</a>
            <Link to="/sobre">Monografia e stack</Link>
            <Link to="/beta">Lista do beta</Link>
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

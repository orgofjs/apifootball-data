import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-dot pulse" />
        <span className="header-logo">API<span className="accent">FOOTBALL</span></span>
        <span className="header-sub">DATA TERMINAL</span>
      </div>
      <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          FETCH
        </NavLink>
        <NavLink to="/files" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          SAVED FILES
        </NavLink>
        <NavLink to="/wiki" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          WIKI
        </NavLink>
      </nav>
      <div className="header-meta">
        <span className="header-version mono">v3.football.api-sports.io</span>
      </div>
    </header>
  )
}

export default Header

import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()

  const handleSair = () => {
    navigate('/login')
  }

  return (
    <section className="app">
      <aside className="sidebar">
        <div className="logo">Stock<span>Flow</span></div>
        <nav className="navlist">
          <NavLink to="/produtos" className="navitem"><b>▤</b> Produtos</NavLink>
          <NavLink to="/ajuste" className="navitem"><b>⇄</b> Ajuste de estoque</NavLink>
          <NavLink to="/movimentacoes" className="navitem"><b>◷</b> Movimentações</NavLink>
        </nav>
        <div className="sidebarfoot">Projeto acadêmico<br />SENAC</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <strong>Sistema de estoque</strong>
            <div className="subtitle">Controle de movimentações</div>
          </div>
          <button className="btn alt sm" onClick={handleSair}>Sair ↗</button>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </section>
  )
}

export default Layout
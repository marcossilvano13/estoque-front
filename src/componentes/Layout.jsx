import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }

  const handleSair = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <section className="app">
        <aside className="sidebar">
        <div className="logo">Controle de Estoque</div>
        <nav className="navlist">
          <NavLink to="/produtos" className="navitem">Produtos</NavLink>
          <NavLink to="/ajuste" className="navitem">Ajuste de estoque</NavLink>
          <NavLink to="/movimentacoes" className="navitem">Movimentações</NavLink>
        </nav>
        <div className="sidebarfoot">Projeto Final - SENAC</div>
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
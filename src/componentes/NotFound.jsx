import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="auth">
      <div className="authbox">
        <h2>Página não encontrada</h2>
        <p className="muted">O endereço acessado não existe.</p>
        <Link to="/produtos">Voltar para o sistema</Link>
      </div>
    </section>
  )
}

export default NotFound
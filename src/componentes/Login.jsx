import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  return (
    <section className="auth">
      <div className="authbox">
        <div className="logo" style={{ color: '#203552' }}> Stock<span>Flow</span></div>
        <h2>Bem-vindo de volta</h2>
        <p className="muted">Tela de login provisória</p>
        <button className="btn" onClick={() => navigate('/produtos')}>Entrar no sistema</button>
      </div>
    </section>
  )
}

export default Login
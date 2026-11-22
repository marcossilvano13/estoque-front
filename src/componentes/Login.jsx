import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    // Provisório: na Fase 8, esta conferência será feita pela API (JWT)
    if (email === 'admin@estoque.com' && senha === '123456') {
      navigate('/produtos')
    } else {
      setErro('E-mail ou senha inválidos!')
    }
  }

  return (
    <section className="auth">
      <div className="authbox">
        <div className="logo">Controle de Estoque</div>
        <h2>Login</h2>

        {erro && <p className="hint dangerhint">{erro}</p>}

        <form onSubmit={handleLogin}>
          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@empresa.com"
              required
            />
          </div>

          <div className="field">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>

          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </section>
  )
}

export default Login
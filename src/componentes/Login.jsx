import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', {
        email,
        senha
      })

      // Guarda o token no navegador
      localStorage.setItem('token', response.data.token)
      navigate('/produtos')
    } catch (error) {
      console.error('Erro no login:', error)
      setErro(error.response ? error.response.data.mensagem : 'Erro ao conectar com o servidor')
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
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Movimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [idProduto, setIdProduto] = useState('')
  const [tipo, setTipo] = useState('')
  const [inicio, setInicio] = useState('')
  const [fim, setFim] = useState('')
  const [erro, setErro] = useState('')

  const buscarMovimentacoes = async () => {
    setErro('')
    try {
      const response = await axios.get('http://localhost:8080/movimentacoes/listar', {
        params: {
          idProduto: idProduto || undefined,
          tipo: tipo || undefined,
          inicio: inicio || undefined,
          fim: fim || undefined
        }
      })
      setMovimentacoes(response.data)
    } catch (error) {
      setErro(error.response ? error.response.data.mensagem : 'Erro ao conectar com o servidor')
    }
  }

  // Ao abrir a tela: carrega os produtos do filtro e todas as movimentações
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produtos/listar')
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    buscarProdutos()
    buscarMovimentacoes()
  }, [])

  return (
    <div>
      <h1>Movimentações</h1>

      <div className="panel">
        <h2>Filtros</h2>

        <div className="field">
          <label>Produto</label>
          <select value={idProduto} onChange={(e) => setIdProduto(e.target.value)}>
            <option value="">Todos</option>
            {produtos.map((produto) => (
              <option key={produto.idProduto} value={produto.idProduto}>
                {produto.codigo} - {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Tipo de movimento</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="E">Entrada</option>
            <option value="S">Saída</option>
          </select>
        </div>

        <div className="grid2">
          <div className="field">
            <label>Data inicial</label>
            <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
          </div>
          <div className="field">
            <label>Data final</label>
            <input type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
          </div>
        </div>

        <button className="btn" onClick={buscarMovimentacoes}>Consultar</button>
      </div>

      <div className="panel">
        <h2>Histórico</h2>

        {erro && <p className="hint dangerhint">{erro}</p>}

        {movimentacoes.length === 0 && <p>Nenhuma movimentação encontrada.</p>}

        {movimentacoes.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Saldo após</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((mov) => (
                <tr key={mov.idMovimentacao}>
                  <td>{new Date(mov.dataMovimentacao).toLocaleString('pt-BR')}</td>
                  <td>{mov.produto.nome}</td>
                  <td>{mov.tipoMovimento === 'E' ? 'Entrada' : 'Saída'}</td>
                  <td>{mov.quantidade}</td>
                  <td>{mov.saldoApos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Movimentacoes
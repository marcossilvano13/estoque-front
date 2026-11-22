import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AjusteEstoque = () => {
  const [produtos, setProdutos] = useState([])
  const [idProduto, setIdProduto] = useState('')
  const [tipoMovimento, setTipoMovimento] = useState('E')
  const [quantidade, setQuantidade] = useState('')
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  // Busca apenas os produtos ativos
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produtos/listar', {
          params: { ativo: true }
        })
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    buscarProdutos()
  }, [])

  // Produto escolhido no select, para mostrar o saldo atual
  const produtoSelecionado = produtos.find((p) => p.idProduto === Number(idProduto))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErro('')
    setMensagem('')

    const confirmar = window.confirm('Confirmar a movimentação? Ela não poderá ser alterada depois.')
    if (!confirmar) {
      return
    }

    const movimentacao = {
      idProduto: Number(idProduto),
      tipoMovimento,
      quantidade: Number(quantidade)
    }

    try {
      const response = await axios.post('http://localhost:8080/movimentacoes/criar', movimentacao)

      // Atualiza o saldo do produto na lista com o valor que voltou da API
      setProdutos((currentProdutos) =>
        currentProdutos.map((p) =>
          p.idProduto === response.data.produto.idProduto ? response.data.produto : p
        )
      )

      setMensagem('Movimentação registrada! Saldo após: ' + response.data.saldoApos)
      setQuantidade('')
    } catch (error) {
      setErro(error.response ? error.response.data.mensagem : 'Erro ao conectar com o servidor')
    }
  }

  return (
    <div>
      <h1>Ajuste de estoque</h1>

      <div className="panel">
        <p className="hint">Após a confirmação, a movimentação fica registrada e não pode ser alterada.</p>

        {erro && <p className="hint dangerhint">{erro}</p>}
        {mensagem && <p className="hint okhint">{mensagem}</p>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Produto</label>
            <select value={idProduto} onChange={(e) => setIdProduto(e.target.value)} required>
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.idProduto} value={produto.idProduto}>
                  {produto.codigo} - {produto.nome}
                </option>
              ))}
            </select>
          </div>

          {produtoSelecionado && (
            <p>Saldo atual: <strong>{produtoSelecionado.saldoAtual} {produtoSelecionado.unidadeMedida}</strong></p>
          )}

          <div className="field">
            <label>Tipo de movimento</label>
            <select value={tipoMovimento} onChange={(e) => setTipoMovimento(e.target.value)}>
              <option value="E">Entrada</option>
              <option value="S">Saída</option>
            </select>
          </div>

          <div className="field">
            <label>Quantidade</label>
            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit">Confirmar movimentação</button>
        </form>
      </div>
    </div>
  )
}

export default AjusteEstoque
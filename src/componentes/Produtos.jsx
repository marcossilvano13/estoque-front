import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProdutoForm from './ProdutoForm'

const Produtos = () => {
  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState('')
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)

  const buscarProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produtos/listar', {
        params: { busca: busca }
      })
      setProdutos(response.data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  const handleNovo = () => {
    setProdutoSelecionado(null)
    setModalAberto(true)
  }

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto)
    setModalAberto(true)
  }

  const handleFecharModal = () => {
    setProdutoSelecionado(null)
    setModalAberto(false)
  }

  const handleSuccess = (produto, operation) => {
    if (operation === 'add') {
      setProdutos((currentProdutos) => [produto, ...currentProdutos])
    } else if (operation === 'update') {
      setProdutos((currentProdutos) =>
        currentProdutos.map((p) => (p.idProduto === produto.idProduto ? produto : p))
      )
    }
    handleFecharModal()
  }

  return (
    <div>
      <div className="head">
        <h1>Produtos</h1>
        <button className="btn" onClick={handleNovo}>+ Novo produto</button>
      </div>

      <div className="panel">
        <div className="toolbar">
          <input
            type="text"
            placeholder="Buscar por código ou nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="btn" onClick={buscarProdutos}>Buscar</button>
        </div>

        {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}

        {produtos.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Estoque</th>
                <th>Situação</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.idProduto}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.tipoProduto.descricao}</td>
                  <td>{produto.saldoAtual} {produto.unidadeMedida}</td>
                  <td>{produto.ativo ? 'Ativo' : 'Inativo'}</td>
                  <td>
                    <button className="btn alt sm" onClick={() => handleEdit(produto)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <div className="modalbg">
          <div className="modal">
            <h2>{produtoSelecionado ? 'Editar produto' : 'Novo produto'}</h2>
            <ProdutoForm produto={produtoSelecionado} onSuccess={handleSuccess} />
            <button className="btn alt" onClick={handleFecharModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Produtos
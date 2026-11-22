import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProdutoForm = ({ produto, onSuccess }) => {
  const [codigo, setCodigo] = useState('')
  const [codigoBarras, setCodigoBarras] = useState('')
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [unidadeMedida, setUnidadeMedida] = useState('UN')
  const [idTipoProduto, setIdTipoProduto] = useState('')
  const [ativo, setAtivo] = useState(true)
  const [tipos, setTipos] = useState([])
  const [erro, setErro] = useState('')

  // Busca os tipos de produto para o select
  useEffect(() => {
    const buscarTipos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tipos-produto/listar')
        setTipos(response.data)
      } catch (error) {
        console.error('Erro ao buscar tipos:', error)
      }
    }

    buscarTipos()
  }, [])

  // Preenche os campos quando um produto é selecionado para edição
  useEffect(() => {
    preencherCampos(produto)
  }, [produto])

  const preencherCampos = (p) => {
    setCodigo(p?.codigo || '')
    setCodigoBarras(p?.codigoBarras || '')
    setNome(p?.nome || '')
    setDescricao(p?.descricao || '')
    setUnidadeMedida(p?.unidadeMedida || 'UN')
    setIdTipoProduto(p?.tipoProduto.idTipoProduto || '')
    setAtivo(p ? p.ativo : true)
    setErro('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const dadosProduto = {
      codigo,
      codigoBarras,
      nome,
      descricao,
      unidadeMedida,
      idTipoProduto: Number(idTipoProduto),
      ativo
    }

    try {
      if (produto) {
        // Atualizar produto existente
        const response = await axios.put(
          `http://localhost:8080/produtos/atualizar/${produto.idProduto}`,
          dadosProduto
        )
        onSuccess(response.data, 'update')
      } else {
        // Cadastrar novo produto
        const response = await axios.post('http://localhost:8080/produtos/criar', dadosProduto)
        onSuccess(response.data, 'add')
        preencherCampos(null)
      }
    } catch (error) {
      setErro(error.response ? error.response.data.mensagem : 'Erro ao conectar com o servidor')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {erro && <p className="hint dangerhint">{erro}</p>}

      <div className="field">
        <label>Código</label>
        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
      </div>

      <div className="field">
        <label>Código de barras</label>
        <input type="text" value={codigoBarras} onChange={(e) => setCodigoBarras(e.target.value)} required />
      </div>

      <div className="field">
        <label>Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>

      <div className="field">
        <label>Descrição</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>

      <div className="field">
        <label>Tipo de produto</label>
        <select value={idTipoProduto} onChange={(e) => setIdTipoProduto(e.target.value)} required>
          <option value="">Selecione</option>
          {tipos.map((tipo) => (
            <option key={tipo.idTipoProduto} value={tipo.idTipoProduto}>
              {tipo.descricao}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Unidade de medida</label>
        <select value={unidadeMedida} onChange={(e) => setUnidadeMedida(e.target.value)}>
          <option value="UN">UN</option>
          <option value="KG">KG</option>
          <option value="CX">CX</option>
          <option value="LT">LT</option>
          <option value="MT">MT</option>
        </select>
      </div>

      {produto && (
        <div className="field">
          <label>Situação</label>
          <select value={ativo ? 'true' : 'false'} onChange={(e) => setAtivo(e.target.value === 'true')}>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
      )}

      <button className="btn" type="submit">{produto ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  )
}

export default ProdutoForm
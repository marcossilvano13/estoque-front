import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './componentes/Layout'
import Login from './componentes/Login'
import Produtos from './componentes/Produtos'
import AjusteEstoque from './componentes/AjusteEstoque'
import Movimentacoes from './componentes/Movimentacoes'
import NotFound from './componentes/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/ajuste" element={<AjusteEstoque />} />
        <Route path="/movimentacoes" element={<Movimentacoes />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
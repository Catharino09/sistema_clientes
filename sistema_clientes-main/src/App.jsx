import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from "./pages/Clientes";
import Cadastro from "./pages/Cadastro";
import Editar from "./pages/Editar";
import Produtos from "./pages/Produtos";
import CadastroProduto from "./pages/CadastroProduto";
import EditarProduto from "./pages/EditarProduto";
import Tarefas from "./pages/Tarefas";
import CadastroTarefa from "./pages/CadastroTarefa";
import EditarTarefa from "./pages/EditarTarefa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/editar/:id" element={<Editar />} />

        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/cadastro" element={<CadastroProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />

        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/tarefas/cadastro" element={<CadastroTarefa />} />
        <Route path="/tarefas/editar/:id" element={<EditarTarefa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  useEffect(() => {
    buscarProduto();
  }, []);

  async function buscarProduto() {
    try {
      const resposta = await fetch(`/api/produtos/${id}`);

      if (!resposta.ok) {
        alert("Produto não encontrado.");
        navigate("/produtos");
        return;
      }

      const produto = await resposta.json();

      setNome(produto.nome);
      setDescricao(produto.descricao || "");
      setPreco(produto.preco);
      setEstoque(produto.estoque);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar o produto.");
    }
  }

  async function atualizarProduto(event) {
    event.preventDefault();

    const produto = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      estoque: estoque
    };

    try {
      const resposta = await fetch(`/api/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (resposta.ok) {
        alert("Produto atualizado com sucesso!");
        navigate("/produtos");
      } else {
        const erro = await resposta.text();
        alert("Erro ao atualizar produto: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={atualizarProduto}>
        <h1>Editar Produto</h1>

        <p>Altere os dados do produto.</p>

        <div className="campo">
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Descrição:</label>
          <input
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div className="campo">
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Estoque:</label>
          <input
            type="number"
            value={estoque}
            onChange={(event) => setEstoque(event.target.value)}
          />
        </div>

        <div className="botoes-formulario">
          <button className="botao-salvar" type="submit">
            Salvar alterações
          </button>

          <button type="button" onClick={() => navigate("/produtos")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarProduto;

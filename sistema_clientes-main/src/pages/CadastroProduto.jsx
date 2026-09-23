import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CadastroProduto() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  async function cadastrarProduto(event) {
    event.preventDefault();

    const produto = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      estoque: estoque
    };

    try {
      const resposta = await fetch("/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (resposta.ok) {
        alert("Produto cadastrado com sucesso!");
        navigate("/produtos");
      } else {
        const erro = await resposta.text();
        alert("Erro ao cadastrar produto: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={cadastrarProduto}>
        <h1>Novo Produto</h1>

        <p>Preencha os dados para cadastrar um produto.</p>

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
            Cadastrar
          </button>

          <button type="button" onClick={() => navigate("/produtos")}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroProduto;

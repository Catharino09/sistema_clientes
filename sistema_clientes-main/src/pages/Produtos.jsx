import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import "../App.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const resposta = await fetch("/api/produtos");
      const dados = await resposta.json();

      setProdutos(dados);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar os produtos.");
    }
  }

  async function excluirProduto(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(`/api/produtos/${id}`, {
        method: "DELETE"
      });

      if (resposta.ok) {
        alert("Produto excluído com sucesso!");
        buscarProdutos();
      } else {
        const erro = await resposta.text();
        alert("Erro ao excluir produto: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <Nav />

      <div className="cabecalho">
        <div>
          <h1>Gerenciamento de Produtos</h1>
          <p>Produtos cadastrados no sistema</p>
        </div>

        <Link to="/produtos/cadastro">
          <button className="botao-principal">
            + Novo produto
          </button>
        </Link>
      </div>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div className="lista-clientes">
          {produtos.map((produto) => (
            <div className="card-cliente" key={produto.id}>
              <h2>{produto.nome}</h2>

              <p className="informacao">
                <strong>Descrição:</strong> {produto.descricao || "Não informada"}
              </p>

              <p className="informacao">
                <strong>Preço:</strong> {produto.preco}
              </p>

              <p className="informacao">
                <strong>Estoque:</strong> {produto.estoque}
              </p>

              <div className="acoes">
                <Link to={`/produtos/editar/${produto.id}`}>
                  <button className="botao-editar">
                    Editar
                  </button>
                </Link>

                <button
                  className="botao-excluir"
                  onClick={() => excluirProduto(produto.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Produtos;

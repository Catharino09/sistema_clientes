import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import "../App.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    try {
      const resposta = await fetch("/api/clientes");
      const dados = await resposta.json();

      setClientes(dados);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar os clientes.");
    }
  }

  async function excluirCliente(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(`/api/clientes/${id}`, {
        method: "DELETE"
      });

      if (resposta.ok) {
        alert("Cliente excluído com sucesso!");
        buscarClientes();
      } else {
        const erro = await resposta.text();
        alert("Erro ao excluir cliente: " + erro);
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
          <h1>Gerenciamento de Clientes</h1>
          <p>Clientes cadastrados no sistema</p>
        </div>

        <Link to="/cadastro">
          <button className="botao-principal">
            + Novo cliente
          </button>
        </Link>
      </div>

      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <div className="lista-clientes">
          {clientes.map((cliente) => (
            <div className="card-cliente" key={cliente.id}>
              <h2>{cliente.nome}</h2>

              <p className="informacao">
                <strong>Email:</strong> {cliente.email}
              </p>

              <p className="informacao">
                <strong>Telefone:</strong>{" "}
                {cliente.telefone || "Não informado"}
              </p>

              <p className="informacao">
                <strong>Cidade:</strong>{" "}
                {cliente.cidade || "Não informada"}
              </p>

              <p className="informacao">
                <strong>Estado:</strong>{" "}
                {cliente.estado || "Não informado"}
              </p>

              <div className="acoes">
                <Link to={`/editar/${cliente.id}`}>
                  <button className="botao-editar">
                    Editar
                  </button>
                </Link>

                <button
                  className="botao-excluir"
                  onClick={() => excluirCliente(cliente.id)}
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

export default Clientes;
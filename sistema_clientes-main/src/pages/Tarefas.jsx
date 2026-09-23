import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import "../App.css";

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    buscarTarefas();
  }, []);

  async function buscarTarefas() {
    try {
      const resposta = await fetch("/api/tarefas");
      const dados = await resposta.json();

      setTarefas(dados);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar as tarefas.");
    }
  }

  async function excluirTarefa(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(`/api/tarefas/${id}`, {
        method: "DELETE"
      });

      if (resposta.ok) {
        alert("Tarefa excluída com sucesso!");
        buscarTarefas();
      } else {
        const erro = await resposta.text();
        alert("Erro ao excluir tarefa: " + erro);
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
          <h1>Gerenciamento de Tarefas</h1>
          <p>Tarefas cadastradas no sistema</p>
        </div>

        <Link to="/tarefas/cadastro">
          <button className="botao-principal">
            + Nova tarefa
          </button>
        </Link>
      </div>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <div className="lista-clientes">
          {tarefas.map((tarefa) => (
            <div className="card-cliente" key={tarefa.id}>
              <h2>{tarefa.titulo}</h2>

              <p className="informacao">
                <strong>Descrição:</strong> {tarefa.descricao || "Não informada"}
              </p>

              <p className="informacao">
                <strong>Status:</strong> {tarefa.status}
              </p>

              <p className="informacao">
                <strong>Prioridade:</strong> {tarefa.prioridade}
              </p>

              <p className="informacao">
                <strong>Data limite:</strong> {tarefa.dataLimite || "Não informada"}
              </p>

              <div className="acoes">
                <Link to={`/tarefas/editar/${tarefa.id}`}>
                  <button className="botao-editar">
                    Editar
                  </button>
                </Link>

                <button
                  className="botao-excluir"
                  onClick={() => excluirTarefa(tarefa.id)}
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

export default Tarefas;

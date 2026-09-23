import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function EditarTarefa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("pendente");
  const [prioridade, setPrioridade] = useState("media");
  const [dataLimite, setDataLimite] = useState("");

  useEffect(() => {
    buscarTarefa();
  }, []);

  async function buscarTarefa() {
    try {
      const resposta = await fetch(`/api/tarefas/${id}`);

      if (!resposta.ok) {
        alert("Tarefa não encontrada.");
        navigate("/tarefas");
        return;
      }

      const tarefa = await resposta.json();

      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao || "");
      setStatus(tarefa.status);
      setPrioridade(tarefa.prioridade);
      setDataLimite(tarefa.dataLimite || "");
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar a tarefa.");
    }
  }

  async function atualizarTarefa(event) {
    event.preventDefault();

    const tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      prioridade: prioridade,
      dataLimite: dataLimite
    };

    try {
      const resposta = await fetch(`/api/tarefas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
      });

      if (resposta.ok) {
        alert("Tarefa atualizada com sucesso!");
        navigate("/tarefas");
      } else {
        const erro = await resposta.text();
        alert("Erro ao atualizar tarefa: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={atualizarTarefa}>
        <h1>Editar Tarefa</h1>

        <p>Altere os dados da tarefa.</p>

        <div className="campo">
          <label>Título:</label>
          <input
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
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
          <label>Status:</label>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div className="campo">
          <label>Prioridade:</label>
          <select value={prioridade} onChange={(event) => setPrioridade(event.target.value)}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="campo">
          <label>Data limite:</label>
          <input
            type="date"
            value={dataLimite}
            onChange={(event) => setDataLimite(event.target.value)}
          />
        </div>

        <div className="botoes-formulario">
          <button className="botao-salvar" type="submit">
            Salvar alterações
          </button>

          <button type="button" onClick={() => navigate("/tarefas")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarTarefa;

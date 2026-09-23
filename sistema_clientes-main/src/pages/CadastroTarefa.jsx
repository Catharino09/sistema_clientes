import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CadastroTarefa() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("pendente");
  const [prioridade, setPrioridade] = useState("media");
  const [dataLimite, setDataLimite] = useState("");

  async function cadastrarTarefa(event) {
    event.preventDefault();

    const tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      prioridade: prioridade,
      dataLimite: dataLimite
    };

    try {
      const resposta = await fetch("/api/tarefas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
      });

      if (resposta.ok) {
        alert("Tarefa cadastrada com sucesso!");
        navigate("/tarefas");
      } else {
        const erro = await resposta.text();
        alert("Erro ao cadastrar tarefa: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={cadastrarTarefa}>
        <h1>Nova Tarefa</h1>

        <p>Preencha os dados para cadastrar uma tarefa.</p>

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
            Cadastrar
          </button>

          <button type="button" onClick={() => navigate("/tarefas")}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroTarefa;

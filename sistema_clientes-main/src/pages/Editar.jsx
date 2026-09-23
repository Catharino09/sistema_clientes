import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    buscarCliente();
  }, []);

  async function buscarCliente() {
    try {
      const resposta = await fetch(`/api/clientes/${id}`);

      if (!resposta.ok) {
        alert("Cliente não encontrado.");
        navigate("/");
        return;
      }

      const cliente = await resposta.json();

      setNome(cliente.nome);
      setEmail(cliente.email);
      setTelefone(cliente.telefone || "");
      setCidade(cliente.cidade || "");
      setEstado(cliente.estado || "");
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível carregar o cliente.");
    }
  }

  async function atualizarCliente(event) {
    event.preventDefault();

    const cliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cidade: cidade,
      estado: estado
    };

    try {
      const resposta = await fetch(`/api/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
      });

      if (resposta.ok) {
        alert("Cliente atualizado com sucesso!");
        navigate("/");
      } else {
        const erro = await resposta.text();
        alert("Erro ao atualizar cliente: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={atualizarCliente}>
        <h1>Editar Cliente</h1>

        <p>Altere os dados do cliente.</p>

        <div className="campo">
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Telefone:</label>
          <input
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          />
        </div>

        <div className="campo">
          <label>Cidade:</label>
          <input
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
          />
        </div>

        <div className="campo">
          <label>Estado:</label>
          <input
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          />
        </div>

        <div className="botoes-formulario">
          <button className="botao-salvar" type="submit">
            Salvar alterações
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editar;
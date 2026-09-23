import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  async function cadastrarCliente(event) {
    event.preventDefault();

    const cliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cidade: cidade,
      estado: estado
    };

    try {
      const resposta = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
      });

      if (resposta.ok) {
        alert("Cliente cadastrado com sucesso!");
        navigate("/");
      } else {
        const erro = await resposta.text();
        alert("Erro ao cadastrar cliente: " + erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar com a API.");
    }
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={cadastrarCliente}>
        <h1>Novo Cliente</h1>

        <p>Preencha os dados para cadastrar um cliente.</p>

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
            Cadastrar
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
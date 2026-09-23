import { Link } from "react-router-dom";
import "../App.css";

function Nav() {
  return (
    <nav className="nav-principal">
      <Link to="/" className="link-nav">Clientes</Link>
      <Link to="/produtos" className="link-nav">Produtos</Link>
      <Link to="/tarefas" className="link-nav">Tarefas</Link>
    </nav>
  );
}

export default Nav;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewPorject from "./components/pages/NewPorject";

import Container from "./components/layout/Container";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/">Home </Link>
          <Link to="/company">Contato </Link>
          <Link to="/contact">Empresa </Link>
          <Link to="/newproject">Novo Projeto</Link>
        </div>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/company" element={<Company />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/newproject" element={<NewPorject />} />
          </Routes>
        </Container>
        <p>Footer</p>
      </Router>
    </div>
  );
}

export default App;

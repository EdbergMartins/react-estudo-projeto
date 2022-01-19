import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Project from './components/pages/Project';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar className="navbar" />
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route  path="/company" element={<Company />} />
            <Route  path="/contact" element={<Contact />} />
            <Route  path="/newproject" element={<NewProject />} />
            <Route  path="/project" element={<Projects />} />
            <Route  path="/project/:id" element={<Project />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

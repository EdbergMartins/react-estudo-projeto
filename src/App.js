import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";

import { connect } from 'react-redux';
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Login from './components/pages/LogIn';

function App({ token }) {



  return (
    <div className="App">
      <Router>
        <Navbar className="navbar" />
        <Container customClass="min-height">
          <Routes>
            {token ?
              <>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/company" element={<Company />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/newproject" element={<NewProject />} />
                <Route exact path="/project" element={<Projects />} />
              </>
              :
              <Route exact path="/*" element={<Login />} />
            }
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(App);

import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import UsersList from "./UsersList";
import UserCreateUpdate from "./UserCreateUpdate";
import "./normalize.css";
import "./fontFace.css";
import { GlobalStyle } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { Content } from "./components/Content";

export const SidebarHoverContext = createContext();

const BaseLayout = (props) => {
  const [sidebarHovered, setSidebarHovered] = useState(null);

  return (
    <div className="container">
      {/* <div className= */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">
            Users
          </a>
          <a className="nav-item nav-link" href="/user">
            CREATE USER
          </a>
        </div>
      </div>
    </nav> */}

      <SidebarHoverContext.Provider
        value={{ sidebarHovered, setSidebarHovered }}
      >
        <Sidebar />
        <Content>
          <Link to="/">Users</Link>
          <Link to="/user">CREATE USER</Link>
          <Route path="/" exact component={UsersList} />
          <Route path="/user/:pk" component={UserCreateUpdate} />
          <Route path="/user/" exact component={UserCreateUpdate} />
        </Content>
      </SidebarHoverContext.Provider>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <BaseLayout></BaseLayout>
    </BrowserRouter>
  );
};

export default App;

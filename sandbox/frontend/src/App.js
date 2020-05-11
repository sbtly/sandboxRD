import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import UsersList from "./UsersList";
import UserCreateUpdate from "./UserCreateUpdate";
import "./normalize.css";
// import "./App.css";
import { GlobalStyle } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { Content } from "./components/Content";

const BaseLayout = (props) => {
  const [hovered, setHovered] = useState(null);
  const receivedHovered = (value) => {
    setHovered(value);
  };

  console.log(hovered);

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
      <Sidebar hovered={receivedHovered}></Sidebar>

      {/* <div className="content"> */}
      <Content hovered={hovered}>
        <a className="nav-item nav-link" href="/">
          Users
        </a>
        <a className="nav-item nav-link" href="/user">
          CREATE USER
        </a>
        <Route path="/" exact component={UsersList} />
        <Route path="/user/:pk" component={UserCreateUpdate} />
        <Route path="/user/" exact component={UserCreateUpdate} />
        {/* </div> */}
      </Content>
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

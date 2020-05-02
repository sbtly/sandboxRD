// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import UsersList from "./UsersList";
import UserCreateUpdate from "./UserCreateUpdate";
import "./App.css";

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <a className="navbar-brand" href="#">
        Django React Demo
      </a> */}
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
    </nav>
    <div className="content">
      <Route path="/" exact component={UsersList} />
      <Route path="/user/:pk" component={UserCreateUpdate} />
      <Route path="/user/" exact component={UserCreateUpdate} />
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <BaseLayout></BaseLayout>
    </BrowserRouter>
  );
};

export default App;

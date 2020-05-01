import React, { useState, useEffect } from "react";
import { render } from "react-dom";

const App = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [placeholder, setPlaceholder] = useState("Loading");

  useEffect(() => {
    fetch("api/user")
      .then((response) => {
        if (response.status > 400) {
          return setPlaceholder("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        return setData(data), setLoaded(true);
      });
  }, []);

  return (
    <ul>
      {data.map((contact) => {
        // return ( # 이게 있으면 에러남!!
        <li key={contact.id}>
          {contact.name} - {contact.email}
        </li>;
        // );
      })}
    </ul>
  );
};

export default App;

const container = document.getElementById("app");
render(<App />, container);

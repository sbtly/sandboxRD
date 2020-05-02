import React, { useEffect, useState, useCallback } from "react";
import UserAPI from "./UserAPI";
import ReactDataGrid from "react-data-grid";

const userAPI = new UserAPI();

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [nextPageURL, setNextPageURL] = useState("");

  //   const [rows, setRows] = useState([]);

  const nextPage = useCallback(() => {
    userAPI.getUsersByURL(nextPageURL).then((result) => {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
    });
  }, [nextPageURL]);

  const handleDelete = useCallback(
    (e, pk) => {
      userAPI.deleteUser({ pk: pk }).then(() => {
        var newArr = users.filter(function (obj) {
          return obj.pk !== pk;
        });
        setUsers(newArr);
      });
    },
    [users]
  );

  //   const columns = [
  //     { key: "id", name: "ID" },
  //     { key: "first_name", name: "First Name" },
  //     { key: "last_name", name: "Last Name" },
  //   ];

  //   const rows = [
  //     users.map((u) => ({
  //       id: u.pk,
  //       first_name: u.first_name,
  //       last_name: u.last_name,
  //     })),
  //   ];
  const columns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
  ];

  const rows = [
    { id: 0, title: "Example" },
    { id: 1, title: "Demo" },
  ];

  console.log(rows);

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
    });
  }, []);

  return (
    <div className="usersList">
      {/* <table className="table">
        <thead key="thead">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.pk}>
              <td>{u.pk}</td>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
              <td>
                <button onClick={(e) => handleDelete(e, u.pk)}>Delete</button>
                <a href={"/user/" + u.pk}>Update</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => rows[i]}
        rowsCount={3}
        // minHeight={150}
      ></ReactDataGrid>

      <button className="btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default UsersList;

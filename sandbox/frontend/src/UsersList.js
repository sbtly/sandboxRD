import React, { useEffect, useState, useCallback } from "react";
import UserAPI from "./UserAPI";
import * as Table from "reactabular-table";

const userAPI = new UserAPI();

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [nextPageURL, setNextPageURL] = useState("");

  //   const [rows, setRows] = useState([]);
  //   const [columns, setColumns] = useState([]);

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

  // reactabular.. effect안에? layout안에?
  const rows = [
    users.map((u) => ({
      //   id: i,
      pk: u.pk,
      first_name: u.first_name,
      last_name: u.last_name,
    })),
  ];

  const columns = [
    {
      property: "pk",
      header: {
        label: "no.",
      },
    },
    {
      property: "first_name",
      header: {
        label: "First Name",
      },
    },
    {
      property: "last_name",
      header: {
        label: "Last Name",
      },
    },
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

      <Table.Provider className="table" columns={columns}>
        <Table.Header></Table.Header>
        <Table.Body rows={rows} rowKey="pk"></Table.Body>
      </Table.Provider>

      <button className="btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default UsersList;

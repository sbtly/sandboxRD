import React, { useEffect, useState, useCallback } from "react";
import UserAPI from "./UserAPI";

const userAPI = new UserAPI();

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [nextPageURL, setNextPageURL] = useState("");

  const nextPage = useCallback(() => {
    userAPI.getUsersByURL(nextPageURL).then((result) => {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
    });
  }, []);

  const handleDelete = useCallback((e, pk) => {
    userAPI.deleteUser({ pk: pk }).then(() => {
      var newArr = users.filter(function (obj) {
        return obj.pk !== pk;
      });
      setUsers(newArr);
    });
  }, []);

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
    });
  }, []);

  return (
    <div className="usersList">
      <table className="table">
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
              <td>{u.phone}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.description}</td>
              <td>
                <button onClick={(e) => handleDelete(e, u.pk)}>Delete</button>
                <a href={"/user/" + u.pk}>Update</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default UsersList;

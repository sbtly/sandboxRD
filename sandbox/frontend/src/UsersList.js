import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import { useTable } from "react-table";

const userAPI = new UserAPI();

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [nextPageURL, setNextPageURL] = useState("");

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

  //   const data = useMemo(
  //     () => [
  //       {
  //         col1: "Hello",
  //         col2: "World",
  //       },
  //       {
  //         col1: "react-table",
  //         col2: "rocks",
  //       },
  //       {
  //         col1: "whatever",
  //         col2: "you want",
  //       },
  //     ],
  //     []
  //   );

  //   const columns = useMemo(
  //     () => [
  //       {
  //         Header: "Column 1",
  //         accessor: "col1", // accessor is the "key" in the data
  //       },
  //       {
  //         Header: "Column 2",
  //         accessor: "col2",
  //       },
  //     ],
  //     []
  //   );

  const data = useMemo(
    () =>
      users.map((u) => ({
        pk: u.pk,
        first_name: u.first_name,
        last_name: u.last_name,
      })),
    [users]
  );

  //   const data = useMemo(
  //     () => [
  //       users.map((u) => ({
  //         pk: u.pk,
  //         first_name: u.first_name,
  //         last_name: u.last_name,
  //       })),
  //     ],
  //     []
  //   );
  const columns = useMemo(
    () => [
      {
        Header: "no.",
        accessor: "pk",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  //   console.log(data);

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
    });
    console.log(data);
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

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default UsersList;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import { Table } from "react-fluid-table";

const userAPI = new UserAPI();
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const data = useMemo(
    () =>
      users.map((u) => ({
        pk: u.pk,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        phone: u.phone,
        address: u.address,
        description: u.description,
      })),
    [users]
  );

  const columns = useMemo(
    () => [
      {
        key: "pk",
        header: "no .",
        width: 100,
      },
      {
        key: "first_name",
        header: "First Name",
        width: 100,
      },
    ],
    []
  );

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      // setNextPageURL(result.nextlink);
      // setPrevPageURL(result.prevlink);
    });
  }, []);

  return <Table data={data} columns={columns}></Table>;
};

export default UsersList;

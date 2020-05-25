import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import { Table } from "af-virtual-scroll";
// import "af-virtual-scroll/lib/style.css";

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
        dataKey: "pk",
        label: "no .",
      },
      {
        dataKey: "first_name",
        label: "First Name",
      },
    ],
    []
  );

  const getRowData = useCallback((i) => data[i], [data]);

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
    });
  }, []);

  return (
    <Table getRowData={getRowData} columns={columns} rowCount={100}></Table>
  );
};

export default UsersList;

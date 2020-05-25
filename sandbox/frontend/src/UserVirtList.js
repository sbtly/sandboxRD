import { WindowScroller, AutoSizer, Column, Table } from "react-virtualized";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import "react-virtualized/styles.css";

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

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
    });
  }, []);

  //       {
  //     Header: ".",
  //     accessor: "pk",
  //   },
  //   {
  //     Header: "이름",
  //     accessor: "first_name",
  //   },
  //   {
  //     Header: "성",
  //     accessor: "last_name",
  //   },
  //   {
  //     Header: "메일",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "번호",
  //     accessor: "phone",
  //   },
  //   {
  //     Header: "주소",
  //     accessor: "address",
  //   },
  //   {
  //     Header: "설명",
  //     accessor: "description",
  //   },

  return (
    <WindowScroller>
      {({ height, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              autoHeight
              height={height}
              width={width}
              scrollTop={scrollTop}
              rowHeight={30}
              headerHeight={30}
              rowGetter={({ index }) => data[index]}
              rowCount={data.length}
              overscanRowCount={5}
            >
              <Column label="no." dataKey="pk" width={100}></Column>
              <Column label="fn" dataKey="first_name" width={100}></Column>
              <Column label="ln" dataKey="last_name" width={100}></Column>
              <Column label="email" dataKey="email" width={100}></Column>
              <Column label="phone" dataKey="phone" width={100}></Column>
              <Column label="address" dataKey="address" width={100}></Column>
              <Column
                label="description"
                dataKey="description"
                width={100}
              ></Column>
            </Table>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default UsersList;

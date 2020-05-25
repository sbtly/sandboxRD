import { WindowScroller, AutoSizer, Column, Table } from "react-virtualized";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import "react-virtualized/styles.css";

const userAPI = new UserAPI();
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
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
              <Column label="no." dataKey="pk" width={10} flexGrow={1}></Column>
              <Column
                label="fn"
                dataKey="first_name"
                width={10}
                flexGrow={2}
              ></Column>
              <Column
                label="ln"
                dataKey="last_name"
                width={10}
                flexGrow={2}
              ></Column>
              <Column
                label="email"
                dataKey="email"
                width={10}
                flexGrow={2}
              ></Column>
              <Column
                label="phone"
                dataKey="phone"
                width={10}
                flexGrow={2}
              ></Column>
              <Column
                label="address"
                dataKey="address"
                width={10}
                flexGrow={3}
              ></Column>
              <Column
                label="description"
                dataKey="description"
                width={10}
                flexGrow={5}
              ></Column>
            </Table>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default UsersList;

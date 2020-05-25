import { WindowScroller, AutoSizer, Column, Table } from "react-virtualized";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import "react-virtualized/styles.css";
import styled from "styled-components";

import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
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
        Header: ".",
        accessor: "pk",
      },
      {
        Header: "이름",
        accessor: "first_name",
      },
      {
        Header: "성",
        accessor: "last_name",
      },
      {
        Header: "메일",
        accessor: "email",
      },
      {
        Header: "번호",
        accessor: "phone",
      },
      {
        Header: "주소",
        accessor: "address",
      },
      {
        Header: "설명",
        accessor: "description",
      },
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  );

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
    });
  }, []);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <WindowScroller>
      {({ height, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            // <Styles>
            <div {...getTableProps()} className="table">
              <div>
                {headerGroups.map((headerGroup) => (
                  <div {...headerGroup.getHeaderGroupProps()} className="tr">
                    {headerGroup.headers.map((column) => (
                      <div {...column.getHeaderProps()} className="th">
                        {column.render("Header")}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div {...getTableBodyProps()}>
                <FixedSizeList
                  scrollTop={scrollTop}
                  height={height}
                  itemCount={rows.length}
                  itemSize={35}
                  width={width}
                >
                  {RenderRow}
                  {/* {rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <div {...row.getRowProps()} className="tr">
                          {row.cells.map((cell) => {
                            return (
                              <div {...cell.getCellProps()} className="td">
                                {cell.render("Cell")}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })} */}
                </FixedSizeList>
              </div>
            </div>
            // </Styles>
            // <Table
            //   autoHeight
            //   height={height}
            //   width={width}
            //   scrollTop={scrollTop}
            //   rowHeight={30}
            //   headerHeight={30}
            //   rowGetter={({ index }) => data[index]}
            //   rowCount={data.length}
            //   overscanRowCount={5}
            // >
            //   <Column label="no." dataKey="pk" width={10} flexGrow={1}></Column>
            //   <Column
            //     label="fn"
            //     dataKey="first_name"
            //     width={10}
            //     flexGrow={2}
            //   ></Column>
            //   <Column
            //     label="ln"
            //     dataKey="last_name"
            //     width={10}
            //     flexGrow={2}
            //   ></Column>
            //   <Column
            //     label="email"
            //     dataKey="email"
            //     width={10}
            //     flexGrow={2}
            //   ></Column>
            //   <Column
            //     label="phone"
            //     dataKey="phone"
            //     width={10}
            //     flexGrow={2}
            //   ></Column>
            //   <Column
            //     label="address"
            //     dataKey="address"
            //     width={10}
            //     flexGrow={3}
            //   ></Column>
            //   <Column
            //     label="description"
            //     dataKey="description"
            //     width={10}
            //     flexGrow={5}
            //   ></Column>
            // </Table>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default UsersList;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import { useTable, useFlexLayout } from "react-table";
import styled from "styled-components";
import { animated } from "react-spring";

// styled
const TableWrapperStyled = styled(animated.div)`
  /* overflow-x: auto; */
  display: block;
`;

// const TableStyled = styled(animated.table)`
const TableStyled = styled(animated.div)`
  /* border-collapse: collapse; */
  /* border-spacing: 0; */
  font-size: 0.8em;
  text-align: left;
`;

// const THeadStyled = styled(animated.thead)`
const THeadStyled = styled(animated.div)`
  background: rgba(0, 0, 0, 0.04);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 4px;
`;

// const TBodyStyled = styled(animated.tbody)`
const TBodyStyled = styled(animated.div)`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
`;

// const TrStyled = styled(animated.tr)`
const TrStyled = styled(animated.div)`
  /* :nth-child(even) {
    background: rgba(0, 0, 0, 0.02);
  } */
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
  overflow-wrap: break-word;
`;

// const ThStyled = styled(animated.th)`
const ThStyled = styled(animated.div)`
  padding: 1em 1em;
  /* position: relative; */
`;

// const TdStyled = styled(animated.td)`
const TdStyled = styled(animated.div)`
  padding: 0.8em 1em;
  border-bottom: 1px solid #ddd;
  /* position: relative; */
`;

const userAPI = new UserAPI();

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [nextPageURL, setNextPageURL] = useState("");
  const [prevPageURL, setPrevPageURL] = useState("");

  const nextPage = useCallback(() => {
    userAPI.getUsersByURL(nextPageURL).then((result) => {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
    });
  }, [nextPageURL]);

  const prevPage = useCallback(() => {
    userAPI.getUsersByURL(prevPageURL).then((result) => {
      setUsers(result.data);
      setNextPageURL(result.prevlink);
    });
  }, [prevPageURL]);

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
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "phone",
        accessor: "phone",
      },
      {
        Header: "address",
        accessor: "address",
      },
      {
        Header: "description",
        accessor: "description",
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizings
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, defaultColumn }, useFlexLayout);

  //   console.log(data);

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      setNextPageURL(result.nextlink);
      setPrevPageURL(result.prevlink);
    });
  }, []);

  return (
    <TableWrapperStyled className="usersList">
      <TableStyled {...getTableProps()}>
        <THeadStyled>
          {headerGroups.map((headerGroup) => (
            <TrStyled {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <ThStyled {...column.getHeaderProps()}>
                  {column.render("Header")}
                </ThStyled>
              ))}
            </TrStyled>
          ))}
        </THeadStyled>
        <TBodyStyled {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TrStyled {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TdStyled {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TdStyled>
                  );
                })}
                {/* <td>
                  <button onClick={(e) => handleDelete(e, data[i].pk)}>
                    Delete
                  </button>
                  <a href={"/user/" + data[i].pk}>Update</a>
                </td> */}
              </TrStyled>
            );
          })}
        </TBodyStyled>
      </TableStyled>

      <button className="btn" onClick={prevPage}>
        Prev
      </button>
      <button className="btn" onClick={nextPage}>
        Next
      </button>
    </TableWrapperStyled>
  );
};

export default UsersList;

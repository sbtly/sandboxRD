import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserAPI from "./UserAPI";
import { useTable } from "react-table";
import styled from "styled-components";
import { animated } from "react-spring";

// styled
const TableWrapperStyled = styled(animated.div)`
  overflow-x: auto;
`;

const TableStyled = styled(animated.table)`
  border-collapse: collapse;
  font-size: 0.8em;
  text-align: left;
`;

const THeadStyled = styled(animated.thead)`
  /* border-collapse: collapse; */
  background: rgba(0, 0, 0, 0.04);
`;

const TBodyStyled = styled(animated.tbody)`
  /* border-collapse: collapse; */
`;

const ThStyled = styled(animated.th)`
  /* border-collapse: collapse; */
  padding: 0.5em 1em;
`;

const TrStyled = styled(animated.tr)`
  /* border-collapse: collapse; */
  :nth-child(even) {
    background: rgba(0, 0, 0, 0.02);
  }
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const TdStyled = styled(animated.td)`
  /* border-collapse: collapse; */
  padding: 0.8em 1em;
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

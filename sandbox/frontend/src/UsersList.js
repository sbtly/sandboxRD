import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import UserAPI from "./UserAPI";
import { useTable, useFlexLayout } from "react-table";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";
import { animated } from "react-spring";
import { global } from "./styles";

// styled

const Styles = styled.div`
  padding: 1rem;
  ${"" /* These styles are suggested for the table fill all available space in its containing element */}
  display: block;
  ${"" /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;

  .table {
    border-spacing: 0;
    border: 1px solid black;

    .thead {
      ${"" /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      overflow-y: hidden;
      overflow-x: hidden;
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid black;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;
      word-break: break-word;

      ${"" /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const TableWrapperStyled = styled(animated.div)`
  /* overflow-x: auto; */
  /* display: block; */
`;

// const TableStyled = styled(animated.div)`
const TableStyled = styled(animated.table)`
  /* border-collapse: separate; */
  border-collapse: collapse;

  /* border-spacing: 0 6px;
  margin-top: -6px; */

  font-size: 0.8em;
  text-align: left;
  font-weight: 700;
`;

// const THeadStyled = styled(animated.div)`
const THeadStyled = styled(animated.thead)`
  /* background: rgba(0, 0, 0, 0.04); */
  /* overflow-y: auto;
  overflow-x: hidden; */
  border-radius: 4px;
  color: ${global.colors.primary};

  tr {
    box-shadow: none;
  }
`;

// const TBodyStyled = styled(animated.div)`
const TBodyStyled = styled(animated.tbody)`
  /* overflow-y: scroll;
  overflow-x: hidden; */
  /* height: 70vh; */
`;

// const TrStyled = styled(animated.div)`
const TrStyled = styled(animated.tr)`
  /* :nth-child(even) {
    background: rgba(0, 0, 0, 0.02);
  } */
  :hover {
    /* background: rgba(0, 0, 0, 0.02); */
    /* background: rgba(255, 255, 255, 0.5); */
    background: "#E9D3D0";
    color: ${global.colors.primary};

    td {
      border-bottom: 1px solid ${global.colors.primary};
    }
  }
  /* box-shadow: 0 0.25em 0.375em rgba(50, 50, 93, 0.04),
    0 0.063em 0.188em rgba(0, 0, 0, 0.02); */
`;

// const ThStyled = styled(animated.div)`
const ThStyled = styled(animated.th)`
  padding: 1.2em 2em 1.2em 0em;

  vertical-align: bottom;
  /* border-top: 2px solid ${global.colors.primary}; */
  border-bottom: 4px solid ${global.colors.primary};
  border-right: 1px solid rgba(0, 0, 0, 0.05);

  /* :first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  } */

  /* position: relative; */
`;

// const TdStyled = styled(animated.div)`
const TdStyled = styled(animated.td)`
  vertical-align: top;

  /* padding: 1em 1em 1.5em 1em; */
  padding: 1.2em 2em 1.2em 0em;
  border-bottom: 1px solid ${global.colors.primary};
  border-right: 0.5px solid rgba(0, 0, 0, 0.05);
  /* margin: 2px 0; */
  /* background: white; */

  overflow-wrap: break-word;

  :last-child {
    /* border-left: 1px solid rgba(0, 0, 0, 0.05); */

    /* border-bottom: none; */
    border-right: none;
  }

  /* :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  :last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  } */
`;

const userAPI = new UserAPI();

function Table({ columns, data }) {
  const overscan = 5;
  const defaultItemHeight = 80; // needs to be close to real height, so that it can be rendered faster
  const totalCount = data.length;
  const [totalListHeight, setTotalListHeight] = useState(
    totalCount * defaultItemHeight
  );

  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 10, // minWidth is only used as a limit for resizing
      width: 20, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
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
    useFlexLayout
  );

  const RenderRow = React.useCallback(
    (index) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            // style,
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
    <div {...getTableProps()} className="table">
      <div className="thead">
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

      <div {...getTableBodyProps()} className="tbody">
        <Virtuoso
          ScrollContainer={MyScrollContainer}
          totalCount={totalCount}
          overscan={overscan}
          item={RenderRow}
          // defaultItemHeight={defaultItemHeight}
          style={{
            height: totalListHeight,
            minHeight: Math.max(totalListHeight, defaultItemHeight),
            // maxHeight: "100vh",
          }}
          // rangeChanged={(a) => console.log("Range changed ", a)}
          totalListHeightChanged={(a) => {
            // console.log("Total list height changed ", a);
            setTotalListHeight(a);
          }}
        />
      </div>
    </div>
  );
}

const MyScrollContainer = ({
  className,
  style,
  reportScrollTop,
  scrollTo,
  children,
}) => {
  const elRef = useRef(null);
  const lastOffsetTopRef = useRef(0);

  const reportScroll = useCallback(() => {
    reportScrollTop(Math.max(0, window.scrollY - elRef.current.offsetTop));
  }, [reportScrollTop]);

  useEffect(() => {
    window.addEventListener("scroll", reportScroll);
    return () => window.removeEventListener("scroll", reportScroll);
  }, [reportScroll]);

  useEffect(() => {
    lastOffsetTopRef.current = elRef.current.offsetTop;
    const offsetCheckInterval = setInterval(() => {
      const offsetTop = elRef.current.offsetTop;
      if (offsetTop !== lastOffsetTopRef.current) {
        lastOffsetTopRef.current = offsetTop;
        reportScroll();
      }
    }, 500);

    return () => clearInterval(offsetCheckInterval);
  }, [elRef.current]);

  useEffect(() => {
    scrollTo(({ top }) => {
      window.scrollTo(0, top + lastOffsetTopRef.current);
      console.log("Scroll to", top + lastOffsetTopRef.current);
    });
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        ...style,
        width: "100%",
        overflow: "visible",
        // border: "5px dashed gray",
        // borderRadius: "4px",
      }}
      tabIndex={0}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (index === 0) {
          return React.cloneElement(child, {
            // className: `${child.className || ""} theDiv`,
            style: {
              ...child.props.style,
              maxHeight: "100vh",
            },
          });
        }

        return child;
      })}
    </div>
  );
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  // const [nextPageURL, setNextPageURL] = useState("");
  // const [prevPageURL, setPrevPageURL] = useState("");

  // const nextPage = useCallback(() => {
  //   userAPI.getUsersByURL(nextPageURL).then((result) => {
  //     setUsers(result.data);
  //     setNextPageURL(result.nextlink);
  //   });
  // }, [nextPageURL]);

  // const prevPage = useCallback(() => {
  //   userAPI.getUsersByURL(prevPageURL).then((result) => {
  //     setUsers(result.data);
  //     setNextPageURL(result.prevlink);
  //   });
  // }, [prevPageURL]);

  // const handleDelete = useCallback(
  //   (e, pk) => {
  //     userAPI.deleteUser({ pk: pk }).then(() => {
  //       var newArr = users.filter(function (obj) {
  //         return obj.pk !== pk;
  //       });
  //       setUsers(newArr);
  //     });
  //   },
  //   [users]
  // );

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

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      // setNextPageURL(result.nextlink);
      // setPrevPageURL(result.prevlink);
    });
  }, []);

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
};

export default UsersList;

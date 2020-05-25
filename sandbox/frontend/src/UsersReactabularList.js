import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import UserAPI from "./UserAPI";
import * as Table from "reactabular-table";
import * as Sticky from "reactabular-sticky";
import * as Virtualized from "reactabular-virtualized";
import * as resolve from "table-resolver";

const userAPI = new UserAPI();
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const container = useRef();

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
        property: "pk",
        header: {
          label: "no .",
        },
        props: {
          style: { minWidth: 50 },
        },
      },
      {
        property: "first_name",
        header: {
          label: "name",
        },
        props: {
          style: { minWidth: 50 },
        },
      },
    ],
    []
  );

  const schema = {
    type: "object",
    properties: {
      pk: {
        type: "integer",
      },
      first_name: {
        type: "string",
      },
    },
    required: ["pk"],
  };

  const rows = resolve.resolve({ columns })(data);

  useEffect(() => {
    userAPI.getUsers().then(function (result) {
      setUsers(result.data);
      // setNextPageURL(result.nextlink);
      // setPrevPageURL(result.prevlink);
    });
  }, []);

  return (
    <div ref={container} style={{ height: "100%", overflow: "auto" }}>
      <Table.Provider
        columns={columns}
        renderers={{
          body: {
            wrapper: Virtualized.BodyWrapper,
            row: Virtualized.BodyRow,
          },
        }}
      >
        <Table.Header style={{ maxWidth: 800 }} />

        {/* <Table.Body rows={rows} rowKey="pk" /> */}

        <Virtualized.Body
          container={() => container.current}
          rows={rows}
          rowKey="pk"
          style={{
            maxWidth: 800,
          }}
          height={400}
        />
      </Table.Provider>
    </div>
  );
};

export default UsersList;

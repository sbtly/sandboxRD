import React, { useEffect, useCallback, useRef } from "react";

import UserAPI from "./UserAPI";
const userAPI = new UserAPI();

const UserCreateUpdate = (props) => {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const address = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    const {
      match: { params },
    } = props;

    if (params && params.pk) {
      userAPI.getUser(params.pk).then((u) => {
        firstName.value = u.first_name;
        lastName.value = u.last_name;
        email.value = u.email;
        phone.value = u.phone;
        description.value = u.description;
      });
    }
  }, [props]);

  const handleCreate = useCallback(() => {
    userAPI
      .createUser({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        description: description.value,
      })
      .then((result) => {
        alert("User created!");
      })
      .catch(() => {
        alert("error! re-check your form");
      });
  }, []);

  const handleUpdate = useCallback((pk) => {
    userAPI
      .updateUser({
        pk: pk,
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        description: description.value,
      })
      .then((result) => {
        console.log(result);
        alert("User updated!");
      })
      .catch(() => {
        alert("error");
      });
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      const {
        match: { params },
      } = props;

      if (params && params.pk) {
        handleUpdate(params.pk);
      } else {
        handleCreate();
      }

      event.preventDefault();
    },
    [handleCreate, handleUpdate, props]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input className="form-control" type="text" ref={firstName} />

        <label>Last Name:</label>
        <input className="form-control" type="text" ref={lastName} />

        <label>Phone:</label>
        <input className="form-control" type="text" ref={phone} />

        <label>Email:</label>
        <input className="form-control" type="text" ref={email} />

        <label>Address:</label>
        <input className="form-control" type="text" ref={address} />

        <label>Description:</label>
        <textarea className="form-control" ref={description}></textarea>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default UserCreateUpdate;

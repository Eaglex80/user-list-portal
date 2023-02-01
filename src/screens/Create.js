import React, { useEffect, useState } from "react";

import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";

export default function Create() {
  const history = useHistory();

  const [storage] = useState(window.localStorage);

  const [initialUserDetails] = useState({
    id: "-1",
    name: "",
    contact_no: 0,
  });

  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [isEditing] = useState(false);

  const [userList, setUserList] = useState(
    storage.getItem("userList") !== null
      ? JSON.parse(storage.getItem("userList"))
      : []
  );

  const [inputBlankError, setInputBlankError] = useState("");

  // useEffect(() => {
  //   storage.setItem("userList", JSON.stringify(userList));
  // }, [userList, storage]);

  function onUserInputHandler(e, userField) {
    setUserDetails((currentUser) => ({
      ...currentUser,
      [userField]: e.target.value,
    }));
  }

  function addUserDataToListHandler(e) {
    e.preventDefault();
    setInputBlankError("");

    var isUserNotValid = Object.values(userDetails).some((value) => {
      if (value === null || value === "") return true;

      return false;
    });

    if (userDetails.name.length >= 20) {
      setInputBlankError("Name should length should be below 20 char");
      return;
    }

    if (userDetails.contact_no.length !== 10) {
      setInputBlankError("Enter valid contact no. of 10 digits");
      return;
    }

    isUserNotValid =
      userDetails.name.length >= 20 || userDetails.contact_no.length !== 10;

    if (isUserNotValid) {
      setInputBlankError("Enter valid Data");
      return;
    }

    const newList = [
      ...userList,
      {
        ...userDetails,
        id: nanoid(),
      },
    ];

    storage.setItem("userList", JSON.stringify(newList));

    setUserList([]);

    setUserDetails(initialUserDetails);

    history.push("/");
  }

  return (
    <div className="col-3 p-4 h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <h1>User Portal</h1>
      <h5 className="mb-5">Form Section</h5>

      <form onSubmit={addUserDataToListHandler} className="w-25 border p-3">
        <div className="form-floating mb-3">
          <input
            type="name"
            className="form-control"
            id="name"
            placeholder="Sham Roy"
            value={userDetails.name}
            onChange={(e) => onUserInputHandler(e, "name")}
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="contact"
            placeholder="90xxxxxxxx"
            value={userDetails.contact_no}
            onChange={(e) => onUserInputHandler(e, "contact_no")}
          />
          <label htmlFor="contact">Contact no.</label>
        </div>

        {inputBlankError !== "" && (
          <div class="alert alert-warning px-2 py-1 w-100" role="alert">
            {inputBlankError}
          </div>
        )}

        <button className="btn bg-primary text-white  w-100" type="submit">
          {isEditing ? "Update user" : " Add User"}
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";

import { nanoid } from "nanoid";

export default function OldHomeScreen() {
  const [storage] = useState(window.localStorage);

  const [initialUserDetails] = useState({
    id: "-1",
    name: "",
    contact_no: 0,
  });

  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [isEditing, setIsEditing] = useState(false);

  const [userList, setUserList] = useState(
    storage.getItem("userList") !== null
      ? JSON.parse(storage.getItem("userList"))
      : []
  );

  const [inputBlankError, setInputBlankError] = useState("");

  useEffect(() => {
    storage.setItem("userList", JSON.stringify(userList));
  }, [userList, storage]);

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

    setUserList((currentUsers) => [
      ...currentUsers,
      {
        ...userDetails,
        id: nanoid(),
      },
    ]);

    setUserDetails(initialUserDetails);
  }

  function updateUserFromList(e, userData) {
    e.preventDefault();
    setInputBlankError("");
    setIsEditing(true);
    setUserDetails(userData);
  }

  function updateUserFromListHandler(e) {
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

    setUserList((currentUsers) =>
      currentUsers.map((currentUser) => {
        if (currentUser.id === userDetails.id) {
          return userDetails;
        }
        return currentUser;
      })
    );

    setUserDetails(initialUserDetails);
    setIsEditing(false);
  }

  function deleteUserFromList(e, id) {
    e.preventDefault();
    setUserList((currentUsers) =>
      currentUsers.filter((currentUser) => {
        if (currentUser.id !== id) {
          return currentUser;
        }
        return null;
      })
    );
  }

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div className="col-3 p-4 bg-light">
        <h1>User Portal</h1>
        <h5 className="mb-2">Form Section</h5>

        <form
          onSubmit={
            isEditing ? updateUserFromListHandler : addUserDataToListHandler
          }
        >
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
            <div class="alert alert-warning px-2 py-1" role="alert">
              {inputBlankError}
            </div>
          )}

          <button className="btn bg-primary text-white" type="submit">
            {isEditing ? "Update user" : " Add User"}
          </button>
        </form>
      </div>
      <div className="col-9 p-4">
        <h3>Users list</h3>
        {userList.map((user) => (
          <div className="user p-3 mb-3 border bg-light" key={user.id}>
            <h6 className="text-capitalize">
              <b>name : </b>
              {user.name}
            </h6>
            <p className="text-capitalize">
              <b>Contact no. : </b>
              {user.contact_no}
            </p>
            <div className="d-flex gap-2">
              <button
                className="btn bg-warning text-white"
                onClick={(e) => updateUserFromList(e, user)}
              >
                Update
              </button>
              <button
                className="btn bg-danger text-white"
                onClick={(e) => deleteUserFromList(e, user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

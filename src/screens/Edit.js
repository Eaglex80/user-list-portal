import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

export default function Edit(props) {
  const history = useHistory();

  const [storage] = useState(window.localStorage);

  const [initialUserDetails] = useState({
    id: "-1",
    name: "",
    contact_no: 0,
  });

  const [userDetails, setUserDetails] = useState(initialUserDetails);

  const [userList, setUserList] = useState(
    storage.getItem("userList") !== null
      ? JSON.parse(storage.getItem("userList"))
      : []
  );

  const [inputBlankError, setInputBlankError] = useState("");

  useEffect(() => {
    storage.setItem("userList", JSON.stringify(userList));
  }, [userList, storage]);

  useEffect(() => {
    userList.filter((currentUser) => {
      if (currentUser.id === props.match.params.id) {
        setUserDetails(currentUser);
      }
      return null;
    });
  }, [props.match.params.id, userList]);

  function onUserInputHandler(e, userField) {
    setUserDetails((currentUser) => ({
      ...currentUser,
      [userField]: e.target.value,
    }));
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

    const newList = userList.map((user) => {
      if (user.id === userDetails.id) {
        return userDetails;
      }
      return user;
    });


    storage.setItem("userList", JSON.stringify(newList));
    
    setUserList([]);

    setUserDetails(initialUserDetails);

    history.push("/");
  }

  return (
    <div className="col-3 p-4 h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <h1>User Portal</h1>
      <h5 className="mb-5">Form Section</h5>

      <form onSubmit={updateUserFromListHandler} className="w-25 border p-3">
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
          Update user
        </button>
      </form>
    </div>
  );
}

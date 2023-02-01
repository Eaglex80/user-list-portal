import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function HomeScreen() {
  const history = useHistory();

  const [storage] = useState(window.localStorage);

  const [userList, setUserList] = useState(
    storage.getItem("userList") !== null
      ? JSON.parse(storage.getItem("userList"))
      : []
  );

  useEffect(() => {
    storage.setItem("userList", JSON.stringify(userList));
  }, [userList, storage]);

  function deleteUserFromList(e, id) {
    e.preventDefault();

    confirmAlert({
      message: "Do you want to Delete this user?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes Sure",
          onClick: () =>
            setUserList((currentUsers) =>
              currentUsers.filter((currentUser) => {
                if (currentUser.id !== id) {
                  return currentUser;
                }
                return null;
              })
            ),
        },
      ],
    });
  }
  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <div className="col-12 p-4">
          {userList.length !== 0 ? (
            userList.map((user) => (
              <div
                className="user p-3 mb-3 border bg-light d-flex justify-content-between "
                key={user.id}
              >
                <div>
                  <h5 className="text-capitalize">
                    <b>name : </b>
                    {user.name}
                  </h5>
                  <h6 className="text-capitalize">
                    <b>Contact no. : </b>
                    {user.contact_no}
                  </h6>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button
                    className="btn btn-success"
                    onClick={(e) => history.push("/edit/" + user.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger "
                    onClick={(e) => deleteUserFromList(e, user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h3>User list is empty</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="p-3 d-flex w-100 justify-content-between bg-dark">
      <h3 className="text-white">Users List</h3>

      <div className="d-flex gap-2">
        <Link className="btn btn-outline-primary" to={"/"}>
          User List
        </Link>
        <Link className="btn btn-outline-warning" to={"/create"}>
          Create user
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

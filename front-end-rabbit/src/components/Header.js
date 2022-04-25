import React from "react";

const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-light bg-white shadow"
        style={{ width: "100%" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Home
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;

import "./style.css";

import { Outlet, NavLink } from "react-router-dom";

const DashBoard = () => {
  const activeClass = (params) => {
    return params.isActive ? "active-item" : "";
  };
  return (
    <div className="dashboard">
      <nav className="nav-dash">
        <h1 className="title-dash">DashBoard</h1>
        <NavLink to="add-member" className={activeClass}>
          ADD-MEMBER
        </NavLink>
        <NavLink to="list-member" className={`nav-list ${activeClass}`}>
          LIST-MEMBER
        </NavLink>
      </nav>

      <div className="box-dash-right">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;

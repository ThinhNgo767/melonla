import "./style.css";

import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = ({ isLogin, setIsLogin, ranker, setRanker }) => {
  const activeClass = (params) => {
    return params.isActive ? "active-item" : "";
  };

  const { admin, access } = ranker;

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("dataMelon");
    setIsLogin(false);
    setRanker(false);
    navigate("/");
  };

  return (
    <div className="container-header">
      <div className="landing">
        <ul className="nav-list">
          {isLogin ? (
            <>
              {access && admin && (
                <>
                  <li>
                    <NavLink to="/dashboard" className={activeClass}>
                      DB
                    </NavLink>
                  </li>
                  <li>|</li>
                </>
              )}

              <li>
                <NavLink to="/cal-melon" className={activeClass}>
                  APP
                </NavLink>
              </li>
              {access && (
                <>
                  <li>|</li>
                  <li>
                    <NavLink to="/list" className={activeClass}>
                      Custom
                    </NavLink>
                  </li>
                </>
              )}

              <li>|</li>
              <li>
                <button className="logout" onClick={handleLogout}>
                  <AiOutlineLogout /> LOGOUT
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/" className={activeClass}>
                  Home
                </NavLink>
              </li>
              <li>|</li>
              <li>
                <NavLink to="/contact" className={activeClass}>
                  Contact us
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <h1>V.I.P MELON LA</h1>
    </div>
  );
};

export default Header;

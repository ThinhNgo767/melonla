import "./style.css";
import { URL_API_USERS } from "../../api/dataMelon";
import { fetchDataMelon } from "../../api/dataMelon";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Home = ({ setIsLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertError, setAlertError] = useState("");
  const [hidden, setHidden] = useState(false);

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      setAlertError("Vui lòng nhập đủ usename và password");
      return;
    }
    await axios
      .get(URL_API_USERS)
      .then((res) => {
        const users = res.data;

        let user = users.find((u) => u.userName === userName);
        if (!user) {
          return setAlertError("Tài khoản không tồn tại!");
        } else if (user.password !== password) {
          return setAlertError("Mật khẩu không đúng!");
        } else {
          sessionStorage.setItem("user", user.userName);
          setIsLogin(true);
          setUserName("");
          setPassword("");
          fetchDataMelon();
          navigate("/cal-melon");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleShowAndHidePass = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };
  return (
    <div className="home-login">
      <form onSubmit={handleSubmitLogin}>
        <div className="item">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="item item-pass">
          <label htmlFor="password">password</label>
          <input
            type={hidden ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="item-hide">
            {hidden ? (
              <button
                type="button"
                className="hide-unhide"
                onClick={handleShowAndHidePass}
              >
                <AiFillEye />
              </button>
            ) : (
              <button
                type="button"
                className="hide-unhide"
                onClick={handleShowAndHidePass}
              >
                <AiFillEyeInvisible />
              </button>
            )}
          </div>
        </div>
        <div className="form-button">
          <button
            className="submit-btn"
            type="submit"
            onClick={handleSubmitLogin}
          >
            Submit
          </button>
          {alertError !== "" ? <p className="alert-error">{alertError}</p> : ""}
        </div>
        <p>
          Bạn chưa có tài khoản?{" "}
          <Link to="/contact">yêu cầu cấp tài khoản</Link>
        </p>
      </form>
    </div>
  );
};

export default Home;

import "./App.css";
import Footer from "./conpoments/Footer";
import Header from "./conpoments/Header";
import Melon from "./page/Melons";
import DataListMelon from "./page/DatalistMelon";
import Home from "./page/Home";
import EmailForm from "./page/Contact";
import Error from "./page/Error";
import DashBoard from "./page/Dashboard";
import AddMember from "./page/Dashboard/component/AddMember";
import ListMember from "./page/Dashboard/component/ListMember";

import { url_api_users } from "./api/dataMelon";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [dataMelon, setDataMelon] = useState([]);

  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("user"));
  const [ranker, setRanker] = useState({
    access: false,
    admin: false,
  });

  const pathname = useLocation().pathname;
  useEffect(() => {
    if (pathname === "/cal-melon") {
      document.title = "Melon APP - Ứng dụng tính tiền dưa";
    } else if (pathname === "/list") {
      document.title = "Melon APP - Danh sách khách hàng";
    } else if (pathname === "/dashboard") {
      document.title = "Melon APP - Administratos";
    } else {
      document.title = "Melon APP";
    }
  }, [pathname]);

  useEffect(() => {
    const checkRankerUsers = async () => {
      const token = sessionStorage.getItem("user");
      await axios
        .get(url_api_users)
        .then((res) => {
          res.data.filter((u) => {
            if (u.userName === token && u.ranker === "admin") {
              setRanker({
                access: true,
                admin: true,
              });
            }
            if (u.userName === token && u.ranker === "support") {
              setRanker({
                access: true,
                admin: false,
              });
            }
            return setRanker;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    checkRankerUsers();
  }, []);

  const { admin, access } = ranker;

  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        ranker={ranker}
        setRanker={setRanker}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setRanker={setRanker}
            />
          }
        />

        <Route
          path="/cal-melon"
          element={
            <div className="box-melon">
              {isLogin && (
                <Melon
                  isLogin={isLogin}
                  dataMelon={dataMelon}
                  setDataMelon={setDataMelon}
                  ranker={ranker}
                />
              )}
            </div>
          }
        />

        <Route
          path="/list"
          element={
            <>
              {access ? (
                <DataListMelon
                  data={dataMelon}
                  setDataMelon={setDataMelon}
                  isLogin={isLogin}
                  ranker={ranker}
                />
              ) : (
                <Error />
              )}
            </>
          }
        />
        <Route path="/contact" element={<EmailForm />} />

        <Route
          path="/dashboard"
          element={<>{admin ? <DashBoard /> : <Error />}</>}
        >
          <Route path="add-member" element={<AddMember />} />
          <Route path="list-member" element={<ListMember />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

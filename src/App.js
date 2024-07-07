import "./App.css";
import Footer from "./conpoments/Footer";
import Header from "./conpoments/Header";
import Melon from "./page/Melons";
import DataListMelon from "./page/DatalistMelon";
import Home from "./page/Home";
import EmailForm from "./page/Contact";
import { fetchDataMelon } from "./api/dataMelon";
import { URL_API_USERS } from "./api/dataMelon";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const checkRank = sessionStorage.getItem("user");

function App() {
  const [dataMelon, setDataMelon] = useState([]);
  const [ranker, setRanker] = useState(!!sessionStorage.getItem("user"));
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("user"));

  useEffect(() => {
    fetchDataMelon();
    setDataMelon(JSON.parse(sessionStorage.getItem("dataMelon")));
  }, [setDataMelon]);

  useEffect(() => {
    axios
      .get(URL_API_USERS)
      .then((res) => {
        const data = res.data;

        const rank = data.find(
          (d) => d.userName === checkRank && d.ranker === "admin"
        );
        setRanker(!!rank);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ranker]);

  return (
    <div className="App">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route
          path="/"
          element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}
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
                />
              )}
            </div>
          }
        />

        <Route
          path="/list"
          element={
            <>
              {isLogin && (
                <DataListMelon
                  data={dataMelon}
                  setDataMelon={setDataMelon}
                  isLogin={isLogin}
                />
              )}
            </>
          }
        />
        <Route path="/contact" element={<EmailForm />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

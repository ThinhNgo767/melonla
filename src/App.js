import "./App.css";
import Footer from "./conpoments/Footer";
import Header from "./conpoments/Header";
import Melon from "./page/Melon";
import DataList from "./page/DataList";
import Home from "./page/Home";
import EmailForm from "./page/Contact";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [dataMelon, setDataMelon] = useState([]);
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("user"));

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
              {isLogin && <Melon isLogin={isLogin} />}
            </div>
          }
        />

        <Route
          path="/list"
          element={
            <>
              {isLogin && (
                <DataList
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

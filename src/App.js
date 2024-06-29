import "./App.css";
import Footer from "./conpoments/Footer";
import Header from "./conpoments/Header";

import Melon from "./page/melon";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="box-melon">
        <Melon />
      </div>
      <Footer />
    </div>
  );
}

export default App;

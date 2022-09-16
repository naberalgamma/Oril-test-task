import "./App.css";
import { ListOfUsers } from "./components/ListOfUsers/ListOfUsers";
import { Revenue } from "./components/Revenue/Revenue";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListOfUsers />} />
          <Route path="/*" element={<Revenue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

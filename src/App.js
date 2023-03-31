import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/shared/NavBar";
import SideBar from "./components/shared/SideBar";

import { Route, Routes } from "react-router-dom";
import GetAllUser from "./components/admin/GetAllUser";
import AddUser from "./components/admin/AddUser";


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="row">
        <div className="col-2 sidebar">
          <SideBar />
        </div>

        <div className="col-10">
          <Routes>
            <Route path="/user" element={<GetAllUser />} />
            <Route path="/user/add" element={<AddUser />} />
          
          </Routes>
        
        </div>
      </div>
    </div>
  );
}

export default App;

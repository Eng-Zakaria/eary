import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/shared/SideBar";

import { Route, Routes } from "react-router-dom";
import GetAllUser from "./components/admin/mangeUser/GetAllUser";
import AddUser from "./components/admin/mangeUser/AddUser";
import Login from "./components/auth/Login";

import UpdateUser from "./components/admin/mangeUser/UpdateUser";

import Home from "./components/HomePage/Home";
import Header from "./components/shared/Header";
import ViewUser from "./components/admin/mangeUser/ViewUser ";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <div className="row">
        <div className="col-2 sidebar">
          <SideBar />
        </div>

        <div className="col-10 ">
          <Routes>
            <Route path="/user" element={<GetAllUser />} />
            <Route path="/create-user" element={<AddUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/view-user/:id" element={<ViewUser />} />
          </Routes>
        </div>
      </div> */}
      <Home />
    </div>
  );
}

export default App;

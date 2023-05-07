import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./homePage/Home";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import GetAllUser from "./pages/adminPages/mangeUser/GetAllUser";
import AddUser from "./pages/adminPages/mangeUser/AddUser";
import UpdateUser from "./pages/adminPages/mangeUser/UpdateUser";
import ViewUser from "./pages/adminPages/mangeUser/ViewUser ";
import Admin from "../src/middleware/Admin";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import PendingPage from "./pages/pendingPage/PendingPage";
import ExamTable from "./pages/adminPages/manageExam/viewExam/ExamTable";
import CreateExam from "./pages/adminPages/manageExam/createExam/CreateExam"
import Guest from "../src/middleware/Admin";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    //nesting routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/manage-user",
        element: <Admin />,
        
        children: [
          {
            path: "",
            element: <GetAllUser />,
          },
        {

          path: "add",
          element: <AddUser/>,
        },
        {
          path: "update/:id",
          element: <UpdateUser/>,
        },
        {
          path: "view/:id",
          element: <ViewUser />,
        },
      ],
    },
    {
      path: "/manage-exam",
      element: <Admin />,
      
      children: [
        {
          path: "",
          element: <ExamTable />,
        },
      {

        path: "create",
        element: <CreateExam/>,
      },
    ],
  },
    {
      path: "/update-profile/:id",
      element: <UpdateProfile />,
    }
    ,
    {
      path: "/panding",
      element: <PendingPage />,
    }
   
    ],
    
  },
]);

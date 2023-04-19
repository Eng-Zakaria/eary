import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./HomePage/Home";

import Login from "./Atuh/Login";
import Register from "./Atuh/Register";
import GetAllUser from "./pages/adminPages/mangeUser/GetAllUser";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/manage-user",
        element: <GetAllUser />,
      },
    ],
  },
]);

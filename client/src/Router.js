import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from "./Atuh/Login";
export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    //nesting routes
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Main from "./pages/Main";
import NewWord from "./pages/NewWord";
import ChangeWord from "./pages/changeWord";
import Dict from "./pages/Dict";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/new",
    element: <NewWord />,
  },
  {
    path: "/change_word",
    element: <ChangeWord />,
  },
  {
    path: "/dictionnary",
    element: <Dict />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

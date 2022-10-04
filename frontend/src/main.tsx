import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Main from "./pages/Main";
import NewWord from "./pages/NewWord";
import ChangeWord from "./pages/changeWord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/new",
    element: <NewWord />,
  },
  {
    path: "/change_word",
    element: <ChangeWord />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

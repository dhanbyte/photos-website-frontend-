import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Layout from "./Components/Layout";
import App from "./App"; // Home - list of events
import States from "./pages/States"; // Event detail → list of states
import Photos from "./pages/Photos"; // State detail → list of photos
import Admin from "./pages/Admin"; // Admin panel

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/events/:eventId", element: <States /> },
      { path: "/events/:eventId/states/:stateId", element: <Photos /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

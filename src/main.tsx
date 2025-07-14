import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App"; // Home - list of events
import States from "./pages/States"; // Event detail → list of states
import Photos from "./pages/Photos"; // State detail → list of photos

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/events/:eventId", element: <States /> },
  { path: "/events/:eventId/states/:stateId", element: <Photos /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

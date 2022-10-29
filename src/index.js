import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <RouterProvider router={router} />
      </div>
    </ProSidebarProvider>
  </React.StrictMode>
);
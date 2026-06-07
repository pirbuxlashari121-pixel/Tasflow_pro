import { StrictMode } from "react";

import { createRoot }
from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import Dashboard
from "./pages/Dashboard";

import Login
from "./pages/Login";

import Signup
from "./pages/Signup";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>
);


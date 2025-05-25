import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";

createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <App />{" "}
  </React.StrictMode>
);
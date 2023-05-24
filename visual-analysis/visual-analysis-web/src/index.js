import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

// Replace ReactDOM.render with createRoot
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

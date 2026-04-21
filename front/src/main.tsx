import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateCompo } from "@/context/StateCompo";
import "./index.css";

import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateCompo>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateCompo>
  </StrictMode>,
);

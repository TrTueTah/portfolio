import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App.tsx";

import "./index.css";

if (import.meta.env.DEV) {
  void import("@locator/runtime").then(({ default: setupLocatorUI }) =>
    setupLocatorUI()
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "#1C1C21",
        },
      }}
    />

    <App />
  </StrictMode>
);

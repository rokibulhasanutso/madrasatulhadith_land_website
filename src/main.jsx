import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataStoreProvider } from "./contextAPI/DataStore.jsx";

createRoot(document.getElementById("app")).render(
  // <StrictMode>
    <DataStoreProvider>
      <App />
    </DataStoreProvider>
  // </StrictMode>
);

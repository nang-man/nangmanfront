import React from "react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { store } from "@/store/store.ts";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

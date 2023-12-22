import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CookiesProvider } from "react-cookie";
import { store } from "@/store/store.ts";
=======
>>>>>>> dev
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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

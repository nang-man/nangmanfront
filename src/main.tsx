import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);

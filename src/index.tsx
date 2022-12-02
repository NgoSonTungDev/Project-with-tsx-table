import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux_store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppReactTable from "./AppReactTable";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppReactTable />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

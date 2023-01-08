import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard";
import { ConfigProvider } from "./ConfigProvider";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error("No root element found");
}
const root = ReactDOM.createRoot(rootEl);
root.render(
    <React.StrictMode>
        <ConfigProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
);

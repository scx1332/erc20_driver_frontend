import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard";
import { ConfigProvider, FRONTEND_BASE, globalSetBackendUrl } from "./ConfigProvider";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error("No root element found");
}
const root = ReactDOM.createRoot(rootEl);

interface FrontendConfig {
    backendUrl: string;
}

fetch("/erc20/frontend/config.json").then((resp) => {
    resp.json().then((config: FrontendConfig) => {
        globalSetBackendUrl(config.backendUrl);

        root.render(
            <React.StrictMode>
                <ConfigProvider>
                    <BrowserRouter basename={FRONTEND_BASE}>
                        <Routes>
                            <Route path="/*" element={<Dashboard />} />
                        </Routes>
                    </BrowserRouter>
                </ConfigProvider>
            </React.StrictMode>,
        );
    });
});

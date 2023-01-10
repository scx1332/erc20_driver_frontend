import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard";
import {ConfigProvider} from "./ConfigProvider";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PaymentDriverConfig from "./model/PaymentDriverConfig";

const rootEl = document.getElementById("root");
if (!rootEl) {
    throw new Error("No root element found");
}
const root = ReactDOM.createRoot(rootEl);

interface FrontendConfig {
    backendUrl: string;
    frontendBase: string;
}


const resp = await fetch("config.json");
const frontendConfig: FrontendConfig = await resp.json();
const backendUrl = frontendConfig.backendUrl;
const frontendBase = frontendConfig.frontendBase;


root.render(
    <React.StrictMode>
        <ConfigProvider backendUrl={backendUrl}>
            <BrowserRouter basename={frontendBase}>
                <Routes>
                    <Route path="/*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
);

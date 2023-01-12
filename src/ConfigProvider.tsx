import React, { createContext, useContext, useEffect, useState } from "react";
import PaymentDriverConfig from "./model/PaymentDriverConfig";
import { BackendSettingsContext } from "./BackendSettingsProvider";
import {backendFetch} from "./common/BackendCall";

export let DEFAULT_BACKEND_URL = "";
export const FRONTEND_BASE = "/erc20/frontend/";


export function globalSetDefaultBackendUrl(backendUrl: string) {
    DEFAULT_BACKEND_URL = backendUrl;
}

export const ConfigContext = createContext<PaymentDriverConfig | null | string>(null);
export const useConfigOrNull = () => useContext<PaymentDriverConfig | null | string>(ConfigContext);
export const useConfig = () => {
    const value = useConfigOrNull();
    if (value == null || typeof value === "string") {
        throw new Error("Config not available");
    }
    return value;
};

interface ConfigProviderProps {
    children: React.ReactNode;
}

export const ConfigProvider = (props: ConfigProviderProps) => {
    const [config, setConfig] = useState<PaymentDriverConfig | null | string>(null);
    const { backendSettings } = useContext(BackendSettingsContext);

    useEffect(() => {
        (async () => {
            setConfig(`Connecting to ${backendSettings.backendUrl}`);
            try {
                const response = await backendFetch(backendSettings, "/config");
                const response_json = await response.json();
                setConfig(response_json.config);
            } catch (_e) {
                setConfig(`Failed to connect to ${backendSettings.backendUrl}`);
            }
        })();
    }, [setConfig]);

    return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};

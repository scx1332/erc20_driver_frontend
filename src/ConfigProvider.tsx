import React, { createContext, useContext, useEffect, useState } from "react";
import PaymentDriverConfig from "./model/PaymentDriverConfig";

export let BACKEND_URL = "";
export const FRONTEND_BASE = "/erc20/frontend/";

export function globalSetBackendUrl(backendUrl: string) {
    BACKEND_URL = backendUrl;
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

    useEffect(() => {
        (async () => {
            setConfig(`Connecting to ${BACKEND_URL}`);
            try {
                const response = await fetch(`${BACKEND_URL}/config`);
                const response_json = await response.json();
                setConfig(response_json.config);
            } catch (_e) {
                setConfig(`Failed to connect to ${BACKEND_URL}`);
            }
        })();
    }, [setConfig]);

    return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};

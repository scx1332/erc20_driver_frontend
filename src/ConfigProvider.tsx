import React, { createContext, useContext, useEffect, useState } from "react";
import PaymentDriverConfig from "./model/PaymentDriverConfig";

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
    backendUrl: string;
}

export const ConfigProvider = (props: ConfigProviderProps) => {
    const [config, setConfig] = useState<PaymentDriverConfig | null | string>(null);


    useEffect(() => {
        (async () => {
            setConfig(`Connecting to ${props.backendUrl}`);
            try{
                const response = await fetch(`${props.backendUrl}/config`);
                const response_json = await response.json();
                response_json.config.backendUrl = props.backendUrl;
                setConfig(response_json.config);
            } catch (_e) {
                setConfig(`Failed to connect to ${props.backendUrl}`);
            }
        })();
    }, [setConfig]);

    return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};

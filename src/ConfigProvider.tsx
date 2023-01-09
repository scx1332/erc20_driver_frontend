import React, { createContext, useContext, useEffect, useState } from "react";
import PaymentDriverConfig from "./model/PaymentDriverConfig";

export const ConfigContext = createContext<PaymentDriverConfig | null>(null);
export const useConfigOrNull = () => useContext<PaymentDriverConfig | null>(ConfigContext);
export const useConfig = () => {
    const value = useConfigOrNull();
    if (value == null) {
        throw new Error("Config not available");
    }
    return value;
};
export const BACKEND_URL = "http://localhost:8080/api";

interface Props {
    children: React.ReactNode;
}
export const ConfigProvider: React.FC<Props> = ({ children }) => {
    const [config, setConfig] = useState<PaymentDriverConfig | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${BACKEND_URL}/config`);
            const response_json = await response.json();
            setConfig(response_json.config);
        })();
    }, []);

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

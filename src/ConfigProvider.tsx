import React, {createContext, useContext, useEffect, useState} from "react";

export const ConfigContext = createContext(null)
export const useConfig = () => useContext(ConfigContext)
export const BACKEND_URL = "http://localhost:8080"

// @ts-ignore
export const ConfigProvider = ({children}) => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        (async () => {
            let response = await fetch(`${BACKEND_URL}/config`);
            let response_json = await response.json();
            setConfig(response_json.config);
        })();
    }, []);

    return (
        <ConfigContext.Provider value={[config]}>
            {children}
        </ConfigContext.Provider>
    )
}

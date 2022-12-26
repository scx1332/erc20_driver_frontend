import React, {useCallback, useEffect} from "react";
import {Simulate} from "react-dom/test-utils";
import {BACKEND_URL} from "./ConfigProvider";



const Accounts = () => {
    const [accounts, setAccounts] = React.useState(null);

    const loadTxCount = useCallback(async () => {
        const response = await fetch(`${BACKEND_URL}/accounts`);
        const response_json = await response.json();
        setAccounts(response_json);
    }, []);

    useEffect(() => {
        loadTxCount().then();
    }, [loadTxCount]);
    return (
        <div>
            <h1>Accounts</h1>
            {JSON.stringify(accounts)}
        </div>
    )
}

export default Accounts;
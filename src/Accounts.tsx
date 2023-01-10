import React, { useCallback, useEffect } from "react";
import AccountBox from "./AccountBox";
import SenderAccounts from "./model/SenderAccounts";
import {useConfig} from "./ConfigProvider";
const Accounts = () => {
    const [accounts, setAccounts] = React.useState<SenderAccounts | null>(null);
    const config = useConfig();

    const loadTxCount = useCallback(async () => {
        const response = await fetch(`${config.backendUrl}/accounts`);
        const response_json = await response.json();
        setAccounts(response_json);
    }, []);

    function row(account: string, i: number) {
        return <AccountBox key={i} account={account} />;
    }

    useEffect(() => {
        loadTxCount().then();
    }, [loadTxCount]);
    return (
        <div>
            <h1>Accounts</h1>
            {accounts?.publicAddr.map(row)}
            {JSON.stringify(accounts)}
        </div>
    );
};

export default Accounts;

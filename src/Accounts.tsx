import React, {useCallback, useEffect} from "react";
import {Simulate} from "react-dom/test-utils";
import {BACKEND_URL} from "./ConfigProvider";
import TransferBox from "./TransferBox";
import AccountBox from "./AccountBox";



const Accounts = () => {
    const [accounts, setAccounts] = React.useState(null);

    const loadTxCount = useCallback(async () => {
        const response = await fetch(`${BACKEND_URL}/accounts`);
        const response_json = await response.json();
        setAccounts(response_json);
    }, []);


    function row(account: any, i: any) {
        return (<AccountBox key={i} account={account}/>)
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
    )
}

export default Accounts;
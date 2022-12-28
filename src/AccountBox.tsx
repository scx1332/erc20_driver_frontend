import React, {useCallback} from "react";
import AllowanceBox from "./AllowanceBox";
import {BACKEND_URL} from "./ConfigProvider";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface AccountBoxProps {
    account: string | null,
}


const AccountBox = (props: AccountBoxProps) => {
    const [account, setAccount] = React.useState(null);

    const loadAccountDetails = useCallback(async () => {
        const response = await fetch(`${BACKEND_URL}/account/${props.account}`);
        const response_json = await response.json();
        setAccount(response_json);
    }, [props.account]);

    React.useEffect(() => {
        loadAccountDetails().then();

    }, [loadAccountDetails]);

    function allowanceRow(allowance: any, idx: number) {
        return (<div key={idx}>
            <AllowanceBox allowance={allowance} />
        </div>)
    }
    if (account === null) {
        return (<div>Loading...</div>)
    }

    return (
        <div className={"account-box"}>
            <div className={"account-box-header"}>
                Account {props.account}
            </div>
            <div className={"account-box-body"}>
                <div>
                    {JSON.stringify(account)}
                </div>
                <div>
                {account.allowances.map(allowanceRow)}
                </div>
            </div>
        </div>
    )
}

export default AccountBox;

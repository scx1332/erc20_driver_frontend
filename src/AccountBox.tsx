import React, {useCallback} from "react";
import {BACKEND_URL} from "./ConfigProvider";

interface AccountBoxProps {
    account: string | null,
}


const AccountBox = (props: AccountBoxProps) => {
    const [account, setAccount] = React.useState(null);

    const loadAccountDetails = useCallback(async () => {
        const response = await fetch(`${BACKEND_URL}/account/${props.account}`);
        const response_json = await response.json();
        setAccount(response_json);
    }, []);

    React.useEffect(() => {
        loadAccountDetails().then();

    }, []);

    return (
        <div className={"account-box"}>
            <div className={"account-box-header"}>
                Account {props.account}
            </div>
            <div className={"account-box-body"}>
                {JSON.stringify(account)}

            </div>
        </div>
    )
}

export default AccountBox;

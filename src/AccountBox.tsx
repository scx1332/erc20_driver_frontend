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

    return (
        <div className={"account-box"}>
            <div className={"account-box-header"}>
                Account {props.account}
            </div>
            <div className={"account-box-body"}>

            </div>
        </div>
    )
}

export default AccountBox;

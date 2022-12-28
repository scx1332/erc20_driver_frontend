import React from "react";
import "./AllowanceBox.css"
import Web3 from "web3";
import DateBox from "./DateBox";

interface AllowanceBoxProps {
    allowance: any | null,
}

const AllowanceBox = (props: AllowanceBoxProps) => {

    let bn = BigInt(props.allowance.allowance);
    let bnMin = BigInt("0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    let all = Web3.utils.fromWei(props.allowance.allowance, 'ether');
    let allowanceStr = "N/A";
    if (bn > bnMin) {
        allowanceStr = "Unlimited";
    } else {
        allowanceStr = all;
    }

    return (
        <div className={"allowance-box"}>
            <div className={"allowance-box-header"}>
                Allowance on chain {props.allowance.chainId} for contract {props.allowance.spender}
            </div>
            <div className={"allowance-box-body"}>
                <div className={"allowance-id"}>{props.allowance.id}</div>
                <div className={"allowance-chain-id"}>{props.allowance.chainId}</div>
                <div className={"allowance-confirm-date"}><DateBox date={props.allowance.confirmDate} title={"Confirmed Date"}/></div>
                <div className={"allowance-tx-id"}>txid: {props.allowance.txId}</div>
                <div className={"allowance-spender"}>{props.allowance.spender}</div>
                <div className={"allowance-token-addr"}>{props.allowance.tokenAddr}</div>
                <div className={"allowance-allowance"} title={all}>Spending allowed: {allowanceStr}</div>
            </div>
        </div>
    )
}

export default AllowanceBox;
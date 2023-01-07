import React from "react";
import "./AllowanceBox.css"
import DateBox from "./DateBox";
import {useConfig} from "./ConfigProvider";
import ChainSetup from "./model/ChainSetup";
import ChainDetails from "./ChainDetails";
import ContractDetails from "./ContractDetails";
import {fromWei} from "./common/Web3Utils";

interface AllowanceBoxProps {
    allowance: any | null,
}

const AllowanceBox = (props: AllowanceBoxProps) => {
    const [config] = useConfig();

    let bn = BigInt(props.allowance.allowance);
    let bnMin = BigInt("0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    let all = fromWei(props.allowance.allowance);
    let allowanceStr = "N/A";
    if (bn > bnMin) {
        allowanceStr = "Unlimited";
    } else {
        allowanceStr = all;
    }


    return (
        <div className={"allowance-box"}>
            <div className={"allowance-box-body"}>
                <div className={"allowance-id"}>Allowance no {props.allowance.id}</div>
                <div className={"allowance-owner"}><ContractDetails isAddress={true} chainId={props.allowance.chainId} contractAddress={props.allowance.owner}/></div>
                <div className={"allowance-owner-descr"}><span>Owner/Account</span></div>
                <div className={"allowance-chain-id"}><ChainDetails chainId={props.allowance.chainId}/></div>
                <div className={"allowance-confirm-date"}><DateBox date={props.allowance.confirmDate} title={"Confirmed Date"}/></div>
                <div className={"allowance-tx-id"}>txid: {props.allowance.txId}</div>
                <div className={"allowance-spender"}><ContractDetails isAddress={false} chainId={props.allowance.chainId} contractAddress={props.allowance.spender}/></div>
                <div className={"allowance-spender-descr"}><span>Spender</span></div>
                <div className={"allowance-token-addr"}><ContractDetails isAddress={false} chainId={props.allowance.chainId} contractAddress={props.allowance.tokenAddr}/></div>
                <div className={"allowance-allowance"} title={all}><span>Spending allowed: {allowanceStr}</span></div>
            </div>
        </div>
    )
}

export default AllowanceBox;
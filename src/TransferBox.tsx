import React from "react";
import "./TransferBox.css"
import Web3 from "web3";
import ContractDetails from "./ContractDetails";

interface TransferBoxProps {
    transfer: any;
    tokenSymbol: string;
}

const TransferBox = (props: TransferBoxProps) => {
    let transfer = props.transfer;
    return (
        <div className={"transfer-box"}>
            <div className={"transfer-id"} title={"Transfer db id"}>
                {transfer.id}
            </div>
            <div className={"transfer-receiver"} title={"Receiver address"}>
                <ContractDetails contractAddress={transfer.receiverAddr} chainId={transfer.chainId} isAddress={"Receiver id"}/>
            </div>
            <div className={"transfer-token"}  title={"Tokens transferred"}>
                {Web3.utils.fromWei(transfer.tokenAmount, "ether")} {props.tokenSymbol}
            </div>
        </div>)
}

export default TransferBox
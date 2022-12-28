import React from "react";
import "./TransferBox.css"
import {BACKEND_URL} from "./ConfigProvider";
import Web3 from "web3";
import ChainDetails from "./ChainDetails";
import ContractDetails from "./ContractDetails";

interface TransferBoxProps {
    transfer: any
}

const TransferBox = (props: TransferBoxProps) => {
    let transfer = props.transfer;
    return (
        <div className={"transfer-box"}>
            <div className={"transfer-id"}>{transfer.id}
            </div>
            <div className={"transfer-receiver"}><ContractDetails contractAddress={transfer.receiverAddr} chainId={transfer.chainId}/>
            </div>
            <div className={"transfer-token"}>{Web3.utils.fromWei(transfer.tokenAmount, "ether")}
            </div>
        </div>)
}

export default TransferBox
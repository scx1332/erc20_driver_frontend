import React from "react";
import "./TransferBox.css"
import {BACKEND_URL} from "./ConfigProvider";

interface TransferBoxProps {
    transfer: any
}

const TransferBox = (props: TransferBoxProps) => {
    let transfer = props.transfer;
    return (
        <div className={"transfer-box"}>
            <div className={"transfer-id"}>{transfer.id}
            </div>
            <div className={"transfer-receiver"}><a href={`${BACKEND_URL}/address/${transfer.receiverAddr}`}>{transfer.receiverAddr}</a>
            </div>
            <div className={"transfer-token"}>{transfer.tokenAmount}
            </div>
        </div>)
}

export default TransferBox
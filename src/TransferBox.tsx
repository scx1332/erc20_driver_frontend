import React from "react";
import "./TransferBox.css"

interface TransferBoxProps {
    transfer: any
}

const TransferBox = (props: TransferBoxProps) => {
    let transfer = props.transfer;
    return (
        <div className={"transfer-box"}>
            <div className={"transfer-id"}>{transfer.id}
            </div>
            <div className={"transfer-receiver"}><a href={"http://145.239.69.80:4000/address/" + transfer.receiverAddr}>{transfer.receiverAddr}</a>
            </div>
            <div className={"transfer-token"}>{transfer.tokenAmount}
            </div>
        </div>)
}

export default TransferBox
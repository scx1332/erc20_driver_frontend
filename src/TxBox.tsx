import React from "react";
import "./TxBox.css"
import DateBox from "./DateBox";

interface TransactionProps {
    tx: any
}

const TxBox = (props: TransactionProps) => {

    let tx = props.tx;
    return (<div className={"tx-container"}>
        <div className={"tx-id"}>db id: {tx.id}</div>
        <div className={"chain-id"}>chain id: {tx.chainId}</div>
        <div className={"tx-created"}>
            <DateBox date={tx.createdDate}/>
        </div>
        <div className={"tx-from"}>{tx.fromAddr}</div>
        <div className={"tx-to"}>{tx.toAddr}</div>
        <div className={"tx-method"}>{tx.method}</div>
        <div className={"tx-confirmed"}>
            <DateBox date={tx.confirmDate}/>
        </div>
        {tx.txHash?
            (<div className={"tx-hash"}>
            <a href={tx.txHash}>{tx.txHash}</a>
        </div> ): <div className={"tx-hash tx-hash-unknown"}>Tx hash: N/A</div>}
        {tx.nonce?
            (<div className={"tx-nonce"}>
                nonce: {tx.nonce}
            </div> ): <div className={"tx-nonce tx-nonce-unknown"}>nonce: N/A</div>}
        {tx.gasLimit?
            (<div className={"tx-gas-limit"}>
                gas limit: {tx.gasLimit}
            </div> ): <div className={"tx-gas-limit tx-gas-limit-unknown"}>gas limit: N/A</div>}

        <div className={"tx-error"}>
            {"test error"}
        </div>
    </div>)
}

export default TxBox;
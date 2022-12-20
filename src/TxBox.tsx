import React from "react";
import "./TxBox.css"
import DateBox from "./DateBox";
import TransfersBox from "./TransfersBox";

interface TransactionProps {
    tx: any
}

const TxBox = (props: TransactionProps) => {

    let tx = props.tx;
    let feePaid: number | null = null;
    if (tx.feePaid) {
        let feePaidWei = BigInt(tx.feePaid) / BigInt(1000000000);
        feePaid = Number(feePaidWei) / 1000000000;
    }
    return (
        <div className={"tx-container-wrapper"}>
            <div className={"tx-container"}>
                <div className={"tx-id"}>db id: {tx.id}</div>
                <div className={"chain-id"}>chain id: {tx.chainId}</div>
                <div className={"tx-method"}>{tx.method}</div>
                <div className={"tx-created"}>
                    <DateBox title="queued" date={tx.createdDate}/>
                </div>
                <div className={"tx-from"}>
                    <a title={"from"} href={"http://145.239.69.80:4000/address/" + tx.fromAddr}>{tx.fromAddr}</a><span> - </span>
                        <a title={"to"} href={"http://145.239.69.80:4000/address/" + tx.toAddr}>{tx.toAddr}</a>
                </div>
                <div className={"tx-broadcast"}>
                    <DateBox title="broadcast" date={tx.broadcastDate}/>
                </div>
                <div className={"tx-confirmed"}>
                    <DateBox title="confirmed" date={tx.confirmDate}/>
                </div>
                {tx.txHash?
                    (<div className={"tx-hash"}><span>Tx hash: </span><a href={"http://145.239.69.80:4000/tx/" + tx.txHash}>{tx.txHash}</a>
                </div> ): <div className={"tx-hash tx-hash-unknown"}>Tx hash: N/A</div>}
                {tx.nonce?
                (<div className={"tx-nonce"}>
                    nonce: {tx.nonce}
                </div> ): <div className={"tx-nonce tx-nonce-unknown"}>nonce: N/A</div>}
                {tx.gasLimit?
                <div className={"tx-gas-limit"}>
                    gas limit: {tx.gasLimit}
                </div>:
                <div className={"tx-gas-limit tx-gas-limit-unknown"}>
                    gas limit: N/A
                </div>}
                {tx.feePaid?
                <div className={"tx-fee"}>
                    fee paid: {feePaid}
                </div>:
                <div className={"tx-fee tx-fee-unknown"}>
                    fee paid: N/A
                </div>}
                <div className={"tx-error"}>
                    {"test error"}
                </div>
            </div>
            <div className={"tx-transfers"}>
                <TransfersBox tx_id={tx.id}/>
            </div>
        </div>
    )
}

export default TxBox;
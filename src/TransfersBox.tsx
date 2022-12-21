import React, {useState} from "react"
import "./TransfersBox.css"
import TxBox from "./TxBox";
import TransferBox from "./TransferBox";

interface TransfersBoxProps {
    tx_id: number | null
}


const TransfersBox = (props: TransfersBoxProps) => {
    const [transfers, setTransfers] = useState(null);
    const loadTransfers = async () => {
        if (props.tx_id) {
            const response = await fetch(`http://127.0.0.1:8080/transfers/${props.tx_id}`);
            const response_json = await response.json();
            setTransfers(response_json);
        }
    }

    React.useEffect(() => {
        loadTransfers().then(() => {
        });
    }, [props.tx_id])


    let transferCount = transfers?.transfers.length ?? 0;
    let sum = BigInt(0);
    let distinctReceivers = new Set();
    for (let i = 0; i < transferCount; i++) {
        sum += BigInt(transfers.transfers[i].tokenAmount);
        distinctReceivers.add(transfers.transfers[i].receiverAddr);
    }
    let sumNum = sum.toString();
    function row(transfer: any, i: any) {
        return (<TransferBox key={i} transfer={transfer}/>)
    }
    return (<div className={"transfers-box"}>
        <div className={"transfers-box-header"}>{transferCount} transfers to {distinctReceivers.size} distinct addresses for a sum of {sumNum} GLMs: </div>
        <div className={"transfers-box-content"}>
            {transfers != null ?  transfers.transfers.map(row):<div></div>}
        </div>
    </div>)

}

export default TransfersBox
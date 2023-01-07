import React, {useState} from "react"
import "./TransfersBox.css"
import TransferBox from "./TransferBox";
import {useConfig} from "./ConfigProvider";
import {fromWei} from "./common/Web3Utils";
import TokenTransfer from "./model/TokenTransfer";

interface TransfersBoxProps {
    tx_id: number | null
}


const TransfersBox = (props: TransfersBoxProps) => {
    const [transfers, setTransfers] = useState(null);
    const config = useConfig();

    React.useEffect(() => {
        console.log("Loading transfers for tx " + props.tx_id);
        const loadTransfers = async () => {
            if (props.tx_id) {
                const response = await fetch(`http://127.0.0.1:8080/transfers/${props.tx_id}`);
                const response_json = await response.json();
                setTransfers(response_json);
            }
        }

        loadTransfers().then(() => {
            console.log("Loaded transfers for tx " + props.tx_id);
        });
    }, [props.tx_id])


    const transferCount = transfers?.transfers.length ?? 0;
    let sum = BigInt(0);
    const distinctReceivers = new Set();
    for (let i = 0; i < transferCount; i++) {
        sum += BigInt(transfers.transfers[i].tokenAmount);
        distinctReceivers.add(transfers.transfers[i].receiverAddr);
    }
    const sumNum = sum.toString();
    if (transferCount === 0) {
        return (<div className={"transfers-box"}>
            <div className={"transfers-box-header"}>No transfers related to this transactions</div>
            <div className={"transfers-box-content"}>
            </div>
        </div>)
    }
    const tokenAddr = transfers.transfers[0].tokenAddr;
    const chainId = parseInt(transfers.transfers[0].chainId);
    let tokenSymbol = "???";

    //console.log(config.chainSetup);
    if (tokenAddr == null) {
        tokenSymbol = config.chainSetup[chainId].currencyGasSymbol;
    }
    else if (config.chainSetup[chainId].glmAddress === tokenAddr) {
        tokenSymbol = config.chainSetup[chainId].currencyGlmSymbol;
    }
    const amount = fromWei(sumNum);

    const row = (transfer: TokenTransfer, i: number) => {
        return (<TransferBox key={i} transfer={transfer} tokenSymbol={tokenSymbol}/>)
    }

    return (<div className={"transfers-box"}>
        <div className={"transfers-box-header"}>{transferCount} transfers to {distinctReceivers.size} distinct addresses for a sum of {amount} {tokenSymbol}: </div>
        <div className={"transfers-box-content"}>
            {transfers.transfers.map(row)}
        </div>
    </div>)

}

export default TransfersBox
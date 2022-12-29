import React, {useState} from "react"
import "./TransfersBox.css"
import TransferBox from "./TransferBox";
import {useConfig} from "./ConfigProvider";
import Web3 from "web3";

interface TransfersBoxProps {
    tx_id: number | null
}


const TransfersBox = (props: TransfersBoxProps) => {
    const [transfers, setTransfers] = useState(null);
    const [config] = useConfig();

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
    if (transferCount === 0) {
        return (<div className={"transfers-box"}>
            <div className={"transfers-box-header"}>No transfers related to this transactions</div>
            <div className={"transfers-box-content"}>
            </div>
        </div>)
    }
    let tokenAddr = transfers.transfers[0].tokenAddr;
    let chainId = parseInt(transfers.transfers[0].chainId);
    let tokenSymbol = "???";

    //console.log(config.chainSetup);
    if (tokenAddr == null) {
        tokenSymbol = config.chainSetup[chainId].currencyGasSymbol;
    }
    else if (config.chainSetup[chainId].glmAddress === tokenAddr) {
        tokenSymbol = config.chainSetup[chainId].currencyGlmSymbol;
    }
    let amount = Web3.utils.fromWei(sumNum, "ether");

    const row = (transfer: any, i: any) => {
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
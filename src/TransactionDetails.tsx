import React from 'react';
import {useConfig} from "./ConfigProvider";
import ChainSetup from "./model/ChainSetup";
import {FiExternalLink} from "react-icons/fi";
import "./TransactionDetails.css";

interface TransactionDetailsProps {
    chainId: string | null,
    transactionHash: string | null,
}

const TransactionDetails = (props: TransactionDetailsProps) => {
    const [config] = useConfig();

    let chainId = parseInt(props.chainId);
    let chainSetup: ChainSetup = config.chainSetup[chainId];
    if (!chainSetup) {
        return (<span>No {chainId} in config</span>)
    }

    return (
        <a href={chainSetup.blockExplorerUrl} title={`Transaction hash: ${props.transactionHash}`}>
            <div className={"transaction-details-transaction"}>
                <FiExternalLink className={"transaction-details-transaction-icon"}/>

                <div className={"transaction-details-transaction-name"}>{props.transactionHash}</div>
            </div>
        </a>
    )
}

export default TransactionDetails;
import React from 'react';
import {useConfig} from "./ConfigProvider";
import ChainSetup from "./model/ChainSetup";
import {FiExternalLink} from "react-icons/fi";
import "./ChainDetails.css";

interface ChainDetailsProps {
    chainId: string | null,
}

const ChainDetails = (props: ChainDetailsProps) => {
    const [config] = useConfig();

    let chain_id = parseInt(props.chainId);
    let chainSetup: ChainSetup = config.chainSetup[chain_id];
    if (!chainSetup) {
        return (<span>No {chain_id} in config</span>)
    }

    return (
        <a href={chainSetup.blockExplorerUrl} title={`chain id: ${props.chainId}`}>
            <div className={"chain-details-chain"}>
                <FiExternalLink className={"chain-details-chain-icon"}/> <div className={"chain-details-chain-name"}>{chainSetup.chainName}</div>
        </div>
        </a>
    )
}

export default ChainDetails;
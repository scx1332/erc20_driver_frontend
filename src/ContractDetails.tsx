import React from 'react';
import {useConfig} from "./ConfigProvider";
import ChainSetup from "./model/ChainSetup";
import {FiExternalLink} from "react-icons/fi";
import "./ContractDetails.css";

interface ContractDetailsProps {
    chainId: string | null,
    contractAddress: string | null,
}

const ContractDetails = (props: ContractDetailsProps) => {
    const [config] = useConfig();

    let chainId = parseInt(props.chainId);
    let chainSetup: ChainSetup = config.chainSetup[chainId];
    if (!chainSetup) {
        return (<span>No {chainId} in config</span>)
    }
    let contractString = props.contractAddress;
    let isMultiContractAddress = false;
    let isGlmContractAddress = false;
    if (chainSetup.multiContractAddress === props.contractAddress) {
        isMultiContractAddress = true;
        contractString = "Multi payment contract";
    }
    if (chainSetup.glmAddress === props.contractAddress) {
        isGlmContractAddress = true;
        contractString = `${chainSetup.currencyGlmSymbol} token`;
    }

    return (
        <a href={chainSetup.blockExplorerUrl} title={`contract id: ${props.contractAddress}`}>
            <div className={"contract-details-contract"}>
                <FiExternalLink className={"contract-details-contract-icon"}/>

                <div className={"contract-details-contract-name"}>{contractString}</div>
            </div>
        </a>
    )
}

export default ContractDetails;
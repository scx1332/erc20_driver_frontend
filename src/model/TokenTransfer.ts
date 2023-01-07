interface TokenTransfer {
    id: number;
    chainId: number;
    txId: number;
    fromAddress: string;
    receiverAddr: string;
    tokenAddr: string | null;
    tokenAmount: string;
}

export default TokenTransfer;

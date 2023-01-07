interface Allowance {
  id: number;
  chainId: number;
  owner: string;
  confirmDate: string;
  txId: number | null;
  allowance: string;
  spender: string;
  tokenAddr: string;
}

export default Allowance;

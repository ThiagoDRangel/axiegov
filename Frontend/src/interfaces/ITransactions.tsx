export interface ITransaction {
    from: string;
    to: string;
    tokenAddress: string;
    transactionHash: string;
    value: number;
    block: number;
}

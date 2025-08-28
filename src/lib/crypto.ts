import type { WalletType } from "@/App";

export async function createBtcWallet(
    walletNumber: number
): Promise<WalletType> {
    return {
        type: "BTC",
        address: Math.random().toString() + "dcdscsdcbtc",
        walletNumber,
    } as WalletType;
}
export async function createEthWallet(
    walletNumber: number
): Promise<WalletType> {
    return {
        type: "ETH",
        address: Math.random().toString() + "dcdscsdceth",
        walletNumber,
    } as WalletType;
}
export async function createSolWallet(
    walletNumber: number
): Promise<WalletType> {
    return {
        type: "SOL",
        address: Math.random().toString() + "dcdscsdcsol",
        walletNumber,
    } as WalletType;
}

import type { WalletType } from "@/App";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import { BIP32Factory, type BIP32Interface } from "bip32";
import * as ecc from "tiny-secp256k1";
import { HDNodeWallet } from "ethers";
import * as ed25519 from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

const bip32 = BIP32Factory(ecc);

export async function createBtcWallet(
    walletNumber: number,
    mnemonic: string
): Promise<WalletType> {
    if (!bip39.validateMnemonic(mnemonic!!)) {
        throw new Error("Invalid seed phrase");
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const network = bitcoin.networks.bitcoin;
    const root = bip32.fromSeed(seed, network);
    const derivationPath = `m/44'/0'/0'/0/${walletNumber}`;
    const child: BIP32Interface = root.derivePath(derivationPath);
    // const privateKey = child.toWIF();
    // const publicKey = child.publicKey.toString();
    const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(child.publicKey),
        network,
    });

    if (!address) throw new Error("Failed to generate BTC address");

    return {
        type: "BTC",
        walletNumber,
        address,
    } as WalletType;
}

export async function createEthWallet(
    walletNumber: number,
    mnemonic: string
): Promise<WalletType> {
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error("Invalid seed phrase");
    }

    const derivationPath = `m/44'/60'/0'/0/${walletNumber}`;
    const wallet = HDNodeWallet.fromPhrase(mnemonic, undefined, derivationPath);

    return {
        type: "ETH",
        address: wallet.address,
        walletNumber,
    } as WalletType;
}
export async function createSolWallet(
    walletNumber: number,
    mnemonic: string
): Promise<WalletType> {
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error("Invalid seed phrase");
    }

    const path = `m/44'/501'/${walletNumber}'/0'`;
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const derivedSeed = ed25519.derivePath(path, seed.toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    return {
        type: "SOL",
        address: keypair.publicKey.toBase58(),
        walletNumber,
    } as WalletType;
}

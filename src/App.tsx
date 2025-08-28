import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { generateMnemonic } from "bip39";
import { toast } from "sonner";
import Wallet from "@/components/Wallet";
import {
    createBtcWallet,
    createEthWallet,
    createSolWallet,
} from "./lib/crypto";

interface WalletCount {
    BTC: number;
    ETH: number;
    SOL: number;
}

export interface WalletType {
    type: "BTC" | "ETH" | "SOL";
    walletNumber: number;
    address: string;
}

function App() {
    const [walletArray, setWalletArray] = useState<WalletType[]>(() => {
        const savedWallets = localStorage.getItem("savedWallets");
        if (savedWallets) {
            return JSON.parse(savedWallets) as WalletType[];
        } else {
            return [];
        }
    });
    const [walletCount, setWalletCount] = useState<WalletCount>(() => {
        const walletCount = localStorage.getItem("walletCount");
        if (walletCount) {
            return JSON.parse(walletCount) as WalletCount;
        } else {
            const defaultCount = {
                BTC: 0,
                ETH: 0,
                SOL: 0,
            };
            localStorage.setItem("walletCount", JSON.stringify(defaultCount));
            return defaultCount;
        }
    });
    const [currentCoin, setCurrentCoin] = useState<"BTC" | "ETH" | "SOL">(
        "BTC"
    );
    const [mnemonic, setMnemonic] = useState<string>();
    const [hasOnboarded, setHasOnboarded] = useState<boolean>();
    const [isMnemonicGenerated, setIsMnemonicGenerated] = useState<boolean>();
    const [isMnemonicVisible, setIsMnemonicVisible] = useState(true);

    function handleGenerateMnemonic() {
        const mnemonic = generateMnemonic();
        setMnemonic(mnemonic);
        setIsMnemonicGenerated(true);
        setHasOnboarded(true);
        localStorage.setItem("hasOnboarded", "true");
        // I know this is not safe, it's not a real wallet, I am just learning.
        localStorage.setItem("mnemonic", mnemonic!!);
    }

    async function handleCreateWallet() {
        // switch case
        switch (currentCoin) {
            case "BTC":
                const newBtcWallet = await createBtcWallet(walletCount.BTC);
                setWalletArray((previous) => [...previous, newBtcWallet]);
                setWalletCount((previous) => ({
                    ...previous,
                    BTC: previous.BTC + 1,
                }));
                break;

            case "ETH":
                const newEthWallet = await createEthWallet(walletCount.ETH);
                setWalletArray((previous) => [...previous, newEthWallet]);
                setWalletCount((previous) => ({
                    ...previous,
                    ETH: previous.ETH + 1,
                }));
                break;

            case "SOL":
                const newSolWallet = await createSolWallet(walletCount.SOL);
                setWalletArray((previous) => [...previous, newSolWallet]);
                setWalletCount((previous) => ({
                    ...previous,
                    SOL: previous.SOL + 1,
                }));
                break;
            default:
                break;
        }
        toast(`New ${currentCoin} wallet added.`);

        // newWallet = thatWalletFunction();
        // setWalletArray(...walletArray, newWallet)
    }

    useEffect(() => {
        const value = localStorage.getItem("hasOnboarded");
        const mnemonic = localStorage.getItem("mnemonic");
        if (!value || !mnemonic) {
            return;
        }
        setHasOnboarded(JSON.parse(value));
        setMnemonic(mnemonic);
        setIsMnemonicGenerated(true);
    }, []);
    useEffect(() => {
        localStorage.setItem("savedWallets", JSON.stringify(walletArray));
        localStorage.setItem("walletCount", JSON.stringify(walletCount));
    }, [walletArray]);

    return (
        <>
            <div className="w-screen h-screen bg-background text-foreground py-12 px-16">
                <nav>
                    <p className="mb-8 text-3xl font-bold">HD Wallet</p>
                </nav>
                <div
                    className="ml-5 py-5 px-10 bg-foreground/5 rounded-xl"
                    onClick={() => {
                        if (!mnemonic) {
                            return;
                        }
                        navigator.clipboard.writeText(mnemonic);
                        toast(<b>Copied!</b>);
                    }}
                >
                    {isMnemonicGenerated && (
                        <div className="flex justify-between">
                            <h1 className="text-lg font-semibold">
                                Your 12 word mnemonic phrase
                            </h1>
                            <div
                                className="cursor-pointer"
                                onClick={(
                                    e: React.MouseEvent<HTMLDivElement>
                                ) => {
                                    e.stopPropagation();
                                    setIsMnemonicVisible((prev) => !prev);
                                }}
                            >
                                <img
                                    src={
                                        isMnemonicVisible
                                            ? "/collapse.png"
                                            : "/expand.png"
                                    }
                                    alt="collapse"
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        {!isMnemonicGenerated ? (
                            <Button onClick={handleGenerateMnemonic}>
                                Generate mnemonic
                            </Button>
                        ) : (
                            <div>
                                {isMnemonicVisible && (
                                    <div>
                                        <div className="grid grid-cols-6 mt-4">
                                            {mnemonic?.split(" ").map((i) => (
                                                <div
                                                    key={Math.random()}
                                                    className="flex items-center justify-center bg-foreground/10 rounded-xl px-3 py-2 mr-5 mb-3"
                                                >
                                                    {i}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-2 flex justify-center   text-foreground/50">
                                            click anywhere to copy
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {hasOnboarded && (
                    <div className="px-5 mt-8">
                        <div className="ml-5 flex gap-x-3">
                            <Button
                                size={"lg"}
                                variant={
                                    currentCoin === "BTC"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setCurrentCoin("BTC")}
                            >
                                BTC
                            </Button>
                            <Button
                                size={"lg"}
                                variant={
                                    currentCoin === "ETH"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setCurrentCoin("ETH")}
                            >
                                ETH
                            </Button>
                            <Button
                                size={"lg"}
                                variant={
                                    currentCoin === "SOL"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setCurrentCoin("SOL")}
                            >
                                SOL
                            </Button>
                        </div>
                        <p className="text-foreground/70 ml-6 mt-2 text-sm">
                            Choose a blockchain to create wallets
                        </p>
                    </div>
                )}
                <div className="max-h-[50vh] scrollbar-none overflow-y-scroll ml-8 mr-3 mt-5 px-10 py-8 rounded-xl bg-gray-900">
                    <div className="flex justify-between">
                        <p className="mb-5 text-lg font-semibold">
                            Your <b>{currentCoin}</b> wallets
                        </p>
                        <Button onClick={handleCreateWallet}>
                            create wallet
                        </Button>
                    </div>
                    <div>
                        {walletArray.length > 0 &&
                            walletArray
                                ?.filter((i) => i.type === currentCoin)
                                .map((i) => (
                                    <Wallet
                                        walletNumber={i.walletNumber}
                                        type={i.type}
                                        address={i.address}
                                        key={i.address}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

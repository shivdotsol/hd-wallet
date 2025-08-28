import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { generateMnemonic } from "bip39";

function App() {
    const [currentCoin, setCurrentCoin] = useState<"BTC" | "ETH" | "SOL">(
        "BTC"
    );
    const [mnemonic, setMnemonic] = useState<string>();
    const [hasOnboarded, setHasOnboarded] = useState<boolean>();
    const [isMnemonicGenerated, setIsMnemonicGenerated] = useState<boolean>();

    function handleGenerateMnemonic() {
        const mnemonic = generateMnemonic();
        setMnemonic(mnemonic);
        setIsMnemonicGenerated(true);
        setHasOnboarded(true);
        localStorage.setItem("hasOnboarded", "true");
        // I know this is not safe, it's not a real wallet, I am just learning.
        localStorage.setItem("mnemonic", mnemonic!!);
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
                    }}
                >
                    {isMnemonicGenerated && (
                        <h1 className="text-lg font-semibold">
                            Your 12 word mnemonic phrase
                        </h1>
                    )}
                    <div>
                        {!isMnemonicGenerated ? (
                            <Button onClick={handleGenerateMnemonic}>
                                Generate mnemonic
                            </Button>
                        ) : (
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
            </div>
        </>
    );
}

export default App;

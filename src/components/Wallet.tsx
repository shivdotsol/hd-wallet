import type { WalletType } from "@/App";

function Wallet({ walletNumber, type, address }: WalletType) {
    return (
        <div className="mx-2 my-3 px-5 py-3 bg-gray-800/80 border rounded-lg">
            <div>Wallet: {walletNumber}</div>
            <div>Address: {address}</div>
        </div>
    );
}

export default Wallet;

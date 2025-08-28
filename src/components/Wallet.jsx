function Wallet({ walletNumber, coin, address }) {
    return (
        <div>
            <div>{coin}</div>
            <div>{walletNumber}</div>
            <div>{address}</div>
        </div>
    );
}

export default Wallet;

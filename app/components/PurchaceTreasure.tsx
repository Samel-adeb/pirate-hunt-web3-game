import { useTonConnect } from '@/hooks/useTonConnect'
import React from 'react'

export const PurchaceTreasure = () => {
    const {
        connect,
        disconnect,
        connected,
        walletAddress,
        sendTransaction,
    } = useTonConnect();
    
    const handleTransaction = async () => {
        if (!connected) {
            await connect();
        }
        await sendTransaction([{
            address: "receiver-wallet-address",
            amount: "1000000"  // in nanoTON
        }]);
    };

    return (
        <div>
            <button onClick={connected ? disconnect : connect}>
                {connected ? "Disconnect Wallet" : "Connect Wallet"}
            </button>

            {connected && <p>Connected Wallet: {walletAddress}</p>}

            <button onClick={handleTransaction}>
                Send 1 TON
            </button>
        </div>
    );
}


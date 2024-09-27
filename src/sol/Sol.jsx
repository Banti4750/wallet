import { useState } from "react";
import './sol.css';
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

function Sol({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([]);

    const handleAddWallet = async () => {
        try {
            // Convert mnemonic to seed
            const seed = await mnemonicToSeed(mnemonic);

            // Derive path for the wallet
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;

            // Create a wallet from the private key
            const wallet = new Wallet(privateKey);

            // Update the state with the new address and private key
            setCurrentIndex(currentIndex + 1);
            setAddresses([...addresses, wallet.address]);
            setPrivateKeys([...privateKeys, wallet.privateKey]);
        } catch (error) {
            console.error("Error deriving wallet:", error);
        }
    };

    const handleDelete = (index) => {
        setAddresses(prevKeys => prevKeys.filter((_, i) => i !== index));
        setPrivateKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
        alert("Wallet Deleted !!!");
    };

    return (
        <div className='main-cont'>
            <button className='btn' onClick={handleAddWallet}>
                Add ETH wallet
            </button>
            {addresses.map((address, index) => (
                <div className='data' key={index}>
                    <button className='heading'>ETH Wallet {index + 1}</button>
                    <button onClick={() => handleDelete(index)} className='delete'>Delete</button>
                    <div className='pub'><strong>Public Key :</strong> {address}</div>
                    <div className='pri'><strong>Private Key :</strong> {privateKeys[index]}</div>
                </div>
            ))}
        </div>
    );
}

export default Sol;

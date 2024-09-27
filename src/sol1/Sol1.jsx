import React, { useState } from 'react';
import './sol1.css';
import { mnemonicToSeed } from 'bip39';
import { Keypair, PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { hmac } from '@noble/hashes/hmac';
import { sha512 } from '@noble/hashes/sha512';
import SHA256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

const derivePath = (path, seed) => {
    const parts = path.split('/').slice(1).map(p => parseInt(p, 10));
    let I = hmac(sha512, "ed25519 seed", seed);

    let IL = I.slice(0, 32);
    let IR = I.slice(32);

    for (const index of parts) {
        const buf = Buffer.allocUnsafe(4);
        buf.writeUInt32BE(index, 0);
        I = hmac(sha512, IR, Buffer.concat([Buffer.from([0]), IL, buf]));
        IL = I.slice(0, 32);
        IR = I.slice(32);
    }

    return { key: IL };
};

const Sol1 = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [hashedPublicKeys, setHashedPublicKeys] = useState([]);

    const handleAddWallet = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const { key: derivedSeed } = derivePath(path, seed);

            // Generate a keypair from the derived seed using nacl
            const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

            // Convert nacl publicKey to Solana PublicKey object
            const solanaPublicKey = new PublicKey(keypair.publicKey);

            // Hash the public key using SHA-256
            const publicKeyHex = Buffer.from(solanaPublicKey.toBytes()).toString('hex');
            const hashedPublicKey = SHA256(publicKeyHex).toString(Hex);

            setCurrentIndex(prevIndex => prevIndex + 1);
            setPublicKeys(prevKeys => [...prevKeys, solanaPublicKey.toBase58()]);
            setHashedPublicKeys(prevKeys => [...prevKeys, hashedPublicKey]);
        } catch (error) {
            console.error('Error generating wallet:', error);
        }

       
    };


    const handleDelete = (index) => {
        setPublicKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
        setHashedPublicKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
        alert("Wallet Deleted !!!"); // Alert when a wallet is deleted
    };

    return (
        <div className='main-cont'>
            <button className='btn' onClick={handleAddWallet}>
                Add SOL wallet
            </button>
            {publicKeys.map((pubKey, index) => (
                <div className='data' key={index}>
                    <button   className='heading'> SOL Wallet {index+1}</button>
                    <button onClick={() => handleDelete(index)} className='delete'>Delete</button>
                   
                    <div className='pub'><strong>Public Key :</strong> {pubKey}</div>

                    <div className='pri'>
                        <strong> Public Key :</strong> {hashedPublicKeys[index]}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Sol1;

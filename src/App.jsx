import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import Navbar from './narbar/Navbar'
import Seed from './seed/Seed';

import Sol from './sol/Sol';
import Sol1 from './sol1/Sol1';

const App = () => {
    const [mnemonic, setMnemonic] = useState('');

    const handleMnemonicUpdate = (newMnemonic) => {
        setMnemonic(newMnemonic);
    };

    const handleGenerateMnemonic = () => {
        const newMnemonic = generateMnemonic();
        setMnemonic(newMnemonic);
        // onMnemonicUpdate(newMnemonic); // Notify parent component of the new mnemonic
    };

    const handleCopyToClipboard = () => {
        if (mnemonic) {
          navigator.clipboard.writeText(mnemonic)
            .then(() => alert('Mnemonic copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
        } else {
          alert('Generate Mnemonic First');
        }
      };
    
    const mnemonicWords = mnemonic.split(' ');

    return (
        <>
            <Navbar />
            <div className="main">
                <div className="cont">
                    <button onClick={handleGenerateMnemonic}>
                        Create Seed Phrase
                    </button>
                </div>
                <div className="container">
                    <div className="mnemonic-grid">
                        {mnemonicWords.map((word, index) => (
                            <div key={index} className="mnemonic-word">
                                {word}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleCopyToClipboard} className="copy-button">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
            {mnemonic && <Sol mnemonic={mnemonic} />}
            {mnemonic && <Sol1 mnemonic={mnemonic} />}
        </>
    );
};

export default App;



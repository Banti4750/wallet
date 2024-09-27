import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import './seed.css';

const Seed = ({ onMnemonicUpdate }) => {
  // const [mnemonic, setMnemonic] = useState('');

  // const handleGenerateMnemonic = () => {
  //   const newMnemonic = generateMnemonic();
  //   setMnemonic(newMnemonic);
  //   onMnemonicUpdate(newMnemonic); // Notify parent component of the new mnemonic
  // };

  // const handleCopyToClipboard = () => {
  //   if (mnemonic) {
  //     navigator.clipboard.writeText(mnemonic)
  //       .then(() => alert('Mnemonic copied to clipboard!'))
  //       .catch(err => console.error('Failed to copy: ', err));
  //   } else {
  //     alert('Generate Mnemonic First');
  //   }
  // };

  // const mnemonicWords = mnemonic.split(' ');

  // return (
  //   <div className="main">
  //     <div className="cont">
  //     <button onClick={async function() {
  //       const mn = generateMnemonic();
  //       setMnemonic(mn)
  //     }}>
  //       Create Seed Phrase
  //     </button>

  //     </div>
  //     <div className="container">
  //       <div className="mnemonic-grid">
  //         {mnemonicWords.map((word, index) => (
  //           <div key={index} className="mnemonic-word">
  //             {word}
  //           </div>
  //         ))}
  //       </div>
  //       <button onClick={handleCopyToClipboard} className="copy-button">
  //         Copy to Clipboard
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default Seed;

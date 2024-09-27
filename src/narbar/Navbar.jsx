import React from 'react';
import './Navbar.css'; // Make sure to import your CSS file

const Navbar = () => {
  return (
    <div className="nav">
      <h3>WALLET</h3>
      <div className="coin">
        <img className="sol" src="https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2022/06/solana_logo.jpeg.jpg" alt="Solana" />
        <img className="eth" src="https://www.forbes.com/advisor/wp-content/uploads/2021/03/ethereum-1.jpeg" alt="Ethereum" />
        <img className="btc" src="https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg" alt="Bitcoin" />
      </div>
    </div>
  );
}

export default Navbar;

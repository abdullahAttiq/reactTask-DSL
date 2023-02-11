import React, { useState } from "react";
import Web3 from "web3";

const Button = () => {
  const [userDetails, setUserDetails] = useState({});

  const handleLogin = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const balance = await web3.eth.getBalance(userAddress);
        setUserDetails({
          address: userAddress,
          balance: balance,
        });
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
      const balance = await web3.eth.getBalance(userAddress);
      setUserDetails({
        address: userAddress,
        balance: balance,
      });
    } else {
      // Non-dapp browsers...
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login Wallet</button>
      {userDetails.address ? (
        <div>
          <p>User Address: {userDetails.address}</p>
          <p>User Balance: {userDetails.balance}</p>
        </div>
      ) : (
        <p>No User Logged In</p>
      )}
    </div>
  );
};

export default Button;

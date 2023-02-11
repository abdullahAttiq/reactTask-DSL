import React, { useState } from "react";
import Web3 from "web3";
import {abi,address} from "../src/MintableToken";



const Button2 = () => {
  const [value, setValue] = useState(0);

  const handleMint = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // Deploy the smart contract
        const contract = new web3.eth.Contract(
          abi,
          address,
          { from: userAddress })
                  // Mint tokens
        const result = await contract.methods.mint(value).send({ from: userAddress });
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      const web3 = new Web3(window.web3.currentProvider);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Deploy the smart contract
      const contract = new web3.eth.Contract(
        abi,
        address,
        { from: userAddress }
      );

      // Mint tokens
      const result = await contract.methods.mint(value).send({ from: userAddress });
      console.log(result);
    } else {
      // Non-dapp browsers...
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  return (
    <div>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleMint}>Mint</button>
    </div>
  );
};

export default Button2;

         
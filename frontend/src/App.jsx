// App.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleRegistry from "../src/component/SimpleRegistry";
import ContractAbi from "../config/abi.json";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  console.log("provider", provider);

  useEffect(() => {
    const init = async () => {
      let signer;
      let provider;
      if (window.ethereum == null) {
        alert("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);

        signer = await provider.getSigner();

        console.log("signer", signer);
      }

      // Set up the contract address and ABI
      const contractAddress = "0x46B131E81d1fbA9BEac24482391a081dc9DC5620"; // Replace with the actual contract address
      const contractABI = ContractAbi.abi; // Replace with the actual contract ABI

      // Connect to the contract using the provider and ABI
      const myContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setProvider(signer);
      setContract(myContract);
    };

    init();
  }, []);

  return <div>{contract && <SimpleRegistry contract={contract} />}</div>;
};

export default App;

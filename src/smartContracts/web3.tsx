import Web3 from "web3";

let web3: Web3;

if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}else{
    web3 = new Web3()
}

export default web3;

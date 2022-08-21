import web3 from './web3';
import Hasher from './build/Hasher.json';

const getContractAddress= (network) => {
    switch (network) {
        case "Ropsten":
            return '0xFAECC62815a9e3404359ad76e3E5c68D6a463a91'
        case "Rinkeby":
            return '0x33A67Dc74DC302A5cAD9b2760cf0E9dEf218A06c'
        case "Goerli":
            return '0xFAECC62815a9e3404359ad76e3E5c68D6a463a91'
        case "Kovan":
            return '0x5139BB901367D09c5271271B745ABCeD47903c4F'
        default:
            return 'Unknown network'
    }
}

const instance = (networkName) => {

    const contractAddress = getContractAddress(networkName)

    return new web3.eth.Contract(
        JSON.parse(Hasher.interface),
        contractAddress
    );
}

export default instance;

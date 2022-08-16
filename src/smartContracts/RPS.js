import web3 from "./web3";
import RPS from "./build/RPS.json";

const rps = (address) => {
    console.log('address', address)
    return new web3.eth.Contract(JSON.parse(RPS.interface), address);
};

export default rps;

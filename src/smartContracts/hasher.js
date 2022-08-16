import web3 from './web3';
import Hasher from './build/Hasher.json';

const instance = new web3.eth.Contract(
    JSON.parse(Hasher.interface),
    '0x33A67Dc74DC302A5cAD9b2760cf0E9dEf218A06c'
);

export default instance;

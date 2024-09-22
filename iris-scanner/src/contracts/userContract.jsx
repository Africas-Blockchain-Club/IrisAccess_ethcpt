import Web3 from 'web3';
import contractABI from './contractABI.json'; 

const userContract = (web3) => {
    return new web3.eth.Contract(
        contractABI,
        "0x9A9D0574739B5c9b856Bd0bB3fb16d7B0186f9bB" 
    );
};

export default userContract;

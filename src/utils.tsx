import RPS from "./smartContracts/RPS";
import web3 from "./smartContracts/web3";
import {doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase-config";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const getNetworkName = (networkNumber: string) : string => {
    switch (networkNumber) {
        case "1":
            return 'Mainnet'
        case "3":
            return 'Ropsten'
        case "4":
            return 'Rinkeby'
        case "5":
            return 'Goerli'
        case "42":
            return 'Kovan'
        default:
            return 'Unknown network'
    }
}

export const truncateEthAddress = (address: string) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
}

export const getStatusName = (status: number): string => {
    switch (status) {
        case 0:
            return 'Waiting for second player move'
        case 1:
            return 'Can be solved'
        case 2:
            return 'Solving...'
        case 3:
            return 'Player 1 getting the funds back'
        case 4:
            return 'Player 2 getting the funds back'
        default:
            return 'Unknown network'
    }
}

export const solveGame = async (address: string) => {
    const rps = RPS(address)
    const moveAndSalt = JSON.parse(localStorage.getItem(address)!)
    const gameRef = doc(db, 'Games', address)
    await updateDoc(gameRef, {
        timeRemaining: new Date().getTime(),
        status: 2
    });
    try {
        const accounts = await web3.eth.getAccounts();
        const solve = await rps.methods.solve(
            moveAndSalt.move, moveAndSalt.salt
        )
            .send({gas: 1000000, from: accounts[0], });

        if(solve){
            await deleteDoc(gameRef)
        }
    } catch (e) {
        console.log('error', e)
    }
}

export const timeout = async (address: string, player1: boolean, prevStatus: number) => {
    const rps = RPS(address)
    const gameRef = doc(db, 'Games', address)
    try {
        const accounts = await web3.eth.getAccounts();
        if (player1){
            await updateDoc(gameRef, {
                status: 3
            });
            await rps.methods.j2Timeout().send({gas: 1000000, from: accounts[0], });
        } else {
            await updateDoc(gameRef, {
                status: 4
            });
            await rps.methods.j1Timeout().send({gas: 1000000, from: accounts[0], });
        }
        await deleteDoc(gameRef)
    } catch (e) {
        await updateDoc(gameRef, {
            status: prevStatus
        });
        console.log('error', e)
    }
}

export const getTimeRemaining = (timestamp: number) => {
    return Math.floor((300000 - timestamp)/1000)
}

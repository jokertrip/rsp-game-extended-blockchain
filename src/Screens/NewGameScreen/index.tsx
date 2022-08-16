import React from 'react';
import './index.css'
import {Moves} from "../../types";
import MoveChoosing from "../../Components/MoveChoosing";
import {Link, useNavigate} from "react-router-dom";
import hasher from "../../smartContracts/hasher";
import web3 from "../../smartContracts/web3";
import RPS from '../../smartContracts/build/RPS.json'
import {collection, setDoc, doc} from "firebase/firestore";
import {db} from "../../firebase-config";

type Props = {
    address: string,
    networkName: string,
}

const NewGameScreen: React.FC<Props> = ({address, networkName}) => {
    const [opponentAddress, setOpponentAddress] = React.useState<string>('')
    const [yourMove, setYourMove] = React.useState<Moves | null>(null)
    const [stake, setStake] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)
    const navigate = useNavigate();
    const gameCollectionRef = collection(db, 'Games')

    const startGame = async () => {
        console.log('opponentAddress', opponentAddress)
        console.log('yourMove', yourMove)
        const ethStake = Number(stake).toFixed(3)
        if (!web3.utils.isAddress(opponentAddress)) {
            alert('Opponent address is incorrect')
            return
        }
        if(yourMove === null){
            alert('Choose your move')
            return
        }
        if(parseFloat(ethStake) < 0.001){
            alert('Stake must be > 0.001')
            return
        }
        const randomSalt = Math.floor(Math.random() * (10000000 - 1) + 1)
        const accounts = await web3.eth.getAccounts();
        setLoading(true)
        try {
            const result = await hasher.methods.hash(yourMove, randomSalt).call({
                from: accounts[0],
            })
            console.log('result', result)

            const newGame = await new web3.eth.Contract(
                JSON.parse(RPS.interface)
            )
                .deploy({data: RPS.bytecode, arguments: [result, opponentAddress]})
                .send({gas: 1000000, from: accounts[0], value: web3.utils.toWei(ethStake, "ether"),});


            if (newGame) {
                await setDoc(doc(gameCollectionRef, newGame.options.address), {
                    id: newGame.options.address,
                    player1: address,
                    player2: opponentAddress,
                    youStarted: true,
                    stake: ethStake,
                    status: 0,
                    timeRemaining: new Date().getTime(),
                    Network: networkName
                });
                localStorage.setItem(newGame.options.address, JSON.stringify({salt: randomSalt, move: yourMove}))
            }
            setLoading(false)
            navigate(-1)
        } catch (e) {
            setLoading(false)
            console.log('error', e)
        }
    }

    return (
        <div className="newGameScreen">
            {
                loading ?
                    <h1>Please wait...</h1>
                    :
                    <React.Fragment>
                        <Link to='/'>
                            <button className='newGameButton'>Back</button>
                        </Link>
                        <div className='opponentAddress'>
                            <p className='text'>Your opponent address:</p>
                            <input className='inputNewGame' onChange={(e) => setOpponentAddress(e.target.value)}/>
                        </div>
                        <MoveChoosing onImageChange={setYourMove}/>
                        <div className='stake'>
                            <p className='text'>Your stake(min: 0.001 eth):</p>
                            <input type='number' step="0.001" className='inputNewGame'
                                   onChange={(e) => setStake(e.target.value)}/>
                        </div>
                        <button className='newGameButton' onClick={startGame}>Start a game</button>
                    </React.Fragment>
            }
        </div>
    )
}

export default NewGameScreen

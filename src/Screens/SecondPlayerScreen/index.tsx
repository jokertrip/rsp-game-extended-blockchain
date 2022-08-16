import React from 'react';
import './index.css'
import {Game, Moves} from "../../types";
import MoveChoosing from "../../Components/MoveChoosing";
import {Link, useLocation, useNavigate} from "react-router-dom";
import web3 from "../../smartContracts/web3";
import RPS from '../../smartContracts/RPS'
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase-config";


const SecondPlayerScreen: React.FC = () => {
    const { state } = useLocation();
    // @ts-ignore
    const { game, network} = state
    const [yourMove, setYourMove] = React.useState<Moves | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const navigate = useNavigate();
    const gameRef = doc(db, 'Games', game!.id)

    const makeMove = async () => {
        setLoading(true)
        const rps = RPS(game!.id)
        try {
            const accounts = await web3.eth.getAccounts();
            const secondMove = await rps.methods.play(
                yourMove
            )
                .send({gas: 1000000, from: accounts[0], value: web3.utils.toWei(game!.stake, "ether")});

            if (secondMove) {
                await updateDoc(gameRef, {
                    timeRemaining: new Date().getTime(),
                    status: 1
                });
            }
            setLoading(false)
            navigate('/')
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
                            <p className='text'>Network:{network}</p>
                            <p className='text'>Stake:{game!.stake}</p>
                        </div>
                        <MoveChoosing onImageChange={setYourMove}/>
                        <button className='secondMoveButton' onClick={makeMove}>Make a move</button>
                    </React.Fragment>
            }
        </div>
    )
}

export default SecondPlayerScreen

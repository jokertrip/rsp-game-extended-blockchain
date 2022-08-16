import React from 'react';
import './index.css'
import {db} from "../../firebase-config";
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import Item from '../../Components/Item'
import {Game} from "../../types";
import {useNavigate} from "react-router-dom";


type Props = {
    address: string,
    networkName: string,
}

const GameList: React.FC<Props> = ({address, networkName}) => {
    const [games, setGames] = React.useState<Game []>([])
    const navigate = useNavigate();

    React.useEffect(()=>{
        const gameCollectionRef = collection(db, 'Games')
        const q = query(gameCollectionRef, where('Network', '==', networkName));

        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            setGames([])
            querySnapshot.forEach((doc) => {
                const gameDoc = doc.data()
                if(gameDoc.player1.toLowerCase() === address){
                    setGames(prevState => ([...prevState, {
                        id: gameDoc.id,
                        youStarted: true,
                        opponent: gameDoc.player2,
                        stake: gameDoc.stake,
                        status: gameDoc.status,
                        timeRemaining: gameDoc.timeRemaining
                    }]))
                } else if(gameDoc.player2.toLowerCase() === address){
                    setGames(prevState => [...prevState, {
                        id: gameDoc.id,
                        youStarted: false,
                        opponent: gameDoc.player1,
                        stake: gameDoc.stake,
                        status: gameDoc.status,
                        timeRemaining: gameDoc.timeRemaining
                    }])
                }
            });
        });
        return () => {
            unsuscribe();
        }
    }, [networkName, address])


    const listItems = games.map((game: Game) =>
        <Item game={game} networkName={networkName} />
    );

    return (
        <div className="gameList">
            <h1>Your games</h1>
            <div>
                {listItems}
            </div>
        </div>
    )
}

export default GameList

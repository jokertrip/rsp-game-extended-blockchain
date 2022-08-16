import React from 'react';
import './index.css'
import {useNavigate} from "react-router-dom";
import {getStatusName, solveGame, truncateEthAddress, getTimeRemaining, timeout} from "../../utils";
import {Game} from "../../types";

const Item: React.FC<{ game: Game, networkName: string }> = ({game, networkName}) => {
    const [timeLeft, setTimeLeft] = React.useState(getTimeRemaining(new Date().getTime() - game.timeRemaining));

    React.useEffect(() => {
        if(timeLeft < 0) setTimeLeft(0)
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, game]);

    const navigate = useNavigate();
    const listClass = game.youStarted ? 'listItems yourGame' : 'listItems opponentGame'
    const statusName = getStatusName(game.status)

    return (
        < div className={listClass} key={game.id}>
            < p> Opponent address: {truncateEthAddress(game.opponent)}</p>
            < p> Status: {statusName}</p>
            <p>Time left: {timeLeft} seconds</p>
            <p>Stake: {game.stake} eth</p>
            <div className='stakeAndButton'>
                {!timeLeft && game.status === 0 && game.youStarted &&
                    <button className='playButton' onClick={() =>
                        timeout(game.id, true, game.status)
                        }>Player 2 timeout! Get your stake back!</button>}
                {!timeLeft && game.status === 1 && !game.youStarted &&
                    <button className='playButton' onClick={() =>
                        timeout(game.id, false, game.status)
                    }>Player 1 timeout! Get the stake!</button>}
                {!game.youStarted && game.status === 0 &&
                    <button className='playButton' onClick={() =>
                        navigate('/game', {state: {game: game, network: networkName}}
                        )}> Play</button>}
                {game.youStarted && game.status === 1 &&
                    <button className='playButton' onClick={() =>
                        solveGame(game.id)
                    }> Solve</button>}
            </div>
        </div>
    )
}

export default Item

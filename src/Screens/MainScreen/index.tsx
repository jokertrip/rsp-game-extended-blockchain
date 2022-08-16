import React from 'react';
import './index.css'
import GameList from "../../Components/GameList";
import {Link} from "react-router-dom";
import {truncateEthAddress} from "../../utils";

type Props = {
    address: string,
    networkName: string,
}

const MainScreen: React.FC<Props> = ({address, networkName}) => {
    const truncateAddress = truncateEthAddress(address)
    const noMetamask: boolean = address.length === 0 && networkName.length === 0

    return (
        <div className="mainScreen">
            <GameList address={address} networkName={networkName}/>
            <div className='networkAndStartButton'>
                {noMetamask ?
                    <p>Please install Metamask </p>
                    :
                    <React.Fragment>
                        <div className='networkAndAddress'>
                            <p>{networkName}</p>
                            <p>{truncateAddress}</p>
                        </div>
                        <Link to='new-screen'>
                            <button className='mainButton'>New game</button>
                        </Link>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default MainScreen

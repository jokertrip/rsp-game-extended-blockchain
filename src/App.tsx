import React from 'react';
import {Route, Routes} from 'react-router-dom'
import MainScreen from "./Screens/MainScreen";
import Header from "./Components/Header";
import NewGameScreen from "./Screens/NewGameScreen";
import {getNetworkName} from "./utils";
import SecondPlayerScreen from "./Screens/SecondPlayerScreen";

const App: React.FC = () => {
    const [account, setAccount] = React.useState<string>('');
    const [networkName, setNetworkName] = React.useState<string>('');


    React.useEffect(() => {
        if (!window.ethereum) {
            alert('You need to install metamask to use this site')
            return;
        }
        const accountWasChanged = (accounts: string[]) => {
            setAccount(accounts[0]);
            const networkName = getNetworkName(window.ethereum.networkVersion);
            setNetworkName(networkName)
            console.log('accountWasChanged');
        }
        const getAndSetAccount = async () => {
            const changedAccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            setAccount(changedAccounts[0]);
            const networkName = getNetworkName(window.ethereum.networkVersion);
            setNetworkName(networkName)
            console.log('getAndSetAccount');
        }
        const clearAccount = () => {
            setAccount('');
            setNetworkName('')
            console.log('clearAccount');
        };
        window.ethereum.on('accountsChanged', accountWasChanged);
        window.ethereum.on('connect', getAndSetAccount);
        window.ethereum.on('disconnect', clearAccount);
        window.ethereum.on("chainChanged", getAndSetAccount);
        window.ethereum.request({method: 'eth_requestAccounts'}).then((accounts: string[]) => {
            console.log('account', accounts[0])
            setAccount(accounts[0]);
            const networkName = getNetworkName(window.ethereum.networkVersion);
            setNetworkName(networkName)
        }, (error: any) => {
            console.log('error', error)
        })
        return () => {
            window.ethereum.removeListener('accountsChanged', accountWasChanged);
            window.ethereum.removeListener('connect', getAndSetAccount);
            window.ethereum.removeListener('disconnect', clearAccount);
        }
    }, []);

    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<MainScreen address={account} networkName={networkName}/>}/>
                <Route path='/new-screen' element={<NewGameScreen address={account} networkName={networkName}/>}/>
                <Route path="/game" element={<SecondPlayerScreen />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;

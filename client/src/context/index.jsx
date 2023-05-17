import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

// import { GetParams } from '../utils/onboard.js';
import { ABI, ADDRESS } from '../contract';
// import { createEventListeners } from './createEventListeners';

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [battleGround, setBattleGround] = useState('bg-astral');
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [step, setStep] = useState(1);
    const [gameData, setGameData] = useState({ players: [], pendingBattles: [], activeBattle: null });
    const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });
    const [battleName, setBattleName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [updateGameData, setUpdateGameData] = useState(0);

    const player1Ref = useRef();
    const player2Ref = useRef();

    const navigate = useNavigate();

    const updateCurrentWalletAddress = async () => {
        try {
            console.log('Call updateCurrentWalletAddress')
            const accounts = await window?.ethereum?.request({ method: 'eth_accounts' });
            console.log('accs', accounts)
            if (accounts) setWalletAddress(accounts[0]);
        } catch (error) {
            console.log('Err updateWallet', error)
        }
    };

    useEffect(() => {
        console.log('UseEffect updateWallet')
        updateCurrentWalletAddress()
        window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
    }, [])

    //* Handle alerts
    useEffect(() => {
        if (showAlert?.status) {
            const timer = setTimeout(() => {
                setShowAlert({ status: false, type: 'info', message: '' });
            }, [5000]);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const newProvider = new ethers.providers.Web3Provider(connection)
            const signer = newProvider.getSigner()
            const newContract = new ethers.Contract(ADDRESS, ABI, signer)

            console.log('set provider, contract', newProvider, newContract)
            setProvider(newProvider);
            setContract(newContract);
        };
        setSmartContractAndProvider();

    }, []);

    return (
        <GlobalContext.Provider
            value={{
                // player1Ref,
                // player2Ref,
                // battleGround,
                // setBattleGround,
                contract,
                // gameData,
                walletAddress,
                // updateCurrentWalletAddress,
                showAlert,
                setShowAlert,
                // battleName,
                // setBattleName,
                // errorMessage,
                // setErrorMessage,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
import React, { useState } from 'react';
import { PageHOC, CustomInput, CustomButton } from '../components'
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log('handleClick', walletAddress)
      const playerExists = await contract.isPlayer(walletAddress);
      console.log('playerExists', playerExists)
      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate('/create-battle'), 8000);
      }
    } catch (error) {
      let errMsg = 'Something Went Wrong!'
      if (error.code === 4001) errMsg = 'User rejected the request!'
      console.log('err', error)
      setShowAlert({
        status: true,
        type: 'failure',
        message: errMsg,
      });
    }
  };


  return (
    // walletAddress && (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeHolder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  )
  // );
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start plying <br /> the ult Web3 Battle Card Game</>
);
import { ethers } from 'ethers'
import { ABI } from '../contract'

const AddNewEvent = (eventFilter, provider, cb) => {
  // Not have multiple listeners
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(logs);
    console.log('parsedLog', parsedLog)

    cb(parsedLog);
  });
};

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  player1Ref,
  player2Ref,
  setUpdateGameData
}) => {
  console.log('invoke createEventListeners')
  const NewPlayerEventFilter = contract.filters.NewPlayer();
  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log('New player created!', args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: 'success',
        message: 'Player has been successfully registered',
      });
    }
  });

  const NewBattleEventFilter = contract.filters.NewBattle();
  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log('New battle started!', args, walletAddress);

    if (walletAddress.toLowerCase() === args.player1.toLowerCase() 
      || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });
}  
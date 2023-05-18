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
}  
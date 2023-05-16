import React from 'react';
import { PageHOC } from '../components'
import styles from '../styles';

const CreateBattle = () => {
    return (
        <div>
            <p className={styles.infoText} onClick={() => navigate('/join-battle')}>
                Or join already existing battles
            </p>
        </div>
    )
};

export default PageHOC(
    CreateBattle,
    <>Create <br /> a new Battle</>,
    <>Create your own battle and wait for other players to join you</>
);
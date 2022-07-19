/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { levels } from '../../Data/PipeData';
import socket from '../../Data/socket';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { generateLevel, resetMoveCount } from '../../Redux/PipeSlice';
import MessageBox from '../MessageBox/MessageBox';
import Toggles from '../Toggles/Toggles';
import styles from './Menu.module.scss';

const Menu = () => {
  const {
    moves, chosenLevel, message, locked,
  } = useAppSelector(({ pipes }) => pipes);
  const dispatch = useAppDispatch();

  const generateNewLevel = (command: string, level: string) => {
    dispatch(generateLevel(level));
    dispatch(resetMoveCount());
    socket.send(command);
    socket.send('map');
  };

  const submitAnswer = () => {
    socket.send('verify');
  };

  return (
    <div className={styles.menu}>
      {message && <MessageBox />}
      {!chosenLevel ? (
        <button
          className={styles.submitBtn}
          onClick={() => generateNewLevel('new 1', 'Level 1')}
        >
          Play
        </button>
      ) : (
        <div className={styles.box}>
          <div className={styles.levelWrapper}>
            {levels.map(({ name, command }) => (
              <button
                className={styles.levelBtn}
                onClick={() => generateNewLevel(command, name)}
                key={name}
                disabled={name.includes('*') && locked}
              >
                {name}
              </button>
            ))}
          </div>
          <div className={styles.info}>
            <span><b>{chosenLevel}</b></span>
            <span>{`Actions: ${moves}`}</span>
          </div>
          <button
            className={styles.submitBtn}
            onClick={() => submitAnswer()}
          >
            Submit
          </button>
          <Toggles />
        </div>
      )}
    </div>
  );
};

export default Menu;

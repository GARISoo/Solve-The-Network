import { useEffect } from 'react';
import { processData } from '../../Data/PipeFunctions';
import socket from '../../Data/socket';
import {
  updateColumns, updateMessage, updatePipeField, updateRows,
} from '../../Redux/PipeSlice';
import styles from './PipeGame.module.scss';
import WelcomeBox from '../WelcomeBox/WelcomeBox';
import Menu from '../Menu/Menu';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import PipeActions from '../PipeActions/PipeActions';
import PipesLayout from '../PipesLayout/PipesLayout';

const PipeGame = () => {
  const { chosenLevel } = useAppSelector(({ pipes }) => pipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.onmessage = ({ data }) => {
      if (data.includes('verify')) {
        dispatch(updateMessage(data));
      } else if (!data.includes('OK')) {
        const pipeField = processData(data);
        dispatch(updatePipeField(pipeField.modifiedPipes));
        dispatch(updateColumns(pipeField.columns));
        dispatch(updateRows(pipeField.rows));
      }
    };

    socket.onclose = () => {
      dispatch(updateMessage('Closing Timeout!'));
    };
  }, []);

  return (
    <div className={styles.container}>
      <Menu />
      {!chosenLevel ? (
        <WelcomeBox />
      ) : (
        <>
          <PipeActions />
          <PipesLayout />
        </>
      )}
    </div>
  );
};

export default PipeGame;

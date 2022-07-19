import { buttons } from '../../Data/PipeData';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { addOneMove } from '../../Redux/PipeSlice';
import styles from './PipeActions.module.scss';

const PipeActions = () => {
  const { pipeField, columns, rows } = useAppSelector(({ pipes }) => pipes);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.actionWrapper}>
      {buttons.map(({ name, handleClick }) => (
        <button
          className={styles.actionBtn}
          key={name}
          onClick={() => {
            handleClick({ pipeField, columns, rows });
            dispatch(addOneMove());
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default PipeActions;

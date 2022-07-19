/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { toggleLock, toggleQuality } from '../../Redux/PipeSlice';
import styles from './Toggles.module.scss';

const Toggles = () => {
  const { locked, quality } = useAppSelector(({ pipes }) => pipes);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.toggles}>
      <div className={styles.tooltip}>
        <img
          src={locked
            ? 'https://www.svgrepo.com/show/154081/black-locked.svg'
            : 'https://www.svgrepo.com/show/39060/unlocked.svg'}
          alt="lock"
          className={styles.lock}
          onClick={() => dispatch(toggleLock())}
        />
        <span className={styles.tooltipText}>
          Unlock level 4, 5 and 6 on you own processor risk
        </span>
      </div>
      <div className={styles.tooltip}>
        <img
          src={quality
            ? 'https://www.svgrepo.com/show/334254/show.svg'
            : 'https://www.svgrepo.com/show/334908/show.svg'}
          alt="eye"
          className={styles.eye}
          onClick={() => dispatch(toggleQuality())}
        />
        <span className={styles.tooltipText}>
          Toggle pipe quality for processing power
        </span>
      </div>
    </div>
  );
};

export default Toggles;

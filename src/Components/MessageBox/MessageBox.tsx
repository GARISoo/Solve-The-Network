import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { updateMessage } from '../../Redux/PipeSlice';
import styles from './MessageBox.module.scss';

const MessageBox = () => {
  const { message } = useAppSelector(({ pipes }) => pipes);
  const boxRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const handleClickOutside = (event: any) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      dispatch(updateMessage(''));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  return (
    <div className={styles.blur}>
      <div className={styles.box} ref={boxRef}>
        <p><b>{message.slice(7)}</b></p>
        <button
          className={styles.closeBtn}
          onClick={() => dispatch(updateMessage(''))}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageBox;

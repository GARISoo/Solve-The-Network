/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { rotatePipe } from '../../Data/PipeFunctions';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { addOneMove } from '../../Redux/PipeSlice';
import styles from './PipesLayout.module.scss';

const PipesLayout = () => {
  const [scaleSize, setScaleSize] = useState(40);
  const { pipeField, quality, chosenLevel } = useAppSelector(({ pipes }) => pipes);
  const dispatch = useAppDispatch();

  const adjustScalingForPipes = () => {
    if (chosenLevel.includes('1')) {
      setScaleSize(50);
    }
    if (chosenLevel.includes('2')) {
      setScaleSize(40);
    }
    if (chosenLevel.includes('3')) {
      setScaleSize(30);
    }
  };

  useEffect(() => {
    adjustScalingForPipes();
  }, [chosenLevel]);

  const pipeScale = {
    width: `${scaleSize}px`,
    height: `${scaleSize}px`,
  };

  return (
    <div className={styles.pipeWrapper}>
      {pipeField.map((row, y) => (
        <div className={styles.pipesRow} key={y}>
          {row.map((col, x) => (
            <div
              className={styles.pipe}
              style={pipeScale}
              key={`${col.pipe}${y}${x}`}
              onClick={() => {
                dispatch(addOneMove());
                rotatePipe(x, y, 'manual');
              }}
            >
              {quality ? (
                <img src={col.img} alt="pipe" className={styles.pipeImg} style={pipeScale} />
              ) : (
                <span>{col.pipe}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>

  );
};

export default PipesLayout;

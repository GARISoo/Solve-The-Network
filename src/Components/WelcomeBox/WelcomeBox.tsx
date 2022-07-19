import { useAppSelector } from '../../Redux/hooks';
import styles from './WelcomeBox.module.scss';

const WelcomeBox = () => {
  const { chosenLevel } = useAppSelector(({ pipes }) => pipes);

  return (
    !chosenLevel ? (
      <>
        <div className={styles.container}>
          <h1>Pipeline Network</h1>
          <div className={styles.about}>
            <div className={styles.description}>
              <h3>DESCRIPTION</h3>
              <p>
                Tomorrow the construction of the pipe network begins, but as it seems the new engineer
                drew a map of incorrectly placed pipes.
                Your task is to solve the problem by connecting all pipes in a single network and saving
                your mate from being fired.
              </p>
            </div>
            <div className={styles.instructions}>
              <h3>INSTRUCTIONS</h3>
              <ul>
                <li>Start the game by selecting desired level above.</li>
                <li>Connect all pipes in a single network.</li>
                <li>Pipes are not allowed to connect with the outside border.</li>
                <li>All pipes matter, meaning not a single dangling pipe.</li>
                <li>Difficulty increases each level.</li>
                <li>Total of 10 attempts per level.</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ) : null
  );
};

export default WelcomeBox;

import styles from './styles.module.scss';

interface LoadingUIProps {
  isLoading?: boolean;
}

const LoadingUI = ({ isLoading = true }: LoadingUIProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
};

export default LoadingUI;

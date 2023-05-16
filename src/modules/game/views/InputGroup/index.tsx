import styles from './styles.module.scss';
import InputRow from '../../components/InputRow';

const InputGroup = () => {
  const numberOfRows = 5;

  const rowGroup = Array
    .from({ length: numberOfRows })
    .map(() => (
      <InputRow key={crypto.randomUUID()} />
    ));

  return (
    <div className={styles.container}>
      {rowGroup}
    </div>
  );
};

export default InputGroup;

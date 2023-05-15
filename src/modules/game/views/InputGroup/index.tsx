import InputRow from '../../components/InputRow';

import styles from './styles.module.scss';

const InputGroup = () => {

  const numberOfRows = 5;

  const words = ['ALVES', 'REACT', 'TESTS', 'SOLID', 'YAGNI'] as const

  const rowGroup = () => {

    return Array
      .from({ length: numberOfRows })
      .map((_, index) => ( <InputRow key={index} word={words[index] as string} />
      ));
  };

  return (
    <>
      <div className={styles.container}>
          {rowGroup()}
      </div>
    </>
  );
};

export default InputGroup;

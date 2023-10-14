import { useShallow } from 'zustand/react/shallow';

import stylesBox from '@/shared/components/ui/InputBox/styles.module.scss';
import InputBoxUI from '@/shared/components/ui/InputBox/InputBoxUI';

import { useConfetti } from '../../hooks/useConffetti';
import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

interface DialogResponseProps {
  isExplanation: boolean;
}

export const DialogResponse = ({ isExplanation }: DialogResponseProps) => {
  const { response, status } = useResultStore(
    useShallow((store) => ({
      response: store.response,
      status: store.status,
    }))
  );

  useConfetti(response);

  const isWin = status === 'WIN';
  const variant = isWin ? 'correct' : 'bad-position';
  const showMessage = !isWin && !isExplanation;

  if (!response) {
    return null;
  }

  return (
    <div className={styles.wordContainer}>
      {showMessage && <p>A palavra correta era:</p>}
      <div>
        {response.split('').map((value, index) => (
          <InputBoxUI
            key={index}
            isActiveRow={false}
            defaultValue={value}
            variant={variant}
            className={stylesBox.container}
          />
        ))}
      </div>
    </div>
  );
};

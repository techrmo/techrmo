import { useShallow } from 'zustand/react/shallow';

import stylesBox from '@/shared/components/ui/InputBox/styles.module.scss';
import InputBoxUI from '@/shared/components/ui/InputBox/InputBoxUI';
import Button from '@/shared/components/ui/Button';

import { useConfetti } from '../../hooks/useConffetti';
import { useResultStore } from '../../stores/ResultStore';
import { useFormStore } from '../../stores/Form';

import styles from './styles.module.scss';

interface DialogResponseProps {
  isExplanation: boolean;
  backToResult: () => void;
}

export const DialogResponse = ({
  isExplanation,
  backToResult,
}: DialogResponseProps) => {
  const { response, status } = useResultStore(
    useShallow((store) => ({
      response: store.response,
      status: store.status,
    }))
  );
  const wordSize = useFormStore((store) => store.wordSize);

  useConfetti(response);

  const isWin = status === 'WIN';
  const variant = isWin ? 'correct' : 'bad-position';
  const buttonVariant = isWin ? 'green' : 'yellow';
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
            wordSize={wordSize}
            key={index}
            isActiveRow={false}
            defaultValue={value}
            variant={variant}
            className={stylesBox.container}
          />
        ))}
      </div>
      {isExplanation && (
        <Button
          size="small"
          variant={`text-${buttonVariant}`}
          onClick={backToResult}
        >
          Voltar para o resultado
        </Button>
      )}
    </div>
  );
};

import stylesBox from '@/shared/components/ui/InputBox/styles.module.scss';
import InputBoxUI from '@/shared/components/ui/InputBox/InputBoxUI';

import { useConfetti } from '../../hooks/useConffetti';
import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

interface DialogResponseProps {
  isGeneratingScreenshot: boolean;
}

export const DialogResponse = ({
  isGeneratingScreenshot,
}: DialogResponseProps) => {
  const response = useResultStore((store) => store.response);

  useConfetti(response);

  if (!response) {
    return null;
  }

  return (
    <div className={styles.wordContainer}>
      <div>
        {response.split('').map((value, index) => (
          <InputBoxUI
            key={index}
            isActiveRow={false}
            defaultValue={value}
            variant="correct"
            className={stylesBox.container}
            isHidden={isGeneratingScreenshot}
          />
        ))}
      </div>
    </div>
  );
};

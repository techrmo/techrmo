import Button from '@/shared/components/ui/Button';

import { useFinishedDialogStore } from '../../stores/DialogFinishedStore';
import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

export const BottomSheetViewResult = () => {
  const open = useFinishedDialogStore((store) => store.open);
  const status = useResultStore((store) => store.status);

  if (status === 'PLAYING') {
    return null;
  }

  return (
    <div className={styles.container}>
      <p>
        Voce já jogou a <br /> palavra de hoje!
      </p>

      <Button
        type="button"
        size="medium"
        variant="contained-green"
        onClick={open}
      >
        Ver resultado
      </Button>

      <p>
        Mas não se preocupe, uma nova <br />
        palavra é gerada todos os dias.
      </p>
    </div>
  );
};

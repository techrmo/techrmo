import Button from '@/shared/components/ui/Button';

import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

import { ShareIcon } from '@/shared/assets/icons/ShareIcon';

interface DialogFooterButtonsProps {
  goToExplanation: () => void;
  file: File | null;
}

type CanShare = ((data?: ShareData | undefined) => boolean) | undefined;

export const DialogFooterButtons = ({
  file,
  goToExplanation,
}: DialogFooterButtonsProps) => {
  const status = useResultStore((store) => store.status);
  const isWin = status === 'WIN';
  const variant = status === 'WIN' ? 'outlined-green' : 'outlined-yellow';
  const canShare = (navigator.canShare as CanShare) && isWin;

  const share = () => {
    if (!file) {
      return;
    }

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
      });
    }
  };

  return (
    <div className={styles.dialogFooterButtons}>
      {canShare && (
        <Button
          onClick={share}
          type="button"
          variant="contained-green"
          size="small"
          id={styles.shareButton}
        >
          <span>Compartilhar</span>
          <span>
            <ShareIcon fontSize={26} />
          </span>
        </Button>
      )}
      <Button
        type="button"
        size="small"
        variant={variant}
        onClick={goToExplanation}
      >
        Ver explicação
      </Button>
    </div>
  );
};

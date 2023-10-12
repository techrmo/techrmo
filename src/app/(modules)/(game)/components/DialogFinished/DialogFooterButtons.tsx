import Button from '@/shared/components/ui/Button';

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
  const canShare = navigator.canShare as CanShare;

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
      {
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
      }
      <Button type="button" size="small" onClick={goToExplanation}>
        Ver explicação
      </Button>
    </div>
  );
};

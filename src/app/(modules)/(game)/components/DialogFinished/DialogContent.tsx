import type { Dispatch, ReactNode, SetStateAction } from 'react';

import Button from '@/shared/components/ui/Button';

import { DialogExplanations } from './DialogExplanations';

interface DialogContentProps {
  children: ReactNode;
  isExplanation: boolean;
  setIsExplanation: Dispatch<SetStateAction<boolean>>;
  file: File | null;
}

export const DialogContent = ({
  file,
  isExplanation,
  setIsExplanation,
  children,
}: DialogContentProps) => {
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
    <>
      {children}
      {isExplanation ? (
        <DialogExplanations backToResult={() => setIsExplanation(false)} />
      ) : (
        <>
          <Button
            onClick={share}
            type="button"
            variant="text-green"
            size="small"
          >
            Compartilhar
          </Button>
          <Button type="button" onClick={() => setIsExplanation(true)}>
            Ver explicação
          </Button>
        </>
      )}
    </>
  );
};

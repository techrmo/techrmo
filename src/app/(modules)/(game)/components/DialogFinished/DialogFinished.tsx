'use client';

import { useEffect, useState } from 'react';

import { Dialog } from '@/shared/components/core/Dialog';

import { useFinishedDialogStore } from '../../stores/DialogFinishedStore';
import { useResultStore } from '../../stores/ResultStore';
import { useScreenShot } from '../../hooks/useScreenShot';

import styles from './styles.module.scss';
import { DialogResponse } from './DialogResponse';
import { DialogContent } from './DialogContent';

export const DialogFinished = () => {
  const [mounted, setMounted] = useState(false);
  const [isExplanation, setIsExplanation] = useState(false);

  const status = useResultStore((store) => store.status);
  const { file, ref } = useScreenShot<HTMLDivElement>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const titleText = status === 'WIN' ? 'Você acertou!' : 'Você errou!';
  const title = !isExplanation ? titleText : '';

  if (!mounted) {
    return null;
  }

  return (
    <Dialog
      ref={ref}
      useDialogStore={useFinishedDialogStore}
      title={title}
      contentClassName={styles.content}
      titleClassName={styles.title}
    >
      <DialogContent
        file={file}
        isExplanation={isExplanation}
        setIsExplanation={setIsExplanation}
      >
        <DialogResponse />
      </DialogContent>
    </Dialog>
  );
};

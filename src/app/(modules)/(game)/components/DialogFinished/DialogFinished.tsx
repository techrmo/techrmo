'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import { Dialog } from '@/shared/components/core/Dialog';

import { useFinishedDialogStore } from '../../stores/DialogFinishedStore';
import { useResultStore } from '../../stores/ResultStore';
import { useScreenshot } from '../../hooks/useScreenshot';

import styles from './styles.module.scss';
import { DialogResponse } from './DialogResponse';
import { DialogContent } from './DialogContent';

export const DialogFinished = () => {
  const [mounted, setMounted] = useState(false);
  const [isExplanation, setIsExplanation] = useState(false);
  const auth = getAuth();

  const status = useResultStore((store) => store.status);
  const { file, isGenerating, ref } = useScreenshot<HTMLDivElement>(mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTitle = () => {
    if (isExplanation) {
      return '';
    }

    const displayName = auth.currentUser?.displayName;

    if (!displayName) {
      return '';
    }

    if (isGenerating && status === 'WIN') {
      return `${displayName} acertou a palavra do dia`;
    }

    if (isGenerating && status === 'LOST') {
      return `${displayName} acertou a palavra do dia`;
    }

    if (status === 'WIN') {
      return 'Você acertou!';
    }

    if (status === 'LOST') {
      return 'Você errou!';
    }

    return '';
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog
      ref={ref}
      useDialogStore={useFinishedDialogStore}
      title={getTitle()}
      contentClassName={styles.content}
      titleClassName={styles.title}
    >
      <DialogContent
        file={file}
        isExplanation={isExplanation}
        setIsExplanation={setIsExplanation}
      >
        <DialogResponse isGeneratingScreenshot={isGenerating} />
      </DialogContent>
    </Dialog>
  );
};

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
      useDialogStore={useFinishedDialogStore}
      title={getTitle()}
      contentClassName={styles.content}
      titleClassName={styles.title}
    >
      <div ref={ref} style={{ background: 'red' }}>
        opa
        <input type="text" value={2} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim magnam
          saepe quibusdam nesciunt doloremque facilis nulla, placeat voluptate
          in aut laboriosam accusamus minima omnis nobis, suscipit at doloribus
          molestiae? Aliquid?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim magnam
          saepe quibusdam nesciunt doloremque facilis nulla, placeat voluptate
          in aut laboriosam accusamus minima omnis nobis, suscipit at doloribus
          molestiae? Aliquid?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim magnam
          saepe quibusdam nesciunt doloremque facilis nulla, placeat voluptate
          in aut laboriosam accusamus minima omnis nobis, suscipit at doloribus
          molestiae? Aliquid?
        </p>
        <button onClick={() => console.log('oi')}>Teste</button>
      </div>
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

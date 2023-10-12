'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import { Dialog } from '@/shared/components/core/Dialog';

import { useFinishedDialogStore } from '../../stores/DialogFinishedStore';
import { useResultStore } from '../../stores/ResultStore';
import { useScreenshot } from '../../hooks/useScreenshot';

import { DialogResponse } from './DialogResponse';
import { ShareComponent } from './ShareComponent';
import { DialogExplanations } from './DialogExplanations';
import { DialogFooterButtons } from './DialogFooterButtons';
import styles from './styles.module.scss';

export const DialogFinished = () => {
  const { currentUser } = getAuth();
  const [isExplanation, setIsExplanation] = useState(false);

  const userName = currentUser?.displayName;
  const status = useResultStore((store) => store.status);
  const isOpen = useFinishedDialogStore((store) => store.isOpen);
  const { file, ref } = useScreenshot<HTMLDivElement>(isOpen && !!userName);

  const getTitle = () => {
    if (isExplanation) {
      return '';
    }

    if (status === 'WIN') {
      return 'Você acertou!';
    }

    if (status === 'LOST') {
      return 'Você errou!';
    }

    return '';
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {userName && <ShareComponent ref={ref} userName={userName} />}
      <Dialog
        useDialogStore={useFinishedDialogStore}
        title={getTitle()}
        contentClassName={styles.content}
        titleClassName={styles.title}
      >
        <DialogResponse />
        {isExplanation ? (
          <DialogExplanations backToResult={() => setIsExplanation(false)} />
        ) : (
          <DialogFooterButtons
            file={file}
            goToExplanation={() => setIsExplanation(true)}
          />
        )}
      </Dialog>
    </>
  );
};

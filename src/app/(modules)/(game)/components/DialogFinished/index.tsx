'use client';

import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import confetti from 'canvas-confetti';

import DialogUI from '@/shared/components/ui/Dialog';
import Button from '@/shared/components/ui/Button';
import stylesBox from '@/shared/components/ui/InputBox/styles.module.scss';

import { useDialogStore } from '../../stores/DialogStore';
import { useResultStore } from '../../stores/ResultStore';
import { useConfetti } from '../../hooks/useConffetti';

import styles from './styles.module.scss';

const DialogFinished = () => {
  const [mounted, setMounted] = useState(false);
  const [isExplanation, setIsExplanation] = useState(false);
  const { isOpen, close } = useDialogStore(
    (store) => ({
      isOpen: store.isOpen,
      close: store.close,
    }),
    shallow
  );
  const { status, response, explanation } = useResultStore(
    (store) => ({
      status: store.status,
      response: store.response,
      explanation: store.explanation,
    }),
    shallow
  );
  useConfetti(response);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contentClassName = `
    ${styles.content} 
    ${isExplanation ? styles.contentExplanation : ''}
  `;

  const titleText = status === 'WIN' ? 'Você acertou!' : 'Você errou!';
  const title = !isExplanation ? titleText : '';

  if (!response || !mounted) {
    return null;
  }

  return (
    <DialogUI
      isOpen={isOpen}
      close={close}
      title={title}
      titleClassName={styles.title}
      contentClassName={contentClassName}
    >
      <div className={styles.wordContainer}>
        {response.split('').map((value, index) => (
          <span
            key={index}
            data-variant="correct"
            className={stylesBox.container}
            translate="no"
          >
            {value}
          </span>
        ))}
      </div>
      {isExplanation ? (
        <p className={styles.explanation}>{explanation}</p>
      ) : (
        <Button type="button" onClick={() => setIsExplanation(true)}>
          Ver explicação
        </Button>
      )}
    </DialogUI>
  );
};

export default DialogFinished;

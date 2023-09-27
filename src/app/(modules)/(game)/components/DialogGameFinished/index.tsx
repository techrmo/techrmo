'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { shallow } from 'zustand/shallow';

import DialogUI from '@/shared/components/DialogUI';
import Button from '@/shared/components/Button';
import stylesBox from '@/shared/components/ui/InputBoxUI/styles.module.scss';

import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

const DialogGameFinished = () => {
  const [hasBeenMounted, setHasBeenMounted] = useState(false);
  const [isExplanation, setIsExplanation] = useState(false);

  useEffect(() => {
    setHasBeenMounted(true);
  }, []);

  const { status, response, explanation } = useResultStore(
    (store) => ({
      status: store.status,
      response: store.response,
      explanation: store.explanation,
    }),
    shallow
  );

  const explanationClassname = `
    ${isExplanation ? styles.contentExplanation : ''}
  `;

  const titleText = status === 'WIN' ? 'Você acertou!' : 'Você errou!';

  const title = !isExplanation ? (
    <Dialog.Title className={styles.title}>{titleText}</Dialog.Title>
  ) : null;

  if (!response || !hasBeenMounted) {
    return null;
  }

  return (
    <DialogUI>
      <Dialog.Content className={`${styles.content} ${explanationClassname}`}>
        {title}
        <div className={styles.wordContainer}>
          {response.split('').map((value, index) => (
            <span
              key={index}
              data-variant="correct"
              className={stylesBox.container}
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
      </Dialog.Content>
    </DialogUI>
  );
};

export default DialogGameFinished;

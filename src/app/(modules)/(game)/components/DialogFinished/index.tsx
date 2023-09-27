'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import DialogUI from '@/shared/components/DialogUI';
import Button from '@/shared/components/Button';
import stylesBox from '@/shared/components/InputBoxUI/styles.module.scss';

import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

const DialogFinished = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { status, response, explanation } = useResultStore(
    (store) => ({
      status: store.status,
      response: store.response,
      explanation: store.explanation,
    }),
    shallow
  );

  const [isExplanation, setIsExplanation] = useState(false);

  const contentClasses = `
    ${styles.content} 
    ${isExplanation ? styles.contentExplanation : ''}
  `;

  const titleText = status === 'WIN' ? 'Você acertou!' : 'Você errou!';

  const title = !isExplanation ? (
    <Dialog.Title className={styles.title}>{titleText}</Dialog.Title>
  ) : null;

  if (!response || !mounted) {
    return null;
  }

  return (
    <DialogUI>
      <Dialog.Content className={contentClasses}>
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
        {isExplanation && <p className={styles.explanation}>{explanation}</p>}
        {!isExplanation && (
          <Button type="button" onClick={() => setIsExplanation(true)}>
            Ver explicação
          </Button>
        )}
      </Dialog.Content>
    </DialogUI>
  );
};

export default DialogFinished;

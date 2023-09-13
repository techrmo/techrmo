'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';

import DialogUI from '@/shared/components/DialogUI';
import Button from '@/shared/components/Button';

import stylesBox from '../Inputs/InputBox/styles.module.scss';
import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

const DialogFinished = () => {
  const { status, response } = useResultStore(
    (store) => ({
      status: store.status,
      response: store.response,
    }),
    shallow
  );

  const [isExplanation, setIsExplanation] = useState(false);

  const contentClasses = `
    ${styles.content} 
    ${isExplanation ? styles.contentExplanation : ''}
  `;

  const titleText = status === 'WINNER' ? 'Você acertou!' : 'Você errou!';

  const title = !isExplanation ? (
    <Dialog.Title className={styles.title}>{titleText}</Dialog.Title>
  ) : null;

  if (!response) {
    return null;
  }

  return (
    <DialogUI>
      <Dialog.Content className={contentClasses}>
        {title}
        <div className={styles.wordContainer}>
          {response.split('').map((value) => (
            <span
              key={value}
              data-variant="correct"
              className={stylesBox.container}
            >
              {value}
            </span>
          ))}
        </div>
        {isExplanation && (
          <p className={styles.explanation}>
            YAGNI (You Aren&apos;t Gonna Need It) é um princípio de
            desenvolvimento de software que preza pela simplicidade. Evite
            adicionar recursos desnecessários, foque no que é essencial e evite
            desperdício de tempo e esforço. Isso resulta em código mais limpo,
            flexível e entrega mais rápida do software.
          </p>
        )}
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

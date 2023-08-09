'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import stylesBox from '@/modules/game/components/Inputs/InputBox/styles.module.scss';
import styles from './styles.module.scss';
import Button from '../Button';

interface DialogUIProps {
  isOpen: boolean;
  close: () => void
}

const DialogUI = ({ isOpen, close }: DialogUIProps) => {
  const [isExplanation, setIsExplanation] = useState(false);

  const contentClasses = `
    ${styles.content} 
    ${isExplanation && styles.contentExplanation}
  `;

  const title = !isExplanation
    ? <Dialog.Title className={styles.title}>Você acertou!</Dialog.Title> : null;

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content className={contentClasses}>
            {title}
            <div className={styles.wordContainer}>
              {
                ['Y', 'A', 'G', 'N', 'I'].map((value) => (
                  <span
                    key={value}
                    data-variant='correct'
                    className={stylesBox.container}
                  >
                    {value}
                  </span>
                ))
              }
            </div>
            {isExplanation && (
            <p className={styles.explanation}>
              YAGNI (You Aren&apos;t Gonna Need It) é um princípio de desenvolvimento
              de software que preza pela simplicidade.
              Evite adicionar recursos
              desnecessários,
              foque no que é essencial e evite desperdício de tempo e esforço.
              Isso resulta em código mais limpo, flexível e entrega mais rápida do software.
            </p>
            )}
            {!isExplanation && (
              <Button
                type='button'
                onClick={() => setIsExplanation(true)}
              >
                Ver explicação
              </Button>
            )}
            <Dialog.Close className={styles.close} onClick={close}>
              Fechar
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogUI;

'use client';

import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import html2canvas from 'html2canvas';

import DialogUI from '@/shared/components/ui/Dialog';
import Button from '@/shared/components/ui/Button';
import stylesBox from '@/shared/components/ui/InputBox/styles.module.scss';

import { useDialogStore } from '../../stores/DialogStore';
import { useResultStore } from '../../stores/ResultStore';
import { useConfetti } from '../../hooks/useConffetti';

import styles from './styles.module.scss';
import { ExplanationsContainer } from './ExplanationsContainer';

export const DialogFinished = () => {
  const [mounted, setMounted] = useState(false);
  const [isExplanation, setIsExplanation] = useState(false);
  const { isOpen, close } = useDialogStore(
    (store) => ({
      isOpen: store.isOpen,
      close: store.close,
    }),
    shallow
  );
  const { status, response } = useResultStore(
    (store) => ({
      status: store.status,
      response: store.response,
    }),
    shallow
  );

  useConfetti(response);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadImage = async () => {
    const element = document.getElementById('print'),
      canvas = await html2canvas(element!),
      data = canvas.toDataURL('image/jpg');

    const filesArray = [
      new File([data], `oi.png`, {
        type: 'image/png',
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      title: `oi`,
      files: filesArray,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }

    console.log(data);
    // link = document.createElement('a');

    // link.href = data;
    // link.download = 'downloaded-image.jpg';

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

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
      <div id="print" className={styles.wordContainer}>
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
      <button onClick={handleDownloadImage}>teste</button>
      {isExplanation ? (
        <ExplanationsContainer />
      ) : (
        <Button type="button" onClick={() => setIsExplanation(true)}>
          Ver explicação
        </Button>
      )}
    </DialogUI>
  );
};

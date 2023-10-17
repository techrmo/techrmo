import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';

export const useScreenshot = <T extends HTMLElement>(triggered: boolean) => {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    const generateScreenshot = async () => {
      if (!ref.current || !triggered) {
        return;
      }

      try {
        const canvas = await html2canvas(ref.current, {
          useCORS: true,
          allowTaint: true,
          scale: 1,
          onclone: (_document, element) => {
            element.style.display = 'flex';
          },
        });

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return;
            }

            const newfile = new File([blob], 'picture.png', {
              type: 'image/png',
            });
            setFile(newfile);
          },
          ' image/png',
          1
        );

        // const response = await axios.get<Blob>(image, {
        //   responseType: 'blob',
        // });
      } catch (error) {
        console.error(error);
      }
    };
    generateScreenshot();
  }, [setFile, triggered]);

  return { file, ref };
};

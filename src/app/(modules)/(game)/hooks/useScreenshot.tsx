import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';

export const useScreenshot = <T extends HTMLElement>(mounted: boolean) => {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    const generateScreenshot = async () => {
      if (!ref.current || !mounted) {
        return;
      }

      ref.current.style.display = 'flex';

      try {
        const canvas = await html2canvas(ref.current, {
          useCORS: true,
          allowTaint: true,
          scale: 1,
        });

        const image = canvas.toDataURL('image/png', 1);

        console.log(image);

        const response = await axios.get<Blob>(image, {
          responseType: 'blob',
        });

        const newfile = new File([response.data], 'picture.png', {
          type: 'image/png',
        });
        setFile(newfile);
      } catch (error) {
        console.error(error);
      } finally {
        // ref.current.style.display = 'none';
      }
    };
    generateScreenshot();
  }, [setFile, mounted]);

  return { file, ref };
};

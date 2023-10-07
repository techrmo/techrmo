import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';

export const useScreenShot = <T extends HTMLElement>() => {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    const generateScreenShot = async () => {
      if (!ref.current) {
        return;
      }

      const canvas = await html2canvas(ref.current);
      const image = canvas.toDataURL('image/png');

      const response = await axios.get<Blob>(image, {
        responseType: 'blob',
      });

      const newfile = new File([response.data], 'picture.png', {
        type: 'image/png',
      });
      setFile(newfile);
    };
    generateScreenShot();
  }, [setFile]);

  return { file, ref };
};

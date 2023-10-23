import Link from 'next/link';
import Image from 'next/image';

import Button from '@/shared/components/ui/Button';

import { useFinishedDialogStore } from '../../stores/DialogFinishedStore';
import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

import SimpleIconsTwitter from '@/shared/assets/icons/SimpleIconsTwitter';
import UiwLinkedin from '@/shared/assets/icons/UiwLinkedin';
import FeInstagram from '@/shared/assets/icons/FeInstagram';
import FormkitYoutube from '@/shared/assets/icons/FormkitYoutube';
import ProfileTsunode from '@/shared/assets/profileTsunode.png';

export const BottomSheetViewResult = () => {
  const open = useFinishedDialogStore((store) => store.open);
  const status = useResultStore((store) => store.status);

  if (['PLAYING', 'ONBOARDING'].includes(status)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <p>
        Você já jogou a <br /> palavra de hoje!
      </p>

      <Button
        type="button"
        size="medium"
        variant="contained-green"
        onClick={open}
      >
        Ver resultado
      </Button>

      <p>
        Mas não se preocupe, uma nova <br />
        palavra é gerada todos os dias.
      </p>

      <div>
        <ul>
          <li>
            <Image src={ProfileTsunode} alt="Perfil do Tsunode" />
          </li>
          <li>
            <Link href="https://twitter.com/tsu_node" target="_blank">
              <SimpleIconsTwitter gradientColor="green" />
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/tsunode/" target="_blank">
              <UiwLinkedin gradientColor="green" />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/tsu.node/" target="_blank">
              <FeInstagram gradientColor="green" />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/tsunode" target="_blank">
              <FormkitYoutube gradientColor="green" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

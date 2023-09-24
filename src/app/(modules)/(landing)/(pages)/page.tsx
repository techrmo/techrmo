import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import InputBoxUI from '@/shared/components/ui/InputBoxUI/InputBoxUI';
import { getCurrentUser } from '@/shared/services/getCurrentUser';

import LoginButton from '../components/LoginButton';

import styles from './styles.module.scss';

import ProfileTsunode from '@/shared/assets/profileTsunode.png';
import ProfileAlves from '@/shared/assets/profileAlves.png';
import SimpleIconsTwitter from '@/shared/assets/icons/SimpleIconsTwitter';
import UiwLinkedin from '@/shared/assets/icons/UiwLinkedin';
import FeInstagram from '@/shared/assets/icons/FeInstagram';
import FormkitYoutube from '@/shared/assets/icons/FormkitYoutube';

const Home = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect('/game');
  }

  return (
    <main className={styles.container}>
      <div className={styles.lines}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <header className={styles.header}>
        <Image src="./logo.svg" alt="Logo techrmo" width={250} height={100} />
      </header>

      <section>
        <h1>
          Aprenda <br />
          <span>Jogando</span>
        </h1>
        <LoginButton />
      </section>

      <section>
        <h2>Todos os dias uma nova palava para você aprender.</h2>
        <div className={styles.inputContainer}>
          <InputBoxUI variant="correct" defaultValue="R" />
          <InputBoxUI variant="incorrect" defaultValue="E" />
          <InputBoxUI variant="bad-position" defaultValue="A" />
          <InputBoxUI variant="incorrect" defaultValue="C" />
          <InputBoxUI variant="bad-position" defaultValue="T" />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Segue agente lá</p>

        <div>
          <ul>
            <li>
              <Image src={ProfileTsunode} alt="Perfil do Tsunode" />
            </li>
            <li>
              <Link href="#">
                <SimpleIconsTwitter gradientColor="green" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <UiwLinkedin gradientColor="green" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FeInstagram gradientColor="green" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FormkitYoutube gradientColor="green" />
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Image src={ProfileAlves} alt="Perfil do Tsunode" />
            </li>
            <li>
              <Link href="#">
                <SimpleIconsTwitter gradientColor="yellow" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <UiwLinkedin gradientColor="yellow" />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default Home;

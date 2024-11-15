import Image from 'next/image';
import Link from 'next/link';

import InputBoxUI from '@/shared/components/ui/InputBox';

import LoginButton from '../components/LoginButton';

import styles from './styles.module.scss';

import ProfileTsunode from '@/shared/assets/profileTsunode.png';
import SimpleIconsTwitter from '@/shared/assets/icons/SimpleIconsTwitter';
import UiwLinkedin from '@/shared/assets/icons/UiwLinkedin';
import FeInstagram from '@/shared/assets/icons/FeInstagram';
import FormkitYoutube from '@/shared/assets/icons/FormkitYoutube';

const Home = () => {
  return (
    <main className={styles.container}>
      <div className={styles.lines}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <header className={styles.header}>
        <Image
          src="https://techrmo.storage.googleapis.com/logo-medium.svg"
          alt="Logo techrmo"
          width={250}
          height={100}
        />
      </header>

      <section>
        <h1>
          Aprenda <br />
          <span>Jogando</span>
        </h1>
        <LoginButton />
      </section>

      <section>
        <h2>Todos os dias uma nova palavra para você aprender.</h2>
        <div className={styles.inputContainer}>
          <InputBoxUI variant="correct" defaultValue="R" />
          <InputBoxUI variant="incorrect" defaultValue="E" />
          <InputBoxUI variant="bad-position" defaultValue="A" />
          <InputBoxUI variant="incorrect" defaultValue="C" />
          <InputBoxUI variant="bad-position" defaultValue="T" />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Segue lá</p>

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
      </footer>
    </main>
  );
};

export default Home;

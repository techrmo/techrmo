import Image from 'next/image';
import Link from 'next/link';

import Container from './Container';
import styles from './styles.module.scss';

import ProfileTsunode from '@/shared/assets/profileTsunode.png';
import SimpleIconsTwitter from '@/shared/assets/icons/SimpleIconsTwitter';
import UiwLinkedin from '@/shared/assets/icons/UiwLinkedin';
import FeInstagram from '@/shared/assets/icons/FeInstagram';
import FormkitYoutube from '@/shared/assets/icons/FormkitYoutube';

const FinalStep = () => {
  return (
    <Container>
      <p>
        Para finalizar, mas não menos importante, apoie a gente nas redes
        sociais, é super importante para nós e ajuda a trazermos mais
        funcionalidades e modalidades para o jogo.
      </p>
      <div className={styles.socialMedia}>
        <ul>
          <li>
            <Image src={ProfileTsunode} alt="Perfil do Tsunode" />
          </li>
          <li>
            <Link href="https://twitter.com/tsu_node">
              <SimpleIconsTwitter gradientColor="green" />
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/tsunode/">
              <UiwLinkedin gradientColor="green" />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/tsu.node/">
              <FeInstagram gradientColor="green" />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/tsunode">
              <FormkitYoutube gradientColor="green" />
            </Link>
          </li>
        </ul>
      </div>
      <p>
        &#128680; Ah, mas atenção: <br /> Sempre que for compartilhar um print,
        tenha cuidado para não revelar a palavra do dia, pois é a mesma palavra
        para todos. Isso pode atrapalhar a experiência de outro jogador ou te
        colocar em um ranking menor.
      </p>

      <p>#techrmo #tsunode #sevenalv</p>
    </Container>
  );
};

export default FinalStep;

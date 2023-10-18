import Link from 'next/link';
import Image from 'next/image';

import InputBoxUI from '@/shared/components/ui/InputBox/InputBoxUI';
import Button from '@/shared/components/ui/Button';
import styles from '@/shared/scss/not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.container}>
      <Image
        src="/logo-medium.svg"
        alt="Logo techrmo"
        width={150}
        height={50}
        crossOrigin="anonymous"
      />
      <h1>
        A <strong>palavra</strong> do dia não está aqui não &#128064;
      </h1>
      <section>
        <div>
          <InputBoxUI defaultValue="4" variant="correct" />
          <InputBoxUI defaultValue="0" variant="incorrect" />
          <InputBoxUI defaultValue="4" variant="bad-position" />
        </div>
        <h2>Página não encontrada</h2>
      </section>
      <footer>
        <Button asChild variant="outlined-green">
          <Link href="/game">Voltar para o jogo</Link>
        </Button>
      </footer>
    </main>
  );
}

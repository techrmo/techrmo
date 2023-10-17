import Link from 'next/link';

import InputBoxUI from '@/shared/components/ui/InputBox/InputBoxUI';

export default function NotFound() {
  return (
    <main>
      <h1>
        A <strong>palavra</strong> do dia não está aqui não &#128064;
      </h1>
      <div>
        <InputBoxUI defaultValue="4" variant="correct" />
        <InputBoxUI defaultValue="0" variant="incorrect" />
        <InputBoxUI defaultValue="4" variant="bad-position" />
      </div>
      <h2>Página não encontrada</h2>
      <Link href="/game">Voltar para o jogo</Link>
    </main>
  );
}

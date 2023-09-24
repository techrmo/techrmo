import InputBoxUI from '@/shared/components/ui/InputBoxUI';

import Container from './Container';

const InputStep5 = () => {
  return (
    <Container>
      <InputBoxUI variant="bad-position" defaultValue="C" />
      <p>
        Quadrado amarelo significa que a letra existe, mas ela está na posição
        incorreta
      </p>
      <div></div>
    </Container>
  );
};

export default InputStep5;

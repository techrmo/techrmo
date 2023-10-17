import InputBoxUI from '@/shared/components/ui/InputBox';

import Container from './Container';

const InputStep4 = () => {
  return (
    <Container>
      <InputBoxUI variant="correct" defaultValue="E" />
      <p>
        Aqui você está com sorte, pois significa que a palavra secreta contém
        essa letra e ela está exatamente nessa posição. &#128154;
      </p>
    </Container>
  );
};

export default InputStep4;

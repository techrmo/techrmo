import InputBoxUI from '@/shared/components/ui/InputBoxUI';

import Container from './Container';

const InputStep4 = () => {
  return (
    <Container>
      <InputBoxUI variant="correct" defaultValue="E" />
      <p>
        Quadrado verde significa que a letra existe e ela está na posição
        correta
      </p>
    </Container>
  );
};

export default InputStep4;

import InputBoxUI from '@/shared/components/InputBoxUI';

import Container from './Container';

const InputStep6 = () => {
  return (
    <Container>
      <p>Essa aqui você tem que evitar ao máximo. &#128162;</p>
      <InputBoxUI variant="incorrect" defaultValue="A" />
      <p>
        Quadrado escuro significa que na palavra secreta não existe essa letra.
      </p>
    </Container>
  );
};

export default InputStep6;
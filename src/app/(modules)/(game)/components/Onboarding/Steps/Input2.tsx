import InputBoxUI from '@/shared/components/ui/InputBox';

import Container from './Container';

const InputStep2 = () => {
  return (
    <Container>
      <p>
        Os quadrados brancos são <br /> o seu momento de brilhar &#10024;.
      </p>
      <InputBoxUI variant="active" defaultValue="C" />
      <p>
        Insira uma letra em cada um para formatar a palavra que você irá chutar
        e assim que finalizar é só pressionar o <kbd>Enter</kbd>.
      </p>
    </Container>
  );
};

export default InputStep2;

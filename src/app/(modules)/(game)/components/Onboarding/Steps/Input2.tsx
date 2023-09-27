import InputBoxUI from '@/shared/components/InputBoxUI';
import { isMacOS } from '@/shared/helpers/isMacOs';

import Container from './Container';

const InputStep2 = () => {
  const keyEnter = isMacOS() ? 'return' : 'Enter';

  return (
    <Container>
      <p>
        Os quadrados brancos são <br /> o seu momento de brilhar &#10024;.
      </p>
      <InputBoxUI variant="active" defaultValue="A" />
      <p>
        Insira uma letra em cada um para formatar a palavra que você irá chutar
        e assim que finalizar é só pressionar o <kbd>{keyEnter}</kbd>.
      </p>
    </Container>
  );
};

export default InputStep2;

import InputBoxUI from '@/shared/components/ui/InputBox';

import Container from './Container';

const InputStep5 = () => {
  return (
    <Container>
      <p>
        Aqui é aquilo, né? Você chegou na área, mas chutou para fora. &#127773;
      </p>
      <InputBoxUI variant="bad-position" defaultValue="C" />
      <p>
        Amarelo significa que a palavra secreta tem essa letra, mas ela está na
        posição incorreta.
      </p>
    </Container>
  );
};

export default InputStep5;

import KeyUI from '../../Keyboard/KeyUI/KeyUI';

import Container from './Container';

const KeyStep1 = () => {
  return (
    <Container>
      <KeyUI variant="bad-position" value="C" />
      <p>
        Assim como nos quadrados acima, o amarelo significa que essa letra
        existe na palavra secreta, mas está na posição incorreta. &#128528;
      </p>
    </Container>
  );
};

export default KeyStep1;

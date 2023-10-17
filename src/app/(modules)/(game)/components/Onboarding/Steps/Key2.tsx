import KeyUI from '../../Keyboard/KeyUI/KeyUI';

import Container from './Container';

const KeyStep2 = () => {
  return (
    <Container>
      <p>Acho que você já entendeu aqui, certo? &#128540;</p>
      <KeyUI variant="correct" value="E" />
      <p>
        É isso aí, o verde no teclado também significa que a letra existe na
        palavra e ela está no lugar correto.
      </p>
    </Container>
  );
};

export default KeyStep2;

import KeyUI from '../../Keyboard/KeyUI/KeyUI';

import Container from './Container';

const KeyStep3 = () => {
  return (
    <Container>
      <p>
        Humm, aqui é sempre bom entender se faz sentido usar essa tecla, porque
        você já a usou e já falamos que ela não está na palavra secreta do dia.
        &#128553;
      </p>
      <KeyUI variant="incorrect" value="A" />
      <p>
        Mas dependendo da sua estratégia, pode fazer sentido repetir uma letra
        inválida rs
      </p>
    </Container>
  );
};

export default KeyStep3;

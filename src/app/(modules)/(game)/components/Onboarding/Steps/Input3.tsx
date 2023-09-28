import InputBoxUI from '@/shared/components/InputBoxUI';

import Container from './Container';

const InputStep3 = () => {
  return (
    <Container>
      <p>
        Assim que você realizar a sua tentativa, quadrados coloridos aparecerão
        (ou não) &#128064;!
      </p>
      <div>
        <InputBoxUI variant="incorrect" defaultValue="R" />
        <InputBoxUI variant="correct" defaultValue="E" />
        <InputBoxUI variant="incorrect" defaultValue="A" />
        <InputBoxUI variant="bad-position" defaultValue="C" />
        <InputBoxUI variant="incorrect" defaultValue="T" />
      </div>
      <p>Mas não se preocupe, vamos entender o que cada cor signifca!</p>
    </Container>
  );
};

export default InputStep3;

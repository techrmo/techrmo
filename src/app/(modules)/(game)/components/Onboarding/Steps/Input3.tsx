import InputBoxUI from '@/shared/components/ui/InputBox';

import Container from './Container';

const InputStep3 = () => {
  return (
    <Container>
      <p>
        Assim que você realizar a sua tentativa, quadrados coloridos aparecerão
        (ou não) &#128064;!
      </p>
      <div>
        <InputBoxUI variant="incorrect" defaultValue="A" />
        <InputBoxUI variant="correct" defaultValue="B" />
        <InputBoxUI variant="incorrect" defaultValue="C" />
        <InputBoxUI variant="bad-position" defaultValue="D" />
        <InputBoxUI variant="incorrect" defaultValue="E" />
      </div>
      <p>Mas não se preocupe, vamos entender o que cada cor signifca!</p>
    </Container>
  );
};

export default InputStep3;

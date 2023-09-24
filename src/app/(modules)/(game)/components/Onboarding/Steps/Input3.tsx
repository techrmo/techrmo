import InputBoxUI from '@/shared/components/ui/InputBoxUI';

import Container from './Container';

const InputStep3 = () => {
  return (
    <Container>
      <p>
        A cada tentativa você tem um retorno de o quão perto você está da
        palavra:
      </p>
      <div>
        <InputBoxUI variant="incorrect" defaultValue="R" />
        <InputBoxUI variant="correct" defaultValue="E" />
        <InputBoxUI variant="incorrect" defaultValue="A" />
        <InputBoxUI variant="bad-position" defaultValue="C" />
        <InputBoxUI variant="incorrect" defaultValue="T" />
      </div>
    </Container>
  );
};

export default InputStep3;

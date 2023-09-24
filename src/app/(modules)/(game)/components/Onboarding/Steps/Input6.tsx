import InputBoxUI from '@/shared/components/ui/InputBoxUI';

import Container from './Container';

const InputStep6 = () => {
  return (
    <Container>
      <InputBoxUI variant="incorrect" defaultValue="A" />
      <p>Quadrado escuro significa que a letra na existe na palavra</p>
    </Container>
  );
};

export default InputStep6;

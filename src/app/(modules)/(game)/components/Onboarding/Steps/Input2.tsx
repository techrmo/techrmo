import InputBoxUI from '@/shared/components/ui/InputBoxUI';

import Container from './Container';

const InputStep2 = () => {
  return (
    <Container>
      <p>
        Quadrados brancos significa que você pode digitar e realizar sua
        tentativa:
      </p>
      <InputBoxUI variant="active" defaultValue="O" />
    </Container>
  );
};

export default InputStep2;

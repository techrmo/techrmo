import type { InputBoxIndex, InputBoxVariant } from '../components/InputRow/InputBox';

interface UseVariantParams {
  isSubmitted: boolean;
  value: `${string}`;
  word: string;
  index: InputBoxIndex,
}

const useVariant = ({
  isSubmitted, value, word, index,
}: UseVariantParams): InputBoxVariant => {
  if (!isSubmitted) {
    return 'active';
  }

  if (word[index] === value) {
    return 'correct';
  }

  if (word.includes(value)) {
    return 'bad-position';
  }

  return 'incorrect';
};

export default useVariant;

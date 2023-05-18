import type { InputBoxIndex, InputBoxVariant } from '../components/InputRow/InputBox';

interface UseVariantParams {
  isSubmitSuccessful: boolean;
  value: `${string}`;
  word: string;
  index: InputBoxIndex,
  isActiveRow: boolean;
}

const useVariant = ({
  isSubmitSuccessful, value, word, index, isActiveRow,
}: UseVariantParams): InputBoxVariant => {
  if (!isActiveRow && !value) {
    return 'inactive';
  }

  if (!isSubmitSuccessful) {
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

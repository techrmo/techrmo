import { CheckStringHaveOneChar } from '@/shared/helpers/limitStringLength';
import type { InputBoxIndex, InputBoxVariant } from '../components/InputRow/InputBox';

interface UseVariantParams<T extends string> {
  isSubmitSuccessful: boolean;
  value: CheckStringHaveOneChar<T> | '';
  word: string;
  index: InputBoxIndex,
  isActiveRow: boolean;
}

const useVariant = <T extends string>({
  isSubmitSuccessful, value, word, index, isActiveRow,
}: UseVariantParams<T>): InputBoxVariant => {
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

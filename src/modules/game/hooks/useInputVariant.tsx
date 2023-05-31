import { useFormContext } from 'react-hook-form';
import { useInputStore } from '../stores/InputStore';
import { FormFields } from '../validators/input';
import { type InputBoxIndex } from '../components/Inputs/InputBox';
import { type InputRowIndex } from '../components/Inputs/InputGroup';

export type InputBoxVariant = 'inactive' | 'active' | 'incorrect' | 'correct' | 'bad-position'

interface UseInputVariantProps {
  index: InputBoxIndex;
  indexRow: InputRowIndex;
  isActiveRow: boolean;
}

const useInputVariant = ({ index, indexRow, isActiveRow }:
  UseInputVariantProps): InputBoxVariant => {
  const { getValues } = useFormContext<FormFields>();
  const resultOfAttempt = useInputStore((state) => state.resultsOfAttempts);
  const currentRow = resultOfAttempt.at(indexRow);
  const currentBox = currentRow?.at(index);

  if (currentBox) {
    return currentBox;
  }

  if (!isActiveRow && !getValues(`value.${index}`)) {
    return 'inactive';
  }

  return 'active';
};

export default useInputVariant;

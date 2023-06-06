import { type InputBoxIndex } from '../components/Inputs/InputBox';
import { type InputRowIndex } from '../components/Inputs/InputGroup';
import { useFormStore } from '../stores/Form';

export type InputBoxVariant = 'inactive' | 'active' | 'incorrect' | 'correct' | 'bad-position'

interface UseInputVariantProps {
  index: InputBoxIndex;
  indexRow: InputRowIndex;
  isActiveRow: boolean;
}

const useInputVariant = ({ index, indexRow, isActiveRow }:
  UseInputVariantProps): InputBoxVariant => {
  const resultOfAttempt = useFormStore((state) => state.resultsOfAttempts);
  const currentRow = resultOfAttempt.at(indexRow);
  const currentBox = currentRow?.at(index);

  if (currentBox) {
    return currentBox;
  }

  // @todo verificar se o input atual tbm é vazio
  if (!isActiveRow) {
    return 'inactive';
  }

  return 'active';
};

export default useInputVariant;

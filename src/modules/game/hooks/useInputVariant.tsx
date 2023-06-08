import { useFormStore } from '../stores/Form';
import { RowColumnIndex } from '../stores/Form/FormSlice';

export type InputBoxVariant = 'inactive' | 'active' | 'incorrect' | 'correct' | 'bad-position'

interface UseInputVariantProps {
  columnIndex: RowColumnIndex;
  rowIndex: RowColumnIndex;
  isActiveRow: boolean;
}

const useInputVariant = ({ columnIndex, rowIndex, isActiveRow }:
  UseInputVariantProps): InputBoxVariant => {
  const resultOfAttempt = useFormStore((state) => state.resultsOfAttempts);
  const currentRow = resultOfAttempt.at(rowIndex);
  const currentBox = currentRow?.at(columnIndex);

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

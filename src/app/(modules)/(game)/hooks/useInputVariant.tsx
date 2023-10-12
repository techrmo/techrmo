import useStore from '@/shared/hooks/useStore';

import { useFormStore } from '../stores/Form';
import { RowColumnIndex } from '../stores/Form/FormSlice';
import { useResultStore } from '../stores/ResultStore';

export type InputBoxVariant =
  | 'inactive'
  | 'active'
  | 'incorrect'
  | 'correct'
  | 'bad-position'
  | 'onboarding';

interface UseInputVariantProps {
  columnIndex: RowColumnIndex;
  rowIndex: RowColumnIndex;
  isActiveRow: boolean;
}

const useInputVariant = ({
  columnIndex,
  rowIndex,
  isActiveRow,
}: UseInputVariantProps): InputBoxVariant => {
  const resultOfAttempt = useStore(
    useFormStore,
    (store) => store.resultsOfAttempts
  );
  const status = useStore(useResultStore, (store) => store.status);
  const currentRow = resultOfAttempt?.at(rowIndex);
  const currentBox = currentRow?.at(columnIndex);

  if (currentBox) {
    return currentBox;
  }

  if (status === 'ONBOARDING' && rowIndex === 0) {
    return 'onboarding';
  }

  if (!isActiveRow) {
    return 'inactive';
  }

  return 'active';
};

export default useInputVariant;

import { useFormContext } from 'react-hook-form';

import useFocus from '@/modules/game/hooks/useFocus';
import useKeyEvents from '@/modules/game/hooks/useKeyEvents';
import useInputVariant from '@/modules/game/hooks/useInputVariant';
import styles from './styles.module.scss';
import { type InputRowIndex } from '../InputGroup';
import type { FormFields } from '@/modules/game/validators/input';

export type InputBoxIndex = 0 | 1 | 2 | 3 | 4;

interface InputBoxProps {
  index: InputBoxIndex;
  indexRow: InputRowIndex;
  isActiveRow: boolean;
}

const InputBox = ({
  index, isActiveRow, indexRow,
}: InputBoxProps) => {
  const inputName = `value.${index}` as const;

  const { register } = useFormContext<FormFields>();
  const { handleKeyDown, handleKeyUp } = useKeyEvents(inputName);
  const handleFocus = useFocus(index, isActiveRow);
  const variant = useInputVariant({ index, indexRow, isActiveRow });

  return (
    <input
      className={styles.container}
      type='text'
      autoComplete='off'
      disabled={variant !== 'active'}
      data-variant={variant}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      {...register(inputName)}
    />
  );
};

export default InputBox;

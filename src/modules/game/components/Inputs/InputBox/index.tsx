import { useFormContext } from 'react-hook-form';

import useFocus from '@/modules/game/hooks/useFocus';
import useKeyEvents from '@/modules/game/hooks/useKeyEvents';
import styles from './styles.module.scss';
import type { FormFields } from '@/modules/game/validators/input';

export type InputBoxVariant = 'inactive' | 'active' | 'incorrect' | 'correct' | 'bad-position'

export type InputBoxIndex = 0 | 1 | 2 | 3 | 4;

interface InputBoxProps {
  index: InputBoxIndex;
  isActiveRow: boolean;
  result: string | undefined;
}

const InputBox = ({ index, isActiveRow, result }: InputBoxProps) => {
  const {
    register, getValues, formState: { isSubmitSuccessful },
  } = useFormContext<FormFields>();
  const handleFocus = useFocus(index);
  const inputName = `value.${index}` as const;
  let variant = result;

  if (!isSubmitSuccessful) {
    variant = 'active';
  }

  if (!isActiveRow && !getValues(inputName)) {
    variant = 'inactive';
  }

  const { handleKeyDown, handleKeyUp } = useKeyEvents(inputName);

  return (
    <input
      className={styles.container}
      type='text'
      autoComplete='off'
      disabled={variant !== 'active'}
      onFocus={handleFocus}
      data-variant={variant}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      {...register(inputName)}
    />
  );
};

export default InputBox;

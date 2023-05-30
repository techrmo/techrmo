import { useFormContext } from 'react-hook-form';

import useFocus from '@/modules/game/hooks/useFocus';
import useVariant from '@/modules/game/hooks/useVariant';
import useKeyEvents from '@/modules/game/hooks/useKeyEvents';
import styles from './styles.module.scss';
import type { FormFields } from '@/modules/game/validators/input';

export type InputBoxVariant = 'inactive' | 'active' | 'incorrect' | 'correct' | 'bad-position'

export type InputBoxIndex = 0 | 1 | 2 | 3 | 4;

interface InputBoxProps {
  index: InputBoxIndex;
  word: string;
  isActiveRow: boolean;
}

const InputBox = ({ index, word, isActiveRow }: InputBoxProps) => {
  const inputName = `value.${index}` as const;

  const {
    register, getValues, formState: { isSubmitSuccessful },
  } = useFormContext<FormFields>();

  const handleFocus = useFocus(index);

  const variant = useVariant({
    isSubmitSuccessful,
    isActiveRow,
    index,
    value: getValues(inputName),
    word,
  });

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

import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"

import InputBox, { type InputBoxVariant } from './InputBox';

import { type FormFields, inputSchema } from '../../validators/input';

import styles from './styles.module.scss';

interface InputRowProps {
  word: string
}

// export const verifyIsValidIndex = (index: number): index is 0 | 1 | 2 | 3 | 4 => [0, 1, 2, 3, 4].includes(index)
// just in case you're an asshole and bla bla bla type narrowing bla bla bla, avoid assertions with 'as' bla bla bla

const InputRow = ({word}: InputRowProps) =>  {
   
  const [text, setText] = useState('')
  const [variant, setVariant] = useState<InputBoxVariant>('active')
 
  const numberOfInputs = 5  
  const methods = useForm<FormFields>({
    resolver: zodResolver(inputSchema),
  });

  const handleAttempt = ({value}: Pick<FormFields, 'value'>) => {
    const attempt = value.join('')
  
    const message = attempt === word ? 'Você acertou' : 'Você errou'
    setText(message)
    setVariant(attempt === word ?  'correct' : 'incorrect')
  }

  return (
    <FormProvider {...methods}>
    <form className={styles.container} onSubmit={methods.handleSubmit(handleAttempt)}>
      {Array.from({length: numberOfInputs}).map((_, index) => (
       <InputBox key={index} index={index as 0 | 1 | 2 | 3 | 4} variant={variant} />
      )    
      )}
      <div className={styles.attempt}>
      <button type="submit">Tentar</button>
      <span className={styles.title}>
        {text}
      </span>
      </div>
    </form>
    </FormProvider>
  )
}

export default InputRow;

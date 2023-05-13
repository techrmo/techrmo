import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { useRef } from 'react';
import styles from './styles.module.scss';
import RowInput from '../../components/InputRow';
import InputBox, { InputBoxVariant } from '../../components/InputRow/InputBox';

interface FormInput {
  inputs: { value: string }[]
}

const InputGroup = () => {
  const ref = useRef();
  const actualRow = 3;
  const numberOfInputsInRow = 25;
  const numberOfRows = 5;
  const inputsDefaultValues = Array
    .from({ length: numberOfInputsInRow })
    .map(() => ({ value: '' }));

  const hookformMethods = useForm<FormInput>({
    defaultValues: {
      inputs: inputsDefaultValues,
    },
  });

  const {
    fields,
  } = useFieldArray({
    control: hookformMethods.control,
    name: 'inputs',
  });

  const handleTry = (data: FormInput) => {
    console.log(data);
    console.log(data.inputs.slice(actualRow * 5, actualRow * 5 + 5).map((teste) => teste.value).join(''));
    // [1,2,3,4,5,6,7,8,9,10]
  };

  const inputsBox = (variant: InputBoxVariant) => fields
    .map((field, index) => (
      <InputBox
        handleTry={handleTry}
        key={field.id}
        index={index}
        variant={variant}
      />
    ));

  const rowGroup = () => {
    // const variant = index ? 'disabled' : 'active';
    const inputs = inputsBox('active');

    return Array
      .from({ length: numberOfRows })
      .map((_, index) => (
        <RowInput key={crypto.randomUUID()}>
          {inputs
            .slice(index * numberOfRows, numberOfRows * index + numberOfRows)}
        </RowInput>
      ));
  };

  return (
    <FormProvider {...hookformMethods}>
      <form
        ref={ref}
        onSubmit={hookformMethods.handleSubmit(handleTry)}
      >
        <div className={styles.container}>
          {rowGroup()}
        </div>
        {/* <button type='submit'>ok</button> */}
      </form>
    </FormProvider>
  );
};

export default InputGroup;

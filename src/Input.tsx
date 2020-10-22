import React, { forwardRef, Ref } from 'react';
import { useField, useFormikContext } from 'formik';
import {
  FormInput,
  Input as _Input,
  InputProps as _InputProps,
} from 'semantic-ui-react';
import { FieldHookConfig } from 'formik/dist/Field';
import { FieldErrorProps, FieldProps } from './types';
import { getErrorConfig } from './utils';

export type InputProps = FieldProps & _InputProps & FieldErrorProps;

const Input = (
  {
    name,
    validate,
    onChange,
    errorPrompt,
    errorConfig,
    ...restProps
  }: InputProps,
  ref: Ref<_Input>,
) => {
  const { handleBlur } = useFormikContext();
  const config: FieldHookConfig<InputProps> = {
    name: name,
    validate: validate,
  };
  const [field, meta] = useField(config);

  return (
    <FormInput
      ref={ref}
      name={name}
      value={field.value}
      onChange={(event, data) => {
        field.onChange(event);
        onChange && onChange(event, data);
      }}
      onBlur={handleBlur}
      error={getErrorConfig(meta, errorPrompt, errorConfig)}
      {...restProps}
    />
  );
};

export default forwardRef(Input);

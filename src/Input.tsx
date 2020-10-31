import React, { forwardRef, Ref } from 'react';
import { FieldProps as FormikFieldProps } from 'formik';
import {
  FormField,
  Input as _Input,
  InputOnChangeData,
  InputProps as _InputProps,
} from 'semantic-ui-react';
import { FieldErrorProps, FieldProps } from './types';
import { getErrorConfig } from './utils';
import Field from './Field';

export type InputProps = FieldProps & _InputProps & FieldErrorProps;

export const Input = (
  {
    name,
    validate,
    fast,
    onChange: _onChange,
    errorPrompt,
    errorConfig,
    ...restProps
  }: InputProps,
  ref: Ref<_Input>,
) => {
  return (
    <Field name={name} validate={validate} fast={fast}>
      {({ field: { value, onChange, onBlur }, meta }: FormikFieldProps) => (
        <FormField
          control={_Input}
          ref={ref}
          name={name}
          value={value}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            data: InputOnChangeData,
          ) => {
            onChange(event);
            _onChange && _onChange(event, data);
          }}
          onBlur={onBlur}
          error={getErrorConfig(meta, errorPrompt, errorConfig)}
          {...restProps}
        />
      )}
    </Field>
  );
};

export default forwardRef(Input);

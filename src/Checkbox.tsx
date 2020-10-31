import React from 'react';
import {
  Checkbox as _Checkbox,
  CheckboxProps as _CheckboxProps,
  FormField,
} from 'semantic-ui-react';
import { FieldProps as FormikFieldProps } from 'formik';
import { FieldErrorProps, FieldProps } from './types';
import { getErrorConfig } from './utils';
import Field from './Field';

export interface CheckboxProps
  extends FieldProps,
    _CheckboxProps,
    FieldErrorProps {
  name: string;
}

export const Checkbox = ({
  name,
  validate,
  fast,
  onChange: _onChange,
  errorPrompt,
  errorConfig,
  ...restProps
}: CheckboxProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value, onBlur },
      form: { setFieldValue, setFieldTouched },
      meta,
    }: FormikFieldProps) => (
      <FormField
        control={_Checkbox}
        name={name}
        checked={value}
        onChange={(
          event: React.FormEvent<HTMLInputElement>,
          data: _CheckboxProps,
        ) => {
          setFieldValue(name, data.checked);
          setFieldTouched(name, true, false);
          _onChange && _onChange(event, data);
        }}
        onBlur={onBlur}
        error={getErrorConfig(meta, errorPrompt, errorConfig)}
        {...restProps}
      />
    )}
  </Field>
);

export default Checkbox;

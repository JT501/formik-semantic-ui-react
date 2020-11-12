import React from 'react';
import { FieldErrorProps, FieldProps } from './types';
import {
  CheckboxProps,
  FormField,
  Radio as _Radio,
  RadioProps as _RadioProps,
} from 'semantic-ui-react';
import { FieldProps as FormikFieldProps } from 'formik';
import { getErrorConfig } from './utils';
import Field from './Field';

export type RadioProps = FieldProps & _RadioProps & FieldErrorProps;

export const Radio = ({
  name,
  validate,
  fast,
  value: _value,
  onChange: _onChange,
  errorPrompt,
  ...restProps
}: RadioProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value, onBlur },
      form: { setFieldValue, setFieldTouched },
      meta,
    }: FormikFieldProps) => (
      <FormField
        control={_Radio}
        name={name}
        checked={value === _value}
        value={_value}
        onChange={(
          event: React.FormEvent<HTMLInputElement>,
          data: CheckboxProps,
        ) => {
          setFieldValue(name, _value);
          setFieldTouched(name, true, false);
          _onChange && _onChange(event, data);
        }}
        onBlur={onBlur}
        error={getErrorConfig(meta, errorPrompt)}
        {...restProps}
      />
    )}
  </Field>
);

export default Radio;

import React from 'react';
import { FieldErrorProps, FieldProps } from './types';
import {
  DropdownProps,
  FormField,
  Select as _Select,
  SelectProps as _SelectProps,
} from 'semantic-ui-react';
import { FieldProps as FormikFieldProps } from 'formik';
import { getErrorConfig } from './utils';
import Field from './Field';

export type SelectProps = FieldProps & _SelectProps & FieldErrorProps;

export const Select = ({
  name,
  value: _value,
  options,
  validate,
  fast,
  onChange: _onChange,
  onBlur,
  errorPrompt,
  errorConfig,
  ...restProps
}: SelectProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
      meta,
    }: FormikFieldProps) => (
      <FormField
        control={_Select}
        name={name}
        options={options}
        value={value}
        onChange={(
          event: React.SyntheticEvent<HTMLElement, Event>,
          data: DropdownProps,
        ) => {
          setFieldValue(name, data.value);
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

export default Select;

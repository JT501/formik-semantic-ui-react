import React from 'react';
import { FieldErrorProps, FieldProps } from './types';
import { FormSelect, SelectProps as _SelectProps } from 'semantic-ui-react';
import { useField, useFormikContext } from 'formik';
import { FieldHookConfig } from 'formik/dist/Field';
import { InputProps } from './Input';
import { getErrorConfig } from './utils';

export type SelectProps = FieldProps & _SelectProps & FieldErrorProps;

const Select = ({
  name,
  value,
  options,
  validate,
  onChange,
  onBlur,
  errorPrompt,
  errorConfig,
  ...restProps
}: SelectProps) => {
  const config: FieldHookConfig<InputProps> = {
    name: name,
    validate: validate,
  };
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(config);
  const fieldValue = (field.value as unknown) as
    | boolean
    | number
    | string
    | (boolean | number | string)[];

  return (
    <FormSelect
      name={name}
      options={options}
      value={fieldValue}
      onChange={(event, data) => {
        setFieldValue(name, data.value);
        setFieldTouched(name, true, false);
        onChange && onChange(event, data);
      }}
      onBlur={onBlur}
      error={getErrorConfig(meta, errorPrompt, errorConfig)}
      {...restProps}
    />
  );
};

export default Select;

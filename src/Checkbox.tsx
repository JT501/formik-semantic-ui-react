import React from 'react';
import {
  CheckboxProps as _CheckboxProps,
  FormCheckbox,
} from 'semantic-ui-react';
import { FieldHookConfig, useField, useFormikContext } from 'formik';
import { FieldErrorProps, FieldProps } from './types';
import { getErrorConfig } from './utils';

export interface CheckboxProps
  extends FieldProps,
    _CheckboxProps,
    FieldErrorProps {
  name: string;
}

const Checkbox = ({
  name,
  validate,
  onChange,
  errorPrompt,
  errorConfig,
  ...restProps
}: CheckboxProps) => {
  const config: FieldHookConfig<CheckboxProps> = {
    name: name,
    validate: validate,
  };
  const { setFieldValue, setFieldTouched, handleBlur } = useFormikContext();
  const [field, meta] = useField(config);

  return (
    <FormCheckbox
      name={name}
      checked={(field.value as unknown) as boolean}
      onChange={(event, data) => {
        setFieldValue(name, data.checked);
        setFieldTouched(name, true, false);
        onChange && onChange(event, data);
      }}
      onBlur={handleBlur}
      error={getErrorConfig(meta, errorPrompt, errorConfig)}
      {...restProps}
    />
  );
};

export default Checkbox;

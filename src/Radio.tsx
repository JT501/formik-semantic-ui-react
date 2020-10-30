import React from 'react';
import { FieldErrorProps, FieldProps } from './types';
import { FormRadio, RadioProps as _RadioProps } from 'semantic-ui-react';
import { FieldHookConfig, useField, useFormikContext } from 'formik';
import { getErrorConfig } from './utils';

export type RadioProps = FieldProps & _RadioProps & FieldErrorProps;

const Radio = ({
  name,
  validate,
  value,
  onChange,
  errorPrompt,
  errorConfig,
  ...restProps
}: RadioProps) => {
  const config: FieldHookConfig<RadioProps> = {
    name: name,
    validate: validate,
  };
  const { setFieldValue, setFieldTouched, handleBlur } = useFormikContext();
  const [field, meta] = useField(config);
  const fieldValue = (field.value as unknown) as string | number;

  return (
    <FormRadio
      name={name}
      checked={fieldValue === value}
      value={value}
      onChange={(event, data) => {
        setFieldValue(name, value);
        setFieldTouched(name, true, false);
        onChange && onChange(event, data);
      }}
      onBlur={handleBlur}
      error={getErrorConfig(meta, errorPrompt, errorConfig)}
      {...restProps}
    />
  );
};

export default Radio;

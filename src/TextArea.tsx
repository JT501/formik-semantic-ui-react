import React, { forwardRef, Ref } from 'react';
import {
  FormTextArea,
  TextArea as _TextArea,
  TextAreaProps as _TextAreaProps,
} from 'semantic-ui-react';
import { useField, useFormikContext } from 'formik';
import { FieldHookConfig } from 'formik/dist/Field';
import { FieldErrorProps, FieldProps } from './types';
import { getErrorConfig } from './utils';

export type TextAreaProps = FieldProps & _TextAreaProps & FieldErrorProps;

const TextArea = (
  {
    name,
    validate,
    onChange,
    errorPrompt,
    errorConfig,
    ...restProps
  }: TextAreaProps,
  ref,
) => {
  const { handleBlur } = useFormikContext();
  const config: FieldHookConfig<TextAreaProps> = {
    name: name,
    validate: validate,
  };
  const [field, meta] = useField<TextAreaProps>(config);

  return (
    <FormTextArea
      ref={ref}
      name={name}
      value={(field.value as unknown) as string | number}
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

export default forwardRef(TextArea);

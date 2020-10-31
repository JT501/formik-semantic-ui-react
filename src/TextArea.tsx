import React, { forwardRef, Ref } from 'react';
import {
  FormField,
  TextArea as _TextArea,
  TextAreaProps as _TextAreaProps,
} from 'semantic-ui-react';
import { FieldErrorProps, FieldProps } from './types';
import { getErrorConfig } from './utils';
import Field from './Field';
import { FieldProps as FormikFieldProps } from 'formik';

export type TextAreaProps = FieldProps & _TextAreaProps & FieldErrorProps;

const TextArea = (
  {
    name,
    validate,
    fast,
    onChange: _onChange,
    errorPrompt,
    errorConfig,
    ...restProps
  }: TextAreaProps,
  ref: Ref<_TextArea>,
) => (
  <Field name={name} validate={validate} fast={fast}>
    {({ field: { value, onChange, onBlur }, meta }: FormikFieldProps) => (
      <FormField
        control={_TextArea}
        ref={ref}
        name={name}
        value={value}
        onChange={(
          event: React.ChangeEvent<HTMLTextAreaElement>,
          data: _TextAreaProps,
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

export default forwardRef(TextArea);

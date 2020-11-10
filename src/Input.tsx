import React, { forwardRef, Ref } from 'react';
import { FieldMetaProps, FieldProps as FormikFieldProps } from 'formik';
import {
  FormField,
  Input as _Input,
  InputOnChangeData,
  InputProps as _InputProps,
  Label,
} from 'semantic-ui-react';
import { FieldErrorProps, FieldProps } from './types';
import Field from './Field';

export interface InputProps extends FieldProps, _InputProps, FieldErrorProps {
  inputLabel?: string;
}

export const Input = (
  {
    name,
    validate,
    fast,
    onChange: _onChange,
    errorPrompt,
    errorConfig,
    label,
    inputLabel,
    ...restProps
  }: InputProps,
  ref: Ref<_Input>,
) => {
  const errorLabel = (error: string | undefined) => (
    <Label
      prompt={errorConfig?.prompt ?? true}
      basic={errorConfig?.basic}
      pointing={errorConfig?.pointing ?? true}
      color={errorConfig?.color}
      content={error}
    />
  );

  const errorLabelBefore = (meta: FieldMetaProps<_Input>) =>
    errorPrompt &&
    meta.touched &&
    meta.error &&
    (errorConfig?.pointing === 'below' || errorConfig?.pointing === 'right') &&
    errorLabel(meta.error);

  const errorLabelAfter = (meta: FieldMetaProps<_Input>) =>
    errorPrompt &&
    meta.touched &&
    meta.error &&
    (errorConfig?.pointing === 'above' ||
      errorConfig?.pointing === 'left' ||
      !errorConfig?.pointing) &&
    errorLabel(meta.error);

  return (
    <Field name={name} validate={validate} fast={fast}>
      {({ field: { value, onChange, onBlur }, meta }: FormikFieldProps) => (
        <FormField
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
          error={meta.touched && meta.error}
        >
          {label && <Label>{label}</Label>}
          {errorLabelBefore(meta)}
          <_Input
            name={name}
            label={inputLabel}
            {...restProps}
            defaultValue={value}
          />
          {errorLabelAfter(meta)}
        </FormField>
      )}
    </Field>
  );
};

export default forwardRef(Input);

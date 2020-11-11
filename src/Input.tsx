import React, { forwardRef, Ref } from 'react';
import {
  FieldMetaProps,
  FieldProps as FormikFieldProps,
  isObject,
  isString,
} from 'formik';
import {
  FormField,
  Input as _Input,
  InputOnChangeData,
  InputProps as _InputProps,
  Label,
  LabelProps,
  SemanticShorthandItem,
} from 'semantic-ui-react';
import { FieldErrorProps, FieldProps } from './types';
import Field from './Field';
import { RESET_BUTTON_ID } from './ResetButton';
import { SUBMIT_BUTTON_ID } from './SubmitButton';

export interface InputProps extends FieldProps, _InputProps, FieldErrorProps {
  inputLabel?: SemanticShorthandItem<LabelProps>;
}

export const Input = (
  {
    id,
    name,
    validate,
    fast,
    onChange: _onChange,
    onBlur: _onBlur,
    errorPrompt,
    errorConfig,
    label,
    inputLabel,
    ...restProps
  }: InputProps,
  ref: Ref<_Input>,
) => {
  const fieldLabelId = (id && label && `${id}-field-label`) || undefined;
  const inputLabelId = (id && inputLabel && `${id}-input-label`) || undefined;

  const fieldLabel = label && (
    <label id={fieldLabelId} htmlFor={id}>
      {label}
    </label>
  );

  const errorLabel = (error: string | undefined) => (
    <Label
      id={id ? `${id}-error-message` : undefined}
      role="alert"
      aria-atomic
      content={error}
      prompt={errorConfig?.prompt ?? true}
      basic={errorConfig?.basic}
      pointing={errorConfig?.pointing ?? true}
      color={errorConfig?.color}
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
        <FormField error={meta.touched && !!meta.error}>
          {fieldLabel}
          {errorLabelBefore(meta)}
          <_Input
            id={id}
            ref={ref}
            name={name}
            value={value}
            label={
              (isString(inputLabel) && {
                children: inputLabel,
                htmlFor: id,
                id: inputLabelId,
              }) ||
              (isObject(inputLabel) && {
                ...(inputLabel as object),
                htmlFor: id,
                id: inputLabelId,
              })
            }
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              data: InputOnChangeData,
            ) => {
              onChange(event);
              _onChange && _onChange(event, data);
            }}
            onBlur={(event: FocusEvent) => {
              if (event.relatedTarget instanceof Element) {
                /*
                  Skip validation onBlur when reset / submit button is clicked or
                  It will block reset / submit button onClick event
                */
                if (
                  event.relatedTarget.id === RESET_BUTTON_ID ||
                  event.relatedTarget.id === SUBMIT_BUTTON_ID
                ) {
                  return;
                }
              }
              onBlur(event);
            }}
            aria-describedby={id && !!meta.error ? `${id}-error-message` : null}
            aria-invalid={!!meta.error ? true : undefined}
            aria-labelledby={`${fieldLabelId ?? ''} ${inputLabelId ?? ''}`}
            {...restProps}
          />
          {errorLabelAfter(meta)}
        </FormField>
      )}
    </Field>
  );
};

export default forwardRef(Input);

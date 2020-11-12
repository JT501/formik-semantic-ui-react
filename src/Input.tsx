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
import { getErrorConfig } from './utils';

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

  const errorLabel = (meta: FieldMetaProps<any>) => {
    const errorConfig = getErrorConfig(meta, errorPrompt);

    return (
      <Label
        id={id ? `${id}-error-message` : undefined}
        {...errorConfig}
        role="alert"
        aria-atomic
      />
    );
  };

  const errorLabelBefore = (meta: FieldMetaProps<_Input>) =>
    (getErrorConfig(meta, errorPrompt)?.pointing === 'below' ||
      getErrorConfig(meta, errorPrompt)?.pointing === 'right') &&
    errorLabel(meta);

  const errorLabelAfter = (meta: FieldMetaProps<_Input>) =>
    (getErrorConfig(meta, errorPrompt)?.pointing === 'above' ||
      getErrorConfig(meta, errorPrompt)?.pointing === 'left') &&
    errorLabel(meta);

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

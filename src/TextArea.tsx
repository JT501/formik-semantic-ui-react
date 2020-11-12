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
import { RESET_BUTTON_ID } from './ResetButton';
import { SUBMIT_BUTTON_ID } from './SubmitButton';

export type TextAreaProps = FieldProps & _TextAreaProps & FieldErrorProps;

export const TextArea = (
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
        error={getErrorConfig(meta, errorPrompt)}
        {...restProps}
      />
    )}
  </Field>
);

export default forwardRef(TextArea);

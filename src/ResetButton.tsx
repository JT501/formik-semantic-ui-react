import React from 'react';
import { ButtonProps, FormButton } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

export const RESET_BUTTON_ID = 'formik-semantic-ui-react-reset-button';

export const ResetButton = ({ onClick, ...restProps }: ButtonProps) => {
  const formContext = useFormikContext();
  return (
    <FormButton
      id={RESET_BUTTON_ID}
      type="button"
      onClick={(event, data) => {
        formContext.resetForm();
        onClick && onClick(event, data);
      }}
      {...restProps}
    />
  );
};

export default ResetButton;

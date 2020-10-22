import React from 'react';
import { ButtonProps, FormButton } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

const ResetButton = (props: ButtonProps) => {
  const formContext = useFormikContext();
  return (
    <FormButton {...props} type="button" onClick={formContext.handleReset} />
  );
};

export default ResetButton;

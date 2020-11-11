import React from 'react';
import { ButtonProps, FormButton } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

interface Props {
  disableLoading?: boolean;
}

export const SUBMIT_BUTTON_ID = 'formik-semantic-ui-react-submit-button';

export const SubmitButton = ({
  disableLoading,
  loading,
  ...restProps
}: ButtonProps & Props) => {
  const context = useFormikContext();
  return (
    <FormButton
      id={SUBMIT_BUTTON_ID}
      type="submit"
      loading={
        disableLoading
          ? undefined
          : loading === null || loading === undefined
          ? context.isSubmitting
          : loading
      }
      {...restProps}
    />
  );
};

export default SubmitButton;

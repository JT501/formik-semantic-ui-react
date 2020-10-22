import React from 'react';
import { ButtonProps, FormButton } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

interface Props {
  disableLoading?: boolean;
}

const SubmitButton = ({
  disableLoading,
  loading,
  ...restProps
}: ButtonProps & Props) => {
  const context = useFormikContext();
  return (
    <FormButton
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

import React from 'react';
import { ButtonProps, FormButton } from 'semantic-ui-react';
import { useFormikContext } from 'formik';
import { isNil } from 'lodash';

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
          : isNil(loading)
          ? context.isSubmitting
          : loading
      }
      {...restProps}
    />
  );
};

export default SubmitButton;

import React from 'react';
import { Form as SemanticForm, FormProps } from 'semantic-ui-react';
import { useFormikContext } from 'formik';

export const Form = (props: FormProps) => {
  const { handleSubmit } = useFormikContext();
  return <SemanticForm onSubmit={handleSubmit} error={true} {...props} />;
};

export default Form;

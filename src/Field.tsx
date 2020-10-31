import React from 'react';
import { FieldProps } from './types';
import { FastField, Field as FormikField } from 'formik';

const Field: React.FC<FieldProps> = ({ fast, children, ...restProps }) => {
  if (fast) {
    return (
      <FastField data-testid="fast-field" {...restProps}>
        {children}
      </FastField>
    );
  } else {
    return (
      <FormikField data-testid="field" {...restProps}>
        {children}
      </FormikField>
    );
  }
};

export default Field;

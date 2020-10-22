/* Source: https://github.com/jannikbuschke/formik-antd/blob/master/src/formik-debug/index.tsx*/

import React from 'react';
import { Field } from 'formik';

export const isDevelopmentMode = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const FormikDebug = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) =>
  isDevelopmentMode() ? (
    <pre style={{ padding: 15, ...props }}>
      <Field>{({ form }: any) => JSON.stringify(form, null, 2)}</Field>
    </pre>
  ) : null;

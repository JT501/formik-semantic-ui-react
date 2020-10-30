import { Formik } from 'formik';
import { Form, FormikDebug } from '../src';
import React from 'react';
import { render } from '@testing-library/react';

const Container = () => {
  return (
    <Formik initialValues={{ field: 'test' }} onSubmit={() => {}}>
      <Form>
        <FormikDebug />
      </Form>
    </Formik>
  );
};

describe('Formik Debug', () => {
  it('should render FormikDebug component', function () {
    const { getByTestId } = render(<Container />);
    expect(getByTestId('debug')).toBeInTheDocument();
  });
});

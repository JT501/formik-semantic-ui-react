import React from 'react';
import { Formik } from 'formik';
import { Form } from '../src';
import { render } from '@testing-library/react';

const Container = () => {
  return (
    <Formik initialValues={{ field: 'test' }} onSubmit={() => {}}>
      <Form data-testid={'form'} />
    </Formik>
  );
};

describe('Form', () => {
  it('should render Form component', function () {
    const { getByTestId } = render(<Container />);
    expect(getByTestId('form')).toBeInTheDocument();
  });
});

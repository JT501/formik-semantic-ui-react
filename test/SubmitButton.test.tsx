import { Formik } from 'formik';
import { Form, SubmitButton } from '../src';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  onSubmit?: any;
}

const Container = ({ onSubmit }: Props) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={{}}>
      <Form>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Formik>
  );
};

describe('Submit Button', () => {
  it('should render SubmitButton component', function () {
    const { getByRole } = render(<Container />);
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should call onSubmit when click', async function () {
    const onSubmit = jest.fn();
    const { getByRole } = render(<Container onSubmit={onSubmit} />);
    userEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
  });
});

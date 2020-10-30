import { Formik } from 'formik';
import { Form, ResetButton } from '../src';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  onReset?: any;
}

const Container = ({ onReset }: Props) => {
  return (
    <Formik onReset={onReset} onSubmit={() => {}} initialValues={{}}>
      <Form>
        <ResetButton>Reset</ResetButton>
      </Form>
    </Formik>
  );
};

describe('Reset Button', () => {
  it('should render ResetButton component', function () {
    const { getByRole } = render(<Container />);
    expect(getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('should call onReset when click', async function () {
    const onReset = jest.fn();
    const { getByRole } = render(<Container onReset={onReset} />);
    userEvent.click(getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(onReset).toBeCalledTimes(1));
  });
});

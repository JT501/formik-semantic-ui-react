import { Formik } from 'formik';
import React from 'react';
import { Form, Input } from '../src';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  label?: string;
  value: string;
  validate?: any;
}

const Container = ({ label, value, validate }: Props) => {
  return (
    <Formik initialValues={{ field: value }} onSubmit={() => {}}>
      <Form>
        <Input
          data-testid="input"
          name="field"
          label={label}
          validate={validate}
        />
      </Form>
    </Formik>
  );
};

describe('Input', () => {
  it('should render Input component', async function () {
    const { getByTestId, getByText, getByRole } = render(
      <Container label="Testing" value="value" />,
    );
    expect(getByTestId('input')).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveValue('value');
    expect(getByText('Testing')).toBeInTheDocument();
  });

  it('should change value', async function () {
    const { getByRole } = render(<Container value="" />);
    expect(getByRole('textbox')).toHaveValue('');
    await userEvent.type(getByRole('textbox'), 'new value');
    await waitFor(() => expect(getByRole('textbox')).toHaveValue('new value'));
  });

  it('should validate per character typed', async function () {
    const validate = jest.fn();
    const { getByRole } = render(<Container value={''} validate={validate} />);
    await userEvent.type(getByRole('textbox'), 'new value');
    await waitFor(() => expect(validate).toBeCalledTimes('new value'.length));
  });
});

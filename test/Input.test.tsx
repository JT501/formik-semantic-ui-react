import { Formik } from 'formik';
import React from 'react';
import { Form, Input } from '../src';
import { render } from '@testing-library/react';
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

  it('should change value', function () {
    const { getByRole } = render(<Container value="" />);
    expect(getByRole('textbox')).toHaveValue('');
    userEvent.type(getByRole('textbox'), 'new value');
    expect(getByRole('textbox')).toHaveValue('new value');
  });

  it('should validate per character typed', function () {
    const validate = jest.fn();
    const { getByRole } = render(<Container value={''} validate={validate} />);
    userEvent.type(getByRole('textbox'), 'new value');
    expect(validate).toBeCalledTimes('new value'.length);
  });
});

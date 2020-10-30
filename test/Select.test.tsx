import { Formik } from 'formik';
import { Form, Select } from '../src';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  value: string;
  validate?: any;
  label?: string;
}

const Container = ({ value, validate, label }: Props) => {
  const options = [
    { key: 'a', value: 'a', text: 'a' },
    { key: 'b', value: 'b', text: 'b' },
    { key: 'c', value: 'c', text: 'c' },
  ];
  return (
    <Formik initialValues={{ field: value }} onSubmit={() => {}}>
      <Form>
        <Select
          name="field"
          options={options}
          validate={validate}
          label={label}
        />
      </Form>
    </Formik>
  );
};

describe('Select', () => {
  it('should render Select component', function () {
    const { getByRole } = render(<Container value="" />);
    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getByRole('option', { name: 'a' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'b' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'c' })).toBeInTheDocument();
  });

  it('should display initial option text', function () {
    const { getByRole } = render(<Container value="a" />);
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveTextContent('a');
  });

  it('should change value', function () {
    const { getByRole, queryByRole } = render(<Container value="" />);
    expect(queryByRole('alert')).toBeNull();
    userEvent.selectOptions(
      getByRole('listbox'),
      getByRole('option', { name: 'c' }),
    );
    expect(getByRole('alert')).toHaveTextContent('c');
    userEvent.selectOptions(
      getByRole('listbox'),
      getByRole('option', { name: 'a' }),
    );
    expect(getByRole('alert')).toHaveTextContent('a');
  });

  it('should validate once per select', async function () {
    const validate = jest.fn();
    const { getByRole } = render(<Container value="" validate={validate} />);
    userEvent.selectOptions(
      getByRole('listbox'),
      getByRole('option', { name: 'c' }),
    );
    await waitFor(() => expect(validate).toBeCalledTimes(1));
  });
});

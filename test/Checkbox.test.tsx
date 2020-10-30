import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox, Form } from '../src';
import { Formik } from 'formik';
import userEvent from '@testing-library/user-event';

interface Props {
  checked: boolean;
  validate?: any;
  label?: string;
}

const Container = ({ checked, validate, label }: Props) => {
  return (
    <Formik initialValues={{ field: checked }} onSubmit={() => {}}>
      <Form>
        <Checkbox name="field" label={label} validate={validate} />
      </Form>
    </Formik>
  );
};

describe('Checkbox', () => {
  it('should render Checkbox component', function () {
    const { getByRole, getByText } = render(
      <Container checked={false} label="Testing" />,
    );
    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(getByText('Testing')).toBeInTheDocument();
  });

  it('should be checked', function () {
    const { getByRole } = render(<Container checked={false} />);
    userEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox')).toBeChecked();
  });

  it('should be unchecked', function () {
    const { getByRole } = render(<Container checked={true} />);
    userEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('should validate once per click', function () {
    const validate = jest.fn();
    const { getByRole } = render(
      <Container checked={false} validate={validate} />,
    );
    userEvent.click(getByRole('checkbox'));
    expect(validate).toBeCalledTimes(1);
  });
});

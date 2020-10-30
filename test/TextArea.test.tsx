import { Formik } from 'formik';
import { Form, TextArea } from '../src';
import React from 'react';
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
        <TextArea
          data-testid="textarea"
          name="field"
          label={label}
          validate={validate}
        />
      </Form>
    </Formik>
  );
};

describe('Text Area', () => {
  it('should render TextArea component', function () {
    const { getByTestId, getByText } = render(
      <Container label="Text Area" value="value" />,
    );
    expect(getByTestId('textarea')).toBeInTheDocument();
    expect(getByText('Text Area')).toBeInTheDocument();
  });

  it('should change value', function () {
    const { getByTestId } = render(<Container value="" />);
    expect(getByTestId('textarea')).toHaveValue('');
    userEvent.type(getByTestId('textarea'), 'new value{enter}value');
    expect(getByTestId('textarea')).toHaveValue('new value\nvalue');
  });

  it('should validate per character typed', function () {
    const validate = jest.fn();
    const { getByTestId } = render(<Container value="" validate={validate} />);
    userEvent.type(getByTestId('textarea'), 'new value');
    expect(validate).toBeCalledTimes('new value'.length);
  });
});

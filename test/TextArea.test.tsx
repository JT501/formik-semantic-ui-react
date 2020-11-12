import { Formik } from 'formik';
import { Form, ResetButton, SubmitButton, TextArea } from '../src';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

interface Props {
  label?: string;
  value: string;
  validate?: any;
  validationSchema?: any;
  errorPrompt?: any;
}

const Container = ({
  label,
  value,
  validate,
  validationSchema,
  errorPrompt,
}: Props) => {
  return (
    <Formik
      initialValues={{ field: value }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <Form>
        <TextArea
          id="textarea-test"
          data-testid="textarea"
          name="field"
          label={label}
          validate={validate}
          errorPrompt={errorPrompt}
        />
        <SubmitButton content="Submit" />
        <ResetButton content="Reset" />
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

  it('should change value', async function () {
    const { getByTestId } = render(<Container value="" />);
    expect(getByTestId('textarea')).toHaveValue('');
    await userEvent.type(getByTestId('textarea'), 'new value{enter}value');
    await waitFor(() =>
      expect(getByTestId('textarea')).toHaveValue('new value\nvalue'),
    );
  });

  it('should validate per character typed', async function () {
    const validate = jest.fn();
    const { getByTestId } = render(<Container value="" validate={validate} />);
    await userEvent.type(getByTestId('textarea'), 'new value');
    await waitFor(() => expect(validate).toBeCalledTimes('new value'.length));
  });

  it('should reset value after reset button is clicked', async function () {
    const { getByRole, getByTestId } = render(<Container value={''} />);
    expect(getByTestId('textarea')).toHaveValue('');
    await userEvent.type(getByTestId('textarea'), 'new value');
    await waitFor(() =>
      expect(getByTestId('textarea')).toHaveValue('new value'),
    );
    await userEvent.click(getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(getByTestId('textarea')).toHaveValue(''));
  });

  it('should show error prompt if input is invalid', async function () {
    const validationSchema = Yup.object({
      field: Yup.string().required('Required'),
    });
    const { getByRole } = render(
      <Container
        value={''}
        validationSchema={validationSchema}
        errorPrompt={{ pointing: 'above' }}
      />,
    );
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    await userEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent('Required'),
    );
  });
});

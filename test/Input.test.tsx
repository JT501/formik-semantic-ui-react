import { Formik } from 'formik';
import React from 'react';
import { Form, Input, ResetButton, SubmitButton } from '../src';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabelProps, SemanticShorthandItem } from 'semantic-ui-react';
import * as Yup from 'yup';

interface Props {
  label?: string;
  inputLabel?: SemanticShorthandItem<LabelProps>;
  value: string;
  validate?: any;
  validationSchema?: any;
}

const Container = ({
  label,
  inputLabel,
  value,
  validate,
  validationSchema,
}: Props) => {
  return (
    <Formik
      initialValues={{ field: value }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <Form>
        <Input
          id="input-test"
          data-testid="input"
          name="field"
          label={label}
          inputLabel={inputLabel}
          validate={validate}
          errorPrompt
        />
        <SubmitButton content="Submit" />
        <ResetButton content="Reset" />
      </Form>
    </Formik>
  );
};

describe('Input', () => {
  it('should render Input component', async function () {
    const { getByTestId, getByText, getByRole, getByLabelText } = render(
      <Container label="Testing" value="value" />,
    );
    expect(getByTestId('input')).toBeInTheDocument();
    // Get input element by label text
    expect(getByLabelText('Testing')).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveValue('value');
    expect(getByText('Testing')).toBeInTheDocument();
  });

  it('should render Input label', function () {
    const { getByLabelText, getByText } = render(
      <Container inputLabel={'Testing'} value={''} />,
    );
    expect(getByText('Testing')).toBeInTheDocument();
    // Get input element by label text
    expect(getByLabelText('Testing')).toBeInTheDocument();
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

  it('should reset value after reset button is clicked', async function () {
    const { getByRole } = render(<Container value={''} />);
    expect(getByRole('textbox')).toHaveValue('');
    await userEvent.type(getByRole('textbox'), 'new value');
    await waitFor(() => expect(getByRole('textbox')).toHaveValue('new value'));
    await userEvent.click(getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(getByRole('textbox')).toHaveValue(''));
  });

  it('should show error prompt if input is invalid', async function () {
    const validationSchema = Yup.object({
      field: Yup.string().required('Required'),
    });
    const { getByRole } = render(
      <Container value={''} validationSchema={validationSchema} />,
    );
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    await userEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent('Required'),
    );
  });
});

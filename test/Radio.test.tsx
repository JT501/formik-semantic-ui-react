import { Formik } from 'formik';
import { Form, Radio } from '../src';
import React from 'react';
import { FormGroup } from 'semantic-ui-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  value: string;
  validate?: any;
}

const Container = ({ value, validate }: Props) => {
  return (
    <Formik initialValues={{ field: value }} onSubmit={() => {}}>
      <Form>
        <FormGroup inline>
          <Radio name="field" label="A" value="A" validate={validate} />
          <Radio name="field" label="B" value="B" validate={validate} />
          <Radio name="field" label="C" value="C" validate={validate} />
        </FormGroup>
      </Form>
    </Formik>
  );
};

describe('Radio', () => {
  it('should render Radio components', function () {
    const { getAllByRole } = render(<Container value={'A'} />);
    expect(getAllByRole('radio')).toHaveLength(3);
  });

  it('should check initial value', function () {
    const { getByDisplayValue } = render(<Container value={'A'} />);
    expect(getByDisplayValue('A')).toBeChecked();
    expect(getByDisplayValue('B')).not.toBeChecked();
    expect(getByDisplayValue('C')).not.toBeChecked();
  });

  it('should change value', function () {
    const { getByDisplayValue } = render(<Container value={'A'} />);
    expect(getByDisplayValue('A')).toBeChecked();
    expect(getByDisplayValue('B')).not.toBeChecked();
    expect(getByDisplayValue('C')).not.toBeChecked();
    userEvent.click(getByDisplayValue('C'));
    expect(getByDisplayValue('A')).not.toBeChecked();
    expect(getByDisplayValue('B')).not.toBeChecked();
    expect(getByDisplayValue('C')).toBeChecked();
  });

  it('should validate once per click', async function () {
    const validate = jest.fn();
    const { getByDisplayValue } = render(
      <Container value={'A'} validate={validate} />,
    );
    userEvent.click(getByDisplayValue('B'));
    await waitFor(() => expect(validate).toBeCalledTimes(1));
  });
});

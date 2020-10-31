import React from 'react';
import Field from '../src/Field';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import { Form } from '../src';

interface Props {
  fast: boolean;
}

const Container = ({ fast }: Props) => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <Field name="field" fast={fast} />
      </Form>
    </Formik>
  );
};

describe('Field', () => {
  it('should render FastField', function () {
    const { getByTestId, queryByTestId } = render(<Container fast={true} />);
    expect(getByTestId('fast-field')).toBeInTheDocument();
    expect(queryByTestId('field')).toBeNull();
  });

  it('should render normal Field', function () {
    const { getByTestId, queryByTestId } = render(<Container fast={false} />);
    expect(getByTestId('field')).toBeInTheDocument();
    expect(queryByTestId('fast-field')).toBeNull();
  });
});

import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik } from 'formik';
import { Form, FormikDebug, Input, SubmitButton } from '../src';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import * as Yup from 'yup';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 500px;
`;

const App = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
  });

  return (
    <Div>
      <Wrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => setSubmitting(false), 1000);
          }}
        >
          <Form size="large">
            <Input
              name="email"
              icon="at"
              iconPosition="left"
              placeholder="Email"
              focus
              fluid
              errorPrompt
            />
            <Input
              name="password"
              icon="key"
              iconPosition="left"
              type="password"
              placeholder="Password"
              autoComplete="on"
              focus
              fluid
              errorPrompt
            />
            <SubmitButton primary fluid>
              Login
            </SubmitButton>
            <FormikDebug />
          </Form>
        </Formik>
      </Wrapper>
    </Div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

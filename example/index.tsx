import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik } from 'formik';
import { Checkbox, Form, Input, ResetButton, SubmitButton } from '../src';
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
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
    remember: Yup.boolean().required('Required').oneOf([true], 'Required'),
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
          onReset={() => console.log('YO')}
        >
          <Form size="large">
            <Input
              id="input-email"
              inputLabel={{ color: 'orange', children: 'email' }}
              name="email"
              placeholder="Email"
              fluid
              errorPrompt
            />
            <Input
              id="input-password"
              inputLabel={{ color: 'violet', content: 'password' }}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
              fluid
              errorPrompt
            />
            <Checkbox
              id="checkbox-remember"
              name="remember"
              label="Remember ?"
              errorPrompt={{ pointing: 'left' }}
            />
            <SubmitButton primary fluid content="Login" />
            <ResetButton secondary fluid content="Reset" />
            {/*<FormikDebug />*/}
          </Form>
        </Formik>
      </Wrapper>
    </Div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

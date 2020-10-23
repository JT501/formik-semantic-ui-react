![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jt501/formik-semantic-ui-react/Release?label=Release&logo=github&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jt501/formik-semantic-ui-react/CI?logo=github&style=flat-square)
![npm](https://img.shields.io/npm/dw/formik-semantic-ui-react?color=orange&logo=npm&style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/jt501/formik-semantic-ui-react?color=yellow&logo=github&style=flat-square)
![GitHub](https://img.shields.io/github/license/jt501/formik-semantic-ui-react?color=red&style=flat-square)

# formik-semantic-ui-react

Simple wrappers for [`Formik`](https://formik.org/) and [`Semantic UI React`](https://react.semantic-ui.com/).

Features:
> :lock_with_ink_pen: [`TypeScript`](https://www.typescriptlang.org/) ready !!

> :fire: Support `Formik v2` & `Semantic UI React v2` !!

> :muscle: Easy to use. Just import form components from `formik-semantic-ui-react` and set their `name` prop. All the components will be connected with `Formik` form !

> :v: Handle `onChange`, `onRest`, loading and errors for you.

> :sparkles: You can use [Semantic Prompt Labels](https://react.semantic-ui.com/elements/label/#types-prompt) to prompt error by setting `errorPrompt` prop !!

# Example
https://codesandbox.io/s/login-form-ftqwx
```tsx
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react';

export const LoginForm = (props: any) => {
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
    <Div className={props.className}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ ()=>{ console.log('Form Submit' )} }
      >
        <Form size="large">
          <Input
            name="email"
            icon="at"
            iconPosition="left"
            placeholder="Email"
            focus
            fluid
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
          />
          <SubmitButton fluid primary>
            Login
          </SubmitButton>
        </Form>
      </Formik>
    </Div>
  );
};
```

## Install

``` bash
npm i formik-semantic-ui-react
```

## License
[Apache 2.0](./LICENSE)

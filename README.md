[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jt501/formik-semantic-ui-react/Release?label=Release&logo=github&style=flat-square)](https://github.com/JT501/formik-semantic-ui-react/actions)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jt501/formik-semantic-ui-react/CI?logo=github&style=flat-square)](https://github.com/JT501/formik-semantic-ui-react/actions)
[![npm](https://img.shields.io/npm/dw/formik-semantic-ui-react?color=orange&logo=npm&style=flat-square)](https://www.npmjs.com/package/formik-semantic-ui-react)
[![GitHub Repo stars](https://img.shields.io/github/stars/jt501/formik-semantic-ui-react?color=yellow&logo=github&style=flat-square)](/)
[![GitHub](https://img.shields.io/github/license/jt501/formik-semantic-ui-react?color=red&style=flat-square)](./LICENSE)

# formik-semantic-ui-react

Simple wrappers for [`Formik`](https://formik.org/) and [`Semantic UI React`](https://react.semantic-ui.com/).

Features:
> :lock_with_ink_pen: [`TypeScript`](https://www.typescriptlang.org/) ready !!

> :fire: Support `Formik v2` & `Semantic UI React v2` !!

> :muscle: Easy to use. Just import form components from `formik-semantic-ui-react` and set their `name` prop. All the components will be connected with `Formik` form !

> :v: Handle `onChange`, `onReset`, `OnSubmit`, loading and errors for you.

> :sparkles: You can use [Semantic Prompt Labels](https://react.semantic-ui.com/elements/label/#types-prompt) to prompt error by setting `errorPrompt` prop !!

# Example
[Code Sandbox (Login Form)](https://codesandbox.io/s/login-form-ftqwx?file=/src/LoginForm.tsx)

[Code Sandbox (Register Form)](https://codesandbox.io/s/formik-sematic-ui-react-example-j75e0?file=/src/RegisterForm.tsx)

```tsx
import React from 'react';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';

export const LoginForm = (props: any) => {
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={ ()=>{ console.log('Form Submit' )} }
      >
        <Form size="large">
          <Input
            name="email"
            placeholder="Email"
            errorPrompt
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            errorPrompt
          />
          <SubmitButton fluid primary>
            Login
          </SubmitButton>
          <ResetButton fluid secondary>
            Reset
          </ResetButton>
        </Form>
      </Formik>
    </div>
  );
};
```

## Install
Using npm:
``` bash
npm i formik-semantic-ui-react
```
Using Yarn:
```bash
yarn add formik-semantic-ui-react
```

## Components
| Name | Props |
| ---- | ---- |
| Checkbox | [FieldProps](#FieldProps) & [CheckboxProps](https://react.semantic-ui.com/modules/checkbox/) & [FieldErrorProps](#FieldErrorProps) |
| Form | [FormProps](https://react.semantic-ui.com/collections/form/) |
| Field | [FieldProps](#FieldProps) |
| FormikDebug | CSS Style Props |
| Input | [FieldProps](#FieldProps) & [InputProps](https://react.semantic-ui.com/elements/input/) & [FieldErrorProps](#FieldErrorProps) & `inputLabel` |
| Radio | [FieldProps](#FieldProps) & [RadioProps](https://react.semantic-ui.com/addons/radio/) & [FieldErrorProps](#FieldErrorProps) |
| Select | [FieldProps](#FieldProps) & [SelectProps](https://react.semantic-ui.com/addons/select/) & [FieldErrorProps](#FieldErrorProps) |
| TextArea | [FieldProps](#FieldProps) & [TextAreaProps](https://react.semantic-ui.com/addons/text-area/) & [FieldErrorProps](#FieldErrorProps) |

### Form Button
| Name | Props | Description |
| ---- | ---- | ---- |
| SubmitButton | [ButtonProps](https://react.semantic-ui.com/elements/button/) | It will trigger formik form `onSubmit` when on click |
| ResetButton | [ButtonProps](https://react.semantic-ui.com/elements/button/) | It will trigger formik form `onReset` when on click |

## Props
### FieldProps
| Property | Required | Type | Default | Description |
| ---- | :----: | :----: | :----: | ---- |
| name | Yes | `string` |  | [Formik `name` property](https://formik.org/docs/api/field#name) |
| validate | No | `Function` |  | [Formik `validate` property](https://formik.org/docs/api/field#validate) |
| fast | No | `boolean` | false | Use Formik [FastField](https://formik.org/docs/api/fastfield) |

### inputLabel
You can use [inline input label](https://react.semantic-ui.com/elements/input/#variations-labeled) instead of field label. 

Just pass `string` or `SemanticShorthandItem<LabelProps>` to `inputLabel`.

### FieldErrorProps
| Property | Required | Type | Default | Description |
| ---- | :----: | :----: | :----: | ---- |
| errorPrompt | No | `boolean` &#124; [`ErrorPromptConfig`](#ErrorPromptConfig)  | false | Prompt [Error Label](https://react.semantic-ui.com/collections/form/#states-field-error) |

#### ErrorPromptConfig
| Property | Required | Type | Default | Description |
| ---- | :----: | :----: | :----: | ---- |
| prompt | No | `boolean` | true | [Formik label's `prompt` property](https://react.semantic-ui.com/elements/label/#types-prompt)  ***PS. To config basic & color, you have to set prompt to false*** |
| basic | No | `boolean` | | [Formik label's `basic` property](https://react.semantic-ui.com/elements/label/#variations-basic) | 
| color | No | | [SemanticCOLORS](https://github.com/Semantic-Org/Semantic-UI-React/blob/c82836802975f99eddfdd78b6b72ab6110bafa4a/src/generic.d.ts#L89) | [Formik label's `color` property](https://react.semantic-ui.com/elements/label/#variations-colored) |
| pointing | No | `boolean` &#124; 'above' &#124; 'below' &#124; 'left' &#124; 'right' | 'above' | [Formik label's `pointing` property](https://react.semantic-ui.com/elements/label/#types-pointing) |

## License
[Apache 2.0](./LICENSE)

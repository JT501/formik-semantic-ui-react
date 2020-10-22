import { defaultErrorConfig, ErrorPromptConfig } from './types';
import { CheckboxProps } from './Checkbox';
import { FieldMetaProps } from 'formik';

// Helper to decide error config
export function getErrorConfig(
  meta: FieldMetaProps<CheckboxProps>,
  errorPrompt: boolean | undefined,
  errorConfig: ErrorPromptConfig | undefined,
) {
  return meta.error && meta.touched
    ? errorPrompt
      ? errorConfig
        ? { content: meta.error, ...errorConfig }
        : { content: meta.error, ...defaultErrorConfig }
      : true
    : null;
}

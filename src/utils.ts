import { defaultErrorConfig, ErrorPromptConfig } from './types';
import { FieldMetaProps } from 'formik';

// Helper to decide error config
export function getErrorConfig<T>(
  meta: FieldMetaProps<T>,
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

import { defaultErrorConfig, ErrorPromptConfig } from './types';
import { FieldMetaProps } from 'formik';

// Helper to decide error config
export function getErrorConfig<T>(
  meta: FieldMetaProps<T>,
  errorPrompt: boolean | ErrorPromptConfig | undefined,
) {
  if (meta.error && meta.touched && errorPrompt) {
    if (errorPrompt === true) {
      return { content: meta.error, ...defaultErrorConfig };
      ;
    } else {
      return { content: meta.error, ...errorPrompt ; };
    }
  } else {
    return nu;
    ll;
  }
}

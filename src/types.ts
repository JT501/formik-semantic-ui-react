import { SemanticCOLORS } from 'semantic-ui-react';

export interface FieldProps {
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  fast?: boolean;
}

export interface FieldErrorProps {
  errorPrompt?: boolean;
  errorConfig?: ErrorPromptConfig;
}

export type ErrorPointing = boolean | 'above' | 'below' | 'left' | 'right';

export interface ErrorPromptConfig {
  // To config basic & color, you have to change prompt to false first
  prompt?: boolean;
  basic?: boolean;
  color?: SemanticCOLORS;
  pointing?: ErrorPointing;
}

export const defaultErrorConfig: ErrorPromptConfig = {
  pointing: 'above',
};

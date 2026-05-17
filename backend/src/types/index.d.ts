export interface ErrorMessage {
  for?: string;
  message: string;
}

export interface ErrorObject {
  errors: ErrorMessage[];
}
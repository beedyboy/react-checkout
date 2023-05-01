import { AxiosError } from 'axios';

export const formatErrorResponse = (error: AxiosError): string => {
  const message = error.response?.data?.errorMessage || error.message;
  return message;
};

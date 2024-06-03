import { object, string } from 'yup';
import { FORM_FIELD_TITLE } from './constants';

export const validationSchema = object().shape({
  [FORM_FIELD_TITLE]: string().required('Title is required'),
});

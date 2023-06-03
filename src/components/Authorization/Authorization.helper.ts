import * as Yup from 'yup';

const MESSAGE_ERROR_REQUIRED = 'Поле обязательное';

export const initialForm = {
  idInstance: '',
  apiTokenInstance: '',
  phoneNumber: '',
};

function validationIdInstance() {
  return Yup.string().required(MESSAGE_ERROR_REQUIRED);
}

function validationApiTokenInstance() {
  return Yup.string().required(MESSAGE_ERROR_REQUIRED);
}

function validationPhone() {
  return Yup.string()
    .required(MESSAGE_ERROR_REQUIRED)
    .matches(
      /^\+?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
      'некорректный номер телефона',
    );
}

function getValidationSchema() {
  return Yup.object({
    idInstance: validationIdInstance(),
    apiTokenInstance: validationApiTokenInstance(),
    phoneNumber: validationPhone(),
  });
}

export const AuthorizationHelper = {
  getValidationSchema,
};

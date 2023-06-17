import { InitialValues, ValidationSchemaType } from '@/types/types';
import * as Yup from 'yup';

type ReturnType = [
   initialValues: InitialValues,
   validationSchema: ValidationSchemaType
];

const useValidation = (
   action: 'login' | 'register' | 'validation-code' | 'set-user-info'
): ReturnType | undefined => {
   let initialValues: InitialValues;
   let validationSchema: ValidationSchemaType;

   const defaultErrorValidation = Yup.string().required(
      'پرکردن این فیلد الزامی است.'
   );

   const username = defaultErrorValidation;
   const password = defaultErrorValidation.min(
      6,
      'رمز عبور باید حداقل 6 کارکتر باشد.'
   );
   const first_name = defaultErrorValidation;
   const last_name = defaultErrorValidation;
   const email = defaultErrorValidation.email('ایمیل وارد شده نا معتبر است.');
   const phone = defaultErrorValidation.matches(
      /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/g,
      {
         message: 'شماره وارد شده نامعتبر است',
      }
   );
   const validationCode = defaultErrorValidation;

   switch (action) {
      case 'register':
         validationSchema = Yup.object().shape({
            username,
            password,
            // email,
         });
         initialValues = {
            username: '',
            password: '',
            // email: '',
         };
         return [initialValues, validationSchema];
      case 'set-user-info':
         validationSchema = Yup.object().shape({
            first_name,
            last_name,
            email,
            phone,
         });
         initialValues = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
         };
         return [initialValues, validationSchema];
      case 'validation-code':
         validationSchema = Yup.object().shape({
            validationCode,
         });

         initialValues = {
            validationCode: '',
         };
         return [initialValues, validationSchema];
      case 'login':
         validationSchema = Yup.object().shape({
            username,
            password,
         });
         initialValues = {
            username: '',
            password: '',
         };
         return [initialValues, validationSchema];
      default:
         return undefined;
   }
};

export default useValidation;

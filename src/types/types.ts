import * as Yup from 'yup';

export interface User {
   instances: {
      id: number;
      is_manager: boolean;
      is_resident: boolean;
      last_login: null;
      is_superuser: boolean;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      is_staff: boolean;
      is_active: boolean;
      date_joined: string;
      phone: null;
      role: string;
      is_phone_activated: boolean;
      is_email_activated: boolean;
   };
}

export interface EmailVerification {
   instances: {
      code: number;
      expire_date: string;
      id: number;
      otp_for: 'EMAIL' | 'PHONE';
      used: boolean;
      user: number;
   };
}

export interface LoginInitialValues {
   username: string;
   password: string;
}

export interface RegisterInitialValues {
   email: string;
   first_name: string;
   last_name: string;
   phone: string;
}

export interface ValidationCodeInitialValues {
   validationCode: string;
}

export type InitialValues =
   | LoginInitialValues
   | RegisterInitialValues
   | ValidationCodeInitialValues;

interface LoginSchemaAnyObject {
   username: undefined;
   password: undefined;
}

interface RegisterSchemaAnyObject {
   first_name: undefined;
   last_name: undefined;
   phone: undefined;
   email: undefined;
}

interface ValidationCodeSchemaAnyObject {
   validationCode: undefined;
}

export type ValidateSchemaAnyObject =
   | LoginSchemaAnyObject
   | RegisterSchemaAnyObject
   | ValidationCodeSchemaAnyObject;

export type ValidationSchemaType = Yup.ObjectSchema<
   InitialValues,
   Yup.AnyObject,
   ValidateSchemaAnyObject,
   ''
>;

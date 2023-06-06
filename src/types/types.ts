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

interface LoginInitialValues {
   username: string;
   password: string;
}

interface RegisterInitialValues {
   username: string;
   password: string;
   email: string;
}

export type InitialValues = LoginInitialValues | RegisterInitialValues;

interface LoginSchemaAnyObject {
   username: undefined;
   password: undefined;
}

interface RegisterSchemaAnyObject {
   firstName: undefined;
   lastName: undefined;
   username: undefined;
   password: undefined;
   phoneNumber: undefined;
   email: undefined;
}

export type ValidateSchemaAnyObject =
   | LoginSchemaAnyObject
   | RegisterSchemaAnyObject;

export type ValidationSchemaType = Yup.ObjectSchema<
   InitialValues,
   Yup.AnyObject,
   ValidateSchemaAnyObject,
   ''
>;

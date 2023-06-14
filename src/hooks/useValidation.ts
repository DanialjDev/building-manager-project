import { InitialValues, ValidationSchemaType } from '@/types/types'
import * as Yup from 'yup'

type ReturnType = [
   initialValues: InitialValues,
   validationSchema: ValidationSchemaType
]

const useValidation = (
   action: 'login' | 'register' | 'validation-code'
): ReturnType | undefined => {
   let initialValues: InitialValues
   let validationSchema: ValidationSchemaType

   const defaultErrorValidation = Yup.string().required(
      'پرکردن این فیلد الزامی است.'
   )

   const username = defaultErrorValidation
   const password = defaultErrorValidation.min(
      6,
      'رمز عبور باید حداقل 6 کارکتر باشد.'
   )
   const email = defaultErrorValidation.email('ایمیل وارد شده نا معتبر است.')
   const validationCode = defaultErrorValidation

   switch (action) {
      case 'register':
         validationSchema = Yup.object().shape({
            username,
            password,
            email,
         })
         initialValues = {
            username: '',
            password: '',
            email: '',
         }
         return [initialValues, validationSchema]
      case 'validation-code':
         validationSchema = Yup.object().shape({
            validationCode,
         })

         initialValues = {
            validationCode: '',
         }
         return [initialValues, validationSchema]
      case 'login':
         validationSchema = Yup.object().shape({
            username,
            password,
         })
         initialValues = {
            username: '',
            password: '',
         }
         return [initialValues, validationSchema]
      default:
         return undefined
   }
}

export default useValidation

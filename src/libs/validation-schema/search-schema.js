import * as yup from 'yup'

export const searchSchema = yup.object({
  q: yup
    .string()
    // .required('The query is required')
    .matches(/^[\p{L}\p{N}\s]*$/u, 'Only letters and numbers are allowed')
    // .min(1, 'You must type at least 1 character')
})

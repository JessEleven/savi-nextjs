import * as yup from 'yup'

export const inputSchema = yup.object().shape({
  fileName: yup
    .string()
    .required('The file name is required')
    // Just an underscore
    // .matches(/^[a-zA-Z0-9_]+(?:_[a-zA-Z0-9]+)?$/, 'Invalid format for the file name'),
    // Multiple underscores
    // .matches(/^[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/, 'Invalid format for the file name'),
    .matches(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/, 'Invalid format for the file name'),

  fileContent: yup
    .string()
    .required('The content of the file is required')
    .test('is-json', 'The content must be a valid JSON', value => {
      try {
        const parsed = JSON.parse(value)
        return typeof parsed === 'object' && parsed !== null
      } catch {
        return false
      }
    })
})

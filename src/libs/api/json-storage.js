import { authClient } from '../auth-client'

export const createJsonStorage = async (formData) => {
  try {
    const { data } = await authClient.getSession()
    const user = data?.user

    if (!user) {
      throw new Error('User is not authenticated')
    }
    const response = await fetch('/api/json-storage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        userId: user.id
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    return error.message
  }
}

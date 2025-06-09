import { authClient } from '../auth-client'

export const getAllJsonStorage = async () => {
  try {
    const response = await fetch('/api/json-storage', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch JSON storages')
    }
    return result.data
  } catch (error) {
    return error.message
  }
}

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

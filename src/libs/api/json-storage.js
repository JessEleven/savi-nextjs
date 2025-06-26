import { authClient } from '../auth-client'

export const getAllJsonStorage = async () => {
  try {
    const response = await fetch('/api/json-storage', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch JSON storages')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching json storage:', error)
    return { success: false, error: error.message }
  }
}

export const getJsonStorageById = async (id) => {
  try {
    const response = await fetch(`/api/json-storage/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch JSON storage')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching json storage:', error)
    return { success: false, error: error.message }
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
    // console.log('response from API', result)

    return result
  } catch (error) {
    // console.error('Error fetching json storage:', error)
    return { success: false, error: error.message }
  }
}

export const deleteJsonStorage = async ({ id, onSuccess }) => {
  try {
    const response = await fetch('/api/json-storage', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const result = await response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to delete the JSON file')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching json storage:', error)
    return { success: false, error: error.message }
  }
}

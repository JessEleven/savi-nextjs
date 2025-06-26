export const getAllJsonFavorite = async () => {
  try {
    const response = await fetch('/api/json-favorite', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch JSON favorites')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching json favorite:', error)
    return { success: false, error: error.message }
  }
}

export const getJsonFavoriteById = async (id) => {
  try {
    const response = await fetch(`/api/json-favorite/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch JSON favorite')
    }
    return result.data
  } catch (error) {
    // console.error('Error fetching json favorite:', error)
    return { success: false, error: error.message }
  }
}

export const toggleFavorite = async ({ id, favorite, onSuccess }) => {
  try {
    const response = await fetch('/api/json-favorite', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, favorite: !favorite })
    })
    const result = await response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to toggle favorite')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    // console.error('Error fetching json favorite:', error)
    return { success: false, error: error.message }
  }
}

export const searchJsonFiles = async (query) => {
  try {
    const response = await fetch(`/api/search-files?q=${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    // console.log('response from API', result)

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to search JSON files')
    }
    return result.data
  } catch (error) {
    // console.error('Error searching JSON files:', error)
    return {
      success: false,
      error: error?.message || 'Unknown error'
    }
  }
}

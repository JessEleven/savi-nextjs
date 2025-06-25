export const deleteAccount = async () => {
  try {
    const response = await fetch('/api/delete-account', {
      method: 'DELETE',
      credentials: 'include'
    })
    const result = await response.json()
    // console.log('response from API', result)
    return result
  } catch (error) {
    console.log(error)
    return { success: false, message: error.message }
  }
}

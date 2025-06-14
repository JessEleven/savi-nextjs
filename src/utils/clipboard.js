export const copyFile = async (content) => {
  try {
    if (!content || content.trim() === '') return false

    const parsed = JSON.parse(content)

    const isEmptyArray = Array.isArray(parsed) && parsed.length === 0
    const isEmptyObject = typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length === 0
    if (isEmptyArray || isEmptyObject) return false

    const formatted = JSON.stringify(parsed, null, 2)
    await navigator.clipboard.writeText(formatted)
    return true
    // console.log('Content copied to clipboard')
  } catch (error) {
    // console.error('Error copying to clipboard:', err)
    return false
  }
}

export const copySavedFile = async (savedData) => {
  try {
    if (!savedData) return false

    const formattedTwo = JSON.stringify(savedData, null, 2)

    await navigator.clipboard.writeText(formattedTwo)
    return true
    // console.log('Content copied to clipboard')
  } catch (error) {
    // console.error('Error copying to clipboard:', error)
    return false
  }
}

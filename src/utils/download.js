export const downloadFile = ({ fileName, fileContent }) => {
  if (!fileContent) return

  // If empty, use ‘file.json’.
  let cleanedName = fileName?.trim() || ''

  if (!cleanedName) {
    cleanedName = 'file'
  } else {
    // If there are words separated by spaces, replace them with underscore
    cleanedName = cleanedName.replace(/\s+/g, '_')
  }

  // Make sure it ends in .json
  if (!cleanedName.endsWith('.json')) {
    cleanedName += '.json'
  }
  const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
    type: 'application/json'
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = cleanedName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

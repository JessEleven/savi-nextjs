export const downloadFile = ({ fileName, fileContent }) => {
  if (!fileName || !fileContent) return

  // The spaces are replaced with underscores
  let fileWithUnderscores = fileName.trim().replace(/\s+/g, '_')

  if (!fileWithUnderscores.endsWith('.json')) {
    fileWithUnderscores += '.json'
  }

  const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
    type: 'application/json'
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileWithUnderscores
  // link.download = fileWithUnderscores || 'file.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

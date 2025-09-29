export function pickFields (jsonStorage) {
  return {
    id: jsonStorage.id,
    fileName: jsonStorage.fileName,
    favorite: jsonStorage.favorite,
    created_at: jsonStorage.createdAt,
    updated_at: jsonStorage.updatedAt
  }
}

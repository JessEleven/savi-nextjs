import { getDb } from '../db/drizzle'
import { cache } from 'react'

export const useDb = cache(async () => {
  return await getDb()
})

import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../../db/schema'

config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_DEV
})
export const db = drizzle(pool, { schema })

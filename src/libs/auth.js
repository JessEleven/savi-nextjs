import { useDb } from '../helper/use-db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = async () => {
  const db = await useDb()

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg' // or "mysql", "sqlite"
    }),
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      }
    }
  })
}

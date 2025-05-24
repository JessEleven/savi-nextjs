export async function getDb () {
  const isProd = process.env.NODE_ENV === 'production'

  if (isProd) {
    const { db } = await import('../libs/config/drizzle.prod.js')
    return db
  } else {
    const { db } = await import('../libs/config/drizzle.dev.js')
    return db
  }
}

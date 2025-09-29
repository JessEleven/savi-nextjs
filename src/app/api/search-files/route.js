import { db } from '@/db/drizzle'
import { jsonStorage } from '@/db/schema'
import { searchSchema } from '@/libs/validation-schema/search-schema'
import { pickFields } from '@/utils/pick-fields'
import { ilike } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET (req) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''

    // To validate the search query
    await searchSchema.validate({ q: query })

    const results = await db.select()
      .from(jsonStorage)
      .where(ilike(jsonStorage.fileName, `%${query}%`))

    if (results.length === 0) {
      return NextResponse.json({
        success: true,
        status_code: 200,
        message: 'No query results were found',
        data: []
      }, { status: 200 })
    }
    const pickResult = results.map(pickFields)

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: `Found ${results.length} results for query: ${query}`,
      data: pickResult
    }, { status: 200 })
  } catch (err) {
    // To handle Yup validation errors
    if (err.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: err.errors[0]
      }, { status: 400 })
    }

    // console.log({ getCatch: err })
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: err?.message || 'Unexpected server error'
    }, { status: 500 })
  }
}

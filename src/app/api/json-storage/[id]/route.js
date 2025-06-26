import { db } from '@/db/drizzle'
import { jsonStorage } from '@/db/schema'
import { auth } from '@/libs/auth'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET (req, { params }) {
  try {
    const data = await auth.api.getSession({
      headers: await headers()
    })
    const user = data?.user

    if (!user) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'User is not authenticated'
      }, { status: 401 })
    }
    const { id } = params

    if (!id) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'ID is missing to get the JSON file'
      }, { status: 400 })
    }

    const getStorage = await db.query.jsonStorage
      .findFirst({
        where: and(
          eq(jsonStorage.id, id),
          eq(jsonStorage.userId, user.id),
          eq(jsonStorage.favorite, false)
        )
      })

    if (!getStorage) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'JSON file not found',
        data: []
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'JSON file successfully found',
      author: {
        name: user.name,
        email: user.email
      },
      data: getStorage
    }, { status: 200 })
  } catch (error) {
    // console.log({ catchGet: error })
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

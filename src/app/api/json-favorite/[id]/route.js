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
        message: 'ID is missing to get the favorite JSON file'
      }, { status: 400 })
    }

    const getFavorite = await db.query.jsonStorage
      .findFirst({
        where: and(
          eq(jsonStorage.id, id),
          eq(jsonStorage.userId, user.id),
          eq(jsonStorage.favorite, true)
        )
      })

    if (!getFavorite) {
      return NextResponse.json({
        success: false,
        status_code: 404,
        message: 'Favorite JSON file not found',
        data: []
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'Favorite JSON file successfully found',
      author: {
        name: user.name,
        email: user.email
      },
      data: getFavorite
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

export async function PATCH (req, { params }) {
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
        message: 'ID is missing to update the favorite JSON file'
      }, { status: 400 })
    }
    const { fileName, fileContent } = await req.json()
    const updatedAt = new Date()

    await db.update(jsonStorage)
      .set({
        fileName,
        fileContent,
        updatedAt
      })
      .where(and(
        eq(jsonStorage.id, id),
        eq(jsonStorage.userId, user.id),
        eq(jsonStorage.favorite, true)
      ))

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'The favorite JSON file updated successfully'
    }, { status: 200 })
  } catch (error) {
    // console.log({ patchCatch: error })
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

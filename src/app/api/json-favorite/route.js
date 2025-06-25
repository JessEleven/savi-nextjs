import { db } from '@/db/drizzle'
import { jsonStorage } from '@/db/schema'
import { auth } from '@/libs/auth'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET () {
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

    const allFavorites = await db.select()
      .from(jsonStorage)
      .where(and(
        eq(jsonStorage.userId, user.id),
        eq(jsonStorage.favorite, true)
      ))
      .orderBy(desc(jsonStorage.createdAt))

    if (allFavorites.length <= 0) {
      return NextResponse.json({
        success: true,
        status_code: 200,
        error: 'The favorite JSON list is empty',
        data: []
      }, { status: 200 })
    }

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: `List of JSON favorites: ${allFavorites.length}`,
      author: {
        name: user.name,
        email: user.email
      },
      data: allFavorites
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

export async function PATCH (req) {
  try {
    const data = await auth.api.getSession({
      headers: await headers()
    })
    const user = data?.user
    const { id, favorite } = await req.json()

    if (!user) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'User is not authenticated'
      }, { status: 401 })
    }

    await db.update(jsonStorage)
      .set({ favorite })
      .where(and(
        eq(jsonStorage.id, id),
        eq(jsonStorage.userId, user.id)
      ))

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: `JSON ${favorite ? 'marked as' : 'removed from'} favorite`,
      author: {
        name: user.name,
        email: user.email
      }
    }, { status: 200 })
  } catch (error) {
    // console.log({ deleteCatch: error })
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

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
    const allStorages = await db.select()
      .from(jsonStorage)
      .where(and(
        eq(jsonStorage.userId, user.id),
        eq(jsonStorage.favorite, false)
      ))
      .orderBy(desc(jsonStorage.createdAt))

    if (allStorages.length <= 0) {
      return NextResponse.json({
        success: true,
        status_code: 200,
        message: 'The JSON list is empty',
        data: []
      })
    }
    return NextResponse.json({
      success: true,
      status_code: 200,
      message: `List of JSON: ${allStorages.length}`,
      author: {
        name: user.name,
        email: user.email
      },
      data: allStorages
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

export async function POST (req) {
  try {
    const { fileName, fileContent, userId } = await req.json()

    const result = await db.insert(jsonStorage)
      .values({
        fileName,
        fileContent,
        userId
      }).returning({ insertedId: jsonStorage.id })

    return NextResponse.json({
      success: true,
      status_code: 201,
      message: 'The JSON file created successfully',
      data: result
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

export async function DELETE (req) {
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
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'ID is missing to delete the JSON file'
      }, { status: 400 })
    }

    await db.delete(jsonStorage)
      .where(and(
        eq(jsonStorage.id, id),
        eq(jsonStorage.userId, user.id)
      ))
      .returning()

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'JSON file successfully deleted'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

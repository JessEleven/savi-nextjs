import { db } from '@/db/drizzle'
import { user } from '@/db/schema'
import { auth } from '@/libs/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE () {
  try {
    const data = await auth.api.getSession({
      headers: await headers()
    })
    const isAuth = data?.user

    if (!isAuth) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'User not authenticated'
      }, { status: 401 })
    }

    await db.delete(user)
      .where(eq(isAuth.id, user.id))

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'Account successfully deleted'
    }, { status: 200 })
  } catch (error) {
    // console.log({ catch: error })
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

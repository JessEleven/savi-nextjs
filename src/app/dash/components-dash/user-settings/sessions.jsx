import dayjs from 'dayjs'
import GetSessionStatus from '../ui/get-session-status'
import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import { BroadcastIcon } from '../../assets/dash-icons'
import { getGeoFromIP } from '@/libs/geo'

export default async function Sessions () {
  const { session: currentSession } = await auth.api.getSession({
    headers: await headers()
  })
  const sessions = await auth.api.listSessions({
    headers: await headers()
  })
  // console.log({ listSessions: data })

  const ipCache = new Map()
  const sessionsWithGeo = await Promise.all(
    sessions.map(async (s) => {
      if (!s.ipAddress) return { ...s, geo: null }

      if (ipCache.has(s.ipAddress)) {
        return { ...s, geo: ipCache.get(s.ipAddress) }
      }

      const geo = await getGeoFromIP(s.ipAddress)
      ipCache.set(s.ipAddress, geo)
      return { ...s, geo }
    })
  )

  return (
    <>
      <div className='w-full my-2.5 border border-neutral-600' />

      <div className='w-fit flex items-center gap-x-1 text-stone-400 cursor-pointer'>
        <BroadcastIcon />
        <h3 className='text-lg font-medium'>Sessions</h3>
      </div>

      <div className='flex items-center justify-between mt-2.5'>
        <h3 className='text-sm'>The session is in mode</h3>
        <GetSessionStatus />
      </div>

      <div className='mt-2.5 space-y-2.5'>
        {sessionsWithGeo.map((s) => (
          <div
            key={s.id}
            className={`p-2.5 rounded-md border ${
              s.id === currentSession.id ? 'border-slate-400' : 'border-neutral-600'
            }`}
          >
            <div className='flex items-center justify-between'>
              <p className='text-sm'>IP: {s.ipAddress || 'N/A'}</p>
              {s.id === currentSession.id && (
                <p className='text-xs text-emerald-500'>Current session</p>
              )}
            </div>

            <p className='text-sm'>
              Location: {s.geo
              ? `${s.geo.city}, ${s.geo.region}, ${s.geo.country}`
              : 'Unknown'}
            </p>

            <p className='text-sm'>
              Expires at: {dayjs(s.expiresAt).format('MMMM DD, YYYY • hh:mm a')}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

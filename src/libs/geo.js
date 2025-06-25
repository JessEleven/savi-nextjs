export async function getGeoFromIP (ip) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await res.json()

    if (data.status === 'success') {
      return {
        city: data.city,
        region: data.regionName,
        country: data.country,
        isp: data.isp,
        org: data.org
      }
    }
    return null
  } catch (error) {
    // console.error('Failed to fetch geo info:', error)
    return null
  }
}

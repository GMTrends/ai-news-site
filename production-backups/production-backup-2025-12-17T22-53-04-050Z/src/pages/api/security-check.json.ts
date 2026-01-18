import type { APIRoute } from 'astro'
import { lockoutManager } from '../../lib/lockout'
import { getClientIP } from '../../lib/security'

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIP(request)
  const { action, success } = await request.json()
  
  if (action === 'check') {
    const lockoutInfo = lockoutManager.getLockoutInfo(ip)
    return new Response(JSON.stringify(lockoutInfo), {
      status: lockoutInfo.locked ? 423 : 200, // 423 = Locked
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  if (action === 'auth_attempt') {
    if (success) {
      lockoutManager.recordSuccessfulAuth(ip)
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      const result = lockoutManager.recordFailedAttempt(ip)
      return new Response(JSON.stringify(result), {
        status: result.locked ? 423 : 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
  
  return new Response('Invalid action', { status: 400 })
}

export const GET: APIRoute = async ({ request }) => {
  const ip = getClientIP(request)
  const stats = lockoutManager.getStats()
  const lockoutInfo = lockoutManager.getLockoutInfo(ip)
  
  return new Response(JSON.stringify({
    ...stats,
    currentIP: lockoutInfo
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

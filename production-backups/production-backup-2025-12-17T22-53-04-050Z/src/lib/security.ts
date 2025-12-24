// Security monitoring and logging utilities

interface SecurityEvent {
    type: 'rate_limit' | 'admin_access' | 'failed_auth' | 'suspicious_activity'
    ip: string
    userAgent: string
    timestamp: Date
    details?: any
  }
  
  class SecurityMonitor {
    private events: SecurityEvent[] = []
    private maxEvents = 1000 // Keep last 1000 events
  
    logEvent(event: Omit<SecurityEvent, 'timestamp'>) {
      const securityEvent: SecurityEvent = {
        ...event,
        timestamp: new Date()
      }
  
      this.events.push(securityEvent)
      
      // Keep only recent events
      if (this.events.length > this.maxEvents) {
        this.events = this.events.slice(-this.maxEvents)
      }
  
      // Alert on suspicious patterns
      this.checkForSuspiciousActivity(event.ip)
    }
  
    private checkForSuspiciousActivity(ip: string) {
      const recentEvents = this.events.filter(
        event => event.ip === ip && 
        event.timestamp > new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
      )
  
      // Alert if too many events from same IP
      if (recentEvents.length > 20) {
        // Here you could:
        // - Send email alert
        // - Block IP temporarily
        // - Log to external monitoring service
      }
    }
  
    getRecentEvents(minutes: number = 60): SecurityEvent[] {
      const cutoff = new Date(Date.now() - minutes * 60 * 1000)
      return this.events.filter(event => event.timestamp > cutoff)
    }
  
    getEventsByType(type: SecurityEvent['type'], minutes: number = 60): SecurityEvent[] {
      return this.getRecentEvents(minutes).filter(event => event.type === type)
    }
  }
  
  export const securityMonitor = new SecurityMonitor()
  
  // Helper functions
  export function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const clientIP = request.headers.get('cf-connecting-ip') // Cloudflare
    
    return forwarded?.split(',')[0] || realIP || clientIP || 'unknown'
  }
  
  export function getUserAgent(request: Request): string {
    return request.headers.get('user-agent') || 'unknown'
  }
  
  // Validate admin access patterns
  export function validateAdminAccess(request: Request): boolean {
    const userAgent = getUserAgent(request)
    const ip = getClientIP(request)
    
    // Basic bot detection
    const suspiciousBots = [
      'curl', 'wget', 'python', 'scanner', 'bot', 'crawler'
    ]
    
    const isSuspicious = suspiciousBots.some(bot => 
      userAgent.toLowerCase().includes(bot)
    )
    
    if (isSuspicious) {
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        ip,
        userAgent,
        details: { reason: 'suspicious_user_agent' }
      })
      return false
    }
    
    return true
  }
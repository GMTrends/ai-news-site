// User lockout system for failed authentication attempts

interface LockoutRecord {
    attempts: number
    firstAttempt: Date
    lockedUntil?: Date
    ip: string
  }
  
  class LockoutManager {
    private lockouts = new Map<string, LockoutRecord>()
    
    // Configuration
    private readonly MAX_ATTEMPTS = 5
    private readonly LOCKOUT_DURATION = 30 * 60 * 1000 // 30 minutes
    private readonly ATTEMPT_WINDOW = 15 * 60 * 1000 // 15 minutes
    
    // Check if IP is currently locked out
    isLockedOut(ip: string): boolean {
      const record = this.lockouts.get(ip)
      if (!record || !record.lockedUntil) return false
      
      // Check if lockout has expired
      if (Date.now() > record.lockedUntil.getTime()) {
        this.clearLockout(ip)
        return false
      }
      
      return true
    }
    
    // Record a failed authentication attempt
    recordFailedAttempt(ip: string): { locked: boolean; remainingAttempts: number; lockedUntil?: Date } {
      const now = new Date()
      let record = this.lockouts.get(ip)
      
      if (!record) {
        // First failed attempt
        record = {
          attempts: 1,
          firstAttempt: now,
          ip
        }
      } else {
        // Check if we're in a new window
        if (now.getTime() - record.firstAttempt.getTime() > this.ATTEMPT_WINDOW) {
          // Reset the window
          record = {
            attempts: 1,
            firstAttempt: now,
            ip
          }
        } else {
          // Increment attempts in current window
          record.attempts++
        }
      }
      
      // Check if we should lock out
      if (record.attempts >= this.MAX_ATTEMPTS) {
        record.lockedUntil = new Date(now.getTime() + this.LOCKOUT_DURATION)
      }
      
      this.lockouts.set(ip, record)
      
      return {
        locked: !!record.lockedUntil,
        remainingAttempts: Math.max(0, this.MAX_ATTEMPTS - record.attempts),
        lockedUntil: record.lockedUntil
      }
    }
    
    // Record successful authentication (clears lockout)
    recordSuccessfulAuth(ip: string): void {
      this.clearLockout(ip)
    }
    
    // Clear lockout for IP
    private clearLockout(ip: string): void {
      this.lockouts.delete(ip)
    }
    
    // Get lockout info for IP
    getLockoutInfo(ip: string): { locked: boolean; remainingTime?: number; attempts?: number } {
      const record = this.lockouts.get(ip)
      if (!record) return { locked: false }
      
      if (record.lockedUntil) {
        const remainingTime = record.lockedUntil.getTime() - Date.now()
        if (remainingTime > 0) {
          return {
            locked: true,
            remainingTime: Math.ceil(remainingTime / 1000), // seconds
            attempts: record.attempts
          }
        }
      }
      
      return {
        locked: false,
        attempts: record.attempts
      }
    }
    
    // Clean up expired lockouts (call periodically)
    cleanup(): void {
      const now = Date.now()
      for (const [ip, record] of this.lockouts.entries()) {
        if (record.lockedUntil && now > record.lockedUntil.getTime()) {
          this.lockouts.delete(ip)
        }
      }
    }
    
    // Get statistics
    getStats(): { totalLockouts: number; activeLockouts: number } {
      const activeLockouts = Array.from(this.lockouts.values()).filter(
        record => record.lockedUntil && Date.now() < record.lockedUntil.getTime()
      ).length
      
      return {
        totalLockouts: this.lockouts.size,
        activeLockouts
      }
    }
  }
  
  export const lockoutManager = new LockoutManager()
  
  // Cleanup expired lockouts every 5 minutes
  setInterval(() => {
    lockoutManager.cleanup()
  }, 5 * 60 * 1000)
  
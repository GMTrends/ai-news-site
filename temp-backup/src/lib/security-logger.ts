/**
 * Security Logger for AI Buzz Media
 * Provides comprehensive logging for security monitoring and threat detection
 */

export interface SecurityEvent {
  timestamp: string;
  eventType: 'api_request' | 'rate_limit_exceeded' | 'validation_failed' | 'suspicious_activity' | 'error' | 'authentication' | 'authorization';
  endpoint: string;
  method: string;
  ip: string;
  userAgent?: string;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  sessionId?: string;
  requestId?: string;
}

export interface LogConfig {
  enableConsole: boolean;
  enableFile: boolean;
  enableExternal: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  maxFileSize: number; // in MB
  maxFiles: number;
}

class SecurityLogger {
  private config: LogConfig;
  private logBuffer: SecurityEvent[] = [];
  private readonly MAX_BUFFER_SIZE = 100;

  constructor(config: Partial<LogConfig> = {}) {
    this.config = {
      enableConsole: true,
      enableFile: false,
      enableExternal: false,
      logLevel: 'info',
      maxFileSize: 10,
      maxFiles: 5,
      ...config
    };
  }

  /**
   * Log a security event
   */
  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString()
    };

    // Add to buffer
    this.logBuffer.push(fullEvent);
    if (this.logBuffer.length > this.MAX_BUFFER_SIZE) {
      this.logBuffer.shift();
    }

    // Console logging
    if (this.config.enableConsole) {
      this.logToConsole(fullEvent);
    }

    // File logging (if enabled)
    if (this.config.enableFile) {
      this.logToFile(fullEvent);
    }

    // External logging (if enabled)
    if (this.config.enableExternal) {
      this.logToExternal(fullEvent);
    }

    // Check for suspicious patterns
    this.detectSuspiciousActivity(fullEvent);
  }

  /**
   * Log API request
   */
  logApiRequest(
    endpoint: string,
    method: string,
    ip: string,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string,
    requestId?: string
  ): void {
    this.log({
      eventType: 'api_request',
      endpoint,
      method,
      ip,
      userAgent,
      details,
      severity: 'low',
      sessionId,
      requestId
    });
  }

  /**
   * Log rate limit exceeded
   */
  logRateLimitExceeded(
    endpoint: string,
    ip: string,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string
  ): void {
    this.log({
      eventType: 'rate_limit_exceeded',
      endpoint,
      method: 'POST',
      ip,
      userAgent,
      details,
      severity: 'medium',
      sessionId
    });
  }

  /**
   * Log validation failure
   */
  logValidationFailed(
    endpoint: string,
    method: string,
    ip: string,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string
  ): void {
    this.log({
      eventType: 'validation_failed',
      endpoint,
      method,
      ip,
      userAgent,
      details,
      severity: 'medium',
      sessionId
    });
  }

  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(
    endpoint: string,
    method: string,
    ip: string,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string
  ): void {
    this.log({
      eventType: 'suspicious_activity',
      endpoint,
      method,
      ip,
      userAgent,
      details,
      severity: 'high',
      sessionId
    });
  }

  /**
   * Log error
   */
  logError(
    endpoint: string,
    method: string,
    ip: string,
    error: Error,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string
  ): void {
    this.log({
      eventType: 'error',
      endpoint,
      method,
      ip,
      userAgent,
      details: {
        ...details,
        errorMessage: error.message,
        errorStack: error.stack,
        errorName: error.name
      },
      severity: 'high',
      sessionId
    });
  }

  /**
   * Log authentication event
   */
  logAuthentication(
    endpoint: string,
    method: string,
    ip: string,
    success: boolean,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string
  ): void {
    this.log({
      eventType: 'authentication',
      endpoint,
      method,
      ip,
      userAgent,
      details: {
        ...details,
        success
      },
      severity: success ? 'low' : 'medium',
      sessionId
    });
  }

  /**
   * Log authorization event
   */
  logAuthorization(
    endpoint: string,
    method: string,
    ip: string,
    success: boolean,
    userAgent?: string,
    details: Record<string, any> = {},
    sessionId?: string
  ): void {
    this.log({
      eventType: 'authorization',
      endpoint,
      method,
      ip,
      userAgent,
      details: {
        ...details,
        success
      },
      severity: success ? 'low' : 'high',
      sessionId
    });
  }

  /**
   * Console logging with color coding
   */
  private logToConsole(event: SecurityEvent): void {
    const colors = {
      low: '\x1b[32m', // Green
      medium: '\x1b[33m', // Yellow
      high: '\x1b[31m', // Red
      critical: '\x1b[35m' // Magenta
    };

    const reset = '\x1b[0m';
    const color = colors[event.severity] || colors.low;

    const logMessage = `${color}[${event.timestamp}] ${event.severity.toUpperCase()}: ${event.eventType} - ${event.method} ${event.endpoint} from ${event.ip}${reset}`;
    
    if (event.severity === 'critical' || event.severity === 'high') {
      console.error(logMessage);
      if (event.details) {
        console.error(`${color}Details:${reset}`, event.details);
      }
    }
  }

  /**
   * File logging (placeholder for future implementation)
   */
  private logToFile(event: SecurityEvent): void {
    // In a real implementation, this would write to a log file
    // For now, we'll just add it to the buffer
    // TODO: Implement file logging with rotation
  }

  /**
   * External logging (placeholder for future implementation)
   */
  private logToExternal(event: SecurityEvent): void {
    // In a real implementation, this would send to an external service
    // like Sentry, LogRocket, or a custom logging service
    // TODO: Implement external logging
  }

  /**
   * Detect suspicious activity patterns
   */
  private detectSuspiciousActivity(event: SecurityEvent): void {
    const suspiciousPatterns = [
      // Multiple failed validations from same IP
      {
        pattern: (events: SecurityEvent[]) => {
          const recentEvents = events.filter(e => 
            e.ip === event.ip && 
            e.eventType === 'validation_failed' &&
            new Date(e.timestamp).getTime() > Date.now() - 5 * 60 * 1000 // 5 minutes
          );
          return recentEvents.length >= 5;
        },
        message: 'Multiple validation failures from same IP'
      },
      // Multiple rate limit violations from same IP
      {
        pattern: (events: SecurityEvent[]) => {
          const recentEvents = events.filter(e => 
            e.ip === event.ip && 
            e.eventType === 'rate_limit_exceeded' &&
            new Date(e.timestamp).getTime() > Date.now() - 10 * 60 * 1000 // 10 minutes
          );
          return recentEvents.length >= 3;
        },
        message: 'Multiple rate limit violations from same IP'
      },
      // Suspicious user agents
      {
        pattern: (events: SecurityEvent[]) => {
          const suspiciousUserAgents = [
            'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 'java'
          ];
          return event.userAgent && suspiciousUserAgents.some(agent => 
            event.userAgent!.toLowerCase().includes(agent)
          );
        },
        message: 'Suspicious user agent detected'
      }
    ];

    // Check for suspicious patterns
    suspiciousPatterns.forEach(({ pattern, message }) => {
      if (pattern(this.logBuffer)) {
        this.logSuspiciousActivity(
          event.endpoint,
          event.method,
          event.ip,
          event.userAgent,
          { ...event.details, suspiciousPattern: message },
          event.sessionId
        );
      }
    });
  }

  /**
   * Get recent events for analysis
   */
  getRecentEvents(minutes: number = 60): SecurityEvent[] {
    const cutoff = Date.now() - minutes * 60 * 1000;
    return this.logBuffer.filter(event => 
      new Date(event.timestamp).getTime() > cutoff
    );
  }

  /**
   * Get events by IP address
   */
  getEventsByIP(ip: string): SecurityEvent[] {
    return this.logBuffer.filter(event => event.ip === ip);
  }

  /**
   * Get events by severity
   */
  getEventsBySeverity(severity: SecurityEvent['severity']): SecurityEvent[] {
    return this.logBuffer.filter(event => event.severity === severity);
  }

  /**
   * Clear log buffer
   */
  clearBuffer(): void {
    this.logBuffer = [];
  }

  /**
   * Get buffer size
   */
  getBufferSize(): number {
    return this.logBuffer.length;
  }
}

// Create singleton instance
export const securityLogger = new SecurityLogger({
  enableConsole: true,
  enableFile: false, // Enable when file logging is implemented
  enableExternal: false, // Enable when external logging is implemented
  logLevel: 'info'
}); 
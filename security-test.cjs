const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const BASE_URL = 'http://localhost:4321';

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(name, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${name}`);
  if (details) {
    console.log(`   ${details}`);
  }
  
  results.tests.push({ name, passed, details });
  if (passed) {
    results.passed++;
  } else {
    results.failed++;
  }
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 5000
    };
    
    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testSecurityHeaders() {
  console.log('\n🔒 Testing Security Headers...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/`);
    
    // Test HSTS header
    const hstsHeader = response.headers['strict-transport-security'];
    const hasHSTS = hstsHeader && hstsHeader.includes('max-age=');
    logTest('HSTS Header', hasHSTS, hasHSTS ? `Found: ${hstsHeader}` : 'Missing HSTS header');
    
    // Test X-Frame-Options
    const frameOptions = response.headers['x-frame-options'];
    const hasFrameOptions = frameOptions === 'DENY' || frameOptions === 'SAMEORIGIN';
    logTest('X-Frame-Options', hasFrameOptions, hasFrameOptions ? `Found: ${frameOptions}` : 'Missing or invalid X-Frame-Options');
    
    // Test X-XSS-Protection
    const xssProtection = response.headers['x-xss-protection'];
    const hasXSSProtection = xssProtection && xssProtection.includes('1');
    logTest('X-XSS-Protection', hasXSSProtection, hasXSSProtection ? `Found: ${xssProtection}` : 'Missing X-XSS-Protection');
    
    // Test X-Content-Type-Options
    const contentTypeOptions = response.headers['x-content-type-options'];
    const hasContentTypeOptions = contentTypeOptions === 'nosniff';
    logTest('X-Content-Type-Options', hasContentTypeOptions, hasContentTypeOptions ? `Found: ${contentTypeOptions}` : 'Missing X-Content-Type-Options');
    
    // Test Referrer-Policy
    const referrerPolicy = response.headers['referrer-policy'];
    const hasReferrerPolicy = referrerPolicy && referrerPolicy.includes('strict-origin');
    logTest('Referrer-Policy', hasReferrerPolicy, hasReferrerPolicy ? `Found: ${referrerPolicy}` : 'Missing Referrer-Policy');
    
    // Test Content-Security-Policy
    const csp = response.headers['content-security-policy'];
    const hasCSP = csp && csp.length > 0;
    logTest('Content-Security-Policy', hasCSP, hasCSP ? 'CSP header present' : 'Missing CSP header');
    
  } catch (error) {
    logTest('Security Headers', false, `Error: ${error.message}`);
  }
}

async function testHTTPSEnforcement() {
  console.log('\n🔐 Testing HTTPS Enforcement...');
  
  try {
    // Test HTTP to HTTPS redirect
    const response = await makeRequest(`${BASE_URL}/`);
    const hasRedirect = response.statusCode >= 300 && response.statusCode < 400;
    const locationHeader = response.headers.location;
    const redirectsToHttps = locationHeader && locationHeader.startsWith('https://');
    
    logTest('HTTP to HTTPS Redirect', hasRedirect && redirectsToHttps, 
      hasRedirect ? `Redirects to: ${locationHeader}` : 'No redirect found');
    
  } catch (error) {
    logTest('HTTPS Enforcement', false, `Error: ${error.message}`);
  }
}

async function testCSRFProtection() {
  console.log('\n🛡️ Testing CSRF Protection...');
  
  try {
    // Test contact form CSRF
    const contactResponse = await makeRequest(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      })
    });
    
    const contactData = JSON.parse(contactResponse.data);
    const csrfError = contactData.error && contactData.error.includes('CSRF');
    logTest('Contact Form CSRF Protection', csrfError, 
      csrfError ? 'CSRF token required' : 'CSRF protection not working');
    
    // Test subscribe form CSRF
    const subscribeResponse = await makeRequest(`${BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });
    
    const subscribeData = JSON.parse(subscribeResponse.data);
    const subscribeCsrfError = subscribeData.error && subscribeData.error.includes('CSRF');
    logTest('Subscribe Form CSRF Protection', subscribeCsrfError, 
      subscribeCsrfError ? 'CSRF token required' : 'CSRF protection not working');
    
  } catch (error) {
    logTest('CSRF Protection', false, `Error: ${error.message}`);
  }
}

async function testRateLimiting() {
  console.log('\n⏱️ Testing Rate Limiting...');
  
  try {
    const requests = [];
    
    // Make multiple rapid requests to test rate limiting
    for (let i = 0; i < 6; i++) {
      requests.push(
        makeRequest(`${BASE_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'Test message',
            _csrf: 'fake-token'
          })
        })
      );
    }
    
    const responses = await Promise.all(requests);
    const rateLimitResponses = responses.filter(res => res.statusCode === 429);
    const hasRateLimit = rateLimitResponses.length > 0;
    
    logTest('Rate Limiting', hasRateLimit, 
      hasRateLimit ? `${rateLimitResponses.length} requests were rate limited` : 'No rate limiting detected');
    
    // Check rate limit headers
    if (rateLimitResponses.length > 0) {
      const rateLimitHeaders = rateLimitResponses[0].headers;
      const hasRateLimitHeaders = rateLimitHeaders['x-ratelimit-limit'] && 
                                 rateLimitHeaders['x-ratelimit-remaining'] &&
                                 rateLimitHeaders['retry-after'];
      
      logTest('Rate Limit Headers', hasRateLimitHeaders, 
        hasRateLimitHeaders ? 'Rate limit headers present' : 'Missing rate limit headers');
    }
    
  } catch (error) {
    logTest('Rate Limiting', false, `Error: ${error.message}`);
  }
}

async function testSessionManagement() {
  console.log('\n🔑 Testing Session Management...');
  
  try {
    // Test session creation
    const response = await makeRequest(`${BASE_URL}/api/contact`, {
      method: 'GET'
    });
    
    const setCookieHeader = response.headers['set-cookie'];
    const hasSessionCookie = setCookieHeader && setCookieHeader.some(cookie => 
      cookie.includes('sessionId') && cookie.includes('HttpOnly')
    );
    
    logTest('Session Cookie Creation', hasSessionCookie, 
      hasSessionCookie ? 'Secure session cookie created' : 'No secure session cookie found');
    
    // Test CSRF token generation
    const csrfToken = response.headers['x-csrf-token'];
    const hasCsrfToken = csrfToken && csrfToken.length > 10;
    
    logTest('CSRF Token Generation', hasCsrfToken, 
      hasCsrfToken ? 'CSRF token generated' : 'No CSRF token found');
    
  } catch (error) {
    logTest('Session Management', false, `Error: ${error.message}`);
  }
}

async function testInputValidation() {
  console.log('\n✅ Testing Input Validation...');
  
  try {
    // Test XSS protection
    const xssResponse = await makeRequest(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message',
        _csrf: 'fake-token'
      })
    });
    
    const xssData = JSON.parse(xssResponse.data);
    const xssHandled = xssResponse.statusCode === 400 || xssResponse.statusCode === 403;
    logTest('XSS Input Sanitization', xssHandled, 
      xssHandled ? 'XSS input rejected' : 'XSS input not properly handled');
    
    // Test email validation
    const invalidEmailResponse = await makeRequest(`${BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'invalid-email',
        _csrf: 'fake-token'
      })
    });
    
    const emailData = JSON.parse(invalidEmailResponse.data);
    const emailValidated = emailData.error && emailData.error.includes('email');
    logTest('Email Validation', emailValidated, 
      emailValidated ? 'Invalid email rejected' : 'Email validation not working');
    
  } catch (error) {
    logTest('Input Validation', false, `Error: ${error.message}`);
  }
}

async function testHoneypotProtection() {
  console.log('\n🍯 Testing Honeypot Protection...');
  
  try {
    // Test honeypot with filled field
    const honeypotResponse = await makeRequest(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message',
        honeypot: 'filled', // This should trigger honeypot protection
        _csrf: 'fake-token'
      })
    });
    
    const honeypotData = JSON.parse(honeypotResponse.data);
    const honeypotWorking = honeypotData.success && honeypotData.message.includes('successfully');
    logTest('Honeypot Protection', honeypotWorking, 
      honeypotWorking ? 'Honeypot working (bot caught)' : 'Honeypot not working');
    
  } catch (error) {
    logTest('Honeypot Protection', false, `Error: ${error.message}`);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Security Test Suite...');
  console.log(`Testing against: ${BASE_URL}`);
  
  await testSecurityHeaders();
  await testHTTPSEnforcement();
  await testCSRFProtection();
  await testRateLimiting();
  await testSessionManagement();
  await testInputValidation();
  await testHoneypotProtection();
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);
  
  // Failed tests
  const failedTests = results.tests.filter(test => !test.passed);
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests:');
    failedTests.forEach(test => {
      console.log(`   - ${test.name}: ${test.details}`);
    });
  }
  
  console.log('\n🔒 Security Assessment Complete!');
}

// Run tests
runAllTests().catch(console.error); 
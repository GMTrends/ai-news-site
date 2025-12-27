// Newsletter subscription handler for Netlify Functions
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { email, firstName, lastName, source, honeypot } = data;

    // Honeypot validation to prevent spam
    if (honeypot) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Successfully subscribed!' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    // Validation
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email address is required' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    // Rate limiting check
    const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    const rateLimitKey = `subscribe_${clientIP}`;
    
    // In production, implement proper rate limiting with Redis or similar

    // Check if email already exists (in production, check against your database)
    // For now, we'll assume it's a new subscription

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Welcome email content
    const welcomeMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to AI Buzz Media Newsletter! 🤖',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00d4ff 0%, #6366f1 100%); color: white; padding: 2rem; text-align: center;">
            <h1 style="margin: 0; font-size: 2rem;">🤖 Welcome to AI Buzz Media!</h1>
            <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Your source for cutting-edge AI news and insights</p>
          </div>
          
          <div style="padding: 2rem; background: #f9fafb;">
            <h2 style="color: #1f2937; margin-top: 0;">Thank you for subscribing!</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Hi ${firstName || 'there'},<br><br>
              
              Welcome to the AI Buzz Media newsletter! You're now part of a community of AI enthusiasts, researchers, and professionals who stay ahead of the curve in artificial intelligence.
            </p>
            
            <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #00d4ff;">
              <h3 style="margin: 0 0 1rem 0; color: #1f2937;">What you'll receive:</h3>
              <ul style="color: #6b7280; line-height: 1.6; margin: 0; padding-left: 1.5rem;">
                <li>📰 Latest AI breakthroughs and research</li>
                <li>🔍 In-depth analysis of AI tools and platforms</li>
                <li>💡 Expert insights from verified AI researchers</li>
                <li>📊 Industry trends and business impact</li>
                <li>🎓 Educational content and tutorials</li>
              </ul>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Our next newsletter will be delivered to your inbox soon. In the meantime, check out our latest articles at <a href="https://aibuzzmedia.com" style="color: #00d4ff;">aibuzzmedia.com</a>.
            </p>
            
            <div style="text-align: center; margin: 2rem 0;">
              <a href="https://aibuzzmedia.com" style="background: linear-gradient(135deg, #00d4ff, #6366f1); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                Visit Our Site
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0;">
            
            <p style="color: #9ca3af; font-size: 0.9rem; text-align: center; margin: 0;">
              You can unsubscribe at any time by clicking the link in the footer of our emails.<br>
              AI Buzz Media • 123 Tech Street, San Francisco, CA 94105
            </p>
          </div>
        </div>
      `,
      text: `
        Welcome to AI Buzz Media!
        
        Hi ${firstName || 'there'},
        
        Thank you for subscribing to our newsletter! You're now part of a community of AI enthusiasts, researchers, and professionals who stay ahead of the curve in artificial intelligence.
        
        What you'll receive:
        - Latest AI breakthroughs and research
        - In-depth analysis of AI tools and platforms
        - Expert insights from verified AI researchers
        - Industry trends and business impact
        - Educational content and tutorials
        
        Our next newsletter will be delivered to your inbox soon. In the meantime, check out our latest articles at https://aibuzzmedia.com
        
        Best regards,
        The AI Buzz Media Team
        
        You can unsubscribe at any time by clicking the link in the footer of our emails.
        AI Buzz Media • 123 Tech Street, San Francisco, CA 94105
      `
    };

    // Send welcome email
    await transporter.sendMail(welcomeMailOptions);

    // Notification email to admin (optional)
    if (process.env.ADMIN_EMAIL) {
      const adminNotificationOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Newsletter Subscription',
        html: `
          <h3>New Newsletter Subscription</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Name:</strong> ${firstName || ''} ${lastName || ''}</p>
          <p><strong>Source:</strong> ${source || 'Unknown'}</p>
          <p><strong>Date:</strong> ${new Date().toISOString()}</p>
        `,
        text: `
          New Newsletter Subscription
          
          Email: ${email}
          Name: ${firstName || ''} ${lastName || ''}
          Source: ${source || 'Unknown'}
          Date: ${new Date().toISOString()}
        `
      };

      await transporter.sendMail(adminNotificationOptions);
    }

    // In a production environment, you would also:
    // 1. Save the subscriber to your database
    // 2. Add them to your email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Track the subscription event in analytics

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed! Check your email for a welcome message.' 
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to subscribe. Please try again later.' 
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
}; 
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
    const { name, email, subject, message, honeypot } = data;

    // Honeypot validation to prevent spam
    if (honeypot) {
      console.log('Honeypot triggered - likely spam');
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' }),
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

    // Sanitize inputs to prevent XSS
    const sanitizeInput = (input) => {
      return input
        .replace(/[<>]/g, '') // Remove angle brackets
        .replace(/["']/g, '') // Remove quotes
        .replace(/[&]/g, '&amp;') // Encode ampersands
        .trim()
        .substring(0, 5000); // Limit length
    };

    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Log the contact form submission
    console.log('Contact Form Submission:', {
      name: sanitizedName,
      email: email.toLowerCase(),
      subject: sanitizedSubject,
      messageLength: sanitizedMessage.length,
      timestamp: new Date().toISOString(),
      userAgent: event.headers['user-agent'],
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'
    });

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email content for AI Buzz Media
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@aibuzzmedia.com',
      to: process.env.CONTACT_EMAIL || 'contact@aibuzzmedia.com',
      subject: `AI Buzz Media Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
            New Contact Form Submission - AI Buzz Media
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${email.toLowerCase()}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00d4ff;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p><strong>Submission Details:</strong></p>
            <p>Time: ${new Date().toLocaleString()}</p>
            <p>IP: ${event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'}</p>
            <p>User Agent: ${event.headers['user-agent'] || 'unknown'}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          <p style="text-align: center; color: #6c757d; font-size: 12px;">
            Sent from AI Buzz Media contact form
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission - AI Buzz Media
        
        Name: ${sanitizedName}
        Email: ${email.toLowerCase()}
        Subject: ${sanitizedSubject}
        Message: ${sanitizedMessage}
        
        Submission Details:
        Time: ${new Date().toLocaleString()}
        IP: ${event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'}
        User Agent: ${event.headers['user-agent'] || 'unknown'}
        
        Sent from AI Buzz Media contact form
      `
    };

    // Send email to AI Buzz Media
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMailOptions = {
      from: process.env.SMTP_USER || 'noreply@aibuzzmedia.com',
      to: email.toLowerCase(),
      subject: 'Thank you for contacting AI Buzz Media',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff; text-align: center;">Thank you for contacting AI Buzz Media!</h2>
          
          <p>Dear ${sanitizedName},</p>
          
          <p>We have received your message and will get back to you as soon as possible, typically within 24 hours.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00d4ff;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>In the meantime, you can:</p>
          <ul>
            <li>Check out our latest <a href="https://aibuzzmedia.com" style="color: #00d4ff;">AI news and articles</a></li>
            <li>Subscribe to our <a href="https://aibuzzmedia.com" style="color: #00d4ff;">newsletter</a> for updates</li>
            <li>Follow us on social media for real-time AI insights</li>
          </ul>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          <p style="text-align: center; color: #6c757d;">
            Best regards,<br>
            <strong>The AI Buzz Media Team</strong><br>
            <a href="https://aibuzzmedia.com" style="color: #00d4ff;">aibuzzmedia.com</a>
          </p>
        </div>
      `,
      text: `
        Thank you for contacting AI Buzz Media!
        
        Dear ${sanitizedName},
        
        We have received your message and will get back to you as soon as possible, typically within 24 hours.
        
        Your message: ${sanitizedMessage}
        
        In the meantime, you can:
        - Check out our latest AI news and articles at aibuzzmedia.com
        - Subscribe to our newsletter for updates
        - Follow us on social media for real-time AI insights
        
        Best regards,
        The AI Buzz Media Team
        aibuzzmedia.com
      `
    };

    await transporter.sendMail(confirmationMailOptions);

    console.log('Contact form email sent successfully to:', process.env.CONTACT_EMAIL || 'contact@aibuzzmedia.com');

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! We will get back to you within 24 hours.' 
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send message. Please try again later or email us directly at contact@aibuzzmedia.com' 
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
}; 
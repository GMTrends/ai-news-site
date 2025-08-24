# Email Setup for AI Buzz Media Contact Forms

## Overview

The contact forms on AI Buzz Media are configured to send emails to `contact@aibuzzmedia.com` using Netlify functions with nodemailer.

## Configuration

### Environment Variables Required

Set these environment variables in your Netlify dashboard:

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com          # Your SMTP server
SMTP_PORT=587                     # SMTP port (587 for TLS, 465 for SSL)
SMTP_USER=your-email@gmail.com    # Your email address
SMTP_PASS=your-app-password       # Your email password or app password

# Contact Email
CONTACT_EMAIL=contact@aibuzzmedia.com  # Where to send contact form submissions
```

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Use the app password** as `SMTP_PASS`

### Alternative Email Providers

#### Outlook/Hotmail
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo
```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

#### Custom SMTP Server
```bash
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
```

## How It Works

1. **Contact Form Submission**: User fills out the contact form
2. **Netlify Function**: `/.netlify/functions/contact` processes the submission
3. **Email to AI Buzz Media**: Form data is sent to `contact@aibuzzmedia.com`
4. **Confirmation Email**: User receives a confirmation email
5. **Spam Protection**: Honeypot field prevents automated spam

## Email Templates

### To AI Buzz Media
- **Subject**: `AI Buzz Media Contact: [User's Subject]`
- **Content**: Formatted HTML with user details and message
- **Includes**: Name, email, subject, message, submission details

### To User (Confirmation)
- **Subject**: `Thank you for contacting AI Buzz Media`
- **Content**: Professional confirmation with AI Buzz Media branding
- **Includes**: User's message, links to website and newsletter

## Security Features

- **Input Sanitization**: Prevents XSS attacks
- **Honeypot Protection**: Catches automated spam
- **Email Validation**: Ensures valid email format
- **Rate Limiting**: Built into Netlify functions
- **CORS Protection**: Proper headers for security

## Testing

1. **Local Testing**: Use Netlify CLI to test functions locally
2. **Production Testing**: Submit a test contact form
3. **Email Verification**: Check both recipient and sender emails

## Troubleshooting

### Common Issues

1. **Authentication Failed**:
   - Check SMTP credentials
   - Ensure 2FA is enabled for Gmail
   - Use app password, not regular password

2. **Emails Not Sending**:
   - Verify environment variables are set
   - Check Netlify function logs
   - Ensure SMTP server allows connections

3. **Spam Filtering**:
   - Check spam/junk folders
   - Verify sender email domain
   - Consider using a dedicated email service

### Logs

Check Netlify function logs in the Netlify dashboard:
- Go to Functions tab
- Click on the contact function
- View real-time logs

## Maintenance

- **Regular Testing**: Test contact forms monthly
- **Email Monitoring**: Check for failed deliveries
- **Security Updates**: Keep nodemailer updated
- **Backup Configuration**: Document all settings

## Support

For issues with email functionality:
1. Check Netlify function logs
2. Verify environment variables
3. Test SMTP credentials
4. Contact support if needed

---

**Note**: This setup ensures all contact form submissions are properly delivered to `contact@aibuzzmedia.com` with professional formatting and spam protection. 
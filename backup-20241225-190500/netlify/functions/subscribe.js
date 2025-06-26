// Newsletter subscription handler for Netlify Functions
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Basic email validation
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Valid email is required' })
      };
    }

    // Here you would typically:
    // 1. Save to your email service (Mailchimp, ConvertKit, etc.)
    // 2. Send confirmation email
    // 3. Log the subscription

    // For now, we'll just return success
    // TODO: Integrate with your email service provider
    console.log('Newsletter signup:', email);

    // Example integration with external service:
    // const response = await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed'
    //   })
    // });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to AI Buzz Media newsletter!' 
      })
    };

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error. Please try again later.' 
      })
    };
  }
}; 
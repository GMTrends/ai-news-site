// Test script for Sanity webhook
// Run this to test your webhook setup

const crypto = require('crypto');

// Test webhook payload (simulates a published article)
const testPayload = {
  _id: 'test-article-123',
  _type: 'article',
  status: 'published',
  title: 'Test Article',
  slug: { current: 'test-article' },
  transition: 'create',
  publishedAt: new Date().toISOString()
};

// Test webhook signature (if you have a secret)
const secret = process.env.SANITY_WEBHOOK_SECRET || 'test-secret';
const signature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(testPayload))
  .digest('hex');

// Test the webhook
async function testWebhook() {
  const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:8888/.netlify/functions/sanity-webhook-simple';
  
  console.log('Testing webhook...');
  console.log('URL:', webhookUrl);
  console.log('Payload:', JSON.stringify(testPayload, null, 2));
  console.log('Signature:', signature);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-sanity-signature': signature
      },
      body: JSON.stringify(testPayload)
    });
    
    const result = await response.json();
    
    console.log('\nResponse Status:', response.status);
    console.log('Response Body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('\n✅ Webhook test successful!');
    } else {
      console.log('\n❌ Webhook test failed!');
    }
    
  } catch (error) {
    console.error('\n❌ Error testing webhook:', error.message);
  }
}

// Run the test
if (require.main === module) {
  testWebhook();
}

module.exports = { testWebhook, testPayload }; 
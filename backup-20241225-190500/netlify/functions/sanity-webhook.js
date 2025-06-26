const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const signature = event.headers['x-sanity-signature'];
    
    // Verify webhook signature (optional but recommended)
    if (process.env.SANITY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.SANITY_WEBHOOK_SECRET)
        .update(event.body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid signature' })
        };
      }
    }

    // Log the webhook event
    console.log('Sanity webhook received:', {
      type: body.transition,
      documentId: body._id,
      documentType: body._type,
      timestamp: new Date().toISOString()
    });

    // Handle different types of content changes
    const documentType = body._type;
    const transition = body.transition; // 'create', 'update', 'delete'

    // Only trigger rebuild for published content changes
    if (transition === 'create' || transition === 'update') {
      // Check if this is a published article
      if (documentType === 'article' && body.status === 'published') {
        console.log('Published article detected, triggering rebuild');
        
        // Trigger Netlify rebuild
        const rebuildResponse = await triggerNetlifyRebuild();
        
        if (rebuildResponse.success) {
          console.log('Netlify rebuild triggered successfully');
          return {
            statusCode: 200,
            body: JSON.stringify({ 
              message: 'Webhook processed successfully',
              rebuildTriggered: true,
              documentId: body._id
            })
          };
        } else {
          console.error('Failed to trigger Netlify rebuild:', rebuildResponse.error);
          return {
            statusCode: 500,
            body: JSON.stringify({ 
              error: 'Failed to trigger rebuild',
              details: rebuildResponse.error
            })
          };
        }
      }
      
      // Handle other content types
      if (['author', 'category'].includes(documentType)) {
        console.log(`${documentType} updated, triggering rebuild`);
        const rebuildResponse = await triggerNetlifyRebuild();
        
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            message: 'Webhook processed successfully',
            rebuildTriggered: true,
            documentType,
            documentId: body._id
          })
        };
      }
    }

    // For other changes, just acknowledge receipt
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Webhook received but no rebuild needed',
        documentType,
        transition
      })
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};

async function triggerNetlifyRebuild() {
  try {
    const siteId = process.env.NETLIFY_SITE_ID;
    const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
    
    if (!siteId || !accessToken) {
      return {
        success: false,
        error: 'Missing Netlify configuration'
      };
    }

    const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clear_cache: 'true'
      })
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        buildId: result.id,
        url: result.deploy_url
      };
    } else {
      const errorText = await response.text();
      return {
        success: false,
        error: `Netlify API error: ${response.status} - ${errorText}`
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
} 
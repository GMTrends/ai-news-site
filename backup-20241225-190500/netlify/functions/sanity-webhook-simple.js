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
        
        // Trigger Netlify rebuild using the deploy hook
        const rebuildResponse = await triggerNetlifyDeploy();
        
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
        const rebuildResponse = await triggerNetlifyDeploy();
        
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

async function triggerNetlifyDeploy() {
  try {
    const deployHookUrl = process.env.NETLIFY_DEPLOY_HOOK;
    
    if (!deployHookUrl) {
      return {
        success: false,
        error: 'Missing NETLIFY_DEPLOY_HOOK environment variable'
      };
    }

    const response = await fetch(deployHookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trigger_title: 'Sanity Content Update',
        trigger_branch: 'main'
      })
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Deploy hook triggered successfully'
      };
    } else {
      const errorText = await response.text();
      return {
        success: false,
        error: `Deploy hook error: ${response.status} - ${errorText}`
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
} 
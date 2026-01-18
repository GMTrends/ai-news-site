import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  let email = '';
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    email = body.email;
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const bodyText = await request.text();
    const params = new URLSearchParams(bodyText);
    email = params.get('email') || '';
  }

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  }

  const apiKey = import.meta.env.EMAILOCTOPUS_API_KEY;
  const listId = import.meta.env.EMAILOCTOPUS_LIST_ID;

  if (!apiKey || !listId) {
    return new Response(JSON.stringify({ error: 'EmailOctopus API key or List ID not set.' }), { status: 500 });
  }

  // Debug logging
  console.log('EmailOctopus API Key exists:', !!apiKey);
  console.log('EmailOctopus List ID exists:', !!listId);
  console.log('Email:', email);

  // EmailOctopus API docs: https://emailoctopus.com/api-documentation/lists/add-contact
  const res = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      api_key: apiKey,
      email_address: email,
      status: 'SUBSCRIBED',
      tags: ['Subscribed'], // Automatically assign the "Subscribed" tag
    }),
  });

  if (!res.ok) {
    let errorMsg = 'Subscription failed.';
    try {
      const error = await res.json();
      if (error && typeof error === 'object') {
        errorMsg = error.message || error.error || JSON.stringify(error);
      }
    } catch (e) {
      errorMsg = 'Subscription failed.';
    }
    console.log('EmailOctopus API error:', errorMsg);
    return new Response(JSON.stringify({ error: errorMsg }), { status: res.status });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

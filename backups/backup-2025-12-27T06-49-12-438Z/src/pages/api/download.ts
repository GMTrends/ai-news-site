import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  // TODO: Validate token (implement your logic)
  if (token === 'valid-token') {
    return Response.redirect('/assets/lead-magnets/2025%20AI%20Money%20%26%20Productivity%20Vault.zip');
  }
  return new Response('Unauthorized', { status: 401 });
};

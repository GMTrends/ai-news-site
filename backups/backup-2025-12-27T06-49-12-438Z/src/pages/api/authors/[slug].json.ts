import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';

// GET: Get specific author
// PUT: Update specific author
// DELETE: Delete specific author
export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Author slug is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const authors = await getCollection('authors');
    const author = authors.find(a => a.slug === slug);

    if (!author) {
      return new Response(JSON.stringify({ error: 'Author not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify(author), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching author:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch author' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Author slug is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const body = await request.json();
    const { name, title, bio, avatar, social } = body;

    // Validate required fields
    if (!name || !bio) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: name and bio are required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Check if author exists
    const authors = await getCollection('authors');
    const authorExists = authors.some(author => author.slug === slug);

    if (!authorExists) {
      return new Response(JSON.stringify({ error: 'Author not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Update author markdown file
    const authorContent = `---
name: ${name}
slug: ${slug}
title: ${title || ''}
bio: ${bio}
avatar: ${avatar || ''}
social:
  twitter: ${social?.twitter || ''}
  linkedin: ${social?.linkedin || ''}
  github: ${social?.github || ''}
---

${bio}
`;

    // Write updated author file
    const authorsDir = path.join(process.cwd(), 'src', 'content', 'authors');
    const filePath = path.join(authorsDir, `${slug}.md`);
    await fs.writeFile(filePath, authorContent, 'utf-8');

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Author updated successfully',
      author: { name, slug, title, bio, avatar, social }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error updating author:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update author',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Author slug is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Check if author exists
    const authors = await getCollection('authors');
    const authorExists = authors.some(author => author.slug === slug);

    if (!authorExists) {
      return new Response(JSON.stringify({ error: 'Author not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Delete author markdown file
    const authorsDir = path.join(process.cwd(), 'src', 'content', 'authors');
    const filePath = path.join(authorsDir, `${slug}.md`);
    
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete author file' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Author deleted successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error deleting author:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete author',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

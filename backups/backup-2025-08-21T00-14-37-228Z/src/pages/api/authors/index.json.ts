import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';

// GET: List all authors
// POST: Create new author
export const GET: APIRoute = async () => {
  try {
    const authors = await getCollection('authors');
    return new Response(JSON.stringify(authors), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch authors' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, slug, title, bio, avatar, social } = body;

    // Validate required fields
    if (!name || !slug || !bio) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: name, slug, and bio are required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Check if author with this slug already exists
    try {
      const existingAuthors = await getCollection('authors');
      const slugExists = existingAuthors.some(author => author.slug === slug);
      
      if (slugExists) {
        return new Response(JSON.stringify({ 
          error: 'Author with this slug already exists' 
        }), {
          status: 409,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      // Collection might not exist yet, which is fine for first author
      console.log('Authors collection not found, creating first author');
    }

    // Create author markdown file
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

    // Ensure authors directory exists
    const authorsDir = path.join(process.cwd(), 'src', 'content', 'authors');
    try {
      await fs.access(authorsDir);
    } catch {
      await fs.mkdir(authorsDir, { recursive: true });
    }

    // Write author file
    const filePath = path.join(authorsDir, `${slug}.md`);
    await fs.writeFile(filePath, authorContent, 'utf-8');

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Author created successfully',
      author: { name, slug, title, bio, avatar, social }
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error creating author:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create author',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

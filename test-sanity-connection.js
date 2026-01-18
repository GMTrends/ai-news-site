import { createClient } from '@sanity/client';
import 'dotenv/config';

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

async function testSanityConnection() {
  try {
    console.log('Testing Sanity connection...');
    console.log('Project ID:', process.env.VITE_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.VITE_SANITY_DATASET);
    console.log('API Version:', process.env.VITE_SANITY_API_VERSION);
    
    // Test basic connection
    const result = await sanityClient.fetch('*[_type == "faq"][0..2]');
    console.log('Sanity connection successful!');
    console.log('Number of FAQs found:', result.length);
    console.log('FAQ data:', JSON.stringify(result, null, 2));
    
    // Test the exact query from faq.astro
    const faqQuery = `
      *[_type == "faq" && isPublished == true] | order(priority desc, _createdAt asc) {
        _id,
        question,
        answer,
        category,
        priority,
        tags,
        helpfulCount,
        relatedArticles[]-> {
          title,
          slug
        }
      }
    `;
    
    const faqs = await sanityClient.fetch(faqQuery);
    console.log('\nFull FAQ query results:');
    console.log('Number of published FAQs:', faqs.length);
    console.log('FAQs:', JSON.stringify(faqs, null, 2));
    
  } catch (error) {
    console.error('Sanity connection failed:', error);
  }
}

testSanityConnection();

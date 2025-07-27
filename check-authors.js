import { sanityClient } from './src/lib/sanity.ts';

async function checkAuthors() {
  try {
    const authors = await sanityClient.fetch('*[_type == "author"]{name, slug}');
    console.log('Sanity Authors:', JSON.stringify(authors, null, 2));
    
    const articles = await sanityClient.fetch('*[_type == "article"][0..2]{title, "author": author->{name, slug}}');
    console.log('Sample Articles with Authors:', JSON.stringify(articles, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

checkAuthors();

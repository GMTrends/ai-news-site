import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'components', 'AIBuzzLayout.astro');

// Read the file content
let content = fs.readFileSync(filePath, 'utf8');

// Count occurrences before replacement
const beforeCount = (content.match(/Math\.max\(1, Math\.ceil/g) || []).length;

console.log(`Found ${beforeCount} occurrences to replace`);

// Replace the complex calculation with the simple function call
// Use a simpler pattern that matches the key parts
const newContent = content.replace(
  /Math\.max\(1, Math\.ceil\(\(\(article\.excerpt \? article\.excerpt\.split\(\/\\s\+\/\)\.length : 0\) \+ \(article\.content \? portableTextToPlainText\(article\.content\)\.split\(\/\\s\+\/\)\.length : 0\)\) \/ 200\)\)\)/g,
  'calculateReadTime(article)'
);

// Count occurrences after replacement
const afterCount = (newContent.match(/calculateReadTime\(article\)/g) || []).length;

// Write the file back
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`Successfully replaced ${beforeCount} read-time calculations with calculateReadTime function calls!`);
console.log(`New count: ${afterCount} calculateReadTime calls`);

// If the regex didn't work, try a different approach
if (afterCount === 0) {
  console.log('Regex replacement failed, trying string replacement...');
  
  // Read the file again
  content = fs.readFileSync(filePath, 'utf8');
  
  // Try simple string replacement
  const simpleNewContent = content.replace(
    'Math.max(1, Math.ceil(((article.excerpt ? article.excerpt.split(/\\s+/).length : 0) + (article.content ? portableTextToPlainText(article.content).split(/\\s+/).length : 0)) / 200)))',
    'calculateReadTime(article)'
  );
  
  // Write back
  fs.writeFileSync(filePath, simpleNewContent, 'utf8');
  
  const finalCount = (simpleNewContent.match(/calculateReadTime\(article\)/g) || []).length;
  console.log(`Simple replacement result: ${finalCount} calculateReadTime calls`);
}

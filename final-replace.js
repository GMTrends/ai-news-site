import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'components', 'AIBuzzLayout.astro');

// Read the file content
let content = fs.readFileSync(filePath, 'utf8');

// Count remaining occurrences
const remainingCount = (content.match(/Math\.max\(1, Math\.ceil\(\(\(article\.excerpt \? article\.excerpt\.split\(\/\\s\+\/\)\.length : 0\) \+ \(article\.content \? portableTextToPlainText\(article\.content\)\.split\(\/\\s\+\/\)\.length : 0\)\) \/ 200\)\)\)/g) || []).length;

console.log(`Found ${remainingCount} remaining read-time calculations to replace`);

// Replace all remaining occurrences
const newContent = content.replace(
  /Math\.max\(1, Math\.ceil\(\(\(article\.excerpt \? article\.excerpt\.split\(\/\\s\+\/\)\.length : 0\) \+ \(article\.content \? portableTextToPlainText\(article\.content\)\.split\(\/\\s\+\/\)\.length : 0\)\) \/ 200\)\)\)/g,
  'calculateReadTime(article)'
);

// Count final occurrences
const finalCount = (newContent.match(/calculateReadTime\(article\)/g) || []).length;

// Write the file back
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`Successfully replaced all remaining read-time calculations!`);
console.log(`Total calculateReadTime calls: ${finalCount}`);
console.log(`Replaced ${remainingCount} more calculations`);

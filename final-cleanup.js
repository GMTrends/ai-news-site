import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'components', 'AIBuzzLayout.astro');

// Read the file content
let content = fs.readFileSync(filePath, 'utf8');

// Count remaining Math.max calculations
const remainingCount = (content.match(/Math\.max\(1, Math\.ceil\(\(\(article\.excerpt \? article\.excerpt\.split\(\/\\s\+\/\)\.length : 0\) \+ \(article\.content \? portableTextToPlainText\(article\.content\)\.split\(\/\\s\+\/\)\.length : 0\)\) \/ 200\)\)\)/g) || []).length;

console.log(`Found ${remainingCount} remaining Math.max calculations to replace`);

// Replace all remaining occurrences with a more flexible approach
let newContent = content;
let replacedCount = 0;

// Use a more flexible regex that handles whitespace variations
const regex = /Math\.max\(1,\s*Math\.ceil\(\(\(article\.excerpt\s*\?\s*article\.excerpt\.split\(\/\\s\+\/\)\.length\s*:\s*0\)\s*\+\s*\(article\.content\s*\?\s*portableTextToPlainText\(article\.content\)\.split\(\/\\s\+\/\)\.length\s*:\s*0\)\)\s*\/\s*200\)\)\)/g;

newContent = newContent.replace(regex, 'calculateReadTime(article)');

// Count final occurrences
const finalCount = (newContent.match(/calculateReadTime\(article\)/g) || []).length;

// Write the file back
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`Successfully completed read-time calculation replacement!`);
console.log(`Total calculateReadTime calls: ${finalCount}`);
console.log(`Replaced ${remainingCount} more calculations`);

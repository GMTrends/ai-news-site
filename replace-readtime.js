import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'components', 'AIBuzzLayout.astro');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// The old complex calculation pattern - simplified regex
const oldPattern = /Math\.max\(1, Math\.ceil\(\(\(article\.excerpt \? article\.excerpt\.split\(\/\\s\+\/\)\.length : 0\) \+ \(article\.content \? portableTextToPlainText\(article\.content\)\.split\(\/\\s\+\/\)\.length : 0\)\) \/ 200\)\)\)/g;

// The new simple function call
const newPattern = 'calculateReadTime(article)';

// Replace all occurrences
const newContent = content.replace(oldPattern, newPattern);

// Write the file back
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('Successfully replaced read-time calculations with calculateReadTime function calls!');
console.log(`Replaced ${(content.match(oldPattern) || []).length} occurrences.`);

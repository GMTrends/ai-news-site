import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to remove console.log statements from a file
function removeConsoleLogs(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Remove console.log statements with various patterns
    content = content.replace(/console\.log\([^)]*\);?\s*/g, '');
    content = content.replace(/console\.log\([^)]*\);\s*/g, '');

    // Remove empty lines that might be left
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned: ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// List of category page files to clean
const categoryFiles = [
  'src/pages/categories/ecommerce.astro',
  'src/pages/categories/marketing.astro',
  'src/pages/categories/business.astro',
  'src/pages/categories/ai-agents.astro',
  'src/pages/categories/creative.astro',
  'src/pages/categories/productivity.astro'
];

// Clean all category files
console.log('🧹 Cleaning console.log statements from category pages...\n');

categoryFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    removeConsoleLogs(filePath);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✨ Console.log cleanup complete!');

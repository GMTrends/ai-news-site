import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(msg) { console.log(msg); }

// 1. Check what files actually exist in src/content/articles/
const articlesDir = path.join(__dirname, 'src', 'content', 'articles');
if (fs.existsSync(articlesDir)) {
  const files = fs.readdirSync(articlesDir);
  log(`Files in articles/: ${files.join(', ')}`);
} else {
  log('articles/ directory does not exist.');
}

// 2. Search for any remaining references to "getting-started-with-ai.md"
function searchFileReferences(dir, filename) {
  let found = false;
  if (!fs.existsSync(dir)) return found;
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      found = searchFileReferences(fullPath, filename) || found;
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(filename)) {
        log(`Reference found in ${fullPath}`);
        found = true;
      }
    }
  }
  return found;
}
searchFileReferences(path.join(__dirname, 'src'), 'getting-started-with-ai.md');

// 3. Delete all Astro caches (.astro/, dist/, node_modules/.cache/, .vite/)
['.astro', 'dist', 'node_modules/.cache', '.vite'].forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    log(`Deleted ${dir}`);
  }
});

// 4. Clean up any hidden or temp files in the content directory
const contentDir = path.join(__dirname, 'src', 'content');
if (fs.existsSync(contentDir)) {
  for (const dir of fs.readdirSync(contentDir)) {
    const fullDir = path.join(contentDir, dir);
    if (fs.statSync(fullDir).isDirectory()) {
      for (const file of fs.readdirSync(fullDir)) {
        if (file.startsWith('.') || file.endsWith('~') || file.endsWith('.tmp')) {
          fs.unlinkSync(path.join(fullDir, file));
          log(`Deleted temp/hidden file: ${file}`);
        }
      }
    }
  }
}

// 5. If articles directory exists, clean it completely and recreate it
if (fs.existsSync(articlesDir)) {
  for (const file of fs.readdirSync(articlesDir)) {
    fs.unlinkSync(path.join(articlesDir, file));
  }
  log('Cleaned articles/ directory.');
} else {
  fs.mkdirSync(articlesDir, { recursive: true });
  log('Created articles/ directory.');
}

// 6. Create one simple test file: src/content/articles/test-post.md
const testPostPath = path.join(articlesDir, 'test-post.md');
fs.writeFileSync(testPostPath, `---\ntitle: Test Post\nslug: test-post\n---\n\n# Test Post\n\nThis is a test post.\n`);
log('Created test-post.md');

// 7. Clear any TypeScript cache
const tsBuildInfo = path.join(__dirname, 'tsconfig.tsbuildinfo');
if (fs.existsSync(tsBuildInfo)) {
  fs.unlinkSync(tsBuildInfo);
  log('Deleted tsconfig.tsbuildinfo');
}

log('\nCleanup complete! Now run: npx astro sync && npm run build'); 
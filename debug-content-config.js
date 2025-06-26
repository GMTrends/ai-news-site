import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Debugging Content Configuration...\n');

// Check if content config exists
const configPath = path.join(__dirname, 'src', 'content.config.ts');
if (fs.existsSync(configPath)) {
  console.log('✅ Content config found:', configPath);
  
  const configContent = fs.readFileSync(configPath, 'utf8');
  console.log('\n📄 Content config content:');
  console.log('---');
  console.log(configContent);
  console.log('---\n');
} else {
  console.log('❌ Content config not found:', configPath);
}

// Check content directories
const contentDirs = ['authors', 'categories', 'articles', 'pages'];
contentDirs.forEach(dir => {
  const dirPath = path.join(__dirname, 'src', 'content', dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    console.log(`📁 ${dir}: ${files.length} files`);
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        console.log(`  📄 ${file}:`);
        console.log(`    Frontmatter length: ${frontmatter.length} chars`);
        console.log(`    Contains slug: ${frontmatter.includes('slug:')}`);
        console.log(`    Slug value: ${frontmatter.match(/slug:\s*(.+)/)?.[1] || 'NOT FOUND'}`);
        console.log(`    File encoding: ${Buffer.from(content, 'utf8').toString('hex').substring(0, 20)}...`);
      } else {
        console.log(`  ❌ ${file}: No frontmatter found`);
      }
    });
  } else {
    console.log(`❌ ${dir}: Directory not found`);
  }
});

// Check for .astro directory
const astroDir = path.join(__dirname, '.astro');
if (fs.existsSync(astroDir)) {
  console.log('\n📁 .astro directory exists - may need clearing');
} else {
  console.log('\n✅ .astro directory does not exist');
}

console.log('\n�� Debug complete!'); 
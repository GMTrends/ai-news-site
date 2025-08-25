// Image Optimization Script
// Run this to optimize static images in the public folder

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '../../public');
const IMAGES_DIR = join(PUBLIC_DIR, 'images');

async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const input = sharp(inputPath);
    const metadata = await input.metadata();
    
    console.log(`Optimizing ${filename}:`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);
    
    // Generate WebP version
    await input
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(join(outputDir, filename.replace(/\.(jpg|jpeg|png)$/i, '.webp')));
    
    // Generate AVIF version  
    await input
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .avif({ quality: 80 })
      .toFile(join(outputDir, filename.replace(/\.(jpg|jpeg|png)$/i, '.avif')));
    
    // Generate optimized JPEG fallback
    await input
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85, progressive: true })
      .toFile(join(outputDir, filename.replace(/\.(jpg|jpeg|png)$/i, '-optimized.jpg')));
    
    console.log(`  ✓ Generated WebP, AVIF, and optimized JPEG versions`);
    
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

async function optimizeStaticImages() {
  try {
    // Check if Sharp is available
    console.log('🖼️  Starting static image optimization...\n');
    
    // Optimize author images
    const authorsDir = join(IMAGES_DIR, 'authors');
    const authorFiles = await fs.readdir(authorsDir);
    
    for (const file of authorFiles) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        await optimizeImage(join(authorsDir, file), authorsDir, file);
      }
    }
    
    console.log('\n✅ Static image optimization complete!');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error.message);
    console.log('\n💡 To fix this, install Sharp:');
    console.log('   npm install sharp --save-dev');
  }
}

optimizeStaticImages();

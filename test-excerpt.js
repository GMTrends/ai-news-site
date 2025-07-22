const fs = require('fs');
const path = require('path');

// Import the excerpt generator (we'll need to adapt it for Node.js)
function generateExcerpt(body, maxLength = 160) {
  if (!body || typeof body !== 'string') {
    return '';
  }

  // Clean the text by removing markdown syntax, HTML tags, and extra whitespace
  let cleanText = body
    // Remove markdown headers
    .replace(/^#+\s+/gm, '')
    // Remove markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove extra whitespace and newlines
    .replace(/\s+/g, ' ')
    .trim();

  // If text is shorter than maxLength, return it as is
  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // Truncate to maxLength and find the last complete word
  let truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) { // Only break at word if it's not too early
    truncated = truncated.substring(0, lastSpace);
  }

  // Add ellipsis if we truncated
  return truncated + '...';
}

// Test the excerpt generation
console.log('🧪 Testing Excerpt Generation\n');

// Test 1: Simple text
const simpleText = `# Simple Test

This is a simple test.`;
console.log('Test 1 - Simple text:');
console.log('Input:', simpleText);
console.log('Output:', generateExcerpt(simpleText));
console.log('Length:', generateExcerpt(simpleText).length);
console.log('');

// Test 2: Complex markdown
const complexText = `# Testing Automated Excerpt Generation

This is a comprehensive test article to verify that our automated excerpt generation system works correctly with various content types.

## What We're Testing

The excerpt generator should be able to handle:
- **Bold text** and *italic text*
- [Links to other pages](https://example.com)
- \`Inline code snippets\`
- Lists and numbered items
- Blockquotes and other markdown elements

### Code Blocks

\`\`\`javascript
function testExcerpt() {
  console.log("This should be removed from excerpts");
  return "Only text content should remain";
}
\`\`\`

### Lists

1. First item in a numbered list
2. Second item with some **bold text**
3. Third item with a [link](https://example.com)

- Unordered list item
- Another item with \`code\`
- Final item

### Blockquotes

> This is a blockquote that should be properly handled by the excerpt generator. It contains multiple sentences to test how the system handles longer content.`;

console.log('Test 2 - Complex markdown:');
console.log('Input length:', complexText.length);
console.log('Output:', generateExcerpt(complexText));
console.log('Output length:', generateExcerpt(complexText).length);
console.log('');

// Test 3: Short text (shouldn't be truncated)
const shortText = 'This is a very short article that should not be truncated.';
console.log('Test 3 - Short text:');
console.log('Input:', shortText);
console.log('Output:', generateExcerpt(shortText));
console.log('Length:', generateExcerpt(shortText).length);
console.log('');

// Test 4: Text with HTML tags
const htmlText = '<h1>Title</h1><p>This is a <strong>paragraph</strong> with <em>HTML tags</em> and a <a href="https://example.com">link</a>.</p>';
console.log('Test 4 - HTML text:');
console.log('Input:', htmlText);
console.log('Output:', generateExcerpt(htmlText));
console.log('Length:', generateExcerpt(htmlText).length);
console.log('');

console.log('✅ Excerpt generation tests completed!'); 
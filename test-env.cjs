const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.resolve(__dirname, '.env');
console.log('Looking for .env at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('File content:');
    console.log('---START---');
    console.log(content);
    console.log('---END---');
    console.log('Content length:', content.length);
}

require('dotenv').config();

console.log('Environment variables:');
console.log('BEEHIIV_API_KEY:', process.env.BEEHIIV_API_KEY);
console.log('BEEHIIV_PUBLICATION_ID:', process.env.BEEHIIV_PUBLICATION_ID);
console.log('TEST_VAR:', process.env.TEST_VAR);
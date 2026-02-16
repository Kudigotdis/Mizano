const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR);
}

// Read index.html
let indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

// Regex to find CSS links
const cssRegex = /<link rel="stylesheet" href="(?:\.\/)?([^"]*?)">/g;
const jsRegex = /<script src="(?:\.\/)?([^"]*?)"><\/script>/g;

let match;
const cssFiles = [];
const jsFiles = [];

// Extract CSS files
while ((match = cssRegex.exec(indexHtml)) !== null) {
    if (!match[1].includes('bundle')) {
        cssFiles.push(match[1]);
    }
}

// Extract JS files
while ((match = jsRegex.exec(indexHtml)) !== null) {
    if (!match[1].includes('bundle')) {
        jsFiles.push(match[1]);
    }
}

console.log(`Found ${cssFiles.length} CSS files and ${jsFiles.length} JS files.`);

// Concatenate CSS
let cssBundle = '';
cssFiles.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
        cssBundle += `/* FILE: ${file} */\n${content}\n`;
    } catch (e) {
        console.error(`Error reading ${file}:`, e.message);
    }
});
fs.writeFileSync(path.join(DIST_DIR, 'bundle.css'), cssBundle);
console.log('Created dist/bundle.css');

// Concatenate JS
let jsBundle = '';
jsFiles.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
        // Add a safety semicolon to prevent IIFE issues when concatenating
        jsBundle += `// FILE: ${file}\n;${content}\n`;
    } catch (e) {
        console.error(`Error reading ${file}:`, e.message);
    }
});
fs.writeFileSync(path.join(DIST_DIR, 'bundle.js'), jsBundle);
console.log('Created dist/bundle.js');

// Create Optimized HTML
let optimizedHtml = indexHtml;

// Replace CSS imports with bundle
const cssBlock = cssFiles.map(f => `<link rel="stylesheet" href="./${f}">`).join('\n    ');
// Allow loose matching for whitespace
// actually, let's just replace the whole head block or specific lines.
// Simpler: Replace the FIRST css match with the bundle link, and remove others.

// 2. Insert bundle.css in head (after title)
optimizedHtml = optimizedHtml.replace('</title>', '</title>\n    <link rel="stylesheet" href="./dist/bundle.css">');

// 3. Remove all discovered JS scripts
// We need to match the exact string format used in the HTML
const scriptTagRegex = /<script src="(?:\.\/)?([^"]*?)"><\/script>/g;
optimizedHtml = optimizedHtml.replace(scriptTagRegex, (match, path) => {
    // If the path was in our jsFiles list, remove the tag
    if (jsFiles.includes(path) || jsFiles.includes(path.replace('./', ''))) {
        return '';
    }
    return match; // Keep it if we didn't bundle it (e.g. remote)
});

// Remove CSS tags similarly
const linkTagRegex = /<link rel="stylesheet" href="(?:\.\/)?([^"]*?)">/g;
optimizedHtml = optimizedHtml.replace(linkTagRegex, (match, path) => {
    if (cssFiles.includes(path) || cssFiles.includes(path.replace('./', ''))) {
        return '';
    }
    return match;
});

// 4. Insert bundle.js at end of body
optimizedHtml = optimizedHtml.replace('</body>', '    <script src="./dist/bundle.js"></script>\n</body>');

// Clean up empty lines left by removal (rudimentary)
optimizedHtml = optimizedHtml.replace(/^\s*[\r\n]/gm, '');

fs.writeFileSync(path.join(ROOT_DIR, 'index.prod.html'), optimizedHtml);
console.log('Created index.prod.html with optimized assets.');

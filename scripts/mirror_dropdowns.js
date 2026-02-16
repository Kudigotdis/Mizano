const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../data/dropdowns');
const OUTPUT_DIR = path.join(__dirname, '../data/databases');

function mirrorDropdowns() {
    console.log('Starting Dropdown Mirroring...');

    if (!fs.existsSync(INPUT_DIR)) {
        console.error('Input directory does not exist:', INPUT_DIR);
        return;
    }

    const files = fs.readdirSync(INPUT_DIR);

    files.forEach(file => {
        if (file.endsWith('.txt') || file.endsWith('.md')) {
            const content = fs.readFileSync(path.join(INPUT_DIR, file), 'utf-8');
            const lines = content.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('#') && !l.startsWith('- -'));

            // Simple generic parser for list items
            const data = lines.map((line, index) => {
                // Try to clean up standard markdown list items
                const cleanLine = line.replace(/^-\s*/, '').trim();
                return {
                    id: index + 1,
                    raw_text: cleanLine
                };
            });

            const outputName = file.replace(/\.(txt|md)$/, '.json').toLowerCase();
            fs.writeFileSync(path.join(OUTPUT_DIR, outputName), JSON.stringify(data, null, 2));
            console.log(`Mirrored ${file} to ${outputName}`);
        }
    });
}

mirrorDropdowns();

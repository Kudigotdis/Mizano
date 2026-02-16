const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'c:/Users/Kudzanai/Documents/2025/App Developments/Mizano';
const DATA_DIR = path.join(PROJECT_ROOT, 'data/databases');

// Helper to convert YAML-like string block to Object
function parseYamlBlock(block) {
    const lines = block.split('\n');
    const obj = {};
    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();

            // Clean quotes if present
            // Handle booleans
            if (value === 'true') value = true;
            else if (value === 'false') value = false;

            obj[key] = value;
        }
    });
    return obj;
}

// 1. Process Teams
function processTeams() {
    const teamFile = path.join(DATA_DIR, 'MIZANO_SOCCER_TEAMS_DATABASE.md');
    const content = fs.readFileSync(teamFile, 'utf8');

    // Regex for YAML blocks
    // Matches ```yaml ... ```
    const regex = /```yaml\s*([\s\S]*?)\s*```/g;
    const teams = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        const block = match[1];
        try {
            const team = parseYamlBlock(block);
            if (team.team_id) {
                teams.push(team);
            }
        } catch (e) {
            console.error('Error parsing team block:', e);
        }
    }

    // Wrap in JS
    const jsContent = `
/**
 * AUTO-GENERATED: Teams Database
 * Source: MIZANO_SOCCER_TEAMS_DATABASE.md
 */
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.teams = ${JSON.stringify(teams, null, 2)};
console.log('Mizano Data: Loaded ' + window.MIZANO_DATA.teams.length + ' teams.');
`;

    fs.writeFileSync(path.join(DATA_DIR, 'teams.js'), jsContent);
    console.log(`Processed ${teams.length} teams -> teams.js`);
}

// 2. Process Activities (Events)
function processActivities() {
    const eventFiles = ['MIZANO_EVENTS_DATABASE_2026.md', 'BOTSWANA_2026_EVENTS_DATABASE.md'];
    const activities = [];

    eventFiles.forEach(file => {
        const filePath = path.join(DATA_DIR, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');

            // Regex for JSON blocks
            const regex = /```json\s*([\s\S]*?)\s*```/g; // Matches json blocks
            // Note: Some files use javascript block for arrays
            const jsRegex = /```javascript\s*([\s\S]*?)\s*```/g;

            let match;

            // Extract JSON blocks (Individual Objects)
            while ((match = regex.exec(content)) !== null) {
                let block = match[1].trim();
                // If it starts with a variable declaration (const ... =), strip it
                if (block.startsWith('[')) {
                    // It's an array
                    try {
                        const items = JSON.parse(block);
                        if (Array.isArray(items)) {
                            activities.push(...items);
                        }
                    } catch (e) { console.error('Error parsing JSON array:', e); }
                } else {
                    // Try single object
                    try {
                        // Clean trailing commas if simple
                        const item = JSON.parse(block);
                        if (item.eventID || item.event_id) {
                            activities.push(item);
                        }
                    } catch (e) {
                        // Check if it wrapped in const X = ...
                    }
                }
            }

            // Extract Javascript Arrays (manually simple parse)
            while ((match = jsRegex.exec(content)) !== null) {
                let block = match[1].trim();
                // Find [ ... ]
                const start = block.indexOf('[');
                const end = block.lastIndexOf(']');
                if (start !== -1 && end !== -1) {
                    const jsonStr = block.substring(start, end + 1);
                    // This "JSON" might be loose JS (keys without quotes). JSON.parse will fail.
                    // We will attempt a loose parse or strict if valid.
                    // Actually, the specific files provided use valid key quotes usually?
                    // Let's rely on JSON parse first.
                    try {
                        // It's valid JSON?
                        const items = JSON.parse(jsonStr);
                        activities.push(...items);
                    } catch (e) {
                        // Fallback: Using Function constructor (unsafe but okay for local build script)
                        try {
                            // "const JANUARY... = [...]" -> extract [...]
                            // This is risky. 
                            // Alternative: Just manually fix known issues or skip.
                            // Actually, let's just log it.
                        } catch (e2) { }
                    }
                }
            }
        }
    });

    // Normalize Data Structure for Mizano Activity Card
    const normalized = activities.map(a => {
        return {
            activity_id: a.eventID || a.event_id,
            title: a.eventName || a.event_name,
            activity_type: mapType(a),
            sport: a.sport || 'soccer', // Default
            start_time: a.dates?.startDate || a.start_date,
            location_name: a.venue?.primary || a.venue_name || 'TBA',
            status: 'published',
            // ... map other fields
            description: a.description || a.tagline
        };
    });

    const jsContent = `
/**
 * AUTO-GENERATED: Activities Database
 */
window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.activities = ${JSON.stringify(normalized, null, 2)};
console.log('Mizano Data: Loaded ' + window.MIZANO_DATA.activities.length + ' activities.');
`;

    fs.writeFileSync(path.join(DATA_DIR, 'activities.js'), jsContent);
    console.log(`Processed ${normalized.length} activities -> activities.js`);
}

function mapType(a) {
    if (a.competitionFormat) return 'competition';
    if (a.mizano_event_type) return a.mizano_event_type;
    return 'event';
}

processTeams();
processActivities();

/**
 * MIZANO SPACES DATA GENERATOR
 * Generates bookable spaces for each venue
 */

(function () {
    window.MIZANO_DATA = window.MIZANO_DATA || {};

    // Wait for venues to load
    const generateSpaces = () => {
        const venues = window.MIZANO_DATA.venues || [];
        if (venues.length === 0) {
            setTimeout(generateSpaces, 100);
            return;
        }

        const spaces = [];

        // Space templates based on venue category
        const spaceTemplates = {
            school: [
                { name: 'Sports Hall', type: 'indoor_hall', capacity: 200, features: ['Basketball Court', 'Changing Rooms', 'Scoreboard'] },
                { name: 'Football Field', type: 'outdoor_field', capacity: 500, features: ['Grass Pitch', 'Floodlights'] },
                { name: 'Netball Court', type: 'outdoor_court', capacity: 50, features: ['Hard Court', 'Lights'] }
            ],
            tertiary: [
                { name: 'Main Stadium', type: 'stadium', capacity: 5000, features: ['Track', 'Seating', 'Floodlights'] },
                { name: 'Indoor Sports Centre', type: 'indoor_hall', capacity: 300, features: ['Basketball Court', 'Volleyball Court', 'Seating'] },
                { name: 'Training Field', type: 'outdoor_field', capacity: 200, features: ['Grass Pitch'] }
            ],
            community_hall: [
                { name: 'Main Hall', type: 'indoor_hall', capacity: 150, features: ['Basketball Court', 'Stage', 'Kitchen'] },
                { name: 'Meeting Room', type: 'meeting_room', capacity: 30, features: ['Tables', 'Chairs', 'Whiteboard'] }
            ],
            gym: [
                { name: 'Fitness Floor', type: 'gym', capacity: 50, features: ['Cardio', 'Weights', 'Free Weights'] },
                { name: 'Studio', type: 'studio', capacity: 20, features: ['Mirrors', 'Sound System', 'Mats'] }
            ],
            swimming_pool: [
                { name: 'Main Pool', type: 'pool', capacity: 30, features: ['Lanes', 'Changing Rooms'] },
                { name: 'Kids Pool', type: 'pool', capacity: 10, features: ['Shallow', 'Lifeguard'] }
            ],
            stadium: [
                { name: 'Main Pitch', type: 'stadium', capacity: 10000, features: ['Floodlights', 'Seating', 'VIP Boxes'] },
                { name: 'Training Ground', type: 'outdoor_field', capacity: 200, features: ['Grass', 'Changing Rooms'] }
            ]
        };

        venues.forEach(venue => {
            const template = spaceTemplates[venue.category] || spaceTemplates.community_hall;
            const numSpaces = Math.min(template.length, Math.floor(Math.random() * 2) + 2); // 2-3 spaces per venue

            for (let i = 0; i < numSpaces; i++) {
                const t = template[i % template.length];
                const space = {
                    space_id: `space_${venue.id}_${i + 1}`,
                    venue_id: venue.id,
                    name: t.name + (i > 0 && template.length <= i ? ` ${i + 1}` : ''),
                    type: t.type,
                    capacity: t.capacity,
                    description: `${t.name} at ${venue.name}. ${t.features.join(', ')}.`,
                    price_per_hour: venue.booking.price_per_hour || 50,
                    currency: venue.booking.currency || 'BWP',
                    images: [venue.image || `./images/venues/${venue.id}_space${i + 1}.webp`],
                    features: t.features,
                    rules: 'No smoking, no alcohol. Clean up after use. Respect facility hours.',
                    requirements: 'Booking required 24h in advance. Valid ID required.',
                    cancellation_policy: 'Free cancellation up to 48h before booking. 50% refund within 24h.'
                };
                spaces.push(space);
            }
        });

        window.MIZANO_DATA.spaces = spaces;
        console.log(`✅ Generated ${spaces.length} bookable spaces`);
    };

    generateSpaces();
})();

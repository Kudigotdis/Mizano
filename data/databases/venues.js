/**
 * MIZANO VENUES DATA LOADER
 * Loads venue data from botswana_venues_1.json and botswana_venues_2.json
 */

(async function () {
    window.MIZANO_DATA = window.MIZANO_DATA || {};

    try {
        // Load both venue JSON files
        const [venues1Response, venues2Response] = await Promise.all([
            fetch('./data/databases/botswana_venues_1.json'),
            fetch('./data/databases/botswana_venues_2.json')
        ]);

        const venues1 = await venues1Response.json();
        const venues2 = await venues2Response.json();

        // Combine and filter only bookable venues
        window.MIZANO_DATA.venues = [...venues1, ...venues2].filter(v => v.booking?.enabled);

        console.log(`✅ Loaded ${window.MIZANO_DATA.venues.length} bookable venues`);
    } catch (error) {
        console.error('❌ Error loading venues:', error);
        window.MIZANO_DATA.venues = [];
    }
})();

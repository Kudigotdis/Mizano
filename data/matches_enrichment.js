/**
 * MIZANO DATA ENRICHMENT: Matches
 * Enriches 14,240 match records with venues, realistic scores, and stats.
 */
(function enrichMatches() {
    if (!window.MIZANO_DATA || !window.MIZANO_DATA.matches) {
        console.warn('[Mizano] matches_enrichment: window.MIZANO_DATA.matches not found');
        return;
    }

    // Simple deterministic hash for consistent assignment
    function stableHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    const venues = [
        "National Stadium", "UB Stadium", "Block 3 Complex", "Broadhurst ground",
        "G-West Grounds", "Tlokweng VDC", "Kgale View Ground", "Phakalane Courts",
        "Botswana Life Ground", "Maru-a-Pula Grounds", "Lobatse Stadium", "Francistown Stadium",
        "Maun Stadium", "Selebi Phikwe Stadium", "Jwaneng Town Stadium"
    ];

    const matchFixes = window.MIZANO_DATA.matches.map(match => {
        const h = stableHash(match.match_id || '');

        // 1. Assign Venue
        match.venue_name = venues[h % venues.length];

        // 2. Score Logic (Realism)
        if (match.status === 'finished') {
            const scoreA = h % 4;
            const scoreB = (h >> 2) % 3;
            // Avoid 0-0 for finished matches (unless really intended)
            if (scoreA === 0 && scoreB === 0) {
                match.score_a = 1;
                match.score_b = 0;
            } else {
                match.score_a = scoreA;
                match.score_b = scoreB;
            }
        } else {
            match.score_a = 0;
            match.score_b = 0;
        }

        // 3. Stats Enrichment
        match.attendance = 50 + (h % 950);
        match.scorers = h % 2 === 0 ? "K. Molosi (14'), T. Nkwe (67')" : "M. Tau (42')";

        return match;
    });

    window.MIZANO_DATA.matches = matchFixes;
    console.log(`[Mizano] matches_enrichment: Enriched ${matchFixes.length} records`);
})();

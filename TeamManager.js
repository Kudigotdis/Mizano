/**
 * MIZANO - TeamManager.js
 * Handles the Team Management Overlay, Fixture List, and Fixture Editing.
 * Integrates with StorageManager for persistence.
 */

window.TeamManager = (function() {
    let currentTeamId = null;
    let fixtures = [];

    async function init() {
        console.log('TeamManager: Initialized');
        // Ensure Madimo fixtures are available in the global activity pool for Home feed
        _injectIntoGlobalFeed();
    }

    async function open(teamId) {
        currentTeamId = teamId;
        const overlay = document.getElementById('team-manager-overlay');
        if (overlay) overlay.style.display = 'flex';

        await _loadFixtures();
        _renderHeader();
        _renderFixtureList();
    }

    function close() {
        const overlay = document.getElementById('team-manager-overlay');
        if (overlay) overlay.style.display = 'none';
    }

    async function _loadFixtures() {
        // 1. Get base fixtures from static data
        let baseFixtures = [];
        if (currentTeamId === 'GC009') {
            baseFixtures = JSON.parse(JSON.stringify(window.MIZANO_DATA.madimo_fixtures || []));
        }

        // 2. Load overrides from StorageManager (IndexedDB)
        if (window.mizanoStorage) {
            try {
                // Fetch all activities related to this team
                const savedFixtures = await window.mizanoStorage.getEntitiesByFilter('activities', (a) => a.team_id === currentTeamId);
                
                if (savedFixtures && savedFixtures.length > 0) {
                    // Merge saved fixtures with base (overwriting by ID)
                    savedFixtures.forEach(saved => {
                        const idx = baseFixtures.findIndex(f => f.id === saved.fixture_id || f.id === saved.id);
                        if (idx !== -1) {
                            baseFixtures[idx] = { ...baseFixtures[idx], ...saved };
                        } else {
                            baseFixtures.push(saved);
                        }
                    });
                }
            } catch (e) {
                console.warn('TeamManager: Failed to load saved fixtures', e);
            }
        }

        fixtures = baseFixtures;
    }

    function _renderHeader() {
        const titleEl = document.getElementById('team-manager-title');
        if (titleEl) {
            titleEl.textContent = currentTeamId === 'GC009' ? 'Manage Madimo FC' : 'Manage Team';
        }
    }

    function _renderFixtureList() {
        const container = document.getElementById('team-fixtures-container');
        if (!container) return;

        if (fixtures.length === 0) {
            container.innerHTML = '<div style="padding:40px; text-align:center; color:#999;">No fixtures found for this team.</div>';
            return;
        }

        let html = '';
        fixtures.forEach(fix => {
            const dateObj = new Date(fix.date);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            
            html += `
                <div class="mizano-card" style="margin:10px 16px; padding:12px; border-left:4px solid ${fix.type === 'Home' ? '#1E88E5' : '#777'};">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                        <div>
                            <div style="font-size:0.75rem; font-weight:bold; color:#777; text-transform:uppercase;">${fix.type} Fixture</div>
                            <div style="font-weight:bold; font-size:1rem; margin:2px 0;">vs ${fix.opponent}</div>
                        </div>
                        <div style="display:flex; gap:8px;">
                            <button class="action-pill" style="padding:4px 12px; font-size:0.75rem;" onclick="window.TeamManager.editFixture('${fix.id}')">Edit</button>
                            <button class="action-pill" style="padding:4px 12px; font-size:0.75rem; background:#4CAF50; color:white; border:none;" onclick="window.TeamManager.reportResult('${fix.id}')">Result</button>
                        </div>
                    </div>
                    <div style="display:flex; gap:15px; font-size:0.85rem; color:#555;">
                        <span>📅 ${dateStr}</span>
                        <span>⏰ ${fix.time}</span>
                    </div>
                    <div style="margin-top:5px; font-size:0.8rem; color:#888;">
                        📍 ${fix.venue}
                        ${fix.score ? `<span style="float:right; font-weight:bold; color:#222;">Score: ${fix.score}</span>` : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    async function editFixture(fixtureId) {
        const fix = fixtures.find(f => f.id === fixtureId);
        if (!fix) return;

        const newTime = prompt(`Edit time for match vs ${fix.opponent}:`, fix.time);
        if (newTime !== null) {
            fix.time = newTime;
            await _saveFixture(fix);
            _renderFixtureList();
        }
    }

    async function reportResult(fixtureId) {
        const fix = fixtures.find(f => f.id === fixtureId);
        if (!fix) return;

        const score = prompt(`Enter score for vs ${fix.opponent} (e.g. 2-1):`, fix.score || '');
        if (score !== null) {
            fix.score = score;
            fix.status = 'Finished';
            await _saveFixture(fix);
            _renderFixtureList();
        }
    }

    async function _saveFixture(fix) {
        if (!window.mizanoStorage) return;

        // Normalize to Activity schema
        const activity = {
            ...fix,
            local_id: fix.local_id || undefined, // Let IndexedDB handle if new
            fixture_id: fix.id,
            team_id: currentTeamId,
            activity_type: 'Match',
            card_type: 'Standard Match Card',
            title: `Match vs ${fix.opponent}`,
            start_date: fix.date,
            start_time: fix.time,
            last_modified: Date.now()
        };

        try {
            await window.mizanoStorage.saveEntity('activities', activity);
            console.log('TeamManager: Fixture saved to persistence', activity);
        } catch (e) {
            console.error('TeamManager: Failed to save fixture', e);
        }
    }

    function _injectIntoGlobalFeed() {
        // This ensures the fixtures appear in the Home/Sports panels
        // by pushing them into window.MIZANO_DATA.activities
        if (window.MIZANO_DATA && window.MIZANO_DATA.madimo_fixtures) {
            window.MIZANO_DATA.activities = window.MIZANO_DATA.activities || [];
            
            window.MIZANO_DATA.madimo_fixtures.forEach(fix => {
                const normalized = {
                    ...fix,
                    fixture_id: fix.id,
                    team_id: 'GC009',
                    activity_type: 'Match',
                    card_type: 'Standard Match Card',
                    title: `Match vs ${fix.opponent}`,
                    start_date: fix.date,
                    start_time: fix.time,
                    left_team: { name: 'Madimo FC', logo: '⚽' },
                    right_team: { name: fix.opponent, logo: '🏆' },
                    left_score: fix.score ? fix.score.split('-')[0] : 0,
                    right_score: fix.score ? fix.score.split('-')[1] : 0,
                    state: fix.status === 'Finished' ? 'Passed' : 'Active Soon'
                };
                
                // Add if not already there
                if (!window.MIZANO_DATA.activities.some(a => a.fixture_id === fix.id)) {
                    window.MIZANO_DATA.activities.push(normalized);
                }
            });
        }
    }

    return {
        init,
        open,
        close,
        editFixture,
        reportResult
    };
})();

// Auto-init on load
document.addEventListener('DOMContentLoaded', window.TeamManager.init);

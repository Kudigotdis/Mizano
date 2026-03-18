/**
 * SchoolsDirectory.js
 * Mizano — Educational Institutions Directory
 * Renders schools from schools.js into a searchable, alphabetically-indexed list.
 * Tapping a school opens its Public Profile with a Teams tab.
 */

window.SchoolsDirectory = (() => {

    let _allSchools = [];
    let _filtered = [];
    let _searchTimeout = null;

    // ─── INIT ────────────────────────────────────────────────────────────────

    function init() {
        // Source data — from schools.js
        const raw = window.MIZANO_DATA?.schools || [];
        _allSchools = _normaliseData(raw);
        _filtered = [..._allSchools];

        // Bind search input for the directory
        _bindSearch();
    }

    // ─── DATA NORMALISATION ──────────────────────────────────────────────────

    function _normaliseData(raw) {
        return raw.map(s => ({
            id:          s.id          || s.school_id || '',
            name:        s.name        || s.full_name || '',
            type:        s.type        || 'Educational Institution',
            city:        s.city        || '',
            area:        s.area        || '',
            logo:        s.logo        || '',
            emoji:       '🏫',
            description: s.description || s.bio || '',
            stats:       s.stats       || {},
            teams:       s.teams       || []
        })).sort((a, b) => a.name.localeCompare(b.name));
    }

    // ─── DIRECTORY UI ────────────────────────────────────────────────────────

    function open() {
        // Reuse school-overlay for the directory list
        const overlay = document.getElementById('school-overlay');
        if (!overlay) return;

        // Reset UI
        const title = overlay.querySelector('h2');
        if (title) title.textContent = "Schools Directory";

        const closeBtn = document.getElementById('school-overlay-close');
        if (closeBtn) {
            closeBtn.onclick = () => window.MizanoNav.back();
        }

        _renderList();
        _buildAlphaSidebar();
        window.MizanoNav.openOverlay('school');
    }

    function _renderList(data) {
        const area = document.getElementById('school-list-area');
        if (!area) return;

        const list = data || _filtered;

        if (!list.length) {
            area.innerHTML = `<div style="padding:40px 16px; text-align:center; color:#999; font-size:0.9rem;">
                No schools found</div>`;
            return;
        }

        const groups = {};
        list.forEach(s => {
            const letter = (s.name[0] || '#').toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(s);
        });

        let html = '';
        Object.keys(groups).sort().forEach(letter => {
            html += `<div class="assoc-section-header" data-letter="${letter}">${letter}</div>`;
            groups[letter].forEach(s => {
                html += `
                <div class="assoc-list-item" onclick="window.SchoolsDirectory.openDetail('${s.id}')">
                    <div class="assoc-icon">${s.emoji}</div>
                    <div class="assoc-meta">
                        <p class="assoc-name">${s.name}</p>
                        <p class="assoc-sport">${s.type}${s.city ? ' · ' + s.city : ''}</p>
                    </div>
                    <span class="assoc-chevron">›</span>
                </div>`;
            });
        });

        area.innerHTML = html;
    }

    function _buildAlphaSidebar() {
        const sidebar = document.getElementById('school-alpha-sidebar');
        if (!sidebar) return;

        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const presentLetters = new Set(
            _allSchools.map(s => (s.name[0] || '').toUpperCase())
        );

        sidebar.innerHTML = ALPHABET.map(letter => `
            <span class="alpha-letter${presentLetters.has(letter) ? '' : ' alpha-disabled'}"
                  data-letter="${letter}"
                  onclick="window.SchoolsDirectory.scrollToLetter('${letter}')">${letter}</span>
        `).join('');
    }

    function scrollToLetter(letter) {
        const area = document.getElementById('school-list-area');
        const header = area ? area.querySelector(`[data-letter="${letter}"]`) : null;
        if (header) {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.querySelectorAll('#school-alpha-sidebar .alpha-letter').forEach(el => {
            el.classList.toggle('active', el.dataset.letter === letter);
        });
    }

    function _bindSearch() {
        const input = document.getElementById('school-search-input');
        if (!input) return;

        input.addEventListener('input', () => {
            clearTimeout(_searchTimeout);
            _searchTimeout = setTimeout(() => {
                const q = input.value.trim().toLowerCase();
                if (!q) {
                    _filtered = [..._allSchools];
                } else {
                    _filtered = _allSchools.filter(s =>
                        s.name.toLowerCase().includes(q) ||
                        s.type.toLowerCase().includes(q) ||
                        s.city.toLowerCase().includes(q)
                    );
                }
                _renderList();
            }, 180);
        });
    }

    // ─── DETAIL VIEW (PUBLIC PROFILE) ────────────────────────────────────────

    function openDetail(id) {
        const school = _allSchools.find(s => s.id == id);
        if (!school) return;

        _renderDetail(school);
        window.MizanoNav.openOverlay('school-detail');
        // Reset scroll and show first tab
        setTimeout(() => switchTab(0, true), 50);
    }

    function switchTab(index, instant = false) {
        const container = document.querySelector('#school-detail-content .assoc-panels-container');
        const tabs = document.querySelectorAll('#school-detail-content .assoc-tab');
        if (!container || !tabs.length) return;

        container.style.transition = instant ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.transform = `translateX(-${index * 33.33}%)`; // Using 3 panels: About, Teams, People

        tabs.forEach((t, i) => t.classList.toggle('active', i === index));

        const activeTab = tabs[index];
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    function _renderDetail(s) {
        const titleEl = document.getElementById('school-detail-title');
        const contentEl = document.getElementById('school-detail-content');
        if (!titleEl || !contentEl) return;

        titleEl.textContent = s.name;

        // --- PANEL 1: ABOUT ---
        const aboutHtml = `
            <div class="assoc-panel" id="school-panel-about">
                <div class="assoc-detail-hero">
                    <div class="assoc-detail-logo" style="background:#e3f2fd; font-size:2.5rem;">${s.emoji}</div>
                    <h2 class="assoc-detail-name">${s.name}</h2>
                    <span class="assoc-detail-badge">${s.type}</span>
                    <p style="color:#666; font-size:0.9rem; margin-top:4px;">${s.city}${s.area ? ', ' + s.area : ''}</p>
                </div>
                ${s.description ? `
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">About</p>
                    <p class="assoc-detail-section-body">${s.description}</p>
                </div>` : ''}
                
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Institutional Stats</p>
                    <div class="assoc-detail-row"><span class="assoc-detail-row-label">Staff</span><span class="assoc-detail-row-value">${s.stats?.staff || 'N/A'}</span></div>
                    <div class="assoc-detail-row"><span class="assoc-detail-row-label">Students</span><span class="assoc-detail-row-value">${s.stats?.students || 'N/A'}</span></div>
                    <div class="assoc-detail-row"><span class="assoc-detail-row-label">Athletes</span><span class="assoc-detail-row-value">${s.stats?.athletes || 'N/A'}</span></div>
                </div>
            </div>`;

        // --- PANEL 2: TEAMS ---
        const teamsHtml = `
            <div class="assoc-panel" id="school-panel-teams" style="background:#ecf1f6;">
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Sports Teams & Squads</p>
                    ${s.teams.length > 0 ? `
                        <div class="assoc-people-list">
                            ${s.teams.map(t => `
                                <div class="assoc-person-card" style="margin-bottom:8px; background:white;" onclick="window.SchoolsDirectory.showTeamPlayers('${t.id}', '${s.id}')">
                                    <div class="assoc-person-avatar" style="background:#4CAF50;">${t.sport[0]}</div>
                                    <div class="assoc-person-info">
                                        <p class="assoc-person-name">${t.name}</p>
                                        <p class="assoc-person-role">${t.sport}</p>
                                    </div>
                                    <span style="color:#999; font-size:1.2rem;">›</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p style="padding:20px; color:#666;">No teams listed.</p>'}
                </div>
            </div>`;

        // --- PANEL 3: PEOPLE (Students/Players) ---
        const students = (window.MIZANO_DATA?.users_generated || []).filter(u => u.school_id === s.id && u.role === 'Student').slice(0, 20);
        const peopleHtml = `
            <div class="assoc-panel" id="school-panel-people" style="background:#ecf1f6;">
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Notable Students & Athletes</p>
                    <div class="assoc-people-list">
                        ${students.length > 0 ? students.map(p => `
                            <div class="assoc-person-card" style="margin-bottom:8px; background:white;" onclick="window.MizanoProfileDetail.render('${p.id}')">
                                <div class="assoc-person-avatar">${p.name[0]}</div>
                                <div class="assoc-person-info">
                                    <p class="assoc-person-name">${p.name}</p>
                                    <p class="assoc-person-role">${p.gender === 'MALE' ? 'Male' : 'Female'} Student</p>
                                </div>
                            </div>
                        `).join('') : '<p style="padding:20px; color:#666;">No student profiles yet.</p>'}
                    </div>
                </div>
            </div>`;

        contentEl.innerHTML = `
            <div class="assoc-tabs-wrapper">
                <div class="assoc-tabs" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="assoc-tab" data-idx="0" onclick="window.SchoolsDirectory.switchTab(0)">About</div>
                    <div class="assoc-tab" data-idx="1" onclick="window.SchoolsDirectory.switchTab(1)">Teams</div>
                    <div class="assoc-tab" data-idx="2" onclick="window.SchoolsDirectory.switchTab(2)">Players</div>
                </div>
            </div>
            <div class="assoc-panels-viewport">
                <div class="assoc-panels-container" style="width: 300%;">
                    ${aboutHtml}
                    ${teamsHtml}
                    ${peopleHtml}
                </div>
            </div>`;
    }

    function showTeamPlayers(teamId, schoolId) {
        // For the demo, we'll just show the "Players" tab which filters students
        switchTab(2);
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', init);

    return {
        init,
        open,
        openDetail,
        scrollToLetter,
        switchTab,
        showTeamPlayers
    };

})();

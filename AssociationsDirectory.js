/**
 * AssociationsDirectory.js
 * Mizano — National Associations Directory
 * Renders the 34 BNSC-affiliated associations from bnscAffiliates.js
 * into a searchable, alphabetically-indexed list overlay with individual detail pages.
 */

window.AssociationsDirectory = (() => {

    let _allAssociations = [];
    let _filtered = [];
    let _searchTimeout = null;

    // ─── INIT ────────────────────────────────────────────────────────────────

    function init() {
        // Source data — bnscAffiliates is loaded via a <script> tag
        _allAssociations = _normaliseData(window.bnscAffiliates || []);
        _filtered = [..._allAssociations];

        _renderList();
        _buildAlphaSidebar();
        _bindSearch();
    }

    // ─── DATA NORMALISATION ──────────────────────────────────────────────────

    function _normaliseData(raw) {
        return raw.map(a => ({
            id:          a.id          || a.slug || _slugify(a.name || a.shortName || ''),
            name:        a.name        || a.fullName || a.title || '',
            abbr:        a.abbr        || a.shortName || a.acronym || '',
            sport:       a.sport       || a.discipline || a.category || '',
            description: a.description || a.bio || a.about || '',
            founded:     a.founded     || a.established || a.year || '',
            president:   a.president   || a.chairperson || a.chairman || a.head || '',
            website:     a.website     || a.url || '',
            email:       a.email       || a.contact?.email || '',
            phone:       a.phone       || a.contact?.phone || '',
            address:     a.address     || a.location || '',
            members:     a.members     || a.memberCount || '',
            logo:        a.logo        || a.logoUrl || a.image || '',
            emoji:       a.emoji       || _sportEmoji(a.sport || a.discipline || ''),
            tags:        a.tags        || a.affiliations || [],
            social: {
                facebook:  a.facebook  || a.social?.facebook || '',
                twitter:   a.twitter   || a.social?.twitter  || '',
                instagram: a.instagram || a.social?.instagram|| '',
            }
        })).sort((a, b) => a.name.localeCompare(b.name));
    }

    // ─── LIST RENDERING ──────────────────────────────────────────────────────

    function _renderList(data) {
        const area = document.getElementById('assoc-list-area');
        if (!area) return;

        const list = data || _filtered;

        if (!list.length) {
            area.innerHTML = `<div style="padding:40px 16px; text-align:center; color:#999; font-size:0.9rem;">
                No associations found</div>`;
            return;
        }

        const groups = {};
        list.forEach(a => {
            const letter = (a.name[0] || '#').toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(a);
        });

        let html = '';
        Object.keys(groups).sort().forEach(letter => {
            html += `<div class="assoc-section-header" data-letter="${letter}">${letter}</div>`;
            groups[letter].forEach(a => {
                const iconHtml = a.logo
                    ? `<img src="${a.logo}" alt="${a.abbr}" onerror="this.parentElement.innerHTML='${a.emoji}'">`
                    : a.emoji;
                html += `
                <div class="assoc-list-item" onclick="window.AssociationsDirectory.openDetail('${a.id}')">
                    <div class="assoc-icon">${iconHtml}</div>
                    <div class="assoc-meta">
                        <p class="assoc-name">${a.name}</p>
                        <p class="assoc-sport">${a.abbr ? a.abbr + (a.sport ? ' · ' + a.sport : '') : a.sport}</p>
                    </div>
                    <span class="assoc-chevron">›</span>
                </div>`;
            });
        });

        area.innerHTML = html;
    }

    // ─── ALPHA SIDEBAR ───────────────────────────────────────────────────────

    function _buildAlphaSidebar() {
        const sidebar = document.getElementById('assoc-alpha-sidebar');
        if (!sidebar) return;

        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const presentLetters = new Set(
            _allAssociations.map(a => (a.name[0] || '').toUpperCase())
        );

        sidebar.innerHTML = ALPHABET.map(letter => `
            <span class="alpha-letter${presentLetters.has(letter) ? '' : ' alpha-disabled'}"
                  data-letter="${letter}"
                  onclick="window.AssociationsDirectory.scrollToLetter('${letter}')">${letter}</span>
        `).join('');
    }

    function scrollToLetter(letter) {
        const area = document.getElementById('assoc-list-area');
        const header = area ? area.querySelector(`[data-letter="${letter}"]`) : null;
        if (header) {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.querySelectorAll('#assoc-alpha-sidebar .alpha-letter').forEach(el => {
            el.classList.toggle('active', el.dataset.letter === letter);
        });
    }

    // ─── SEARCH ──────────────────────────────────────────────────────────────

    function _bindSearch() {
        const input = document.getElementById('assoc-search-input');
        if (!input) return;

        input.addEventListener('input', () => {
            clearTimeout(_searchTimeout);
            _searchTimeout = setTimeout(() => {
                const q = input.value.trim().toLowerCase();
                if (!q) {
                    _filtered = [..._allAssociations];
                } else {
                    _filtered = _allAssociations.filter(a =>
                        a.name.toLowerCase().includes(q) ||
                        a.abbr.toLowerCase().includes(q) ||
                        a.sport.toLowerCase().includes(q)
                    );
                }
                _renderList();
            }, 180);
        });
    }

    // ─── DETAIL OVERLAY ──────────────────────────────────────────────────────

    function openDetail(id) {
        const assoc = _allAssociations.find(a => a.id == id);
        if (!assoc) return;

        _renderDetail(assoc);
        window.MizanoNav.openOverlay('association-detail');
        // Reset scroll and show first tab
        setTimeout(() => switchTab(0, true), 50);
    }

    function switchTab(index, instant = false) {
        const container = document.querySelector('.assoc-panels-container');
        const tabs = document.querySelectorAll('.assoc-tab');
        if (!container || !tabs.length) return;

        // Move container
        container.style.transition = instant ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.transform = `translateX(-${index * 20}%)`;

        // Update tabs
        tabs.forEach((t, i) => t.classList.toggle('active', i === index));

        // Scroll tab into view if needed
        const activeTab = tabs[index];
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    function _renderDetail(a) {
        const titleEl = document.getElementById('assoc-detail-title');
        const contentEl = document.getElementById('assoc-detail-content');
        if (!titleEl || !contentEl) return;

        const currentUser = window.authManager?.getCurrentUser?.();
        const isSuperAdmin = currentUser?.role === 'SUPER ADMIN';

        titleEl.textContent = a.abbr || a.name;

        const iconHtml = a.logo
            ? `<img src="${a.logo}" alt="${a.abbr}" onerror="this.style.display='none'; this.parentElement.innerHTML='${a.emoji}'">`
            : a.emoji;

        // --- PANEL 1: ABOUT ---
        const aboutHtml = `
            <div class="assoc-panel" id="panel-about">
                <div class="assoc-detail-hero">
                    <div class="assoc-detail-logo">${iconHtml}</div>
                    <h2 class="assoc-detail-name">${a.name}</h2>
                    ${a.abbr ? `<p class="assoc-detail-abbr">${a.abbr}</p>` : ''}
                    ${a.sport ? `<span class="assoc-detail-badge">${a.sport}</span>` : ''}
                </div>
                ${a.description ? `
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">About</p>
                    <p class="assoc-detail-section-body">${a.description}</p>
                </div>` : ''}
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Governing Stats</p>
                    <div class="assoc-detail-row"><span class="assoc-detail-row-label">Sport</span><span class="assoc-detail-row-value">${a.sport || 'N/A'}</span></div>
                    <div class="assoc-detail-row"><span class="assoc-detail-row-label">Founded</span><span class="assoc-detail-row-value">${a.founded || 'N/A'}</span></div>
                    <div class="assoc-detail-row"><span class="assoc-detail-row-label">Members</span><span class="assoc-detail-row-value">${a.members || 'N/A'}</span></div>
                </div>
            </div>`;

        // --- PANEL 2: PEOPLE ---
        const executives = window.MIZANO_DATA?.getExecutivesByAssociation ? window.MIZANO_DATA.getExecutivesByAssociation(a.id) : [];
        const peopleHtml = `
            <div class="assoc-panel" id="panel-people" style="background:#ecf1f6;">
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Core Team & Board</p>
                    ${executives.length > 0 ? `
                    <div class="assoc-people-list">
                        ${executives.map(p => `
                            <div class="assoc-person-card" onclick="window.MizanoProfileDetail.render('${p.uid}')">
                                <div class="assoc-person-avatar">${p.display_name[0]}</div>
                                <div class="assoc-person-info">
                                    <p class="assoc-person-name">${p.display_name} ${isSuperAdmin ? '✏️' : ''}</p>
                                    <p class="assoc-person-role">${p.executive_role}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>` : '<p style="padding:20px; color:#666;">No profiles available.</p>'}
                </div>
            </div>`;

        // --- PANEL 3: CONTACT ---
        const contactHtml = `
            <div class="assoc-panel" id="panel-contact">
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Direct Channels</p>
                    ${a.email ? `<div class="assoc-detail-row"><span class="assoc-detail-row-label">Email</span><span class="assoc-detail-row-value"><a href="mailto:${a.email}">${a.email}</a></span></div>` : ''}
                    ${a.phone ? `<div class="assoc-detail-row"><span class="assoc-detail-row-label">Phone</span><span class="assoc-detail-row-value"><a href="tel:${a.phone}">${a.phone}</a></span></div>` : ''}
                    ${a.website ? `<div class="assoc-detail-row"><span class="assoc-detail-row-label">Website</span><span class="assoc-detail-row-value"><a href="${a.website}" target="_blank">${a.address || a.website}</a></span></div>` : ''}
                    ${a.address ? `<div class="assoc-detail-row"><span class="assoc-detail-row-label">Office</span><span class="assoc-detail-row-value">${a.address}</span></div>` : ''}
                </div>
                ${a.email || a.phone ? `<button class="assoc-contact-btn" onclick="window.location.href='${a.email ? 'mailto:'+a.email : 'tel:'+a.phone}'">Message Office</button>` : ''}
            </div>`;

        // --- PANEL 4: AFFILIATES ---
        const affiliates = (a.tags || []).filter(t => t.toLowerCase() !== a.sport.toLowerCase());
        const affiliatesHtml = `
            <div class="assoc-panel" id="panel-affiliates">
                <div class="assoc-detail-section">
                    <p class="assoc-detail-section-title">Regulatory Bodys & Affiliates</p>
                    <div class="assoc-tag-row">
                        ${affiliates.length > 0 ? affiliates.map(t => `<span class="assoc-tag">${t}</span>`).join('') : '<span class="assoc-tag">BNSC</span>'}
                    </div>
                </div>
            </div>`;

        // --- PANEL 5: TEAMS --- (User created clubs/teams)
        const groups = (window.mizanoData?.cache?.teams || []).filter(g => {
            const teamSport = (g.sport || '').toLowerCase();
            const assocSport = (a.sport || '').toLowerCase();
            const assocAbbr = (a.shortName || a.abbr || '').toLowerCase();
            const league = (g.league || '').toLowerCase();
            
            // Match by sport name
            if (teamSport && teamSport === assocSport) return true;
            
            // Match by association abbreviation in notes
            if (assocAbbr && g.notes && g.notes.toLowerCase().includes(assocAbbr)) return true;
            
            // Special case: Football (FNB Premiership)
            if (assocSport === 'football' && league.includes('premiership')) return true;
            
            return false;
        });

        const teamsHtml = `
            <div class="assoc-panel" id="panel-teams" style="background:#ecf1f6;">
                <div class="assoc-groups-wrapper">
                    <div class="assoc-groups-list">
                        <div style="padding:16px;">
                            <p class="assoc-detail-section-title">Affiliated Clubs & Teams (${groups.length})</p>
                            ${groups.length > 0 ? groups.map(g => `
                                <div class="assoc-person-card" style="margin-bottom:8px; background:white;">
                                    <div class="assoc-person-avatar" style="background:#444;">${(g.team_name || g.name || '?')[0]}</div>
                                    <div class="assoc-person-info">
                                        <p class="assoc-person-name">${g.team_name || g.name}</p>
                                        <p class="assoc-person-role">${g.league || g.location_full || 'Botswana'}</p>
                                    </div>
                                </div>
                            `).join('') : '<p style="color:#666; padding:20px; text-align:center;">No affiliated clubs found for this association.</p>'}
                        </div>
                    </div>
                </div>
            </div>`;

        contentEl.innerHTML = `
            <div class="assoc-tabs-wrapper">
                <div class="assoc-tabs">
                    <div class="assoc-tab" data-idx="0" onclick="window.AssociationsDirectory.switchTab(0)">About</div>
                    <div class="assoc-tab" data-idx="1" onclick="window.AssociationsDirectory.switchTab(1)">People</div>
                    <div class="assoc-tab" data-idx="2" onclick="window.AssociationsDirectory.switchTab(2)">Contact</div>
                    <div class="assoc-tab" data-idx="3" onclick="window.AssociationsDirectory.switchTab(3)">Affiliates</div>
                    <div class="assoc-tab" data-idx="4" onclick="window.AssociationsDirectory.switchTab(4)">Teams</div>
                </div>
            </div>
            <div class="assoc-panels-viewport">
                <div class="assoc-panels-container">
                    ${aboutHtml}
                    ${peopleHtml}
                    ${contactHtml}
                    ${affiliatesHtml}
                    ${teamsHtml}
                </div>
            </div>
        `;
    }

    // ─── HELPERS ─────────────────────────────────────────────────────────────

    function _slugify(str) {
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    function _sportEmoji(sport) {
        const map = {
            football: '⚽', soccer: '⚽', athletics: '🏃', fencing: '🤺', badminton: '🏸', 
            basketball: '🏀', bowling: '🎳', boxing: '🥊', bridge: '🃏', cricket: '🏏', 
            hockey: '🏑', cycling: '🚴', dance: '💃', darts: '🎯', golf: '⛳', 
            judo: '🥋', karate: '🥋', motor: '🏍️', netball: '🏐', swimming: '🏊', 
            tennis: '🎾', volleyball: '🏐', chess: '♟️', special: '🌟', 
            disability: '♿', paralympic: '🏅',
        };
        const key = String(sport || '').toLowerCase();
        for (const [k, v] of Object.entries(map)) {
            if (key.includes(k)) return v;
        }
        return '🏅';
    }

    return { init, openDetail, scrollToLetter, switchTab };

})();

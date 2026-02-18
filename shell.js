/**
 * MIZANO PLATFORM SHELL LOGIC
 * Applied Android Studio Otter Pipeline standards from Docs/TECHNICAL_STACK_AND_APK_PIPELINE.md
 * Refined for APEX UI (Tactile Intelligence Architecture)
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. CORE REFERENCES
    const nav = window.MizanoNav;
    const safety = window.MizanoSafety;
    const dataManager = window.mizanoData;
    const filterEngine = window.MizanoFilter;
    const auth = window.MizanoAuth;
    const storage = window.mizanoStorage;

    // 2. PANEL RENDERERS
    const renderers = {
        home: new window.MizanoCards('drop-field-home'),
        search: new window.MizanoCards('search-results'),
        sports: new window.MizanoCards('drop-field-sports'),
        leisure: new window.MizanoCards('drop-field-leisure'),
        lessons: new window.MizanoCards('drop-field-lessons'),
        events: new window.MizanoCards('drop-field-events'),
        groups: new window.MizanoCards('drop-field-groups'),
        discover: new window.MizanoCards('drop-field-discover'),
        mine: window.MizanoMine,
        community: new window.MizanoCards('drop-field-community'),
        leaderboard: new window.MizanoCards('drop-field-leaderboard'),
        shopping: new window.MizanoCards('drop-field-shopping'),
        shops: new window.MizanoCards('drop-field-shops'),
        businesses: new window.MizanoCards('drop-field-businesses'),
        schools: new window.MizanoCards('drop-field-schools'),
        venues: new window.MizanoCards('drop-field-venues'),
        marathons: new window.MizanoCards('drop-field-marathons')
    };

    // 3. APEX UI: DYNAMIC SCROLL LOGIC
    const apexDeck = document.getElementById('apex-deck');
    const topBar = document.querySelector('.top-bar');
    let lastScrollY = 0;
    let scrollAccumulator = 0;
    const hideThreshold = 150;

    const handlePanelScroll = (e) => {
        const currentScrollY = e.target.scrollTop;
        const delta = currentScrollY - lastScrollY;
        if (delta > 0) {
            scrollAccumulator += delta;
            if (scrollAccumulator > hideThreshold) {
                apexDeck.classList.add('hidden');
                topBar.style.transform = 'translateY(-100%)';
            }
        } else {
            scrollAccumulator = 0;
            apexDeck.classList.remove('hidden');
            topBar.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    };

    document.querySelectorAll('.panel').forEach(panel => {
        panel.addEventListener('scroll', handlePanelScroll);
    });

    // 4. APEX UI: PANEL MENU GENERATOR
    const panelsList = document.getElementById('panels-list');
    const generatePanelsMenu = () => {
        if (!panelsList) return;
        const panelNames = ["Home", "Search", "Sports", "Leisure", "Lessons", "Events", "Teams & Groups", "Discover", "My Hub", "Community", "Leaderboards", "Deals", "Retailers", "Business Directory", "Schools", "Venues", "Marathons"];
        const icons = ["🏠", "🔍", "⚽", "🏖️", "🎓", "🎉", "👥", "🌍", "👤", "🤝", "🏆", "🛍️", "🔖", "🏢", "🏫", "🏟️", "🏃"];

        panelsList.innerHTML = panelNames.map((name, i) => `
            <div class="mizano-card" onclick="window.MizanoNav.switchPanel(${i}); window.MizanoNav.back()" style="padding:15px; text-align:center; cursor:pointer;">
                <span style="font-size:1.5rem">${icons[i]}</span>
                <h4 style="margin:5px 0 0; font-size:0.8rem">${name}</h4>
            </div>
        `).join('');
    };
    generatePanelsMenu();

    // 5. APEX UI: INTERACTION HANDLERS (Level 1-4 Hierarchy)
    const btnActivities = document.getElementById('btn-activities-level');
    const btnLocation = document.getElementById('btn-location-filter');
    const btnPanels = document.getElementById('btn-panels-menu');
    const btnSearch = document.getElementById('btn-search-mizano');
    const btnAdd = document.getElementById('btn-add-content');
    const btnHamburger = document.getElementById('btn-hamburger-mizano');

    const level2 = document.getElementById('level-2-activity');
    const level3 = document.getElementById('level-3-time');
    const level4 = document.getElementById('level-4-datepicker');

    // Level 1: Main Bar Actions
    if (btnActivities) btnActivities.addEventListener('click', () => {
        level2.classList.toggle('active');
        level3.classList.remove('active');
        level4.classList.remove('active');
    });

    if (btnLocation) btnLocation.addEventListener('click', () => window.MizanoFilters.open('places'));
    if (btnPanels) btnPanels.addEventListener('click', () => nav.openOverlay('panels-menu'));
    if (btnSearch) btnSearch.addEventListener('click', () => nav.openOverlay('search'));
    if (btnAdd) btnAdd.addEventListener('click', () => nav.openOverlay('builder-choice'));
    if (btnHamburger) btnHamburger.addEventListener('click', () => nav.openOverlay('hamburger'));

    // Level 2 & 3 Interaction
    const clockTrigger = document.getElementById('clock-trigger');
    const calendarTrigger = document.getElementById('calendar-trigger');

    if (clockTrigger) clockTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        level3.classList.toggle('active');
        level4.classList.remove('active');
    });

    if (calendarTrigger) calendarTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        level4.classList.toggle('active');
    });

    // 6. DATE PICKER GENERATION
    const dayTilesContainer = document.getElementById('day-tiles');
    const generateDayTiles = () => {
        if (!dayTilesContainer) return;
        dayTilesContainer.innerHTML = '';
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            const tile = document.createElement('div');
            tile.className = `day-block ${i === 0 ? 'active' : ''}`;
            tile.innerHTML = `<span class="day-name">${dayName}</span><span class="day-status">${i === 0 ? 'Today' : (dayNum + ' ' + month)}</span>`;
            tile.onclick = () => {
                document.querySelectorAll('.day-block').forEach(t => t.classList.remove('active'));
                tile.classList.add('active');
                filterEngine.update('date', date);
            };
            dayTilesContainer.appendChild(tile);
        }
    };
    generateDayTiles();

    // 7. MAPPING & POPULATION ENGINE
    const mapToCardData = (entity, items) => {
        if (!Array.isArray(items)) return [];
        return items.map(item => {
            if (entity === 'activities' || entity === 'homeFeed') {
                const check = safety.checkAction('COMPETITIVE_JOIN', { activity_id: item.activity_id });
                return {
                    ...item,
                    card_type: item.activity_type === 'lesson' ? 'Registration-State Card' : (item.activity_type === 'competition' ? 'Competition Card' : 'Standard Match Card'),
                    state: item.status === 'published' ? 'Active Soon' : 'Active Now',
                    left_team: { name: item.left_team_name || 'Team A' },
                    right_team: { name: item.right_team_name || 'Team B' },
                    center_top: item.start_time ? new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'LIVE',
                    venue: item.location_name || 'TBA',
                    location_name: item.location_name || 'TBA',
                    activity_id: item.activity_id,
                    event_name: item.title || item.event_name || 'Unnamed Activity',
                    title: item.title || item.event_name || 'Unnamed Activity',
                    activity_type: item.sport || item.activity_type || 'General',
                };
            }
            if (entity === 'marathons') return { ...item, card_type: 'Registration-State Card', activity_id: item.event_id, emergency_badge: { text: 'Open', color: 'green' } };
            if (entity === 'teams') return { ...item, card_type: 'Team Explorer Card' };
            if (entity === 'businesses') return { ...item, card_type: 'Institution Card' };
            if (entity === 'schools') return { ...item, card_type: 'Institution Card', verified: item.is_private };
            if (entity === 'events') return { ...item, card_type: 'Event Card' };
            if (entity === 'community') return { ...item, card_type: item.type === 'job' ? 'Job Listing Card' : (item.type === 'lost' || item.type === 'found' ? 'Lost Found Card' : (item.type === 'news' ? 'News Flash Card' : 'Community Post Card')) };
            if (entity === 'competitions') return { ...item, card_type: 'Competition Card' };
            if (entity === 'hobbies') return { ...item, card_type: 'Hobby Leisure Card' };
            if (entity === 'shopping') return { ...item, card_type: 'Shopping Deal Card' };
            return item;
        });
    };

    const updatePanel = (rendererKey, dataKey, filterFn = null) => {
        const renderer = renderers[rendererKey];
        const data = dataManager.cache[dataKey];
        if (!renderer || !data) return 0;

        let processedData = data;
        if (filterFn) processedData = processedData.filter(filterFn);

        const filtered = filterEngine.filterData(processedData);
        const cardData = mapToCardData(dataKey, filtered);

        if (cardData.length > 0) {
            renderer.render(cardData);
        } else {
            renderer.renderEmpty();
        }
        return filtered.length;
    };

    const updateUIWithFilters = () => {
        // Individual panels now update if their specific data exists
        dataManager.cache.homeFeed = dataManager.getHomeFeed();
        const totalHome = updatePanel('home', 'homeFeed');

        updatePanel('search', 'activities');
        updatePanel('sports', 'activities', a => a.activity_type === 'match');
        updatePanel('lessons', 'activities', a => a.activity_type === 'lesson');
        updatePanel('leisure', 'activities', a => ['Hobbies', 'Leisure', 'leisure', 'hobby'].includes(a.activity_type) || a.category === 'leisure' || a.category === 'hobby');
        updatePanel('groups', 'teams');
        updatePanel('schools', 'schools');
        updatePanel('businesses', 'businesses', b => !['school', 'university', 'venue', 'stadium', 'gym'].includes(b.category));
        updatePanel('shops', 'businesses', b => b.category === 'shop' || b.category === 'retail');
        updatePanel('venues', 'businesses', b => ['venue', 'stadium', 'gym', 'court', 'sports_facility'].includes(b.category));
        updatePanel('leaderboard', 'leaderboards');

        if (dataManager.cache.events) renderers.events.render(mapToCardData('events', filterEngine.filterData(dataManager.cache.events)));

        if (dataManager.cache.community) {
            const commPosts = dataManager.getCommunityPosts();
            renderers.community.render(mapToCardData('community', filterEngine.filterData(commPosts)));
        }

        if (dataManager.cache.competitions) renderers.discover.render(mapToCardData('competitions', filterEngine.filterData(dataManager.cache.competitions)));
        if (dataManager.cache.shopping) renderers.shopping.render(mapToCardData('shopping', filterEngine.filterData(dataManager.cache.shopping)));
        if (dataManager.cache.marathons) renderers.marathons.render(mapToCardData('marathons', filterEngine.filterData(dataManager.cache.marathons)));

        const cardTally = document.getElementById('card-count');
        const locTrigger = document.getElementById('location-trigger');
        if (cardTally) cardTally.innerText = totalHome > 888 ? '888' : totalHome;

        if (locTrigger) {
            const loc = filterEngine.criteria.location;
            const isoMap = {
                'Gaborone': 'GC',
                'Francistown': 'FT',
                'Maun': 'MN',
                'Kasane': 'KS',
                'Palapye': 'PL',
                'Selebi Phikwe': 'SP',
                'Mahalapye': 'MH',
                'Mochudi': 'MC',
                'Molepolole': 'MP',
                'Kanye': 'KY',
                'all': 'ALL',
                'G-West': 'GW',
                'Broadhurst': 'BH',
                'Phase 2': 'P2'
            };
            const iso = isoMap[loc] || '??';
            locTrigger.querySelector('.location-text').innerText = `${iso} · ${loc === 'all' ? 'All' : loc}`;
        }
    };

    // 8. NAV CONTROLLER SYNC
    window.addEventListener('mizano-nav', (e) => {
        const { type, index, overlayId, pageId, data } = e.detail;
        switch (type) {
            case 'panel-switch':
                if (index === 14 && window.MizanoProfile) window.MizanoProfile.render();
                if (index === 16 && window.MizanoTrackerRenderer) window.MizanoTrackerRenderer.render();
                const panel = document.getElementById(`panel-${index}`);
                if (panel && window.mizanoStorage) panel.scrollTop = window.mizanoStorage.loadScroll(index);
                break;
            case 'overlay-open':
                const overlay = document.getElementById(`${overlayId}-overlay`);
                if (overlay) overlay.classList.add('active');
                if (overlayId === 'builder-choice') window.MizanoShell.renderBuilderChoice();
                if (overlayId === 'leaderboard' && window.MizanoLeaderboard) window.MizanoLeaderboard.open();
                if (overlayId === 'search') {
                    const searchInput = document.getElementById('mizano-search-input');
                    if (searchInput) { searchInput.focus(); searchInput.value = ''; filterEngine.update('search', ''); }
                }
                if (overlayId === 'settings' && window.MizanoMine) window.MizanoMine.renderSettingsSwitcher('settings-auth-container');
                if (overlayId === 'how-to') {
                    const howToContent = document.getElementById('how-to-content');
                    if (howToContent) {
                        const categories = [
                            {
                                title: "Design Philosophy: Horizon Flux",
                                desc: "The Apex Horizon stacks critical controls at the bottom where your thumbs rest. 'Horizon Flux' describes the smooth revealing of UI levels as they response to your intent, exploiting natural cognitive search patterns to reduce decision fatigue."
                            },
                            {
                                title: "Level A: Main Navigation",
                                desc: "7 icons covering the core pillars: Activity, Spatial Location, Panels, Search, Creation, Notifications, and The Hub. The pulse badging (#363636) keeps you focused on new opportunities."
                            },
                            {
                                title: "Level B: Smart Syntax Filtering",
                                desc: "Hierarchical activity selection that cleans itself up. Select 'Soccer' + 'Recruiting' and see exactly that. Select more, and the UI tidy up into a simple count."
                            },
                            {
                                title: "Level C: Temporal Intelligence",
                                desc: "Instant jumping through Time (Carousel) and Dates (Tiles). Use the Month/Year picker to plan months in advance without losing focus."
                            },
                            {
                                title: "Spatial Vanish Logic",
                                desc: "Tapping the Location Chip (e.g. GC · All) narrows your world. Once a city is locked, broader options vanish to focus you on relevant local neighborhoods."
                            }
                        ];

                        howToContent.innerHTML = `
                            <div style="padding: 10px;">
                                <h1 style="color:var(--primary-blue); font-size:1.4rem;">Mizano Manual</h1>
                                <p style="font-style:italic; font-size:0.9rem; color:#666;">Tactile Intelligence for Minimalist Discovery</p>
                                ${categories.map(cat => `
                                    <div class="mizano-card" style="margin-bottom:15px; cursor:pointer;" onclick="this.querySelector('.cat-desc').style.display = (this.querySelector('.cat-desc').style.display === 'none' ? 'block' : 'none')">
                                        <h3 style="margin:0; font-size:1rem;">${cat.title}</h3>
                                        <p class="cat-desc" style="display:none; margin-top:10px; font-size:0.85rem; line-height:1.4; color:#444;">${cat.desc}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }
                }
                break;
            case 'overlay-close':
                const closedOverlay = document.getElementById(`${overlayId}-overlay`);
                if (closedOverlay) closedOverlay.classList.remove('active');
                break;
            case 'page-push':
                const detailOverlay = document.getElementById('detail-view');
                const builderOverlay = document.getElementById('builder-view');
                if (pageId === 'detail' && window.MizanoDetail) { detailOverlay.classList.add('active'); window.MizanoDetail.render(data.activityId); }
                else if (pageId === 'builder' && window.MizanoBuilder) { builderOverlay.classList.add('active'); window.MizanoBuilder.render(); }
                else if (pageId === 'team-detail' && window.MizanoTeamDetail) { detailOverlay.classList.add('active'); const team = dataManager.getById('teams', data.teamId); if (team) window.MizanoTeamDetail.render(team); }
                break;
            case 'page-pop':
                document.querySelectorAll('.overlay').forEach(p => p.classList.remove('active'));
                break;
            case 'toast':
                window.MizanoShell.showToast(data.message, data.type);
                break;
        }
    });

    // 9. SHELL UTILITIES
    window.MizanoShell = {
        showToast: (message, type = 'info') => {
            let toast = document.getElementById('mizano-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'mizano-toast';
                toast.style.cssText = `position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #424242; color: #fff; padding: 12px 20px; border-radius: 4px; font-size: 0.9rem; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: opacity 0.3s; opacity: 0; pointer-events: none; text-align: center; min-width: 200px;`;
                document.body.appendChild(toast);
            }
            toast.innerText = message;
            toast.style.background = type === 'warning' ? '#FFA500' : (type === 'error' ? '#D32F2F' : '#424242');
            toast.style.opacity = '1';
            setTimeout(() => { toast.style.opacity = '0'; }, 3000);
        },
        renderBuilderChoice: () => {
            const overlay = document.getElementById('builder-choice-overlay');
            if (!overlay) return;
            overlay.innerHTML = `
                <div class="overlay-header"><button onclick="window.MizanoNav.back()">✕ Close</button><h2 style="margin-left:10px">Create New</h2></div>
                <div style="padding:20px; display:flex; flex-direction:column; gap:15px;">
                    <div class="mizano-card" role="button" onclick="window.MizanoBuilder.render(); window.MizanoNav.openOverlay('builder-view')" style="padding:20px; background:#f9f9f9; border:2px solid #000;"><h3>New Activity</h3><p>Matches, Lessons, or Local Meetups</p></div>
                    <div class="mizano-card" role="button" onclick="if(window.window.MizanoTeamBuilder) window.MizanoTeamBuilder.render()" style="padding:20px; background:#f9f9f9; border:2px solid #000;"><h3>New Team / Club</h3><p>Create a squad and manage your roster</p></div>
                    <div class="mizano-card" role="button" onclick="if(window.MizanoBusinessBuilder) window.MizanoBusinessBuilder.open()" style="padding:20px; background:#f9f9f9; border:2px solid #27ae60;"><h3>New Business</h3><p>Register your company for corporate leagues</p></div>
                </div>
            `;
        }
    };

    // 10. INITIALIZATION
    setTimeout(async () => {
        if (dataManager) {
            await dataManager.init();
            safety.setUser(dataManager.getCurrentUser());
            filterEngine.setListener(() => updateUIWithFilters());

            // Critical: Ensure the UI reflects the initial filter state
            updateUIWithFilters();

            console.log(`Mizano Shell: Initialization complete. ${dataManager.cache.activities?.length || 0} activities available.`);

            const searchInput = document.getElementById('mizano-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => filterEngine.update('search', e.target.value));
            }
        }
    }, 100);
});

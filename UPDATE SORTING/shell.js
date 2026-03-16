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
    const notifications = window.MizanoNotifications;

    // STEP 1: STARTUP: Clear any persisted date filter to prevent stale filters from previous sessions
    localStorage.removeItem('mizano_selected_date');
    localStorage.removeItem('mizano_active_day_tile');
    if (filterEngine) {
        filterEngine.criteria.date = null;
        filterEngine.criteria.timeFrame = 'all';
    }

    // 2. PANEL RENDERERS
    const renderers = {
        home: new window.MizanoCards('drop-field-home'),
        search: new window.MizanoCards('search-results'),
        sports: new window.MizanoCards('drop-field-sports'),
        hobbies: new window.MizanoCards('drop-field-hobbies'),
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

    function generatePanelsMenu() {
        const container = document.getElementById('panels-list');
        if (!container) return;

        // Golden-rule panel list — only change with explicit confirmation
        const panelNames = [
            'Home', 'Sports', 'Hobbies', 'Leisure', 'Lessons',
            'Events', 'Groups', 'Discover', 'Community',
            'Leaderboard', 'Shopping', 'Shops', 'Businesses',
            'Schools', 'Venues', 'Mine'
        ];

        container.innerHTML = '';
        panelNames.forEach((name, idx) => {
            // Direct 1-to-1 mapping: button position 0–15 = panel index 0–15
            const targetIdx = idx;

            const btn = document.createElement('button');
            btn.textContent = name;
            btn.style.cssText = 'display:block; width:100%; padding:16px; text-align:center; font-size:1.1rem; border:none; background:#fff; cursor:pointer; font-weight:500;';
            btn.addEventListener('click', () => {
                // Close the overlay directly to avoid history pop-state race conditions
                window.MizanoNav.closeTopOverlay();
                // Short postponement to allow UI thread to close the overlay before scrolling
                setTimeout(() => {
                    window.MizanoNav.switchPanel(targetIdx, 'auto');
                }, 50);
            });
            container.appendChild(btn);
        });
    }

    // 4. Initial call
    generatePanelsMenu();

    // 5. APEX UI: INTERACTION HANDLERS (Level 1-4 Hierarchy)
    const btnPanels = document.getElementById('btn-panels-mizano');
    const btnActivities = document.getElementById('btn-activities-level');
    const btnSearch = document.getElementById('btn-search-mizano');
    const btnAdd = document.getElementById('btn-add-content');
    const btnHamburger = document.getElementById('btn-hamburger-mizano');

    const level2 = document.getElementById('level-2-activity');
    const level3 = document.getElementById('level-3-time');
    const level4 = document.getElementById('level-4-datepicker');

    // Level 1: Main Bar Actions
    if (btnActivities) btnActivities.addEventListener('click', () => {
        level2.classList.toggle('active');
        // If we close activity, close children too
        if (!level2.classList.contains('active')) {
            level3.classList.remove('active');
            level3.classList.remove('calendar-open');
            level4.classList.remove('active');
        }
    });

    const clockTrigger = document.getElementById('clock-trigger');
    const calendarTrigger = document.getElementById('calendar-trigger');

    if (clockTrigger) clockTrigger.addEventListener('click', () => {
        level3.classList.toggle('active');
        level4.classList.remove('active');
        level3.classList.remove('calendar-open'); // Pills reappear when time row re-opens
    });

    if (calendarTrigger) calendarTrigger.addEventListener('click', () => {
        level4.classList.toggle('active');
        // Toggle calendar-open on Level 3 to hide/show time pills
        level3.classList.toggle('calendar-open');
    });

    if (btnPanels) btnPanels.addEventListener('click', () => window.MizanoNav.openOverlay('panels-menu'));
    if (btnSearch) btnSearch.addEventListener('click', () => nav.openOverlay('search'));
    if (btnAdd) btnAdd.addEventListener('click', () => {
        if (window.AddActionRouter) window.AddActionRouter.openSheet();
        else nav.openOverlay('builder-choice'); // Fallback
    });
    if (btnHamburger) btnHamburger.addEventListener('click', () => nav.openOverlay('hamburger'));

    // NEW TIME PILL LOGIC
    document.querySelectorAll('.time-pill').forEach(pill => {
        pill.addEventListener('click', function () {
            document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.day-block').forEach(t => t.classList.remove('active'));
            if (filterEngine.criteria.date !== null) {
                filterEngine.criteria.date = null;
                if (window.mizanoStorage) window.mizanoStorage.saveFilters(filterEngine.criteria);
            }

            const timePeriod = this.dataset.time || this.getAttribute('data-time') || 'all';
            filterEngine.update('timeFrame', timePeriod);
        });
    });

    // NEW LOCATION FILTER LOGIC
    const villageTrigger = document.getElementById('village-trigger');
    const areaTrigger = document.getElementById('area-trigger');
    const locationOverlay = document.getElementById('location-overlay');
    const locationCloseBtn = document.getElementById('location-close-btn');
    const locationTitle = document.getElementById('location-overlay-title');
    const locationContainer = document.getElementById('location-list-container');

    const villages = ['Gaborone', 'Francistown', 'Maun', 'Kasane', 'Palapye', 'Selebi-Phikwe', 'Lobatse', 'Mahalapye', 'Mochudi', 'Molepolole', 'Kanye', 'Serowe', 'Jwaneng', 'Orapa', 'Mogoditshane', 'Tlokweng', 'all'];
    const areas = {
        'Gaborone': ['all', 'Block 3', 'Block 6', 'Block 8', 'Broadhurst', 'Extension 4', 'Extension 9', 'Extension 10', 'Phase 2', 'Phase 4', 'Gaborone West', 'Mogoditshane', 'Tlokweng', 'Phakalane', 'CBD', 'Acacia Park', 'Babusi Extension 14', 'Badiri Extension 5', 'Block 5', 'Block 7', 'Block 9', 'Block 10', 'Boitshoko Extension 10', 'Bontleng', 'Bontleng Extension 8', 'Botswelelo Extension 5', 'Central Business District', 'Dilalelo Extension 4', 'Dumadumana', 'Extension 8', 'Extension 11', 'Extension 12', 'Extension 15', 'Extension 16', 'Extension 17', 'Extension 18', 'Extension 19', 'Extension 20', 'Extension 21', 'Extension 22', 'Extension 23', 'Extension 24', 'Extension 25', 'Extension 26', 'Extension 27', 'Extension 28', 'Extension 29', 'Extension 30', 'Extension 31', 'Extension 32', 'Extension 33', 'Extension 34', 'Extension 35', 'Extension 36', 'Extension 37', 'Extension 38', 'Extension 39', 'Extension 40', 'Extension 41', 'Extension 42', 'Extension 43', 'Extension 44', 'Extension 45', 'Extension 46', 'Extension 47', 'Extension 48', 'Extension 51', 'Extension 52', 'Extension 54', 'Gabone West Extension 3', 'Gaborone International Commerce Park', 'Gaborone North', 'Gaborone West Block V', 'Gaborone West Extension 2', 'Gaborone West Extension 4', 'Gaborone West Extension 5', 'Gaborone West Extension 6', 'Gaborone West Extension 7', 'Gaborone West Phase 4 Industrial Extension 14', 'Game City', 'Glen Valley', 'Government Enclave', 'Kgale View', 'Madibeng Extension 11', 'Madirelo', 'Madirelo Extension 6', 'Mephato Extension 12', 'Millennium Office Park', 'Mmaraka Extension 1', 'Moshawa Estate', 'Mowana Park', 'New Naledi', 'Old Naledi', 'Phakalane Estate', 'Phologolo Extension 9', 'Sebele Valley', 'Segodi Park', 'Sekgwa Extension 7', 'Selemelo Extension 2', 'Talana Park', 'The Village', 'Village Extension 15'],
        'Francistown': ['all', 'Minestone', 'Monarch', 'Gerald Estates', 'Somerset', 'Block 1', 'Aerodrome', 'Area S', 'Bluetown', 'CBD', 'Kanana', 'Kgaphamadi', 'Maipafela', 'Molapo Estates', 'Moselewapula', 'Nyangabgwe', 'Selepa', 'Tati River'],
        'Maun': ['all', 'Boseja', 'Disaneng', 'Matlapana', 'Sedie', 'Sennonori', 'Mathiba', 'Sedia'],
        'Selebi-Phikwe': ['all', 'Botshabelo', 'Government Housing Zone', 'Mine Compound Area'],
        'Lobatse': ['all', 'BHC Estates', 'CBD', 'Colonial Residential Area'],
        'Jwaneng': ['all', 'Debswana Residential Compound', 'Government Housing Area'],
        'Molepolole': ['all', 'BHC Housing Extensions', 'Traditional Kgotla Wards'],
        'Palapye': ['all', 'Extension 1', 'Lotsane', 'Morupule', 'BIUST Area', 'Old Railway-Era Neighbourhoods', 'New Commercial Extensions'],
        'Mochudi': ['all', 'Kgotla Ward Areas', 'New BHC Extensions'],
        'Mogoditshane': ['all', 'Main Village Area', 'New Residential Extensions'],
        'Tlokweng': ['all', 'Old Village Area', 'New Residential Extensions'],
    };

    const openLocationOverlay = (mode) => {
        if (!locationOverlay) return;
        locationContainer.innerHTML = '';
        locationTitle.innerText = mode === 'village' ? 'Select Village/Town' : 'Select Area';

        const dataList = mode === 'village' ? villages : (areas[filterEngine.criteria.location] || ['all']);

        const grid = document.createElement('div');
        grid.className = 'location-grid';

        dataList.forEach(item => {
            const div = document.createElement('div');
            div.className = 'location-item';

            // Highlight active selection
            if (mode === 'village' && item === filterEngine.criteria.location) div.classList.add('active');
            if (mode === 'area' && item === filterEngine.criteria.area) div.classList.add('active');

            div.innerText = item === 'all' ? 'All' : item;
            div.onclick = () => {
                // STEP 1: Close overlay immediately for instant feedback — no freeze
                locationOverlay.classList.remove('active');
                nav.state.overlayStack = nav.state.overlayStack.filter(id => id !== 'location');

                // STEP 2: Update filter criteria directly without triggering re-render yet
                if (mode === 'village') {
                    filterEngine.criteria.area = 'all';
                    filterEngine.criteria.location = item;
                } else {
                    filterEngine.criteria.area = item;
                }

                // STEP 3: Immediately update the location row labels
                const vt = document.getElementById('village-trigger');
                const at = document.getElementById('area-trigger');
                let locLabel = filterEngine.criteria.location;
                if (!locLabel || locLabel === 'all') locLabel = 'All Locations';
                const areaLabel = filterEngine.criteria.area && filterEngine.criteria.area !== 'all' ? filterEngine.criteria.area : 'All';
                if (vt) vt.innerText = locLabel;
                if (at) at.innerText = areaLabel;

                // STEP 4: Defer the expensive panel re-render until after overlay is visually closed
                setTimeout(() => {
                    filterEngine.apply();
                }, 50);
            };
            grid.appendChild(div);
        });

        locationContainer.appendChild(grid);
        nav.openOverlay('location');
    };

    if (villageTrigger) villageTrigger.addEventListener('click', () => openLocationOverlay('village'));
    if (areaTrigger) areaTrigger.addEventListener('click', () => openLocationOverlay('area'));
    if (locationCloseBtn) locationCloseBtn.addEventListener('click', () => nav.back());






    // 6. DATE PICKER GENERATION
    const dayTilesContainer = document.getElementById('day-tiles');
    const monthLabel = document.getElementById('month-selection-trigger');
    const yearLabel = document.getElementById('year-selection-trigger'); // NEW
    const monthOverlay = document.getElementById('month-overlay');
    const monthGrid = document.getElementById('month-grid-container');
    const yearGrid = document.getElementById('year-grid-container'); // NEW

    let currentSelectedYear = new Date().getFullYear(); // NEW STATE

    const generateDayTiles = (baseDate = null) => {
        if (!dayTilesContainer) return;
        dayTilesContainer.innerHTML = '';

        // Prioritize actively filtered date if no base date was manually supplied by navigation
        const actualDateToShow = baseDate || (filterEngine.criteria.date ? new Date(filterEngine.criteria.date) : new Date());

        // Use it as the "start point"
        // But we still want to keep the label accurate to the actualDateToShow.
        const base = new Date(actualDateToShow);
        base.setHours(0, 0, 0, 0);

        // Update the labels natively
        if (monthLabel) monthLabel.innerText = base.toLocaleDateString('en-US', { month: 'long' });
        if (yearLabel) yearLabel.innerText = base.getFullYear().toString();

        currentSelectedYear = base.getFullYear(); // Sync state

        // Start 7 days before the base date
        const startDate = new Date(base);
        startDate.setDate(base.getDate() - 7);

        let activeTileEl = null;

        for (let i = 0; i < 30; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();
            const monthText = date.toLocaleDateString('en-US', { month: 'short' });

            // Highlight the tile if it exactly matches the user's currently active Filter Engine date
            const isCurrentlySelectedFilter = filterEngine.criteria.date && date.toDateString() === new Date(filterEngine.criteria.date).toDateString();

            // Just for the text, check if it's literally today in the real world
            const isLiterallyToday = date.toDateString() === new Date().toDateString();

            const tile = document.createElement('div');
            tile.className = `day-block ${isCurrentlySelectedFilter ? 'active' : ''}`;
            tile.innerHTML = `<span class="day-name">${dayName}</span><span class="day-status">${isLiterallyToday ? 'Today' : (dayNum + ' ' + monthText)}</span>`;

            tile.onclick = () => {
                const wasActive = tile.classList.contains('active');

                // Deselect all tiles first
                document.querySelectorAll('.day-block').forEach(t => t.classList.remove('active'));

                if (wasActive) {
                    // TOGGLE OFF — user tapped the already-selected tile
                    filterEngine.clearDateFilter();
                    localStorage.removeItem('mizano_selected_date');
                } else {
                    // TOGGLE ON — user tapped a new date
                    tile.classList.add('active');

                    // Clear time pills visually when specific date is selected
                    document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
                    const allTimePill = document.querySelector('.time-pill[data-time="all"]');
                    if (allTimePill) allTimePill.classList.add('active');
                    filterEngine.criteria.timeFrame = 'all';

                    const isoDate = date.toISOString().split('T')[0];
                    filterEngine.setDateFilter(isoDate);
                    localStorage.setItem('mizano_selected_date', isoDate);
                }
            };
            dayTilesContainer.appendChild(tile);

            if (isCurrentlySelectedFilter) activeTileEl = tile;
        }

        // Auto-scroll to show the active date as the first visible tile
        if (activeTileEl) {
            requestAnimationFrame(() => {
                activeTileEl.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' });
            });
        }
    };

    // Scroll Logic for Day Tiles — moves one tile width at a time
    const scrollPrev = document.getElementById('day-scroll-prev');
    const scrollNext = document.getElementById('day-scroll-next');

    if (scrollPrev && dayTilesContainer) {
        scrollPrev.onclick = (e) => {
            e.stopPropagation();
            const tileWidth = dayTilesContainer.querySelector('.day-block')?.offsetWidth || 80;
            dayTilesContainer.scrollBy({ left: -(tileWidth + 6), behavior: 'smooth' });
        };
    }
    if (scrollNext && dayTilesContainer) {
        scrollNext.onclick = (e) => {
            e.stopPropagation();
            const tileWidth = dayTilesContainer.querySelector('.day-block')?.offsetWidth || 80;
            dayTilesContainer.scrollBy({ left: tileWidth + 6, behavior: 'smooth' });
        };
    }

    // Month Selection Logic
    const renderMonthPicker = () => {
        if (!monthGrid) return;
        monthGrid.innerHTML = '';
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        months.forEach((month, index) => {
            const btn = document.createElement('div');
            btn.className = 'mizano-card month-item';
            btn.style.cssText = 'padding:10px; text-align:center; cursor:pointer; font-weight:600; margin-bottom: 2px; font-size: 2rem;';
            btn.innerText = month;
            btn.onclick = () => {
                const targetDate = new Date(currentSelectedYear, index, 1);
                generateDayTiles(targetDate);
                nav.back();
            };
            monthGrid.appendChild(btn);
        });
    };

    if (monthLabel) {
        monthLabel.onclick = () => {
            renderMonthPicker();
            nav.openOverlay('month');
        };
    }

    // Year Selection Logic
    const renderYearPicker = () => {
        if (!yearGrid) return;
        yearGrid.innerHTML = '';

        const currentRealYear = new Date().getFullYear();
        const years = [];
        for (let i = currentRealYear - 2; i <= currentRealYear + 5; i++) {
            years.push(i);
        }

        years.forEach(year => {
            const btn = document.createElement('div');
            btn.className = 'mizano-card month-item'; // Reusing class for styles
            btn.style.cssText = 'padding:10px; text-align:center; cursor:pointer; font-weight:600; margin-bottom: 2px; font-size: 2rem;';
            btn.innerText = year;
            btn.onclick = () => {
                // Keep the current month (based on what we seeded into baseDate earlier, or grab from Date object if needed)
                // Actually, let's just make it jump to Jan 1st of that year to keep it simple and clean
                const targetDate = new Date(year, 0, 1);
                currentSelectedYear = year;
                generateDayTiles(targetDate);
                nav.back();
            };
            yearGrid.appendChild(btn);
        });
    };

    if (yearLabel) {
        yearLabel.onclick = () => {
            renderYearPicker();
            nav.openOverlay('year');
        };
    }

    generateDayTiles();

    // 7. MAPPING & POPULATION ENGINE
    const mapToCardData = (entity, items) => {
        if (!Array.isArray(items)) return [];
        return items.map(item => {
            let activeEntity = entity;
            if (entity === 'mixed') {
                activeEntity = item.mizano_entity_type || 'activities';
            }

            if (activeEntity === 'activities' || activeEntity === 'homeFeed') {
                // Route actual events to the Event Card template
                if (item.eventID || item.event_id) {
                    return {
                        ...item,
                        card_type: 'Event Card'
                    };
                }

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
            if (activeEntity === 'marathons') return { ...item, card_type: 'Registration-State Card', activity_id: item.event_id, emergency_badge: { text: 'Open', color: 'green' } };
            if (activeEntity === 'teams') return { ...item, card_type: 'Team Explorer Card' };
            if (activeEntity === 'businesses') return { ...item, card_type: 'Institution Card' };
            if (activeEntity === 'schools') return { ...item, card_type: 'Institution Card', verified: item.is_private };
            if (activeEntity === 'events') return { ...item, card_type: 'Event Card' };
            if (activeEntity === 'community') {
                if (item.type === 'challenge' || item.challenge_type) return { ...item, card_type: 'Challenge Card' };
                if (item.type === 'survey') return { ...item, card_type: 'Survey Card' };
                if (item.type === 'stats') return { ...item, card_type: 'Stats Card' };
                return { ...item, card_type: item.type === 'job' ? 'Job Listing Card' : (item.type === 'lost' || item.type === 'found' ? 'Lost Found Card' : (item.type === 'news' ? 'News Flash Card' : 'Community Post Card')) };
            }
            if (activeEntity === 'competitions') return { ...item, card_type: 'Competition Card' };
            if (activeEntity === 'hobbies') return { ...item, card_type: 'Hobby Leisure Card' };
            if (activeEntity === 'shopping') return { ...item, card_type: 'Shopping Deal Card' };
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

        // Synchronize the seamless swipe clone of Home
        const homeClone = document.getElementById('drop-field-home-clone');
        const homeActual = document.getElementById('drop-field-home');
        if (homeClone && homeActual) {
            homeClone.innerHTML = homeActual.innerHTML;
        }

        updatePanel('search', 'activities');
        updatePanel('sports', 'activities', a => {
            const t = (a.activity_type || a.type || '').toLowerCase();
            const cat = (a.category || '').toLowerCase();
            return t === 'match' || t === 'sports' || t === 'sport' || cat === 'sports' || cat === 'sport' ||
                   a.card_type === 'Standard Match Card' || a.card_type === 'Competition Card';
        });
        updatePanel('hobbies', 'activities', a => {
            const t = (a.activity_type || a.type || '').toLowerCase();
            const cat = (a.category || '').toLowerCase();
            return t === 'hobbies' || t === 'hobby' || cat === 'hobby' || cat === 'hobbies' ||
                   a.card_type === 'Hobby Leisure Card';
        });
        updatePanel('lessons', 'activities', a => {
            const t = (a.activity_type || a.type || '').toLowerCase();
            return t === 'lesson' || t === 'lessons' || t === 'coaching' || t === 'tutor';
        });
        updatePanel('leisure', 'activities', a => {
            const t = (a.activity_type || a.type || '').toLowerCase();
            const cat = (a.category || '').toLowerCase();
            return t === 'leisure' || cat === 'leisure' || a.card_type === 'Hobby Leisure Card';
        });
        updatePanel('groups', 'teams');
        updatePanel('schools', 'schools');
        updatePanel('businesses', 'businesses', b => !['school', 'university', 'venue', 'stadium', 'gym'].includes(b.category));
        updatePanel('shops', 'businesses', b => b.category === 'shop' || b.category === 'retail');
        updatePanel('venues', 'businesses', b => ['venue', 'stadium', 'gym', 'court', 'sports_facility'].includes(b.category));
        updatePanel('leaderboard', 'leaderboards');

        if (dataManager.cache.events) renderers.events.render(mapToCardData('events', filterEngine.filterData(dataManager.cache.events)));

        if (dataManager.cache.community) {
            let commPosts = dataManager.getCommunityPosts() || [];

            // Phase 8: Inject engagement features
            const challenges = dataManager.cache.challenges || [];
            const surveys = dataManager.cache.survey_responses || [];
            const stats = dataManager.cache.participation_stats || [];

            // Normalize types for the pipeline
            const mappedExtras = [...challenges, ...surveys, ...stats].map(t => ({
                ...t,
                // Assign type safely for mapping if not natively present
                type: t.type || (t.survey_id ? 'survey' : (t.challenge_type ? 'challenge' : (t.location_code ? 'stats' : 'post')))
            }));

            commPosts = [...commPosts, ...mappedExtras];
            // Render to community panel
            renderers.community.render(mapToCardData('community', filterEngine.filterData(commPosts)));
        }

        if (dataManager.cache.competitions) renderers.discover.render(mapToCardData('competitions', filterEngine.filterData(dataManager.cache.competitions)));
        if (dataManager.cache.shopping) renderers.shopping.render(mapToCardData('shopping', filterEngine.filterData(dataManager.cache.shopping)));
        if (dataManager.cache.marathons) renderers.marathons.render(mapToCardData('marathons', filterEngine.filterData(dataManager.cache.marathons)));

        const cardTally = document.getElementById('card-count');
        const villageTrigger = document.getElementById('village-trigger');
        const areaTrigger = document.getElementById('area-trigger');

        if (cardTally) cardTally.innerText = totalHome > 888 ? '888' : totalHome;

        let loc = filterEngine.criteria.location;
        if (!loc || loc === 'all') loc = 'All Locations';

        // Grab area from criteria if we saved it there, otherwise 'All'
        const areaText = filterEngine.criteria.area && filterEngine.criteria.area !== 'all' ? filterEngine.criteria.area : 'All';

        if (villageTrigger) villageTrigger.innerText = loc;
        if (areaTrigger) areaTrigger.innerText = areaText;
    };

    // 8. NAV CONTROLLER SYNC
    window.addEventListener('mizano-nav', (e) => {
        const { type, index, overlayId, pageId, data } = e.detail;
        switch (type) {
            case 'panel-switch':
                if (index === 15) {
                    if (window.MizanoMine) window.MizanoMine.render();
                    if (window.ProfilePanel) window.ProfilePanel.init();
                    if (window.MizanoComparison) window.MizanoComparison.render();
                }
                const panel = document.getElementById(`panel-${index}`);
                if (panel && window.mizanoStorage) panel.scrollTop = window.mizanoStorage.loadScroll(index);

                // FIX BUG 3: Clear date filter when switching panels
                document.querySelectorAll('.day-block').forEach(t => t.classList.remove('active'));

                // Clear time pills UI
                document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
                const defaultPill = document.querySelector('.time-pill[data-time="all"]');
                if (defaultPill) defaultPill.classList.add('active');

                filterEngine.criteria.date = null;
                filterEngine.criteria.timeFrame = 'all';
                filterEngine.criteria.activeActivity = null; // Reset activity filter
                localStorage.removeItem('mizano_selected_date');

                // Reset activity label
                const activityLabel = document.getElementById('current-activity-label');
                if (activityLabel) activityLabel.textContent = 'Activity Field';

                filterEngine.apply();
                filterEngine.updateUILabel();
                if (window.mizanoStorage) window.mizanoStorage.saveFilters(filterEngine.criteria);
                break;
            case 'overlay-open':
                const tid = e.detail.targetId || `${overlayId}-overlay`;
                const overlay = document.getElementById(tid);
                if (overlay) overlay.classList.add('active');
                if (overlayId === 'builder-choice') window.MizanoShell.renderBuilderChoice();
                if (overlayId === 'notifications') {
                    if (notifications) {
                        notifications.render('notifications-list');
                        // Optional: mark as read when overlay opens?
                        // notifications.markAllAsRead();
                    }
                }
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
                const ctid = e.detail.targetId || `${overlayId}-overlay`;
                const closedOverlay = document.getElementById(ctid);
                if (closedOverlay) closedOverlay.classList.remove('active');
                break;
            case 'page-push':
                const detailOverlay = document.getElementById('detail-view');
                const builderOverlay = document.getElementById('builder-view');
                if (pageId === 'detail' && window.MizanoDetail) { detailOverlay.classList.add('active'); window.MizanoDetail.render(data.activityId); }
                else if (pageId === 'builder' && window.MizanoBuilder) { builderOverlay.classList.add('active'); window.MizanoBuilder.render(); }
                else if (pageId === 'team-detail' && window.MizanoTeamDetail) { detailOverlay.classList.add('active'); const team = dataManager.getById('teams', data.teamId); if (team) window.MizanoTeamDetail.render(team); }
                else if (pageId === 'profile-view' && window.MizanoProfileDetail) { detailOverlay.classList.add('active'); window.MizanoProfileDetail.render(data.userId); }
                break;
            case 'page-pop':
                document.querySelectorAll('.overlay').forEach(p => p.classList.remove('active'));
                break;
            case 'toast':
                window.MizanoShell.showToast(data.message, data.type);
                break;
        }
    });

    // 9. CARD ACTION DELEGATION
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.mizano-action-btn');
        if (!btn) return;

        e.stopPropagation();
        const id = btn.dataset.id;
        const action = btn.dataset.action; // for community-help-btn

        if (btn.classList.contains('job-apply-btn')) {
            window.MizanoShell.showToast('Application sent successfully!', 'success');
            // Logic to save application to StorageManager would go here
        } else if (btn.classList.contains('community-boost-btn')) {
            window.MizanoShell.showToast('Post boosted! Featured in Discover.', 'info');
        } else if (btn.classList.contains('group-join-btn')) {
            window.MizanoShell.showToast('Join request sent to admin.', 'info');
        } else if (btn.classList.contains('community-help-btn')) {
            window.MizanoShell.showToast(`Action: ${action} initiated.`, 'success');
        }
    });

    // 10. SHELL UTILITIES
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

    function initActivityOverlay() {
        const label = document.getElementById('current-activity-label');
        const overlay = document.getElementById('activity-overlay');
        const closeBtn = document.getElementById('activity-overlay-close');
        const searchInput = document.getElementById('activity-search-input');
        const listContainer = document.getElementById('activity-list-container');

        if (!label || !overlay || !closeBtn || !searchInput || !listContainer) return;

        function getAllActivityTypes() {
            const list = window.SPORTS_AND_ACTIVITIES || [];
            return ['All Activities & Interests', ...list];
        }

        function renderActivityList(filter = '') {
            const all = getAllActivityTypes();
            const filtered = filter
                ? all.filter(a => a.toLowerCase().includes(filter.toLowerCase()))
                : all;

            listContainer.innerHTML = filtered.length === 0
                ? '<p style="color:#999; text-align:center; font-size:1.4rem;">No activities found.</p>'
                : filtered.map(a => `
          <div class="mizano-card" data-activity="${a}"
            style="cursor:pointer; padding:4px 16px; margin-bottom:1px; font-size:2rem; font-weight:500; text-align:center;">
            ${a}
          </div>
        `).join('');

            listContainer.querySelectorAll('[data-activity]').forEach(card => {
                card.addEventListener('click', () => {
                    const selected = card.dataset.activity;

                    if (selected === 'All Activities & Interests') {
                        label.textContent = 'Activity Field';
                        if (window.MizanoFilter) {
                            window.MizanoFilter.criteria.activeActivity = null;
                            window.MizanoFilter.apply();
                        }
                    } else {
                        label.textContent = selected;
                        if (window.MizanoFilter) {
                            window.MizanoFilter.criteria.activeActivity = selected;
                            window.MizanoFilter.apply();
                        }
                    }

                    overlay.style.display = 'none';
                    document.body.style.overflow = '';

                    // Trigger filter application and panel refresh
                    if (window.MizanoFilter) window.MizanoFilter.apply();

                    if (typeof renderCurrentPanel === 'function') renderCurrentPanel();
                    else if (typeof window.MizanoShell?.refresh === 'function') window.MizanoShell.refresh();
                });
            });
        }

        // Tap "Activity Field" label to open overlay
        label.style.cursor = 'pointer';
        label.addEventListener('click', () => {
            searchInput.value = '';
            renderActivityList('');
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 100);
        });

        // Live search
        searchInput.addEventListener('input', () => renderActivityList(searchInput.value));

        // Close button
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // 10. INITIALIZATION
    setTimeout(async () => {
        if (dataManager) {
            await dataManager.init();
            safety.setUser(dataManager.getCurrentUser());
            filterEngine.setListener(() => setTimeout(() => updateUIWithFilters(), 0));

            // Critical: Ensure the UI reflects the initial filter state
            updateUIWithFilters();

            console.log(`Mizano Shell: Initialization complete. ${dataManager.cache.activities?.length || 0} activities available.`);

            initActivityOverlay();

            const searchInput = document.getElementById('mizano-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value;
                    if (query.length < 2) {
                        const resultsContainer = document.getElementById('search-results');
                        if (resultsContainer) {
                            resultsContainer.innerHTML = '<p style="text-align: center; color: #777; margin-top: 50px;">Start typing to search activities, places, and people.</p>';
                        }
                        return;
                    }

                    const rawResults = filterEngine.globalSearch(query);
                    const mappedResults = mapToCardData('mixed', rawResults);

                    if (renderers.search) {
                        if (mappedResults.length > 0) {
                            renderers.search.render(mappedResults);
                        } else {
                            renderers.search.renderEmpty('No results found for "' + query + '"');
                        }
                    }
                });
            }

            // Initialize Notifications
            if (notifications) {
                await notifications.init();
            }

            // Initialize Suggestions
            if (window.MizanoSuggestionEngine) {
                await window.MizanoSuggestionEngine.init();
            }
        }
    }, 100);
});




/**
 * MIZANO CARD RENDERER
 * Absolute Law: CARD_DESIGN_SYSTEM.md v1.0
 */

class CardRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.fullData = [];
        this.currentIndex = 0;
        this.batchSize = 20;

        this.scroller = new InfiniteScroll({
            onLoadMore: () => {
                this.renderBatch();
            }
        });
    }

    /**
     * Renders a list of cards from generic data in batches.
     */
    render(dataList, append = false) {
        if (!this.container) return;

        if (!append) {
            this.clear();
            this.fullData = dataList || [];
            this.currentIndex = 0;
        } else {
            this.fullData = [...this.fullData, ...(dataList || [])];
        }

        this.renderBatch();
    }

    /**
     * Internal batch rendering logic.
     */
    renderBatch() {
        if (this.currentIndex >= this.fullData.length) return;

        const nextBatch = this.fullData.slice(this.currentIndex, this.currentIndex + this.batchSize);

        nextBatch.forEach((data, index) => {
            const cardEl = this.createCard(data);
            if (cardEl) {
                // If this is the last item in the current batch AND there's more data overall, observe it
                const isLastInBatch = index === nextBatch.length - 1;
                const hasMoreOverall = (this.currentIndex + index + 1) < this.fullData.length;

                if (isLastInBatch && hasMoreOverall) {
                    this.scroller.observe(cardEl);
                }
                this.container.appendChild(cardEl);
            }
        });

        this.currentIndex += nextBatch.length;
    }

    /**
     * Factory for creating card elements based on type.
     */
    createCard(data) {
        const card = document.createElement('div');
        card.className = 'mizano-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        // Determine Status for Border Engine
        card.dataset.status = this.mapStatus(data);

        // Dispatch Layout
        switch (data.card_type) {
            case 'Standard Match Card':
                card.innerHTML = this.templateMatch(data);
                break;
            case 'Registration-State Card':
                card.innerHTML = this.templateRegistration(data);
                break;
            case 'Team Explorer Card':
                card.innerHTML = this.templateTeam(data);
                break;
            case 'Institution Card':
                card.innerHTML = this.templateInstitution(data);
                break;
            case 'Competition Card':
                card.innerHTML = this.templateCompetition(data);
                break;
            // Phase 10: New Card Types
            case 'Community Post Card':
                card.innerHTML = this.templateCommunityPost(data);
                break;
            case 'Job Listing Card':
                card.innerHTML = this.templateJobListing(data);
                break;
            case 'Lost Found Card':
                card.innerHTML = this.templateLostFound(data);
                break;
            case 'News Flash Card':
                card.innerHTML = this.templateNewsFlash(data);
                break;
            case 'Event Card':
                card.innerHTML = this.templateEvent(data);
                break;
            case 'Hobby Leisure Card':
                card.innerHTML = this.templateHobbyLeisure(data);
                break;
            // Feature Expansion Cards
            case 'Suggestion Card':
                card.innerHTML = this.templateSuggestion(data);
                break;
            case 'Challenge Card':
                card.innerHTML = this.templateChallenge(data);
                break;
            case 'Survey Card':
                card.innerHTML = this.templateSurvey(data);
                break;
            case 'Stats Card':
                card.innerHTML = this.templateStats(data);
                break;
            case 'venue':
                card.innerHTML = this.templateVenue(data);
                break;
            default:
                card.innerHTML = `<div style="padding:10px">Unknown Card Type: ${data.card_type}</div>`;
        }

        // Tap Action (Deterministic Delegation) - Only if not swiping
        card.addEventListener('click', (e) => {
            // Prevent navigation if clicking buttons or interactions
            if (e.target.closest('button') || e.target.closest('.toggle-details-btn')) return;

            if (window.MizanoNav) {
                window.MizanoNav.handleCardTap(data);
            }
        });

        // Initialize Interactions
        this.attachSwipeLogic(card);
        this.attachExpandLogic(card);

        return card;
    }

    /**
     * Attaches "Center Swipe to Like" Logic
     * Only activates on the Center Zone.
     */
    attachSwipeLogic(card) {
        const centerZone = card.querySelector('.card-center-zone');
        if (!centerZone) return;

        let startX = 0;
        let isDragging = false;
        const THRESHOLD = 50; // px to trigger like

        centerZone.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
        });

        centerZone.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        const handleEnd = (currentX) => {
            if (!isDragging) return;
            isDragging = false;
            const diff = currentX - startX;

            // Check if Swipe Right (Like)
            if (diff > THRESHOLD) {
                // Toggle Liked State
                const isLiked = card.dataset.liked === 'true';
                card.dataset.liked = !isLiked;

                // Haptic Feedback (Vibration)
                if (navigator.vibrate) navigator.vibrate(50);
            }
        };

        centerZone.addEventListener('mouseup', (e) => handleEnd(e.clientX));
        centerZone.addEventListener('mouseleave', () => { isDragging = false; });
        centerZone.addEventListener('touchend', (e) => handleEnd(e.changedTouches[0].clientX));
    }

    /**
     * Attaches Expand (+/-) Logic
     */
    attachExpandLogic(card) {
        const toggleBtn = card.querySelector('.toggle-details-btn');
        const panel = card.querySelector('.school-details-panel');

        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop card tap
                const isExpanded = panel.classList.contains('visible');

                if (isExpanded) {
                    panel.classList.remove('visible');
                    toggleBtn.classList.remove('expanded');
                    toggleBtn.innerHTML = '+';
                } else {
                    panel.classList.add('visible');
                    toggleBtn.classList.add('expanded');
                    toggleBtn.innerHTML = '-';
                }
            });
        }
    }


    /**
     * Renders a loading state in the container.
     */
    renderLoading(message = 'Loading...') {
        if (!this.container) return;
        this.clear();
        this.container.innerHTML = `<div class="placeholder-msg">${message}</div>`;
    }

    /**
     * Renders an empty state in the container.
     */
    renderEmpty(message = 'No results found matching your filters.') {
        if (!this.container) return;
        this.clear();
        this.container.innerHTML = `<div class="placeholder-msg">${message}</div>`;
    }

    /**
     * Maps data state to 7-color engine keys.
     */
    mapStatus(data) {
        // Safety Override: Academic Alert (Pink)
        if (data.safety_status === 'ACADEMIC_ALERT') return 'engagement';

        if (data.state === 'Active Now') return 'live';
        if (data.state === 'Active Soon') return 'upcoming';
        if (data.state === 'Passed') return 'finished';
        if (data.card_type === 'Registration-State Card') return 'upcoming';
        if (data.card_type === 'Match-Making Card') return 'recruiting';

        // New Feature Mappings
        if (data.card_type === 'Suggestion Card') return 'interest'; // Blue
        if (data.card_type === 'Challenge Card') return 'recruiting'; // Green (using recruiting for now, or custom green)
        if (data.card_type === 'Survey Card') return 'engagement'; // Pink (using engagement/academic alert color)
        if (data.card_type === 'Stats Card') return 'finished'; // Charcoal/Grey

        return 'interest';
    }

    /**
     * TEMPLATE: INSTITUTION CARD
     */
    templateInstitution(data) {
        const verifiedBadge = data.verified ? '<span class="verified-badge">✓</span>' : '';
        const categoryLabel = data.category || data.type || 'Institution';

        // Smart Logo Logic: Explicit Logo -> Business ID -> School ID -> Default
        const logoFile = data.logo ||
            (data.business_id ? `${data.business_id}.png` : null) ||
            (data.id ? `${data.id}.png` : null);

        // Mock stats if not present (safeguard)
        const studentCount = data.stats ? data.stats.students : Math.floor(Math.random() * 500) + 100;
        const teamCount = data.teams ? data.teams.length : 0;

        // Generate Details HTML
        const teamTags = data.teams ? data.teams.map(t => `<span class="detail-tag">${t.sport}</span>`).join('') : '';
        const classTags = ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5'].map(c => `<span class="detail-tag">${c}</span>`).join('');

        return `
            <div class="card-inst-layout">
                <div class="inst-header">
                    ${window.MizanoImages.render('logos', logoFile, 'inst-icon-box')}
                    
                    <!-- CENTER SWIPE ZONE -->
                    <div class="card-center-zone inst-info">
                        <div class="inst-name">${data.name} ${verifiedBadge}</div>
                        <div class="inst-meta">${categoryLabel} • ${data.location || 'Botswana'}</div>
                        <div class="inst-meta" style="margin-top:2px">${studentCount} Students • ${teamCount} Teams</div>
                    </div>

                    <div class="inst-actions-col" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                        <button class="inst-contact-btn">Msg</button>
                        <!-- TOGGLE BUTTON -->
                        <button class="toggle-details-btn">+</button>
                    </div>
                </div>

                <!-- EXPANDABLE PANEL -->
                <div class="school-details-panel">
                    <div class="detail-section-title">Sports Teams</div>
                    <div class="detail-tags">${teamTags || '<span class="detail-tag">None listed</span>'}</div>
                    
                    <div class="detail-section-title">Classes / Grades</div>
                    <div class="detail-tags">${classTags}</div>

                     <div class="detail-section-title">Academic Status</div>
                     <div class="inst-meta">Term 1 Active • 98% Attendance</div>
                </div>
            </div>
        `;
    }


    /**
     * TEMPLATE: COMPETITION CARD
     */
    templateCompetition(data) {
        const titleText = (data.title || data.event_name || 'Tournament').toUpperCase();
        return `
            <div class="card-comp-layout">
                <div class="comp-banner">
                    <div class="comp-title">${titleText}</div>
                    <div class="comp-prize">${data.prize_pool ? `P${data.prize_pool} Prize Pool` : 'Tournament'}</div>
                </div>
                <div class="comp-footer">
                    <div class="comp-meta">
                        <span>${data.sport}</span>
                        <span>${data.location_name}</span>
                    </div>
                    <button class="comp-join-btn">Register</button>
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: STANDARD MATCH CARD
     */
    templateMatch(data) {
        const left = data.left_team || { name: 'Team A' };
        const right = data.right_team || { name: 'Team B' };

        let centerTop = data.center_top || (data.state === 'Active Now' ? '0 - 0' : (data.start_time || 'LIVE'));
        if (centerTop === 'Invalid Date' || centerTop === 'undefined') centerTop = data.start_time || 'LIVE';

        let footerHtml = '';
        if (data.safety_status === 'MINOR_RESTRICTION') {
            footerHtml = `<div class="card-safety-footer">🔒 Guardian Approval Required</div>`;
        } else if (data.safety_status === 'ACADEMIC_ALERT') {
            footerHtml = `<div class="card-safety-footer orange">📚 Focus on Studies (Paused)</div>`;
        }

        return `
            <div class="card-match-layout">
                <div class="team-info left">
                    <span class="team-name">${left.name}</span>
                    ${window.MizanoImages.render('logos', left.logo || null, 'team-logo')}
                </div>
                <div class="match-center">
                    <span class="match-status">${centerTop}</span>
                    <span class="match-meta">${data.venue || 'TBA'}</span>
                </div>
                <div class="team-info right">
                    ${window.MizanoImages.render('logos', right.logo || null, 'team-logo')}
                    <span class="team-name">${right.name}</span>
                </div>
            </div>
            ${footerHtml}
        `;
    }

    /**
     * TEMPLATE: REGISTRATION-STATE CARD
     */
    templateRegistration(data) {
        const badge = data.urgency_badge || { text: 'Open', color: 'green' };
        const meta = data.price_range ? `From ${data.price_range}` : (data.activity_type || 'Event');
        const secondary = data.distances ? `<div class="reg-sub-meta">${data.distances.join(' • ')}</div>` : '';

        return `
            <div class="card-reg-layout">
                <div>
                    <div class="reg-title">${data.event_name}</div>
                    <div class="reg-meta">${meta} • ${data.start_date || 'TBA'}</div>
                    ${secondary}
                </div>
                <div class="urgency-badge ${badge.color || 'yellow'}">${badge.text}</div>
            </div>
        `;
    }

    /**
     * TEMPLATE: TEAM EXPLORER CARD
     */
    templateTeam(data) {
        const verifiedBadge = data.verified ? '<span class="verified-badge">✓</span>' : '';
        return `
            <div class="card-team-layout">
                <div class="team-header">
                    ${window.MizanoImages.render('logos', data.logo || null, 'team-logo-large')}
                    <div class="team-id-block">
                        <div class="team-name">${data.name} ${verifiedBadge}</div>
                        <div class="team-location">${data.village_town}</div>
                    </div>
                </div>
                <div class="team-footer">
                    <span class="sport-tag">${data.sport}</span>
                    <button class="join-team-btn">Connect</button>
                </div>
            </div>
        `;
    }


    /**
     * PHASE 10 TEMPLATES
     */

    /**
     * TEMPLATE: COMMUNITY POST CARD
     */
    templateCommunityPost(data) {
        const author = data.author || { name: 'Anonymous', avatar: null };
        const locationText = data.location || 'Botswana';

        return `
            <div class="card-community-layout">
                <div class="community-header">
                    <div class="author-info">
                        ${author.profile_picture ? `<img src="${author.profile_picture}" class="author-avatar" style="object-fit:cover;">` : (author.avatar ? `<img src="${author.avatar}" class="author-avatar" alt="${author.name}">` : '<div class="author-avatar-placeholder">👤</div>')}
                        <div>
                            <div class="author-name">${author.name}</div>
                            <div class="post-meta">${locationText} • ${this.formatDate(data.createdAt)}</div>
                        </div>
                    </div>
                </div>
                <div class="community-body">
                    <h3 class="post-title">${data.title}</h3>
                    <p class="post-content">${data.content}</p>
                </div>
                ${data.whatsappLink ? `<div class="community-footer"><a href="${data.whatsappLink}" class="whatsapp-btn">Contact via WhatsApp</a></div>` : ''}
            </div>
        `;
    }

    /**
     * TEMPLATE: JOB LISTING CARD
     */
    templateJobListing(data) {
        const salary = data.salary || 'Negotiable';
        const type = data.type || 'full_time';
        const typeLabel = type.replace('_', ' ').toUpperCase();

        return `
            <div class="card-job-layout">
                <div class="job-header">
                    ${window.MizanoImages.render('logos', data.logo || null, 'job-logo-mini')}
                    <div class="job-header-info">
                        <h3 class="job-title">${data.title}</h3>
                        <span class="job-type-badge ${type}">${typeLabel}</span>
                    </div>
                </div>
                <div class="job-company">${data.company} • ${data.location}</div>
                <div class="job-salary">${salary}</div>
                ${data.description ? `<p class="job-description">${data.description.substring(0, 120)}...</p>` : ''}
                <div class="job-footer">
                    <span class="job-deadline">Apply by ${this.formatDate(data.deadline)}</span>
                    ${data.contactWhatsApp ? `<a href="https://wa.me/${data.contactWhatsApp}" class="apply-btn">Apply</a>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: LOST & FOUND CARD
     */
    templateLostFound(data) {
        const isLost = data.type === 'lost';
        const statusLabel = isLost ? 'LOST' : 'FOUND';
        const statusClass = isLost ? 'lost' : 'found';

        return `
            <div class="card-lostfound-layout">
                <div class="lf-header">
                    <div class="lf-visual-col">
                        ${window.MizanoImages.render('general', data.image || null, 'lf-image-mini')}
                        <span class="lf-status-badge ${statusClass}">${statusLabel}</span>
                    </div>
                    ${data.boosted ? '<span class="boosted-badge">⭐ Boosted</span>' : ''}
                </div>
                <h3 class="lf-title">${data.title}</h3>
                <p class="lf-description">${data.description}</p>
                <div class="lf-meta">
                    <span>📍 ${data.location}</span>
                    <span>📅 ${this.formatDate(data.date)}</span>
                </div>
                ${data.poster?.whatsapp ? `<a href="https://wa.me/${data.poster.whatsapp}" class="contact-btn">Contact ${data.poster.name}</a>` : ''}
            </div>
        `;
    }

    /**
     * TEMPLATE: NEWS FLASH CARD
     */
    templateNewsFlash(data) {
        return `
            <div class="card-news-layout">
                <div class="news-source">
                    ${window.MizanoImages.render('logos', data.sourceLogo || null, 'source-logo')}
                    <span class="source-name">${data.source}</span>
                    <span class="news-category">${data.category}</span>
                </div>
                <h3 class="news-headline">${data.headline}</h3>
                <p class="news-summary">${data.summary}</p>
                ${data.thumbnail ? window.MizanoImages.render('general', data.thumbnail, 'news-thumbnail') : ''}
                <div class="news-footer">
                    <span class="news-date">${this.formatDate(data.publishedAt)}</span>
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: EVENT CARD (Enhanced with Experience Types)
     */
    templateEvent(data) {
        const experienceType = data.experienceType || 'event_lab_form';
        const experienceIcons = {
            'three_way_handshake': '🔒',
            'monetization_waiver': '💰',
            'sports_cv_sync': '📊',
            'proposed_milestone': '🎯',
            'direct_connect': '⚡',
            'one_tap': '👆',
            'event_lab_form': '📝'
        };

        return `
            <div class="card-event-layout">
                <div class="event-header">
                    <h3 class="event-name">${data.eventName || data.event_name}</h3>
                    <span class="experience-badge">${experienceIcons[experienceType] || '📝'}</span>
                </div>
                <div class="event-meta">
                    <span>📅 ${this.formatDate(data.startDate || data.start_date)}</span>
                    <span>📍 ${data.village || data.venue_name || 'TBA'}</span>
                </div>
                ${data.category ? `<span class="event-category">${data.category}</span>` : ''}
                ${data.priceRange || data.price_range ? `<div class="event-price">${data.priceRange || data.price_range}</div>` : ''}
                ${data.description ? `<p class="event-description">${data.description.substring(0, 100)}...</p>` : ''}
                <div class="event-footer">
                    ${data.guardianRequired ? '<span class="guardian-required">🔒 Guardian Approval Required</span>' : ''}
                    ${data.whatsappLink ? `<a href="${data.whatsappLink}" class="register-btn">Register</a>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: HOBBY/LEISURE CARD
     */
    templateHobbyLeisure(data) {
        const skillLevel = data.skill_level || data.skillLevel || 'All Levels';
        const location = data.location?.village || data.village || 'Botswana';

        return `
            <div class="card-hobby-layout">
                <div class="hobby-header">
                    <h3 class="hobby-title">${data.title}</h3>
                    <span class="skill-badge">${skillLevel}</span>
                </div>
                <div class="hobby-sport">${data.sport_display || data.specific_sport}</div>
                <div class="hobby-meta">
                    <span>📍 ${location}</span>
                    <span>👥 ${data.enrollment_count || 0}/${data.capacity_max || '∞'}</span>
                </div>
                ${data.description ? `<p class="hobby-description">${data.description.substring(0, 100)}...</p>` : ''}
                <div class="hobby-footer">
                    <span class="hobby-date">${this.formatDate(data.start_datetime)}</span>
                    ${data.entry_fee_pula > 0 ? `<span class="hobby-fee">P${data.entry_fee_pula}</span>` : '<span class="hobby-fee">FREE</span>'}
                    ${data.whatsapp_link ? `<a href="${data.whatsapp_link}" class="join-btn">Join</a>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * HELPER: Format Date
     */
    formatDate(dateString) {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        const now = new Date();
        const diffDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;

        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }


    /**
     * Clears the container and resets the scroller.
     * Prevents memory leaks by disconnecting previous observations.
     */
    clear() {
        if (!this.container) return;
        this.scroller.disconnect();
        this.container.innerHTML = '';
    }

    static templateLeaderboardSummary(data) {
        return `
            <div class="card leaderboard-summary-card" onclick="window.MizanoLeaderboard.open()">
                <div class="card-header">
                    <h3>🏆 Top Performers</h3>
                    <span class="view-all">View All</span>
                </div>
                <div class="summary-list">
                    ${data.slice(0, 3).map((item, i) => `
                        <div class="summary-item">
                            <span class="rank">#${i + 1}</span>
                            <span class="name">${item.name}</span>
                            <span class="pts">${item.rank_points} pts</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: SHOPPING DEAL CARD
     */
    templateShoppingDeal(data) {
        const inStock = data.in_stock !== false;
        const stockClass = inStock ? 'in-stock' : 'out-of-stock';
        const stockLabel = inStock ? 'In Stock' : 'Out of Stock';

        return `
            <div class="card-shopping-layout">
                <div class="shopping-image-container">
                    ${window.MizanoImages.render('shopping', data.image_path || null, 'shopping-image')}
                    <span class="stock-badge ${stockClass}">${stockLabel}</span>
                </div>
                <div class="shopping-content">
                    <h3 class="shopping-title">${data.title}</h3>
                    <div class="shopping-category">${data.subcategory}</div>
                    <div class="shopping-price">P${data.price_pula.toFixed(2)}</div>
                    <div class="shopping-meta">
                        <span class="seller">🏪 ${data.seller}</span>
                        <span class="location">📍 ${data.location}</span>
                    </div>
                    ${data.rating ? `<div class="shopping-rating">⭐ ${data.rating}/5.0</div>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: SUGGESTION CARD (Blue)
     */
    templateSuggestion(data) {
        return `
            <div class="card-suggestion-layout">
                <div class="suggestion-header">
                    <span class="suggestion-icon">💡</span>
                    <span class="suggestion-title">Activity of the Week</span>
                </div>
                <h3 class="suggestion-activity">${data.title}</h3>
                <p class="suggestion-desc">${data.description}</p>
                <div class="suggestion-actions">
                    <button class="suggestion-btn-primary">I'll try it</button>
                    <button class="suggestion-btn-secondary">Remind me later</button>
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: CHALLENGE CARD (Green)
     */
    templateChallenge(data) {
        const participants = data.participantsCount || 1;
        const progress = data.progress || 0;
        const goal = data.goalValue || 10;
        const unit = data.goalUnit || 'km';

        return `
            <div class="card-challenge-layout">
                <div class="challenge-header">
                    <span class="challenge-icon">🏆</span>
                    <span class="challenge-title">Neighborhood Challenge</span>
                </div>
                <h3 class="challenge-name">${data.title}</h3>
                <div class="challenge-stats">
                    <span>Progress: ${progress}/${goal} ${unit}</span>
                    <span>Participants: You + ${participants - 1} others</span>
                </div>
                <div class="challenge-actions">
                    <button class="challenge-btn-join">Join</button>
                    <button class="challenge-btn-view">View Progress</button>
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: SURVEY CARD (Pink)
     */
    templateSurvey(data) {
        const options = data.options || ['Yes', 'No'];
        const buttonsHtml = options.map(opt => `<button class="survey-option-btn">${opt}</button>`).join('');

        return `
            <div class="card-survey-layout">
                <div class="survey-header">
                    <span class="survey-icon">📊</span>
                    <span class="survey-title">${data.title}</span>
                </div>
                <p class="survey-question">${data.question}</p>
                <div class="survey-options-grid">
                    ${buttonsHtml}
                </div>
            </div>
        `;
    }

    /**
     * TEMPLATE: STATS CARD (Charcoal)
     */
    templateStats(data) {
        return `
            <div class="card-stats-layout">
                <div class="stats-header">
                    <span class="stats-icon">📊</span>
                    <span class="stats-title">Community Activity</span>
                </div>
                <div class="stats-body">
                    <div class="stats-highlight">This week in ${data.location_code || 'Your Area'}:</div>
                    <div class="stats-count">${data.active_users_last_7days || 0} people logged activities</div>
                </div>
                <button class="stats-btn-expand">View region stats</button>
            </div>
        `;
    }

    /**
     * TEMPLATE: VENUE CARD
     */
    templateVenue(data) {
        const spacesCount = data.spaces_count || 0;
        return `
            <div class="card-institution-layout">
                <div class="inst-header">
                    ${window.MizanoImages.render('venues', data.image || null, 'inst-icon-box')}
                    <div class="inst-info">
                        <div class="inst-name">${data.name}</div>
                        <div class="inst-meta">📍 ${data.location}</div>
                    </div>
                </div>
                <div class="inst-meta" style="margin-top:8px; display:flex; justify-content:space-between;">
                    <span>⭐ ${data.rating}/5</span>
                    <span>${spacesCount} space${spacesCount !== 1 ? 's' : ''}</span>
                </div>
            </div>
        `;
    }
}

// Global initialization logic if needed
window.MizanoCards = CardRenderer;



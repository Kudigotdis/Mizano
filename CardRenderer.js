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
            this.scroller.disconnect(); // Reset scroller observation
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
                card.classList.add('card-match');
                card.innerHTML = this.templateMatch(data);
                break;
            case 'Registration-State Card':
            case 'Event Card':
            case 'Hobby Leisure Card':
            case 'Competition Card':
                card.classList.add('card-event');
                card.innerHTML = this.templateEvent(data);
                break;
            case 'Community Post Card':
                card.innerHTML = this.templateCommunityAction(data);
                break;
            case 'Team Explorer Card':
                card.innerHTML = this.templateTeam(data);
                break;
            case 'Institution Card':
                card.innerHTML = this.templateInstitution(data);
                break;
            case 'Job Listing Card':
                card.innerHTML = this.templateJobListing(data);
                break;
            case 'Lost Found Card':
                card.innerHTML = this.templateLostFound(data);
                break;
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
            case 'News Flash Card':
                card.innerHTML = this.templateNewsFlash(data);
                break;

            // DOC3 PART 23 - NEW CARDS
            case 'card-playerprofile':
                card.innerHTML = this.templatePlayerProfile(data);
                break;
            case 'card-leaderboard':
                card.innerHTML = this.templateLeaderboard(data);
                break;
            case 'card-promo':
                card.innerHTML = this.templatePromo(data);
                break;
            case 'card-venue':
            case 'venue':
                card.innerHTML = this.templateVenue(data);
                break;
            case 'card-lesson':
                card.innerHTML = this.templateLesson(data);
                break;
            case 'card-hobby':
                card.innerHTML = this.templateHobby(data);
                break;
            case 'card-leisure':
                card.innerHTML = this.templateLeisure(data);
                break;
            case 'card-spotlight':
                card.innerHTML = this.templateSpotlight(data);
                break;
            case 'card-school':
                card.innerHTML = this.templateSchool(data);
                break;
            case 'card-community-action':
            case 'Community Post Card':
                card.innerHTML = this.templateCommunityAction(data);
                break;
            case 'card-service':
                card.innerHTML = this.templateService(data);
                break;
            case 'card-recruitment':
                card.innerHTML = this.templateRecruitment(data);
                break;
            case 'card-minor':
                card.innerHTML = this.templateMinor(data);
                break;

            default:
                card.innerHTML = `<div style="padding:16px">Unknown Type: ${data.card_type}</div>`;
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
        const ct = data.card_type;

        // DOC3 PART 23 Explicit Mappings
        if (ct === 'card-playerprofile' || ct === 'card-hobby' || ct === 'card-recruitment') return 'recruiting'; // Green
        if (ct === 'card-leaderboard') return 'finished'; // Charcoal
        if (ct === 'card-promo' || ct === 'card-spotlight') return 'live'; // Orange
        if (ct === 'card-lesson' || ct === 'card-service') return 'learning'; // Blue
        if (ct === 'card-community-action' || ct === 'Survey Card' || ct === 'Suggestion Card') return 'engagement'; // Pink
        if (ct === 'card-venue' || ct === 'card-leisure' || ct === 'card-school' || ct === 'card-minor' || ct === 'Institution Card' || ct === 'Job Listing Card' || ct === 'Shopping Deal Card' || ct === 'venue') return 'official'; // Light Blue

        // Strict v4.0 Mappings (Backwards Compatibility)
        if (ct === 'Lost Found Card') {
            const type = data.type || (data.status === 'lost' ? 'lost' : 'found');
            return type === 'lost' ? 'official' : 'recruiting';
        }
        if (ct === 'Challenge Card' || ct === 'Match-Making Card') return 'recruiting';
        if (ct === 'Registration-State Card') return 'upcoming';

        // Match Live/Upcoming/Finished
        if (data.state === 'Active Now') return 'live';
        if (data.state === 'Active Soon') return 'upcoming';
        if (data.state === 'Passed') return 'finished';

        return 'official';
    }

    templateInstitution(data) {
        const logoHTML = data.logo_emblem || data.logo || '🏫';
        const name = data.name || 'Institution';
        const verifiedBadge = data.is_verified || data.verified ? '<span class="card-institution__verified">✓</span>' : '';
        const category = data.category || 'Academic';
        const location = data.location || 'Botswana';

        let stats = data.stats || [];
        if (!Array.isArray(stats) && typeof stats === 'object') {
            stats = Object.entries(stats).map(([label, value]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), value }));
        }
        const statsHTML = stats.map(s => `<div class="card-institution__stat">${s.value} <span>${s.label}</span></div>`).join('');

        return `
            <div class="card-institution">
                <div class="card-institution__logo">${logoHTML}</div>
                <div class="card-institution__body">
                    <div class="card-institution__name">
                        ${name}
                        ${verifiedBadge}
                    </div>
                    <div class="card-institution__sub">${category} · ${location}</div>
                    <div class="card-institution__stats">
                        ${statsHTML}
                    </div>
                </div>
            </div>
        `;
    }



    templateMatch(data) {
        const isLiveOrFinished = data.state === 'Active Now' || data.state === 'Passed';
        const teamA = data.left_team || data.team_a || { name: 'Team A' };
        const teamB = data.right_team || data.team_b || { name: 'Team B' };

        const logoA = teamA.logo || data.team_a_logo ? `<img src="${teamA.logo || data.team_a_logo}" alt="${teamA.name}">` : '⚽';
        const logoB = teamB.logo || data.team_b_logo ? `<img src="${teamB.logo || data.team_b_logo}" alt="${teamB.name}">` : '🏆';

        const kickoffTime = data.start_time || data.match_time || 'TBA';
        const venueName = data.venue || data.venue_name || 'TBA';
        const locationName = data.location || data.venue_location || 'Botswana';

        let scoreOrTimeHTML = `<div class="card-match__score-time">${kickoffTime}</div>`;
        if (isLiveOrFinished) {
            scoreOrTimeHTML = `
                <div class="card-match__score-row">
                    <span class="card-match__score-num">${data.left_score || 0}</span>
                    <div class="card-match__score-sep"><span class="colon">:</span><span class="dots">···</span></div>
                    <span class="card-match__score-num">${data.right_score || 0}</span>
                </div>
            `;
        }

        const htScoreHTML = data.match_period || data.ht_score ? `<div class="card-match__ht">${data.match_period || data.ht_score}</div>` : '';
        const minuteHTML = data.state === 'Active Now' && data.match_minute ? `<div class="card-match__minute">${data.match_minute}'</div>` : '';

        let safetyFooterHTML = '';
        if (data.safety_status && data.safety_status !== 'NONE') {
            safetyFooterHTML = `<div class="card-match__footer">🔒 ${data.safety_footer || 'Guardian Approval Required'}</div>`;
        }

        return `
            <div class="card-match__teams">
                <div class="card-match__team">
                    <div class="card-match__logo">${logoA}</div>
                    <div class="card-match__team-name">${teamA.name}</div>
                </div>
                <div class="card-match__center">
                    ${scoreOrTimeHTML}
                    ${htScoreHTML}
                    ${minuteHTML}
                </div>
                <div class="card-match__team">
                    <div class="card-match__logo">${logoB}</div>
                    <div class="card-match__team-name">${teamB.name}</div>
                </div>
            </div>
            <div class="card-match__venue">${venueName}<span class="dot-sep"></span>${locationName}</div>
            ${safetyFooterHTML}
        `;
    }

    templateRegistration(data) {
        return this.templateEvent(data);
    }

    templateTeam(data) {
        return this.templateInstitution(data);
    }


    /**
     * PHASE 10 TEMPLATES
     */

    templateCommunityPost(data) {
        const title = data.post_title || data.title || 'Untitled Post';
        const content = data.post_content || data.content || '';
        const author = data.author || { name: 'Anonymous', avatar: null };
        const avatar = author.profile_picture || author.avatar || data.author_avatar || '👤';
        const village = data.author_village || author.village || 'Botswana';
        const area = data.author_area || author.area || 'Central';
        const timestamp = data.timestamp || this.formatDate(data.createdAt);

        return `
            <div class="card-feed__title">${title}</div>
            <div class="card-feed__body">${content}</div>
            <div class="card-feed__author-row">
                <div class="card-feed__avatar">${avatar}</div>
                <div class="card-feed__author-info">
                    <div class="card-feed__author-name">${author.name}</div>
                    <div class="card-feed__author-location">
                        ${village}<span class="dot-sep"></span>${area}<span class="dot-sep"></span>${timestamp}
                    </div>
                </div>
            </div>
            <div class="card-feed__actions" style="margin-top: 12px; display: flex; gap: 8px;">
                <button class="mizano-action-btn community-boost-btn" data-id="${data.local_id || data.id}" style="flex:1; padding:8px; background:#fff; border:1px solid #ff5722; color:#ff5722; border-radius:4px; font-weight:600; font-size:0.85rem;">Boost Post</button>
            </div>
        `;
    }

    templateJobListing(data) {
        const title = data.job_title || data.title || 'Job Opening';
        const company = data.company_name || data.company || 'Organization';
        const location = data.location || 'Botswana';
        const salary = data.salary_range || data.salary || 'Negotiable';
        const deadline = data.deadline_date || this.formatDate(data.deadline);

        return `
            <div class="card-job__title">${title}</div>
            <div class="card-job__company">${company} · ${location}</div>
            <div class="card-job__salary">${salary}</div>
            <div class="card-job__deadline">Deadline: ${deadline}</div>
            <div class="card-job__actions" style="margin-top: 12px; display: flex; gap: 8px;">
                <button class="mizano-action-btn job-apply-btn" data-id="${data.local_id || data.id}" style="flex:1; padding:10px; background:#1e88e5; color:#fff; border:none; border-radius:4px; font-weight:700; font-size:0.9rem;">Quick-Apply</button>
            </div>
        `;
    }

    templateLostFound(data) {
        const type = data.type || (data.status === 'lost' ? 'lost' : 'found');
        const statusLabel = data.status_label || (type === 'lost' ? 'Looking For' : 'Found');
        const statusClass = type === 'lost' ? 'status-looking' : 'status-found';
        const item = data.item_name || data.title || 'Item';
        const location = data.location || 'Botswana';
        const date = data.date || this.formatDate(data.createdAt);

        return `
            <div class="card-lostfound__top">
                <span class="card-lostfound__status ${statusClass}">${statusLabel}</span>
                <span class="card-lostfound__item">${item}</span>
            </div>
            <div class="card-lostfound__location">${location}<span class="dot-sep"></span>${date}</div>
        `;
    }

    templateNewsFlash(data) {
        const title = data.headline || data.title || 'News Update';
        const body = data.summary || data.content || '';
        const source = data.source || 'Mizano News';
        const location = data.category || 'Local Update';
        const date = this.formatDate(data.publishedAt || data.createdAt);

        return `
            <div class="card-feed__title">${title}</div>
            <div class="card-feed__body">${body}</div>
            <div class="card-feed__author-row">
                <div class="card-feed__avatar">🗞️</div>
                <div class="card-feed__author-info">
                    <div class="card-feed__author-name">${source}</div>
                    <div class="card-feed__author-location">
                        ${location}<span class="dot-sep"></span>${date}
                    </div>
                </div>
            </div>
        `;
    }

    templateEvent(data) {
        const eventTitle = data.title || data.eventName || data.event_name || 'Event';
        const formattedDate = this.formatDate(data.date || data.startDate || data.start_date);

        const tags = data.tags || [];
        if (tags.length === 0) {
            if (data.category) tags.push(data.category);
            if (data.distances && Array.isArray(data.distances)) tags.push(...data.distances);
        }
        const tagsHTML = tags.join('<span class="dot-sep"></span>');

        const priceText = data.price_display || data.priceRange || data.price_range || 'Free Entry';

        return `
            <div class="card-event__title">${eventTitle}</div>
            <div class="card-event__date">${formattedDate}</div>
            <div class="card-event__tags">${tagsHTML}</div>
            <div class="card-event__price-bar">${priceText}</div>
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

    templateShoppingDeal(data) {
        const image = data.product_image || (data.image_path ? `<img src="${data.image_path}" alt="${data.product_name || data.title}">` : '👟');
        const name = data.product_name || data.title || 'Product';
        const category = data.category || data.subcategory || 'General';
        const price = data.price_display || (data.price_pula ? `P${data.price_pula.toFixed(2)}` : 'Free');
        const seller = data.seller_name || data.seller || 'Mizano Seller';
        const location = data.location || 'Botswana';

        return `
            <div class="card-product__image">
                ${image}
            </div>
            <div class="card-product__name">${name}</div>
            <div class="card-product__category">${category}</div>
            <div class="card-product__footer">
                <div class="card-product__price">${price}</div>
                <div class="card-product__seller">${seller} · ${location}</div>
            </div>
        `;
    }

    templateSuggestion(data) {
        return `
            <div class="card-feed__title">💡 Suggestion: ${data.title}</div>
            <div class="card-feed__body">${data.description}</div>
        `;
    }

    templateChallenge(data) {
        const challengeType = data.challenge_type || data.type || "Neighborhood Challenge";
        const goalText = data.goal_text || data.title || "Activity Challenge";
        const current = data.current_progress || data.progress || 0;
        const target = data.target_goal || data.goalValue || 10;
        const unit = data.unit || data.goalUnit || 'km';
        const participantCount = data.participant_count || data.participants || 1;
        const percent = data.progress_pct || Math.min(100, Math.round((current / target) * 100));

        return `
            <div class="card-challenge__type">${challengeType}</div>
            <div class="card-challenge__goal">${goalText}</div>
            <div class="card-challenge__progress-label">
                <span>Progress</span><span>${current} / ${target} ${unit}</span>
            </div>
            <div class="card-challenge__progress-bar">
                <div class="card-challenge__progress-fill" style="width:${percent}%"></div>
            </div>
            <div class="card-challenge__participants">${participantCount} participants joined</div>
        `;
    }

    templateSurvey(data) {
        const pollCategory = data.category || data.title || "Community Pulse";
        const pollQuestion = data.question_text || data.question || 'Wait for more info...';
        const options = data.options || ['Yes', 'No'];
        const voteCount = data.vote_count || 0;
        const percent = data.progress_pct || 0;

        const optionsHTML = options.map(opt => {
            const optText = typeof opt === 'string' ? opt : opt.text;
            return `<button class="card-poll__option">${optText}</button>`;
        }).join('');

        const progressHTML = voteCount > 0 ? `
            <div class="card-poll__progress-label"><span>Responses</span><span>${voteCount} voted</span></div>
            <div class="card-poll__progress-bar"><div class="card-poll__progress-fill" style="width:${percent}%"></div></div>
        ` : '';

        return `
            <div class="card-poll__category">${pollCategory}</div>
            <div class="card-poll__question">${pollQuestion}</div>
            <div class="card-poll__options">
                ${optionsHTML}
            </div>
            ${progressHTML}
        `;
    }

    templateStats(data) {
        return `
            <div class="card-feed__title">📊 Community Stats</div>
            <div class="card-feed__body">
                In ${data.location_code || 'Your Area'}: ${data.active_users_last_7days || 0} people logged activities this week.
            </div>
        `;
    }

    /**
     * DOC3 PART 23 - NEW CARDS (BATCH 1)
     */

    templatePlayerProfile(data) {
        const sport = data.sport || 'Athlete';
        const name = data.name || data.title || 'Player';
        const avatar = data.avatar || '👤';
        const position = Array.isArray(data.position) ? data.position.join(', ') : (data.position || 'Any Position');
        const level = data.playing_level || 'Amateur';
        const area = data.area || data.location || 'Unknown Area';
        const endorsements = data.endorsement_count || 0;

        let scoutingHtml = '';
        if (data.scouting_open || data.scouting_open_label) {
            scoutingHtml = `<span class="card-player__badge-scouting">Scouting Open</span>`;
        }

        const availability = Array.isArray(data.availability) ? data.availability.slice(0, 2).join(' · ') : (data.availability || '');
        const availHtml = availability ? `<div class="card-player__availability">${availability}</div>` : '';

        return `
            <div class="card-player__top-row">
                <div class="card-player__avatar">${avatar}</div>
                <div class="card-player__info">
                    <div class="card-player__name">${name}</div>
                    <div class="card-player__sport">${sport} · ${position}</div>
                </div>
            </div>
            <div class="card-player__meta-row">
                <span class="card-player__level">${level}</span>
                <span class="dot-sep"></span>
                <span class="card-player__area">${area}</span>
            </div>
            ${availHtml}
            <div class="card-player__footer">
                <span class="card-player__endorsements">⭐ ${endorsements} Endorsements</span>
                ${scoutingHtml}
            </div>
        `;
    }

    templateLeaderboard(data) {
        const rank = parseInt(data.rank_number) || 0;
        const name = data.name || 'Competitor';
        const avatar = data.avatar ? `<img src="${data.avatar}" alt="avatar">` : '👤';
        const score = data.score || 0;
        const unit = data.unit || 'pts';
        const scope = data.scope || '';

        let podiumClass = '';
        if (data.podium_style || rank <= 3) {
            if (rank === 1) podiumClass = 'rank-gold';
            else if (rank === 2) podiumClass = 'rank-silver';
            else if (rank === 3) podiumClass = 'rank-bronze';
        }

        const rankDisplay = rank > 0 ? `#${rank}` : '-';

        return `
            <div class="card-leaderboard__row">
                <div class="card-leaderboard__rank ${podiumClass}">${rankDisplay}</div>
                <div class="card-leaderboard__avatar">${avatar}</div>
                <div class="card-leaderboard__info">
                    <div class="card-leaderboard__name">${name}</div>
                    <div class="card-leaderboard__scope">${scope}</div>
                </div>
                <div class="card-leaderboard__score">
                    <span class="score-val">${score}</span>
                    <span class="score-unit">${unit}</span>
                </div>
            </div>
        `;
    }

    templatePromo(data) {
        const headline = data.headline || 'Special Promotion';
        const expiry = this.formatDate(data.expiry_date);
        const channel = data.channel || 'Shopping';
        const offer = data.offer_text || '';
        const discount = data.discount_percent ? `<div class="card-promo__discount">-${data.discount_percent}%</div>` : '';
        const logo = data.business_logo ? `<img class="card-promo__logo-img" src="${data.business_logo}" alt="logo">` : '<span class="card-promo__logo-emoji">🏷️</span>';
        const business = data.business_name || 'Mizano Business';

        return `
            <div class="card-promo__header">
                <div class="card-promo__business-logo">${logo}</div>
                <div class="card-promo__business-name">${business}</div>
                ${discount}
            </div>
            <div class="card-promo__body">
                <div class="card-promo__headline">${headline}</div>
                <div class="card-promo__offer">${offer}</div>
            </div>
            <div class="card-promo__footer">
                <span class="card-promo__status">Live Offer</span>
                <span class="card-promo__expiry">Expires: ${expiry}</span>
            </div>
        `;
    }

    templateVenue(data) {
        const name = data.venue_name || data.name || 'Venue';
        const type = data.type || 'Facility';
        const surface = data.surface || 'Unknown Surface';
        const amenities = Array.isArray(data.amenities) ? data.amenities.slice(0, 3).join(' · ') : (data.amenities || '');
        const capacity = data.capacity ? `${data.capacity} Capacity` : '';
        const ownership = data.ownership || '';
        const booking = data.booking_status || 'Unavailable';
        const city = data.city || '';
        const area = data.area || '';

        const location = [area, city].filter(Boolean).join(', ') || 'Botswana';

        let bookingClass = booking.toLowerCase() === 'bookable' ? 'status-bookable' : 'status-not-bookable';

        return `
            <div class="card-venue__header">
                <div class="card-venue__title">${name}</div>
                <div class="card-venue__badge ${bookingClass}">${booking}</div>
            </div>
            <div class="card-venue__meta">
                <span>${type}</span><span class="dot-sep"></span><span>${surface}</span>
            </div>
            <div class="card-venue__location">📍 ${location}</div>
            <div class="card-venue__details">
                ${capacity ? `<span>👥 ${capacity}</span>` : ''}
                ${ownership ? `<span style="margin-left: 8px;">🏢 ${ownership}</span>` : ''}
            </div>
            ${amenities ? `<div class="card-venue__amenities">${amenities}</div>` : ''}
        `;
    }

    templateLesson(data) {
        const coach = data.coach_name || 'Coach';
        const sport = data.sport || 'Activity';
        const skill = data.skill_level || 'All Levels';
        const age = data.age_bracket || 'All Ages';
        const schedule = data.schedule_text || data.schedule || 'Flexible Schedule';
        const rate = data.rate_bwp ? `P${data.rate_bwp} / session` : 'Contact for rate';
        const sessionType = data.session_type || 'Private/Group';

        return `
            <div class="card-lesson__header">
                <div class="card-lesson__coach">${coach}</div>
                <div class="card-lesson__rate">${rate}</div>
            </div>
            <div class="card-lesson__sport">${sport}</div>
            <div class="card-lesson__details">
                <span class="card-lesson__skill">${skill}</span>
                <span class="dot-sep"></span>
                <span class="card-lesson__age">${age}</span>
            </div>
            <div class="card-lesson__meta">
                <span>📅 ${schedule}</span>
                <span style="margin-left:8px;">📋 ${sessionType}</span>
            </div>
        `;
    }

    templateHobby(data) {
        const activity = data.activity_name || data.title || 'Hobby';
        const tags = Array.isArray(data.interest_tags) ? data.interest_tags.slice(0, 3).join(' · ') : (data.interest_tags || '');
        const partner = data.looking_for_partner ? '<span class="status-recruiting" style="font-size: 11px; padding: 2px 6px; border: 1px solid #70AD47; color: #70AD47; border-radius: 4px;">Looking for Partner</span>' : '';
        const area = data.meetup_area || data.area || data.location || 'Flexible Location';
        const level = data.casual_level || 'Casual';

        return `
            <div class="card-hobby__header">
                <div class="card-hobby__title" style="font-weight:600; font-size: 15px;">${activity}</div>
                ${partner}
            </div>
            <div class="card-hobby__meta" style="margin-top: 6px; font-size: 13px; color: #666;">
                <span>📍 ${area}</span>
                <span class="dot-sep"></span>
                <span>🎯 ${level}</span>
            </div>
            ${tags ? `<div class="card-hobby__tags" style="margin-top: 8px; font-size: 12px; color: #888;">🏷️ ${tags}</div>` : ''}
        `;
    }

    templateLeisure(data) {
        const name = data.experience_name || data.name || data.title || 'Leisure Experience';
        const size = data.group_size || 'Open';
        const reqs = data.entry_requirements || 'None';
        const area = data.area || data.location || 'Botswana';
        const price = data.price_bwp ? `P${data.price_bwp}` : 'Free/Varies';
        const date = this.formatDate(data.date || data.startDate);

        return `
            <div class="card-leisure__header" style="display:flex; justify-content:space-between; align-items:center;">
                <div class="card-leisure__title" style="font-weight:600; font-size: 15px;">${name}</div>
                <div class="card-leisure__price" style="font-weight:600; color:var(--mizano-blue, #1A73E8);">${price}</div>
            </div>
            <div class="card-leisure__meta" style="margin-top: 6px; font-size: 13px; color: #666;">
                <span>📍 ${area}</span>
                <span class="dot-sep"></span>
                <span>📅 ${date}</span>
            </div>
            <div class="card-leisure__details" style="margin-top: 8px; font-size: 12px; color: #555; display:flex; gap:12px;">
                <span>👥 Size: ${size}</span>
                <span>⚠️ Reqs: ${reqs}</span>
            </div>
        `;
    }

    templateSpotlight(data) {
        const img = data.hero_image ? `<img src="${data.hero_image}" style="width:100%; height:140px; object-fit:cover; border-radius: 6px;" alt="${data.title}">` : '<div class="card-spotlight__placeholder" style="width:100%; height:140px; background:#f0f0f0; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:24px;">✨</div>';
        const title = data.title || 'Spotlight';
        const badge = data.trending_badge ? `<span class="card-spotlight__badge" style="position:absolute; top:8px; right:8px; background:rgba(255,165,0,0.9); color:#fff; padding:2px 6px; font-size:11px; border-radius:4px;">🔥 Trending</span>` : '';
        const subtitle = data.subtitle || '';

        return `
            <div class="card-spotlight__hero" style="position:relative;">
                ${img}
                ${badge}
            </div>
            <div class="card-spotlight__body" style="margin-top: 10px;">
                <div class="card-spotlight__title" style="font-weight:600; font-size: 16px;">${title}</div>
                <div class="card-spotlight__subtitle" style="font-size: 13px; color: #666; margin-top:2px;">${subtitle}</div>
            </div>
        `;
    }

    templateSchool(data) {
        const name = data.school_name || data.name || 'School';
        const affiliation = data.affiliation_badge ? `<span class="card-school__badge" style="background:#e8f4fd; color:#1A73E8; padding:2px 6px; border-radius:4px; font-size:11px;">${data.affiliation_badge}</span>` : '';
        const students = data.student_count || data.students || '0';
        const sport = data.primary_sport || 'Multi-sport';
        const area = data.area || data.location || 'Botswana';
        const rankings = data.rankings || '';

        return `
            <div class="card-school__header" style="display:flex; justify-content:space-between; align-items:center;">
                <div class="card-school__title" style="font-weight:600; font-size: 15px;">${name}</div>
                ${affiliation}
            </div>
            <div class="card-school__meta" style="margin-top: 6px; font-size: 12px; color: #666;">
                <span>📍 ${area}</span>
                <span class="dot-sep"></span>
                <span>🏅 ${sport}</span>
            </div>
            <div class="card-school__details" style="margin-top: 8px; font-size: 12px; color: #555; display:flex; gap:12px;">
                <span>👥 ${students} Students</span>
                ${rankings ? `<span>🏆 ${rankings}</span>` : ''}
            </div>
        `;
    }

    templateCommunityAction(data) {
        const type = data.request_type || data.title || 'Community Action';
        const urgency = data.urgency_level || 'Normal';
        const area = data.neighbourhood || data.location || 'Local Area';
        const author = data.posted_by_name || data.author || 'Neighbor';
        const time = this.formatDate(data.timestamp || data.createdAt);

        const chips = Array.isArray(data.action_chips) ? data.action_chips : ['Help Out'];
        const chipsHtml = chips.map(c => `<button class="btn-action btn-outline" style="font-size:11px; padding:4px 8px; margin-right:4px; border:1px solid #ccc; background:transparent; border-radius:4px;">${c}</button>`).join('');

        let urgencyColor = urgency.toLowerCase() === 'high' ? 'color:#E53935;' : (urgency.toLowerCase() === 'medium' ? 'color:#FF9800;' : 'color:#4CAF50;');

        return `
            <div class="card-action__header" style="display:flex; justify-content:space-between;">
                <div class="card-action__title" style="font-weight:600; font-size: 15px;">${type}</div>
                <div class="card-action__urgency" style="font-weight:600; font-size: 12px; ${urgencyColor}">${urgency}</div>
            </div>
            <div class="card-action__meta" style="margin-top: 6px; font-size: 12px; color: #666;">
                <span>👤 ${author}</span>
                <span class="dot-sep"></span>
                <span>📍 ${area}</span>
                <span class="dot-sep"></span>
                <span>⏱️ ${time}</span>
            </div>
            <div class="card-action__body" style="margin-top: 8px; font-size: 13px;">
                ${data.description || data.content || ''}
            </div>
            <div class="card-action__footer" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px;">
                ${chips.map(c => `
                    <button class="mizano-action-btn community-help-btn" data-id="${data.local_id || data.id}" data-action="${c}" style="font-size:11px; padding:6px 12px; border:1px solid #ff5722; background:transparent; border-radius:4px; color:#ff5722; font-weight:600;">${c}</button>
                `).join('')}
            </div>
        `;
    }

    templateService(data) {
        const name = data.service_name || data.title || 'Service';
        const provider = data.provider_name || data.provider || 'Provider';
        const duration = data.duration || 'Varies';
        const rate = data.rate_bwp ? `P${data.rate_bwp}` : 'Contact for quotes';
        const category = data.category || 'General';
        const booking = data.booking_available ? '<span class="status-bookable" style="font-size:11px; background:#e8f4fd; color:#1A73E8; padding:2px 6px; border-radius:4px;">Book Now</span>' : '';

        return `
            <div class="card-service__header" style="display:flex; justify-content:space-between; align-items:start;">
                <div>
                    <div class="card-service__title" style="font-weight:600; font-size: 15px;">${name}</div>
                    <div class="card-service__provider" style="font-size: 12px; color: #666; margin-top:2px;">by ${provider}</div>
                </div>
                <div class="card-service__rate" style="font-weight:600; color:#1A73E8;">${rate}</div>
            </div>
            <div class="card-service__meta" style="margin-top: 8px; font-size: 12px; color: #555; display:flex; gap:12px;">
                <span>⏱️ ${duration}</span>
                <span>🏷️ ${category}</span>
            </div>
            <div class="card-service__footer" style="margin-top: 10px; display:flex; justify-content:flex-end;">
                ${booking}
            </div>
        `;
    }

    templateRecruitment(data) {
        const position = data.position_needed || 'Player Needed';
        const skill = data.skill_level || 'Any Level';
        const team = data.team_name || data.team || 'Local Team';
        const sport = data.sport || 'Sports';
        const area = data.area || data.location || 'Local Area';
        const deadline = this.formatDate(data.deadline || data.expiry_date);

        return `
            <div class="card-recruit__header" style="display:flex; justify-content:space-between; align-items:start;">
                <div>
                    <div class="card-recruit__position" style="font-weight:600; font-size: 15px; color:#2e7d32;">${position} Needed</div>
                    <div class="card-recruit__team" style="font-size: 13px; font-weight:500; margin-top:2px;">${team}</div>
                </div>
                <div class="card-recruit__badge" style="background:#e8f5e9; color:#2e7d32; font-size:11px; padding:2px 6px; border-radius:4px;">Recruiting</div>
            </div>
            <div class="card-recruit__meta" style="margin-top: 8px; font-size: 12px; color: #555;">
                <span>🎯 ${sport}</span>
                <span class="dot-sep"></span>
                <span>🏅 ${skill}</span>
            </div>
            <div class="card-recruit__details" style="margin-top: 6px; font-size: 12px; color: #666; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <span>📍 ${area}</span>
                    <span style="color:#d32f2f; margin-left:8px;">Needs by: ${deadline}</span>
                </div>
                <button class="mizano-action-btn group-join-btn" data-id="${data.local_id || data.id}" style="padding:4px 12px; background:#2e7d32; color:#fff; border:none; border-radius:4px; font-weight:600; font-size:0.8rem;">Join Team</button>
            </div>
        `;
    }

    templateMinor(data) {
        const name = data.minor_name || data.name || 'Minor User';
        const age = data.age || 'Unknown Age';
        const school = data.school || 'Unassigned School';
        const guardian = data.guardian_status_badge || 'Linked';
        const tags = Array.isArray(data.sport_chips) ? data.sport_chips.slice(0, 3).join(' · ') : (data.sport_chips || 'Sports');

        let scoutingHtml = '';
        if (data.scouting_off_label) {
            scoutingHtml = `<span style="font-size:11px; background:#ffeede; color:#e65100; padding:2px 6px; border-radius:4px;">${data.scouting_off_label}</span>`;
        } else {
            scoutingHtml = `<span style="font-size:11px; background:#e8f5e9; color:#2e7d32; padding:2px 6px; border-radius:4px;">Scouting Active</span>`;
        }

        return `
            <div class="card-minor__header" style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div class="card-minor__avatar" style="font-size:24px;">👦</div>
                    <div>
                        <div class="card-minor__name" style="font-weight:600; font-size: 15px;">${name}</div>
                        <div class="card-minor__age" style="font-size: 12px; color: #666;">${age} yrs</div>
                    </div>
                </div>
                <div class="card-minor__guardian" style="font-size:11px; border:1px solid #1A73E8; color:#1A73E8; padding:2px 6px; border-radius:4px;">🛡️ Guardian: ${guardian}</div>
            </div>
            <div class="card-minor__meta" style="margin-top: 8px; font-size: 12px; color: #555;">
                <span>🏫 ${school}</span>
            </div>
            <div class="card-minor__sports" style="margin-top: 6px; font-size: 12px; color: #1A73E8;">
                ${tags}
            </div>
            <div class="card-minor__footer" style="margin-top: 10px; display:flex; justify-content:flex-end;">
                ${scoutingHtml}
            </div>
        `;
    }
}

// Global initialization logic if needed
window.MizanoCards = CardRenderer;

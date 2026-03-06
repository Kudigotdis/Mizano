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
                card.classList.add('card-event');
                card.innerHTML = this.templateEvent(data);
                break;
            case 'Team Explorer Card':
                card.innerHTML = this.templateTeam(data);
                break;
            case 'Institution Card':
            case 'venue':
                card.innerHTML = this.templateInstitution(data);
                break;
            case 'Community Post Card':
                card.innerHTML = this.templateCommunityPost(data);
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
        // Strict v4.0 Mappings
        if (data.card_type === 'Lost Found Card') {
            const type = data.type || (data.status === 'lost' ? 'lost' : 'found');
            return type === 'lost' ? 'official' : 'recruiting';
        }
        if (data.card_type === 'Survey Card' || data.card_type === 'Suggestion Card') return 'engagement';
        if (data.card_type === 'Challenge Card' || data.card_type === 'Match-Making Card') return 'recruiting';
        if (data.card_type === 'Job Listing Card' || data.card_type === 'Shopping Deal Card' || data.card_type === 'Institution Card' || data.card_type === 'venue') return 'official';
        if (data.card_type === 'Registration-State Card') return 'upcoming';

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
     * TEMPLATE: VENUE CARD
     */
}

// Global initialization logic if needed
window.MizanoCards = CardRenderer;



/**
 * MIZANO NAVIGATION CONTROLLER
 * Replicates Android-native behavior for WebView environments.
 * Absolute Law: MIZANO_PAGE_FLOW_ARCHITECTURE.md
 */

class NavigationController {
    constructor() {
        this.totalPanels = 0;
        this.state = {
            panelIndex: 0,
            pageStack: [], // For Level 2, 3, 4 pages
            overlayStack: [] // For Settings, Search, etc.
        };

        // Swipe Gesture State
        this.touchStartX = 0;
        this.touchEndX = 0;

        // Initialize History State
        if (!history.state) {
            history.replaceState({ panelIndex: 0, type: 'level1' }, 'Home', '#panel0');
        }

        // Delay init to ensure DOM is ready if script is loaded early
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // 1. Dynamic Discovery
        const panels = document.querySelectorAll('.panel');
        this.totalPanels = panels.length;
        console.log(`NavigationController: Discovered ${this.totalPanels} panels.`);

        // 2. Auto-Hook Triggers
        this.hookTriggers();

        // 2.5 Setup Nav Word Visibility Observer
        this.setupNavObserver();

        // 3. Gesture Initialization
        const carousel = document.getElementById('main-carousel');
        if (carousel) this.setupSwipe(carousel);

        // 4. Global Events
        window.addEventListener('popstate', (event) => {
            this.handlePopState(event.state);
        });

        // Initial UI Sync
        this.syncNavUI(this.state.panelIndex);

        // 5. Scroll Persistence (Rule 7.4)
        this.setupScrollPersistence();
    }

    setupScrollPersistence() {
        const panels = document.querySelectorAll('.panel');
        panels.forEach((panel, index) => {
            panel.addEventListener('scroll', () => {
                if (window.mizanoStorage) {
                    window.mizanoStorage.saveScroll(index, panel.scrollTop);
                }
            }, { passive: true });
        });

        // Main carousel scroll — sync nav when user finger-swipes naturally
        const panelCarousel = document.querySelector('.panel-carousel-container');
        if (panelCarousel) {
            let syncTimeout;
            panelCarousel.addEventListener('scroll', () => {
                clearTimeout(syncTimeout);
                syncTimeout = setTimeout(() => {
                    const newIndex = Math.round(panelCarousel.scrollLeft / window.innerWidth);
                    if (newIndex !== this.state.panelIndex && newIndex >= 0 && newIndex < this.totalPanels) {
                        this.state.panelIndex = newIndex;
                        this.syncNavUI(newIndex);
                    }
                }, 80); // Wait for scroll to settle
            }, { passive: true });
        }
    }

    /**
     * Slides the top-carousel so the active button is the first fully visible item.
     * Uses CSS transform to shift the inner flex strip — no scroll snapping, no sticky items.
     * Partial words at the right edge are clipped by container overflow:hidden.
     */
    setupNavObserver() {
        // Observer is no longer used — clipping is handled by overflow:hidden on the container
        // and positioning is controlled by slideNavToActive()
    }

    /**
     * Automatically binds all navigation triggers found in the DOM.
     * Absolute Law: Triggers must not be bound in shell.js.
     */
    hookTriggers() {
        // Top Nav Buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-panel'));
                this.switchPanel(index);
            });
        });

        // No arrow buttons in the top nav by design

        // Bottom Menu (Delegated)
        const bottomMenu = document.querySelector('.bottom-menu');
        if (bottomMenu) {
            bottomMenu.addEventListener('click', (e) => {
                const btn = e.target.closest('.menu-btn');
                if (btn) {
                    const actionId = btn.id.replace('btn-', '');
                    this.handleBottomMenuAction(actionId);
                }
            });
        }

        // Overlay Triggers
        const settingsTrigger = document.getElementById('settings-trigger');
        if (settingsTrigger) settingsTrigger.addEventListener('click', () => this.openOverlay('settings'));

        const settingsClose = document.getElementById('settings-close');
        if (settingsClose) settingsClose.addEventListener('click', () => this.back());

        const searchBackBtn = document.getElementById('search-back-btn');
        if (searchBackBtn) searchBackBtn.addEventListener('click', () => this.back());
    }

    /**
     * Encapsulates horizontal swipe gestures for the main carousel.
     */
    setupSwipe(element) {
        if (!element) return;

        element.addEventListener('touchstart', e => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        element.addEventListener('touchend', e => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleGesture();
        }, { passive: true });
    }

    handleGesture() {
        const threshold = 50;
        if (this.touchEndX < this.touchStartX - threshold) {
            // Swipe Left -> Next Panel
            this.nextPanel();
        } else if (this.touchEndX > this.touchStartX + threshold) {
            // Swipe Right -> Prev Panel
            this.prevPanel();
        }
    }

    /**
     * Navigate to the next panel if possible.
     */
    nextPanel() {
        const nextIndex = (this.state.panelIndex + 1) % this.totalPanels;
        this.switchPanel(nextIndex);
    }

    /**
     * Navigate to the previous panel if possible.
     */
    prevPanel() {
        const prevIndex = (this.state.panelIndex - 1 + this.totalPanels) % this.totalPanels;
        this.switchPanel(prevIndex);
    }

    /**
     * Navigate to a main panel (Horizontal Level 1)
     */
    switchPanel(index) {
        // Boundary enforcement
        if (index < 0 || index >= this.totalPanels) return;
        if (index === this.state.panelIndex) return;

        this.state.panelIndex = index;

        // Scroll into view (Deterministic Snapping)
        const container = document.querySelector('.panel-carousel-container');
        if (container) {
            container.scrollTo({
                left: index * window.innerWidth,
                behavior: 'smooth'
            });
        }

        // Android Back Law: Any core page back returns to Home (Panel 0)
        if (index === 0) {
            history.replaceState({ panelIndex: 0, type: 'level1' }, 'Home', '#panel0');
        } else {
            history.pushState({ panelIndex: index, type: 'level1' }, `Panel ${index}`, `#panel${index}`);
        }

        this.notifyUI('panel-switch', { index });
        this.syncNavUI(index);
    }

    /**
     * Synchronizes the top nav bar with the current active panel index.
     * Uses CSS transform to slide the inner flex strip so the active button
     * always appears at the left edge — no scroll snapping, no sticky items.
     */
    syncNavUI(index) {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-btn[data-panel="${index}"]`);
        if (!activeBtn) return;
        activeBtn.classList.add('active');
        this.slideNavToActive(activeBtn);
    }

    /**
     * Shifts the .top-carousel strip via transform so the active button
     * sits at the left edge of the container unconditionally.
     * Empty space at the end of the list is visually filled by duplicate buttons in index.html.
     */
    slideNavToActive(activeBtn) {
        const carousel = document.querySelector('.top-carousel');
        if (!carousel || !activeBtn) return;
        const btnOffsetLeft = activeBtn.offsetLeft;
        const shift = Math.max(btnOffsetLeft, 0); // Always slide to precisely this button
        carousel.style.transform = `translateX(-${shift}px)`;
    }

    /**
     * Push a detail page or form (Vertical Level 2+)
     */
    pushPage(pageId, data = {}) {
        this.state.pageStack.push({ id: pageId, data });
        history.pushState({
            pageId,
            data,
            type: 'level2',
            stackIndex: this.state.pageStack.length
        }, pageId, `#${pageId}`);

        // Phase 3: Trigger Renderers directly
        this.renderPage(pageId, data);

        this.notifyUI('page-push', { pageId, data });
    }

    renderPage(pageId, data) {
        console.log(`NavigationController: Rendering ${pageId}`, data);

        switch (pageId) {
            case 'school-detail':
                if (window.MizanoInstitutionDetail) window.MizanoInstitutionDetail.render(data.schoolId, 'school');
                break;
            case 'business-detail':
                if (window.MizanoInstitutionDetail) window.MizanoInstitutionDetail.render(data.businessId, 'business');
                break;
            case 'shopping-detail':
                if (window.MizanoShoppingDetail) window.MizanoShoppingDetail.render(data.itemId);
                break;
            case 'venue-detail':
                if (window.MizanoVenueDetail) window.MizanoVenueDetail.render(data.venueId);
                break;
            case 'my-reservations':
                if (window.ReservationsView) window.ReservationsView.render();
                break;
            case 'detail':
                if (window.MizanoDetail) window.MizanoDetail.render(data.activityId);
                break;
            case 'team-detail':
                if (window.MizanoTeamDetail && window.MizanoTeamDetail.render) window.MizanoTeamDetail.render(data.teamId);
                break;
            case 'profile-view':
                if (window.MizanoProfileDetail) window.MizanoProfileDetail.render(data.userId || data.id || data.name);
                break;
        }
    }

    /**
     * Open an overlay (Settings, Search, etc.)
     */
    openOverlay(overlayId) {
        this.state.overlayStack.push(overlayId);
        history.pushState({
            overlayId,
            type: 'overlay',
            stackIndex: this.state.overlayStack.length
        }, overlayId, `#overlay-${overlayId}`);

        this.notifyUI('overlay-open', { overlayId });
    }

    /**
     * Centralized router for Bottom Menu actions
     */
    handleBottomMenuAction(actionId) {
        console.log(`NavigationController: Bottom Menu Action -> ${actionId}`);

        switch (actionId) {
            case 'location':
                if (window.MizanoFilters) window.MizanoFilters.open('places');
                break;
            case 'activity':
                if (window.MizanoFilters) window.MizanoFilters.open('activity');
                break;
            case 'home-menu':
                this.openOverlay('home-menu');
                break;
            case 'search':
                this.openOverlay('search');
                break;
            case 'add':
                this.openOverlay('builder-choice');
                break;
            case 'notif':
                this.togglePanel('notifications-panel');
                break;
            case 'hamburger':
                this.openOverlay('hamburger');
                break;
        }
    }

    /**
     * Central routing for all card interactions.
     * Absolute Law: UI logic must not exist inside CardRenderer or CSS.
     */
    handleCardTap(data) {
        if (!data) {
            console.error('NavigationController: Tap event missing data context.');
            return;
        }

        // 1. Offline Check (Rule 23)
        if (!navigator.onLine) {
            this.notifyUI('toast', { message: 'You are offline. Action queued for sync.', type: 'warning' });
            // We can still try to navigate if we have cached data, but for critical forms we might block.
        }

        console.log(`NavigationController: Card Tap -> ${data.card_type}`, data);

        // 2. Deterministic Mapping
        switch (data.card_type) {
            case 'Standard Match Card':
                if (data.activity_id) {
                    this.pushPage('detail', { activityId: data.activity_id });
                }
                break;

            // Phase 3: Institution Routing
            case 'Institution Card':
                const instId = data.id || data.school_id || data.business_id;
                if (!instId) {
                    console.warn('Nav: Institution ID missing', data);
                    return;
                }
                if (instId.startsWith('biz_')) {
                    this.pushPage('business-detail', { businessId: instId });
                } else {
                    this.pushPage('school-detail', { schoolId: instId });
                }
                break;

            // Phase 3: Shopping Routing
            case 'Shopping Deal Card':
                if (data.id) {
                    this.pushPage('shopping-detail', { itemId: data.id });
                }
                break;

            // Phase 3: Engagement Routing
            case 'Suggestion Card':
            case 'Challenge Card':
            case 'Survey Card':
                // For now, route to generic detail or specific if available
                const engageId = data.id || data.challenge_id || data.survey_id;
                if (engageId) {
                    this.pushPage('detail', { activityId: engageId });
                } else {
                    this.notifyUI('toast', { message: 'Action recorded!', type: 'success' });
                }
                break;

            // Venue Booking Routing
            case 'venue':
                if (data.id) {
                    this.pushPage('venue-detail', { venueId: data.id });
                }
                break;

            case 'Registration-State Card':
                if (data.activity_id) {
                    this.pushPage('registration-form', { activityId: data.activity_id });
                }
                break;

            case 'News Flash Card':
                if (data.article_id) {
                    this.pushPage('news-detail', { articleId: data.article_id });
                }
                break;

            case 'Lesson Card':
            case 'Training/Lesson Progress Card':
                if (data.lesson_id) {
                    this.pushPage('lesson-detail', { lessonId: data.lesson_id });
                }
                break;

            case 'Team Explorer Card':
                if (data.team_id || data.cloud_id) {
                    this.pushPage('team-detail', { teamId: data.team_id || data.cloud_id });
                }
                break;

            case 'Match-Making Card':
            case 'Player-Recruitment Card':
                this.pushPage('team-detail', { teamId: data.team_id });
                break;

            case 'Quick Poll/Vote Card':
                // Polls are usually inline, but we could push an expansion
                console.log('NavigationController: Poll interaction - No navigation required.');
                break;

            // Phase 10: New Card Types
            case 'Community Post Card':
                if (data.post_id) {
                    this.pushPage('community-detail', { postId: data.post_id });
                }
                break;

            case 'Job Listing Card':
                if (data.job_id) {
                    this.pushPage('job-detail', { jobId: data.job_id });
                }
                break;

            case 'Lost Found Card':
                if (data.item_id) {
                    this.pushPage('lostfound-detail', { itemId: data.item_id });
                }
                break;

            case 'Event Card':
                if (data.eventID || data.event_id) {
                    this.pushPage('event-detail', { eventId: data.eventID || data.event_id });
                }
                break;

            case 'Hobby Leisure Card':
            case 'Leisure Card': // Catch-all
                if (data.activity_id) {
                    this.pushPage('hobby-detail', { activityId: data.activity_id });
                }
                break;

            // Phase 10: New Card Types Wiring
            case 'Institution Card':
                if (data.school_id || (data.id && data.id.startsWith('sch_'))) {
                    this.pushPage('school-detail', { schoolId: data.school_id || data.id });
                } else if (data.business_id || (data.id && data.id.startsWith('biz_'))) {
                    this.pushPage('business-detail', { businessId: data.business_id || data.id });
                }
                break;

            case 'Shopping Deal Card':
                if (data.id) {
                    this.pushPage('shopping-detail', { itemId: data.id });
                }
                break;

            case 'Suggestion Card':
                this.notifyUI('toast', { message: 'Suggestion accepted!', type: 'success' });
                // Could open detail or just confirm action
                break;

            case 'Challenge Card':
                if (data.challenge_id || data.id) {
                    this.pushPage('challenge-detail', { challengeId: data.challenge_id || data.id });
                }
                break;

            case 'Survey Card':
                if (data.survey_id || data.id) {
                    this.pushPage('survey-detail', { surveyId: data.survey_id || data.id });
                }
                break;

            case 'Stats Card':
                // navigate to profile stats tab
                this.switchPanel(8); // Mine Panel
                break;

            default:
                console.warn(`NavigationController: Unhandled card type -> ${data.card_type}`);
                this.notifyUI('toast', { message: 'Interaction coming soon.', type: 'info' });
        }
    }

    /**
     * Toggles a sliding panel (Level B)
     */
    togglePanel(panelId) {
        // If it's already open as the last thing, we go back to close it
        const current = history.state;
        if (current && current.type === 'panel-expansion' && current.panelId === panelId) {
            this.back();
            return;
        }

        history.pushState({
            panelId,
            type: 'panel-expansion'
        }, panelId, `#panel-${panelId}`);

        this.notifyUI('panel-expand', { panelId });
    }

    /**
     * Internal handler for browser/Android back button
     */
    handlePopState(state) {
        if (!state) {
            this.closeAllOverlays();
            this.clearPageStack();
            this.notifyUI('panel-switch', { index: 0 });
            return;
        }

        switch (state.type) {
            case 'overlay':
                this.closeTopOverlay();
                break;
            case 'level2':
                this.popPage();
                break;
            case 'panel-expansion':
                this.notifyUI('panel-collapse', { panelId: state.panelId });
                break;
            case 'level1':
                this.state.panelIndex = state.panelIndex;
                this.notifyUI('panel-switch', { index: state.panelIndex });
                this.syncNavUI(state.panelIndex);
                break;
        }
    }

    closeTopOverlay() {
        const id = this.state.overlayStack.pop();
        if (id) {
            this.notifyUI('overlay-close', { overlayId: id });
        }
    }

    closeAllOverlays() {
        while (this.state.overlayStack.length > 0) {
            this.closeTopOverlay();
        }
    }

    popPage() {
        const page = this.state.pageStack.pop();
        if (page) {
            this.notifyUI('page-pop', { pageId: page.id });
        }
    }

    clearPageStack() {
        while (this.state.pageStack.length > 0) {
            this.popPage();
        }
    }

    /**
     * Manual Go Back (equivalent to Android back button)
     */
    back() {
        history.back();
    }

    /**
     * Observer pattern for UI sync
     */
    notifyUI(type, payload) {
        const event = new CustomEvent('mizano-nav', {
            detail: { type, ...payload }
        });
        window.dispatchEvent(event);
    }
}

// Singleton Instance
window.MizanoNav = new NavigationController();

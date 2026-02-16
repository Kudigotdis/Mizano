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
                        ${author.avatar ? `<img src="${author.avatar}" class="author-avatar" alt="${author.name}">` : '<div class="author-avatar-placeholder">👤</div>'}
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
                    <h3 class="job-title">${data.title}</h3>
                    <span class="job-type-badge ${type}">${typeLabel}</span>
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
                    <span class="lf-status-badge ${statusClass}">${statusLabel}</span>
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
                    ${data.sourceLogo ? `<img src="${data.sourceLogo}" class="source-logo" alt="${data.source}">` : ''}
                    <span class="source-name">${data.source}</span>
                    <span class="news-category">${data.category}</span>
                </div>
                <h3 class="news-headline">${data.headline}</h3>
                <p class="news-summary">${data.summary}</p>
                ${data.thumbnail ? `<img src="${data.thumbnail}" class="news-thumbnail" alt="${data.headline}">` : ''}
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

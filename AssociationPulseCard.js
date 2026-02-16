/**
 * MIZANO EXECUTIVE PULSE CARD
 * Collapsible dashboard for Association Heads
 * Shows 200 KPIs across 4 sectors with smart categorization
 */

class AssociationPulseCard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isExpanded = localStorage.getItem('pulse_expanded') === 'true';
        this.expandedSectors = JSON.parse(localStorage.getItem('pulse_sectors') || '{}');
    }

    /**
     * Render the main pulse card
     */
    async render(associationId) {
        const overallScore = await window.pulseUpdater.calculateOverallScore();

        const html = `
            <div class="pulse-card ${this.isExpanded ? 'expanded' : 'collapsed'}">
                <div class="pulse-header" onclick="window.pulseCard.toggleMain()">
                    <div class="pulse-title">
                        <h3>⚡ Executive Pulse Dashboard</h3>
                        <span class="pulse-subtitle">Real-time KPI Analytics</span>
                    </div>
                    <div class="pulse-score-container">
                        <div class="pulse-score">${overallScore}</div>
                        <span class="pulse-score-label">/100</span>
                    </div>
                    <button class="toggle-btn">${this.isExpanded ? '[–]' : '[+]'}</button>
                </div>
                <div class="pulse-body" style="display: ${this.isExpanded ? 'block' : 'none'}">
                    ${await this.renderSectors()}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    /**
     * Render all 4 sectors
     */
    async renderSectors() {
        const sectors = [
            { key: 'national', label: 'National Associations', icon: '🏆', color: '#4472C4' },
            { key: 'schools', label: 'Schools & Education', icon: '🎓', color: '#70AD47' },
            { key: 'corporates', label: 'Corporates & Employers', icon: '🏢', color: '#FFC000' },
            { key: 'businesses', label: 'Businesses & SMMEs', icon: '🏪', color: '#ED7D31' }
        ];

        const sectorsHtml = await Promise.all(sectors.map(s => this.renderSector(s)));
        return sectorsHtml.join('');
    }

    /**
     * Render a single sector card
     */
    async renderSector(sector) {
        const kpis = await window.pulseUpdater.getSectorKPIs(sector.key);
        const sectorScore = this.calculateSectorScore(kpis);
        const isExpanded = this.expandedSectors[sector.key] || false;

        // Group KPIs by category
        const categories = {};
        kpis.forEach(kpi => {
            if (!categories[kpi.category]) categories[kpi.category] = [];
            categories[kpi.category].push(kpi);
        });

        return `
            <div class="sector-card" style="border-left: 4px solid ${sector.color}">
                <div class="sector-header" onclick="window.pulseCard.toggleSector('${sector.key}')">
                    <div class="sector-info">
                        <span class="sector-icon">${sector.icon}</span>
                        <h4>${sector.label}</h4>
                    </div>
                    <div class="sector-score-container">
                        <span class="sector-score">${sectorScore.current}/${sectorScore.target}</span>
                        <button class="toggle-btn-small">${isExpanded ? '[–]' : '[+]'}</button>
                    </div>
                </div>
                <div class="sector-body" style="display: ${isExpanded ? 'block' : 'none'}">
                    ${this.renderCategories(categories, sector.color)}
                </div>
            </div>
        `;
    }

    /**
     * Render categories within a sector
     */
    renderCategories(categories, color) {
        return Object.entries(categories).map(([catKey, kpis]) => {
            // Get category label from first KPI
            const categoryLabel = this.getCategoryLabel(catKey);

            return `
                <div class="category-section">
                    <h5 class="category-title">${categoryLabel}</h5>
                    <div class="kpi-list">
                        ${kpis.map(kpi => this.renderKPI(kpi, color)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Render a single KPI row
     */
    renderKPI(kpi, color) {
        const progress = kpi.target > 0 ? (kpi.value / kpi.target) * 100 : 0;
        const progressCapped = Math.min(100, progress);
        const statusColor = progress >= 90 ? '#70AD47' : progress >= 70 ? '#FFC000' : '#D32F2F';

        return `
            <div class="kpi-row">
                <div class="kpi-label" title="${kpi.desc || kpi.label}">
                    ${kpi.label}
                </div>
                <div class="kpi-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressCapped}%; background: ${statusColor}"></div>
                    </div>
                </div>
                <div class="kpi-value">
                    ${kpi.value}${kpi.unit === '%' ? '%' : ''}
                    ${kpi.target > 0 ? `<span class="kpi-target">/${kpi.target}</span>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Calculate sector score
     */
    calculateSectorScore(kpis) {
        const current = kpis.filter(k => k.value >= k.target * 0.9).length;
        const target = kpis.length;
        return { current, target };
    }

    /**
     * Get category label
     */
    getCategoryLabel(catKey) {
        const labels = {
            demographics: '📊 National Demographics',
            elite_performance: '🌟 Elite Performance & Scouting',
            coaching: '👨‍🏫 Coaching & Mentorship',
            compliance: '✅ Compliance & Logistics',
            competition: '🏅 Inter-House & Competition',
            safety: '🛡️ Safety & Guardian Handshakes',
            growth: '🌱 Holistic Growth',
            equipment: '⚽ Equipment & Resources',
            wellness: '💪 Employee Wellness',
            sponsorship: '💰 Sponsorship ROI',
            csr: '🤝 CSR & Community Impact',
            brand: '⭐ Brand Sentiment',
            vendor: '🛒 Vendor Performance',
            economic: '💵 Economic Flow',
            infrastructure: '🚌 Infrastructure Support',
            smme_growth: '📈 SMME Growth'
        };
        return labels[catKey] || catKey;
    }

    /**
     * Toggle main card
     */
    toggleMain() {
        this.isExpanded = !this.isExpanded;
        localStorage.setItem('pulse_expanded', this.isExpanded);
        this.render();
    }

    /**
     * Toggle sector
     */
    toggleSector(sectorKey) {
        this.expandedSectors[sectorKey] = !this.expandedSectors[sectorKey];
        localStorage.setItem('pulse_sectors', JSON.stringify(this.expandedSectors));
        this.render();
    }
}

// Global instance
window.pulseCard = null;

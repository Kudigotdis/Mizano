/**
 * MIZANO IMAGE MANAGER
 * Absolute Law: IMAGE_ASSET_CONTRACT.md
 * Handles path generation and local fallback logic for offline reliability.
 */

class ImageManager {
    constructor() {
        this.base = './images/';
        this.placeholders = {
            avatars: 'user.webp',
            logos: 'team.webp',
            venues: 'venue.webp',
            shopping: 'deal.webp',
            general: 'none.webp'
        };
    }

    /**
     * Generates a safe relative path for an asset.
     */
    getPath(category, filename) {
        if (!filename) return `${this.base}placeholders/${this.placeholders[category] || this.placeholders.general}`;

        // Handle Base64 or Full URLs (Absolute paths)
        if (filename.startsWith('data:') || filename.startsWith('http') || filename.startsWith('blob:')) {
            return filename;
        }

        return `${this.base}${category}/${filename}`;
    }

    /**
     * Returns the HTML string for an image with the Mizano fallback handler.
     */
    render(category, filename, cssClass = '', alt = '') {
        const src = this.getPath(category, filename);
        const placeholder = `${this.base}placeholders/${this.placeholders[category] || this.placeholders.general}`;

        return `<img src="${src}" 
                     class="${cssClass}" 
                     alt="${alt}" 
                     onerror="this.onerror=null;this.src='${placeholder}';" />`;
    }
}

// Global Singleton
window.MizanoImages = new ImageManager();

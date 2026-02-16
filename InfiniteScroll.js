/**
 * MIZANO INFINITE SCROLL
 * High-performance, memory-safe infinite scroll module using IntersectionObserver.
 * Based on Rule 19 & 34: Zero framework, WebView optimized.
 */

class InfiniteScroll {
    /**
     * @param {Object} options
     * @param {HTMLElement} options.container - The scrolling container (null for viewport)
     * @param {Function} options.onLoadMore - Callback when end of list reached
     * @param {number} options.threshold - Trigger threshold (0.0 to 1.0)
     */
    constructor(options = {}) {
        this.onLoadMore = options.onLoadMore;
        this.isLocked = false;

        this.observer = new IntersectionObserver(this._handleIntersect.bind(this), {
            root: options.container || null,
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px 500px 0px' // Pre-fetch 500px before reaching bottom
        });
    }

    /**
     * Marks an element as the "sentinel" for infinite scroll.
     * @param {HTMLElement} element 
     */
    observe(element) {
        if (!element) return;
        element.dataset.isSentinel = "true";
        this.observer.observe(element);
    }

    /**
     * Stops observing a specific element.
     */
    unobserve(element) {
        if (!element) return;
        this.observer.unobserve(element);
    }

    /**
     * Kills all observations to prevent memory leaks in WebView.
     */
    disconnect() {
        this.observer.disconnect();
    }

    /**
     * Resets the observer (useful for filter changes).
     */
    reset() {
        this.disconnect();
        this.isLocked = false;
        // The IntersectionObserver remains valid but all targets are cleared.
    }

    /**
     * Prevents multiple triggers during data fetches.
     */
    lock() {
        this.isLocked = true;
    }

    /**
     * Re-enables triggering after batch append.
     */
    unlock() {
        this.isLocked = false;
    }

    /**
     * Internal Intersection handler.
     */
    _handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.isLocked) {
                if (entry.target.dataset.isSentinel === "true") {
                    this.unobserve(entry.target);
                    if (this.onLoadMore) {
                        this.onLoadMore();
                    }
                }
            }
        });
    }
}

// Global Singleton access if preferred
window.MizanoInfiniteScroll = InfiniteScroll;

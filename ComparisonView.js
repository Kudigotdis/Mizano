/**
 * MIZANO — ComparisonView.js (Phase 10)
 * Handles side-by-side visual progress and performance tracking.
 * Targets #mine-comparison-container in Panel 15.
 */

window.MizanoComparison = (function () {
    let _container = null;

    function init() {
        _container = document.getElementById('mine-comparison-container');
        if (!_container) {
            console.warn('ComparisonView: #mine-comparison-container not found');
            return;
        }
    }

    function render(data = null) {
        if (!_container) init();
        if (!_container) return;

        // If no data is passed, try to fetch most recent player files
        if (!data && window.mizanoStorage) {
            const playerFiles = window.mizanoStorage.load('player_files') || [];
            if (playerFiles.length >= 2) {
                data = {
                    before: playerFiles[playerFiles.length - 2],
                    after: playerFiles[playerFiles.length - 1]
                };
            }
        }

        if (!data) {
            _container.style.display = 'none';
            return;
        }

        _container.style.display = 'block';
        _container.innerHTML = `
            <div class="mizano-card" style="margin: 16px; border-top: 4px solid var(--primary-blue);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h3 style="margin: 0; font-size: 1.1rem;">Progress Comparison</h3>
                    <span style="font-size: 0.8rem; color: #666;">Visual Tracking</span>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 0.75rem; color: #888; margin-bottom: 4px;">BEFORE (${data.before.date || 'Initial'})</div>
                        <div style="aspect-ratio: 1/1; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                             ${data.before.photo ? `<img src="${data.before.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : '<span style="font-size: 2rem;">👤</span>'}
                        </div>
                        <div style="font-weight: 600; margin-top: 8px; font-size: 0.9rem;">${data.before.score || '82'}</div>
                    </div>
                    
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.5rem; color: var(--primary-blue);">➞</span>
                    </div>

                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 0.75rem; color: #888; margin-bottom: 4px;">AFTER (${data.after.date || 'Recent'})</div>
                        <div style="aspect-ratio: 1/1; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid var(--primary-blue);">
                             ${data.after.photo ? `<img src="${data.after.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : '<span style="font-size: 2rem;">👤</span>'}
                        </div>
                        <div style="font-weight: 600; margin-top: 8px; font-size: 0.9rem; color: var(--primary-blue);">${data.after.score || '88'} (+6)</div>
                    </div>
                </div>

                <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee; font-size: 0.85rem; color: #555;">
                    <div><strong>Insight:</strong> Your athletic form has improved by 7% since last check. Recovery is 90% complete.</div>
                </div>
            </div>
        `;
    }

    return {
        init: init,
        render: render
    };
})();

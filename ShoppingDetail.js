/**
 * MIZANO SHOPPING DETAIL RENDERER
 * Handles Marketplace Item views.
 */

class ShoppingDetail {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataManager = window.mizanoData;
    }

    render(itemId) {
        if (!this.container) return;

        const item = this.dataManager.cache.shopping.find(i => i.id === itemId);

        if (!item) {
            this.container.innerHTML = '<div class="p-4">Item not found.</div>';
            return;
        }

        this.container.innerHTML = `
            <div class="detail-wrapper">
                <div class="detail-header" style="background:#fff; color:black; border-bottom:1px solid #eee;">
                    <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
                    <h2 class="detail-title">Marketplace</h2>
                </div>
                
                <div class="detail-content">
                    ${window.MizanoImages.render('shopping', item.image || item.image_path || null, 'shopping-detail-image')}
                    <div class="detail-main">
                        <h1 class="activity-h1">${item.title}</h1>
                        <h2 style="color:#2ecc71; margin:10px 0;">${item.price}</h2>
                        
                        <div class="detail-description">
                            <h3>Description</h3>
                            <p>${item.description || 'No description provided.'}</p>
                        </div>
                        
                        <div class="seller-info" style="margin-top:20px; padding:15px; background:#f9f9f9; border-radius:8px;">
                            <strong>Seller:</strong> ${item.seller || 'Verified Merchant'}
                            <p style="font-size:0.9rem; color:#666;">${item.location || 'Gaborone'}</p>
                        </div>
                    </div>

                    <div class="detail-action-bar">
                        <button class="detail-btn active" onclick="alert('Contact Seller feature coming soon!')">Contact Seller</button>
                    </div>
                </div>
            </div>
        `;
    }
}

window.MizanoShoppingDetail = new ShoppingDetail('detail-view');

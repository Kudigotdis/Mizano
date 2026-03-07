/**
 * MIZANO VENUE DETAIL RENDERER
 * Displays venue details with bookable spaces
 */

class VenueDetail {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(venueId) {
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === venueId);
    if (!venue) {
      this.container.innerHTML = '<div class="p-4">Venue not found.</div>';
      return;
    }

    const spaces = window.BookingManager.getSpacesForVenue(venueId);

    this.container.innerHTML = `
      <div class="detail-wrapper">
        <div class="detail-header">
          <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
          <h2 class="detail-title">${venue.name}</h2>
        </div>
        <div class="detail-content">
          ${window.MizanoImages.render('venues', venue.image || null, 'detail-media-placeholder', venue.name)}
          <div class="detail-main">
            <p class="activity-meta">📍 ${venue.location}</p>
            <div style="margin: 10px 0; display: flex; gap: 8px;">
                <button class="mizano-menu-btn" style="background:#fff; border:1px solid #dadce0; border-radius:12px; font-size:0.75rem; padding:6px 12px; height:auto; width:auto; display:flex; align-items:center; gap:6px;" onclick="window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('${venue.name} ${venue.location}'))">🚗 Get Directions</button>
            </div>
            <p>${venue.description || ''}</p>
            <p><strong>Owner:</strong> <span style="color:#1a73e8; cursor:pointer;" onclick="window.MyBusiness && window.MyBusiness.viewDetail('${venue.business_id}')">${_safe(venue.business_name || 'Mizano Corporate')}</span></p>
            <p><strong>Upcoming:</strong> <span style="color:#1a73e8; cursor:pointer;" onclick="window.MyEvents && window.MyEvents.init()">📅 View Events at this Venue</span></p>
            <p><strong>Rating:</strong> ⭐ ${venue.rating}/5</p>
            <p><strong>Features:</strong> ${venue.features?.join(', ') || 'N/A'}</p>
            
            <div class="detail-section">
              <h3>Spaces & Booking</h3>
              ${spaces.length ? spaces.map(s => this.renderSpaceCard(s)).join('') : '<p>No bookable spaces available.</p>'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSpaceCard(space) {
    return `
      <div class="space-card mizano-card" data-space-id="${space.space_id}" style="margin-bottom:12px; border:2px solid #E0E0E0; border-radius:8px; padding:12px;">
        <div class="space-header" onclick="this.closest('.space-card').classList.toggle('expanded')" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span class="space-name" style="font-weight:bold;">${space.name}</span>
          <span class="space-price" style="color:#2E7D32;">P${space.price_per_hour}/hr</span>
          <span class="expand-icon">[+]</span>
        </div>
        <div class="space-body collapsed" style="display:none; margin-top:12px;">
          ${window.MizanoImages.render('venues', space.images?.[0] || null, 'space-image-main')}
          <p>${space.description}</p>
          <p><strong>Capacity:</strong> ${space.capacity} people</p>
          <p><strong>Features:</strong> ${space.features?.join(', ')}</p>
          <p><strong>Rules:</strong> ${space.rules}</p>
          <p><strong>Requirements:</strong> ${space.requirements}</p>
          <button class="book-btn" onclick="window.VenueBooking.openBooking('${space.space_id}')" style="background:#2E7D32; color:#fff; border:none; padding:10px 20px; border-radius:4px; cursor:pointer; margin-top:8px;">Book Now</button>
      </div>
    `;
  }

  _safe(v) {
    if (!v) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return v.toString().replace(/[&<>"']/g, m => map[m]);
  }
}

// Add CSS for expanded state
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
      .space - card.expanded.space - body {
      display: block!important;
    }
    .space - card.expanded.expand - icon::before {
      content: '[-]';
    }
    `;
  document.head.appendChild(style);
});

window.MizanoVenueDetail = new VenueDetail('detail-view');

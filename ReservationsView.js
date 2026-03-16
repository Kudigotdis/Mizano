/**
 * MIZANO RESERVATIONS VIEW
 * Displays and manages user's venue reservations (Waitlist)
 * and venue owners' incoming bookings (My Bookings)
 */

class ReservationsView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTab = 'waitlist'; // 'waitlist' | 'bookings'
  }

  async render(tab = 'waitlist') {
    this.activeTab = tab;
    const userId = window.mizanoData?.getCurrentUser()?.profile_id || window.MizanoAuth?.getCurrentUser?.()?.uid;
    
    if (!userId) {
      this.container.innerHTML = `
        <div class="overlay-header">
          <button onclick="window.MizanoNav.back()">‹ Back</button>
          <h2>Reservations</h2>
        </div>
        <div style="padding:40px; text-align:center;">
          <p>Please log in to view your bookings.</p>
        </div>`;
      return;
    }

    // Load data
    const reservations = window.mizanoStorage?.getUserReservations(userId) || [];
    const waitlists = window.mizanoStorage?.getUserWaitlists(userId) || [];
    const ownerBookings = await window.mizanoStorage?.getBookingsForOwner(userId) || [];

    this.container.innerHTML = `
      <div class="overlay-header sticky-top" style="background:#fff; border-bottom:1px solid #f0f0f0;">
        <button onclick="window.MizanoNav.back()">‹ Back</button>
        <h2 style="flex:1; text-align:center; font-size:1rem;">Reservations</h2>
        <div style="width:40px;"></div>
      </div>
      
      <div class="tabs-container" style="display:flex; border-bottom:1px solid #e0e0e0; background:#fff;">
        <div class="tab-item ${this.activeTab === 'waitlist' ? 'active' : ''}" 
             onclick="window.ReservationsView.render('waitlist')"
             style="flex:1; text-align:center; padding:14px; font-weight:700; font-size:0.9rem; cursor:pointer; color:${this.activeTab === 'waitlist' ? '#1a73e8' : '#757575'}; border-bottom:2px solid ${this.activeTab === 'waitlist' ? '#1a73e8' : 'transparent'};">
          Waitlist
        </div>
        <div class="tab-item ${this.activeTab === 'bookings' ? 'active' : ''}" 
             onclick="window.ReservationsView.render('bookings')"
             style="flex:1; text-align:center; padding:14px; font-weight:700; font-size:0.9rem; cursor:pointer; color:${this.activeTab === 'bookings' ? '#1a73e8' : '#757575'}; border-bottom:2px solid ${this.activeTab === 'bookings' ? '#1a73e8' : 'transparent'};">
          My Bookings
        </div>
      </div>

      <div class="reservations-list" style="padding:16px; padding-bottom:100px; overflow-y:auto; max-height:calc(100vh - 120px);">
        ${this.activeTab === 'waitlist' ? this._renderWaitlistTab(reservations, waitlists) : this._renderBookingsTab(ownerBookings)}
      </div>

      <style>
        .status-chip { display:inline-block; padding:2px 8px; border-radius:12px; font-size:0.7rem; font-weight:700; text-transform:uppercase; margin-bottom:4px; }
        .status-pending { background:#fff3e0; color:#ef6c00; }
        .status-approved { background:#e8f5e9; color:#2e7d32; }
        .status-rejected { background:#ffebee; color:#c62828; }
        .status-cancelled { background:#f5f5f5; color:#757575; }
        .res-card { background:#fff; margin-bottom:16px; border:1px solid #e0e0e0; border-radius:12px; padding:16px; }
        .res-card-title { font-weight:800; font-size:1rem; margin:0 0 4px; color:#1a1a1a; }
        .res-card-meta { font-size:0.85rem; color:#666; margin-bottom:12px; display:flex; flex-direction:column; gap:4px; }
      </style>
    `;
  }

  _renderWaitlistTab(reservations, waitlists) {
    let html = '';
    
    if (reservations.length > 0) {
      html += `<h4 style="margin-bottom:12px; color:#757575; font-size:0.8rem; text-transform:uppercase;">My Requests</h4>`;
      html += reservations.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(r => this.renderReservationCard(r, 'user')).join('');
    }

    if (waitlists.length > 0) {
      html += `<h4 style="margin:24px 0 12px; color:#757575; font-size:0.8rem; text-transform:uppercase;">Slot Watchlists</h4>`;
      html += waitlists.map(w => this.renderWaitlistCard(w)).join('');
    }

    if (!reservations.length && !waitlists.length) {
      html = `
        <div style="padding:60px 20px; text-align:center; color:#999;">
          <div style="font-size:3rem; margin-bottom:16px;">⏳</div>
          <p>You haven't made any bookings yet.</p>
        </div>`;
    }

    return html;
  }

  _renderBookingsTab(bookings) {
    if (!bookings || bookings.length === 0) {
      return `
        <div style="padding:60px 20px; text-align:center; color:#999;">
          <div style="font-size:3rem; margin-bottom:16px;">🏟️</div>
          <p>Incoming bookings for your venues will appear here.</p>
        </div>`;
    }

    return `
      <h4 style="margin-bottom:12px; color:#757575; font-size:0.8rem; text-transform:uppercase;">Venue Activity</h4>
      ${bookings.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(r => this.renderReservationCard(r, 'owner')).join('')}
    `;
  }

  renderWaitlistCard(wait) {
    const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === wait.space_id);
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === wait.venue_id);
    const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === wait.slot_id);

    if (!space || !venue || !slot) return '';

    return `
      <div class="res-card">
        <div class="status-chip" style="background:#e3f2fd; color:#1976d2;">WAITLISTING</div>
        <h3 class="res-card-title">${space.name}</h3>
        <div class="res-card-meta">
          <span>📍 ${venue.name}</span>
          <span>📅 ${new Date(slot.start_time).toLocaleDateString()}</span>
          <span>🕒 ${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <button onclick="window.ReservationsView.leaveWaitlist('${wait.user_id}', '${wait.slot_id}')" 
                style="width:100%; padding:10px; border:1px solid #ff5252; color:#ff5252; background:none; border-radius:8px; font-weight:700; cursor:pointer;">
          Remove from Waitlist
        </button>
      </div>
    `;
  }

  renderReservationCard(res, mode = 'user') {
    const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === res.space_id);
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === res.venue_id);
    const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === res.slot_id);

    if (!space || !venue || !slot) return '';

    const statusObj = {
      'pending': 'status-pending',
      'approved': 'status-approved',
      'rejected': 'status-rejected',
      'cancelled': 'status-cancelled'
    };
    const statusClass = statusObj[res.status] || 'status-pending';

    return `
      <div class="res-card">
        <div class="status-chip ${statusClass}">${res.status}</div>
        <h3 class="res-card-title">${space.name}</h3>
        <div class="res-card-meta">
          <span>📍 ${venue.name}</span>
          <span>📅 ${new Date(slot.start_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span>🕒 ${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          ${mode === 'owner' ? `<span style="color:#1a73e8; font-weight:700;">User: ${res.user_id}</span>` : ''}
          <span style="font-weight:700; color:#2e7d32;">P${res.total_price}</span>
        </div>
        
        <div style="display:flex; gap:10px;">
          ${mode === 'user' ? `
            <button class="primary-btn" onclick="window.ReservationsView.showDetails('${res.reservation_id}')" style="flex:1; background:#fff; border:1px solid #ddd; padding:10px; border-radius:8px; font-weight:600;">Details</button>
            ${res.status === 'pending' || res.status === 'approved' ? `<button class="primary-btn" onclick="window.ReservationsView.cancel('${res.reservation_id}')" style="flex:1; background:#fff; border:1px solid #ffcdd2; color:#d32f2f; padding:10px; border-radius:8px; font-weight:600;">Cancel</button>` : ''}
          ` : `
            ${res.status === 'pending' ? `
              <button onclick="window.BookingManager.approveBooking('${res.reservation_id}'); window.ReservationsView.render('bookings')" style="flex:1; background:#2e7d32; color:#fff; border:none; padding:10px; border-radius:8px; font-weight:700;">Approve</button>
              <button onclick="window.BookingManager.rejectBooking('${res.reservation_id}'); window.ReservationsView.render('bookings')" style="flex:1; background:#fff; border:1px solid #ffcdd2; color:#d32f2f; padding:10px; border-radius:8px; font-weight:700;">Reject</button>
            ` : `<button disabled style="flex:1; background:#f5f5f5; color:#aaa; border:none; padding:10px; border-radius:8px;">${res.status.toUpperCase()}</button>`}
          `}
        </div>
      </div>
    `;
  }

  showDetails(reservationId) {
    const userId = window.mizanoData?.getCurrentUser()?.profile_id || window.MizanoAuth?.getCurrentUser?.()?.uid;
    const reservation = window.mizanoStorage?.getUserReservations(userId).find(r => r.reservation_id === reservationId);
    if (!reservation) return;

    const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === reservation.space_id);
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === reservation.venue_id);
    const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === reservation.slot_id);

    const overlay = document.getElementById('detail-view');
    overlay.innerHTML = `
      <div class="detail-wrapper">
        <div class="overlay-header sticky-top">
          <button onclick="window.MizanoNav.back()">‹ Back</button>
          <h2>Booking Details</h2>
        </div>
        <div class="detail-content" style="padding:20px;">
          <div class="status-chip status-${reservation.status}" style="font-size:0.9rem; padding:4px 12px; margin-bottom:16px;">${reservation.status.toUpperCase()}</div>
          <h1 style="font-size:1.5rem; font-weight:900; margin-bottom:12px;">${space.name}</h1>
          
          <div style="background:#f9f9f9; padding:16px; border-radius:12px; margin-bottom:20px;">
             <p style="margin-bottom:8px;"><strong>🏟️ Venue:</strong> ${venue.name}</p>
             <p style="margin-bottom:8px;"><strong>📍 Location:</strong> ${venue.location || venue.city}</p>
             <p style="margin-bottom:8px;"><strong>📅 Date:</strong> ${new Date(slot.start_time).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
             <p style="margin-bottom:8px;"><strong>🕒 Time:</strong> ${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
             <p style="margin-bottom:0; font-size:1.2rem; color:#2e7d32; font-weight:900;">Total: P${reservation.total_price}</p>
          </div>
          
          <div style="display:flex; gap:12px; margin-top:20px;">
             ${venue.contact?.whatsapp ? `<button onclick="window.open('https://wa.me/${venue.contact.whatsapp.replace(/[^0-9]/g, '')}')" style="flex:1; background:#25D366; color:#fff; border:none; padding:12px; border-radius:12px; font-weight:700; cursor:pointer;">WhatsApp Venue</button>` : ''}
              <button onclick="window.MizanoNav.pushPage('detail', { activityId: '${reservation.venue_id}' })" style="flex:1; background:#1a73e8; color:#fff; border:none; padding:12px; border-radius:12px; font-weight:700; cursor:pointer;">View Venue</button>
          </div>
          
          <div style="margin-top:30px; border-top:1px solid #eee; padding-top:20px;">
             <h4 style="margin-bottom:10px;">Important Information</h4>
             <p style="font-size:0.9rem; color:#666; line-height:1.5;">${space.rules || 'Standard venue rules apply. Please arrive 10 minutes before your slot.'}</p>
          </div>
          
          ${reservation.status === 'pending' || reservation.status === 'approved' ? 
            `<button onclick="window.ReservationsView.cancel('${reservation.reservation_id}')" style="margin-top:40px; width:100%; padding:15px; border:none; background:#ffebee; color:#c62828; border-radius:12px; font-weight:700; cursor:pointer;">Cancel This Booking</button>` 
            : ''}
        </div>
      </div>
    `;
  }

  async cancel(reservationId) {
    if (confirm('Cancel this reservation? This cannot be undone.')) {
      try {
        await window.BookingManager.cancelReservation(reservationId);
        this.render(this.activeTab);
        window.MizanoNav.back();
      } catch (e) {
        alert(e.message);
      }
    }
  }

  async leaveWaitlist(userId, slotId) {
    if (confirm('Leave waitlist for this slot?')) {
      if (window.mizanoStorage?.removeFromWaitlist) {
         window.mizanoStorage.removeFromWaitlist(userId, slotId);
      } else {
         // Fallback manual removal
         const waitlists = window.mizanoStorage.load('waitlists', []);
         const filtered = waitlists.filter(w => !(w.user_id === userId && w.slot_id === slotId));
         window.mizanoStorage.save('waitlists', filtered);
      }
      this.render('waitlist');
    }
  }
}

window.ReservationsView = new ReservationsView('detail-view');

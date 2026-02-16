/**
 * MIZANO RESERVATIONS VIEW
 * Displays and manages user's venue reservations
 */

class ReservationsView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    const userId = window.mizanoData?.getCurrentUser()?.profile_id;
    if (!userId) {
      this.container.innerHTML = '<div style="padding:20px;"><p>Please log in to view your reservations.</p></div>';
      return;
    }

    const reservations = window.mizanoStorage?.getUserReservations(userId).filter(r => r.status === 'confirmed') || [];
    const waitlists = window.mizanoStorage?.getUserWaitlists(userId) || [];

    this.container.innerHTML = `
      <div class="overlay-header">
        <button onclick="window.MizanoNav.back()">‹ Back</button>
        <h2>My Bookings & Waitlists</h2>
      </div>
      <div class="reservations-list" style="padding:20px;">
        <h3 style="margin-top:0;">Active Reservations</h3>
        ${reservations.length ? reservations.map(r => this.renderReservationCard(r)).join('') : '<p style="color:#666;">No active reservations.</p>'}
        
        <h3 style="margin-top:24px;">My Waitlists</h3>
        ${waitlists.length ? waitlists.map(w => this.renderWaitlistCard(w)).join('') : '<p style="color:#666;">No active waitlists.</p>'}
      </div>
    `;
  }

  renderWaitlistCard(wait) {
    const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === wait.space_id);
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === wait.venue_id);
    const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === wait.slot_id);

    if (!space || !venue || !slot) return '';

    return `
      <div class="waitlist-card mizano-card" style="margin-bottom:16px; border:2px solid #BBDEFB; border-radius:8px; padding:16px; background:#F5F9FF;">
        <h3 style="margin:0 0 8px 0;">${space.name} (Waitlist)</h3>
        <p style="margin:4px 0;">📍 ${venue.name}</p>
        <p style="margin:4px 0;">📅 ${new Date(slot.start_time).toLocaleDateString()}</p>
        <p style="margin:4px 0;">🕒 ${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
          <span style="font-size:0.8rem; color:#1976D2;">Status: Waiting for opening</span>
          <button onclick="window.ReservationsView.leaveWaitlist('${wait.user_id}', '${wait.slot_id}')" style="background:none; border:none; color:#D32F2F; cursor:pointer; font-size:14px;">Leave Waitlist</button>
        </div>
      </div>
    `;
  }

  async leaveWaitlist(userId, slotId) {
    if (confirm('Leave waitlist for this slot?')) {
      window.mizanoStorage.removeFromWaitlist(userId, slotId);
      this.render();
    }
  }

  renderReservationCard(res) {
    const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === res.space_id);
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === res.venue_id);
    const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === res.slot_id);

    if (!space || !venue || !slot) return '';

    const duration = (new Date(slot.end_time) - new Date(slot.start_time)) / 3600000;

    return `
      <div class="reservation-card mizano-card" style="margin-bottom:16px; border:2px solid #E0E0E0; border-radius:8px; padding:16px;">
        <h3 style="margin:0 0 8px 0;">${space.name} @ ${venue.name}</h3>
        <p style="margin:4px 0;">📅 ${new Date(slot.start_time).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p style="margin:4px 0;">🕒 ${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${duration}h)</p>
        <p style="margin:4px 0; color:#2E7D32; font-weight:bold;">💰 P${res.total_price}</p>
        <button class="view-details-btn" onclick="window.ReservationsView.showDetails('${res.reservation_id}')" style="background:#fff; color:#000; border:2px solid #E0E0E0; padding:8px 16px; border-radius:4px; cursor:pointer; margin-top:8px;">View Details</button>
      </div>
    `;
  }

  showDetails(reservationId) {
    const userId = window.mizanoData?.getCurrentUser()?.profile_id;
    const reservation = window.mizanoStorage?.getUserReservations(userId).find(r => r.reservation_id === reservationId);
    if (!reservation) return;

    const space = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === reservation.space_id);
    const venue = (window.MIZANO_DATA.venues || []).find(v => v.id === reservation.venue_id);
    const slot = (window.MIZANO_DATA.time_slots || []).find(s => s.slot_id === reservation.slot_id);

    const overlay = document.getElementById('detail-view');
    overlay.innerHTML = `
      <div class="detail-wrapper">
        <div class="detail-header">
          <button class="back-btn" onclick="window.MizanoNav.back()">‹ Back</button>
          <h2>Reservation Details</h2>
        </div>
        <div class="detail-content" style="padding:20px;">
          <h3>${space.name}</h3>
          <p><strong>Venue:</strong> ${venue.name}</p>
          <p><strong>Location:</strong> ${venue.location}</p>
          <p><strong>Date:</strong> ${new Date(slot.start_time).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Time:</strong> ${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p><strong>Total:</strong> P${reservation.total_price}</p>
          
          <div class="collapsible-section" style="margin-top:20px;">
            <div class="section-header" onclick="this.nextElementSibling.classList.toggle('collapsed')" style="cursor:pointer; padding:12px; background:#f5f5f5; border-radius:4px; display:flex; justify-content:space-between;">
              <span><strong>Venue Contacts</strong></span>
              <span class="toggle-icon">[+]</span>
            </div>
            <div class="section-content collapsed" style="display:none; padding:12px; border:2px solid #E0E0E0; border-top:none; border-radius:0 0 4px 4px;">
              ${venue.contact?.whatsapp ? `<button class="contact-btn" onclick="window.open('https://wa.me/${venue.contact.whatsapp.replace(/[^0-9]/g, '')}')" style="background:#25D366; color:#fff; border:none; padding:10px 20px; border-radius:4px; cursor:pointer; margin:4px;">📱 WhatsApp Manager</button>` : ''}
              ${venue.contact?.email ? `<button class="contact-btn" onclick="window.open('mailto:${venue.contact.email}')" style="background:#EA4335; color:#fff; border:none; padding:10px 20px; border-radius:4px; cursor:pointer; margin:4px;">📧 Email Venue</button>` : ''}
            </div>
          </div>
          
          <div class="collapsible-section" style="margin-top:12px;">
            <div class="section-header" onclick="this.nextElementSibling.classList.toggle('collapsed')" style="cursor:pointer; padding:12px; background:#f5f5f5; border-radius:4px; display:flex; justify-content:space-between;">
              <span><strong>Rules & Requirements</strong></span>
              <span class="toggle-icon">[+]</span>
            </div>
            <div class="section-content collapsed" style="display:none; padding:12px; border:2px solid #E0E0E0; border-top:none; border-radius:0 0 4px 4px;">
              <p><strong>Rules:</strong> ${space.rules}</p>
              <p><strong>Requirements:</strong> ${space.requirements}</p>
              <p><strong>Cancellation Policy:</strong> ${space.cancellation_policy}</p>
            </div>
          </div>
          
          <button class="cancel-btn" onclick="window.ReservationsView.cancel('${reservation.reservation_id}')" style="background:#D32F2F; color:#fff; border:none; padding:12px 24px; border-radius:4px; cursor:pointer; margin-top:20px; width:100%;">Cancel Reservation</button>
        </div>
      </div>
    `;

    // Add CSS for collapsible sections
    const style = document.createElement('style');
    style.textContent = `
      .section-content:not(.collapsed) {
        display: block !important;
      }
      .section-header .toggle-icon::before {
        content: '[+]';
      }
      .section-header:has(+ .section-content:not(.collapsed)) .toggle-icon::before {
        content: '[-]';
      }
    `;
    if (!document.getElementById('reservations-style')) {
      style.id = 'reservations-style';
      document.head.appendChild(style);
    }
  }

  async cancel(reservationId) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await window.BookingManager.cancelReservation(reservationId);
        alert('Reservation cancelled successfully.');
        this.render();
        window.MizanoNav.back();
      } catch (e) {
        alert('Error cancelling reservation: ' + e.message);
      }
    }
  }
}

window.ReservationsView = new ReservationsView('detail-view');

/**
 * MIZANO VENUE BOOKING FLOW
 * Multi-step booking overlay: Date → Time Slots → Confirmation
 */

class VenueBooking {
  constructor() {
    this.currentSpace = null;
    this.selectedDate = null;
    this.selectedSlot = null;
  }

  openBooking(spaceId) {
    this.currentSpace = (window.MIZANO_DATA.spaces || []).find(s => s.space_id === spaceId);
    if (!this.currentSpace) return;

    const overlay = document.getElementById('builder-view');
    overlay.classList.add('active');
    this.renderDateSelection();
  }

  renderDateSelection() {
    const overlay = document.getElementById('builder-view');
    const today = new Date().toISOString().split('T')[0];

    overlay.innerHTML = `
      <div class="reg-form-wrapper">
        <div class="reg-form-header">
          <button class="close-btn" onclick="window.VenueBooking.close()">✕</button>
          <h2>Book ${this.currentSpace.name}</h2>
        </div>
        <div class="reg-form-content" style="padding:20px;">
          <label style="display:block; margin-bottom:8px; font-weight:bold;">Select Date</label>
          <input type="date" id="booking-date" min="${today}" style="width:100%; padding:10px; border:2px solid #E0E0E0; border-radius:4px;">
        </div>
        <div class="reg-form-actions" style="padding:20px; border-top:2px solid #E0E0E0;">
          <button class="primary-btn" onclick="window.VenueBooking.showTimeSlots()" style="background:#2E7D32; color:#fff; border:none; padding:12px 24px; border-radius:4px; cursor:pointer; width:100%;">Next</button>
        </div>
      </div>
    `;
  }

  showTimeSlots() {
    const date = document.getElementById('booking-date').value;
    if (!date) {
      alert('Please select a date.');
      return;
    }

    this.selectedDate = date;
    const slots = (window.MIZANO_DATA.time_slots || []).filter(s => s.space_id === this.currentSpace.space_id && s.start_time.startsWith(date));
    const overlay = document.getElementById('builder-view');

    overlay.innerHTML = `
      <div class="reg-form-wrapper">
        <div class="reg-form-header">
          <button class="close-btn" onclick="window.VenueBooking.close()">✕</button>
          <h2>Choose Time</h2>
        </div>
        <div class="reg-form-content" style="padding:20px; max-height:400px; overflow-y:auto;">
          ${slots.length ? slots.map(s => `
            <div class="slot-option ${s.is_booked ? 'booked' : ''}" data-slot="${s.slot_id}" style="margin-bottom:12px; padding:12px; border:2px solid ${s.is_booked ? '#FFCDD2' : '#E0E0E0'}; border-radius:4px; opacity: ${s.is_booked ? '0.8' : '1'};">
              <label style="display:flex; align-items:center; cursor:${s.is_booked ? 'default' : 'pointer'};">
                ${s.is_booked ? '<span style="color:#D32F2F; margin-right:8px;">[BOOKED]</span>' : `<input type="radio" name="slot" value="${s.slot_id}" style="margin-right:12px;">`}
                <span>${new Date(s.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(s.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                ${s.is_booked ?
        `<button onclick="window.VenueBooking.joinWaitlist('${s.slot_id}')" style="margin-left:auto; background:#1976D2; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:0.8rem; cursor:pointer;">Join Waitlist</button>` :
        `<span style="margin-left:auto; color:#2E7D32; font-weight:bold;">P${this.currentSpace.price_per_hour * 2}</span>`}
              </label>
            </div>
          `).join('') : '<p>No slots found for this date.</p>'}
        </div>
        <div class="reg-form-actions" style="padding:20px; border-top:2px solid #E0E0E0; display:flex; gap:12px;">
          <button class="secondary-btn" onclick="window.VenueBooking.renderDateSelection()" style="background:#fff; color:#000; border:2px solid #E0E0E0; padding:12px 24px; border-radius:4px; cursor:pointer; flex:1;">Back</button>
          <button class="primary-btn" onclick="window.VenueBooking.confirmBooking()" style="background:#2E7D32; color:#fff; border:none; padding:12px 24px; border-radius:4px; cursor:pointer; flex:1;">Confirm Booking</button>
        </div>
      </div>
    `;
  }

  async joinWaitlist(slotId) {
    const userId = window.mizanoData?.getCurrentUser()?.profile_id;
    if (!userId) {
      alert('Please log in to join waitlist.');
      return;
    }

    try {
      await window.BookingManager.joinWaitlist(userId, slotId);
      alert('Successfully joined the waitlist! You will be notified if the slot becomes available.');
      this.showTimeSlots(); // Refresh
    } catch (e) {
      alert(e.message);
    }
  }

  async confirmBooking() {
    const selected = document.querySelector('input[name="slot"]:checked');
    if (!selected) {
      alert('Please select a time slot.');
      return;
    }

    this.selectedSlot = selected.value;
    const userId = window.mizanoData?.getCurrentUser()?.profile_id;
    if (!userId) {
      alert('Please log in to make a booking.');
      return;
    }

    try {
      const reservation = await window.BookingManager.bookSlot(userId, this.selectedSlot);
      alert('Booking confirmed! View your reservation in the hamburger menu.');
      this.close();
    } catch (e) {
      alert(e.message);
    }
  }

  close() {
    document.getElementById('builder-view').classList.remove('active');
    this.currentSpace = null;
    this.selectedDate = null;
    this.selectedSlot = null;
  }
}

window.VenueBooking = new VenueBooking();

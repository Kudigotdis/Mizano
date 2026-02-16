/**
 * MIZANO RESULT ENTRY FORM
 * For Teachers/Coaches to input athletic performance data.
 */

class ResultEntry {
    constructor() {
        this.containerId = 'result-entry-overlay';
        this.isOpen = false;
    }

    open() {
        let overlay = document.getElementById(this.containerId);
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = this.containerId;
            overlay.className = 'level-b-overlay';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = this.render();
        overlay.classList.add('active');
        this.isOpen = true;
    }

    close() {
        const overlay = document.getElementById(this.containerId);
        if (overlay) overlay.classList.remove('active');
        this.isOpen = false;
    }

    render() {
        return `
            <div class="leaderboard-header" style="background:#27ae60;">
                <div class="drag-handle"></div>
                <h2>Post Result</h2>
                <button class="close-btn" onclick="window.ResultEntryForm.close()">✕</button>
            </div>
            
            <div class="form-scroll-container" style="padding: 20px;">
                <form id="result-form" onsubmit="window.ResultEntryForm.submit(event)">
                    
                    <div class="form-group">
                        <label>Event Type</label>
                        <select id="r-event" required>
                            <option value="100m">100m Sprint</option>
                            <option value="200m">200m Sprint</option>
                            <option value="400m">400m Sprint</option>
                            <option value="800m">800m Run</option>
                            <option value="1500m">1500m Run</option>
                            <option value="Long Jump">Long Jump</option>
                            <option value="High Jump">High Jump</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Age Group</label>
                        <select id="r-age" required>
                            <option value="U13">Under 13</option>
                            <option value="U15">Under 15</option>
                            <option value="U17">Under 17</option>
                            <option value="Open">Open</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Athlete Name</label>
                        <input type="text" id="r-athlete" placeholder="Search student..." required>
                    </div>

                    <div class="form-group">
                        <label>Result / Time</label>
                        <div style="display:flex; gap:10px;">
                            <input type="number" step="0.01" id="r-value" placeholder="10.45" style="flex:2" required>
                            <select id="r-unit" style="flex:1">
                                <option value="s">Seconds (s)</option>
                                <option value="m">Meters (m)</option>
                                <option value="min">Minutes</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" id="r-date" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>

                    <div class="form-group">
                        <label>Proof (Optional)</label>
                        <input type="file" accept="image/*" id="r-proof">
                        <small>Upload photo of timing sheet or event.</small>
                    </div>

                    <button type="submit" class="profile-btn" style="background:#27ae60;">Submit Result</button>
                </form>
            </div>
        `;
    }

    submit(e) {
        e.preventDefault();

        const data = {
            event_id: document.getElementById('r-event').value,
            age_group: document.getElementById('r-age').value,
            athlete_name: document.getElementById('r-athlete').value,
            value: parseFloat(document.getElementById('r-value').value),
            unit: document.getElementById('r-unit').value,
            date: document.getElementById('r-date').value,
            // Mock Location (would verify from GPS/Profile)
            location: { neighborhood: 'G-West', city: 'Gaborone', region: 'South East' },
            school_name: 'Example School' // Would pull from teacher profile
        };

        if (window.MizanoLeaderboardEngine) {
            window.MizanoLeaderboardEngine.addResult(data);
            alert('Result Posted! The Global Leaderboard has been updated.');
            this.close();

            // Refresh Leaderboard if open
            if (window.MizanoLeaderboard && window.MizanoLeaderboard.isOpen) {
                window.MizanoLeaderboard.renderList();
            }
        } else {
            console.error('Leaderboard Engine not found.');
        }
    }
}

window.ResultEntryForm = new ResultEntry();

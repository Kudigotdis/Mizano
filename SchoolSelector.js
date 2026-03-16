/**
 * MIZANO - SchoolSelector.js
 * Handles the #school-overlay UI, A-Z scroll bar, and passing selection to MinorForm.js
 */

window.SchoolSelector = (function() {
    let isOpen = false;
    let schoolsData = [];
    let _sectionPositions = {}; // Store scroll positions for letters

    function init() {
        const closeBtn = document.getElementById('school-overlay-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', close);
        }

        const searchInput = document.getElementById('school-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                _renderList(e.target.value.trim());
            });
        }
    }

    function open() {
        isOpen = true;
        const overlay = document.getElementById('school-overlay');
        if (overlay) overlay.style.display = 'flex';
        
        schoolsData = window.MIZANO_SCHOOLS_DATA || [];
        
        // Sort alphabetically
        schoolsData.sort((a, b) => {
            const nameA = (a.full_name || a.name || '').toLowerCase();
            const nameB = (b.full_name || b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });

        // Clear search
        const searchInput = document.getElementById('school-search-input');
        if (searchInput) searchInput.value = '';

        _renderList('');
        _renderAlphaSidebar();
    }

    function close() {
        isOpen = false;
        const overlay = document.getElementById('school-overlay');
        if (overlay) overlay.style.display = 'none';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LIST RENDERING
    // ─────────────────────────────────────────────────────────────────────────

    function _renderList(query) {
        const listArea = document.getElementById('school-list-area');
        if (!listArea) return;

        let filtered = schoolsData;
        
        if (query) {
            const q = query.toLowerCase();
            filtered = schoolsData.filter(s => 
                (s.name || '').toLowerCase().includes(q) ||
                (s.full_name || '').toLowerCase().includes(q) ||
                (s.city || '').toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            listArea.innerHTML = `
                <div style="padding:24px;text-align:center;">
                    <p style="color:#666;margin-bottom:12px;">No schools found matching "${_safeAttr(query)}"</p>
                    <button class="mf-submit-btn" style="width:auto;padding:8px 16px;font-size:0.9rem;" onclick="window.SchoolSelector.addNewSchool('${_safeAttr(query)}')">
                        + Add "${_safeAttr(query)}"
                    </button>
                    <p style="font-size:0.8rem;color:#999;margin-top:8px;">You can add it to the database so others can find it later.</p>
                </div>
            `;
            return;
        }

        let html = '';
        let currentLetter = '';

        filtered.forEach(school => {
            const nameStr = school.full_name || school.name || '';
            const firstLetter = nameStr.charAt(0).toUpperCase();

            // Insert dictionary header if the first letter changes (only when not searching)
            if (!query && firstLetter !== currentLetter && firstLetter.match(/[A-Z]/)) {
                currentLetter = firstLetter;
                html += `
                    <div id="school-letter-${currentLetter}" class="school-letter-header" style="background:#f5f5f5;padding:4px 16px;font-weight:bold;color:#333;font-size:0.9rem;border-bottom:1px solid #e0e0e0;position:sticky;top:0;">
                        ${currentLetter}
                    </div>
                `;
            }

            const safeData = JSON.stringify(school).replace(/"/g, '&quot;');
            
            html += `
                <div class="mizano-card" style="margin:8px 16px;padding:12px 16px;cursor:pointer;" onclick="window.SchoolSelector.selectSchool(${safeData})">
                    <h3 style="margin:0 0 4px 0;font-size:1rem;color:#1e88e5;">${_safeAttr(nameStr)}</h3>
                    <p style="margin:0;font-size:0.8rem;color:#666;">
                        ${_safeAttr(school.type || '')}${school.city ? ' · ' + _safeAttr(school.city) : ''}
                    </p>
                </div>
            `;
        });

        // Add manual option at the end if searching
        if (query) {
            html += `
                <div style="padding:16px;border-top:1px dashed #ccc;text-align:center;">
                    <p style="font-size:0.85rem;color:#666;margin-bottom:10px;">Don't see it?</p>
                    <button type="button" class="mf-submit-btn" style="width:auto;padding:6px 16px;background:#eef5ff;color:#1e88e5;border:1px solid #1e88e5;"
                        onclick="window.SchoolSelector.addNewSchool('${_safeAttr(query)}')">
                        Add "${_safeAttr(query)}" as new school
                    </button>
                </div>
            `;
        } else {
            // Padding at the bottom for smooth scrolling limits
            html += '<div style="height:120px;"></div>';
        }

        listArea.innerHTML = html;
        
        // Re-measure sections if not searching
        if (!query) {
            setTimeout(_measureSections, 100);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ALPHABETICAL SCROLL SIDEBAR
    // ─────────────────────────────────────────────────────────────────────────

    function _renderAlphaSidebar() {
        const sidebar = document.getElementById('school-alpha-sidebar');
        if (!sidebar) return;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
        
        // Find which letters actually exist in data
        const existingLetters = new Set();
        schoolsData.forEach(s => {
            const name = s.full_name || s.name || '';
            const char = name.charAt(0).toUpperCase();
            if (char.match(/[A-Z]/)) {
                existingLetters.add(char);
            } else if (name) {
                existingLetters.add('#');
            }
        });

        let html = '';
        letters.forEach(letter => {
            const isActive = existingLetters.has(letter);
            const className = isActive ? 'alpha-letter' : 'alpha-letter alpha-disabled';
            html += `<div class="${className}" data-letter="${letter}">${letter}</div>`;
        });

        sidebar.innerHTML = html;

        // Touch and Mouse handlers for smooth scrubbing
        _attachScrubEvents(sidebar);
    }

    function _measureSections() {
        _sectionPositions = {};
        const headers = document.querySelectorAll('#school-list-area .school-letter-header');
        const listArea = document.getElementById('school-list-area');
        if (!listArea) return;
        
        headers.forEach(hd => {
            const letter = hd.id.replace('school-letter-', '');
            // Calculate absolute position within scroll container
            _sectionPositions[letter] = hd.offsetTop;
        });
    }

    function _attachScrubEvents(sidebar) {
        let isScrubbing = false;

        const handleScrub = (e) => {
            if (!isScrubbing) return;
            e.preventDefault();
            
            // Get Y position based on touch or mouse
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            // Find which element the pointer is currently over
            const element = document.elementFromPoint(
                sidebar.getBoundingClientRect().left + 15, // Fixed X in the sidebar
                clientY
            );

            if (element && element.classList.contains('alpha-letter') && !element.classList.contains('alpha-disabled')) {
                const letter = element.dataset.letter;
                _jumpToLetter(letter);
                
                // Highlight active visually mapping via loop
                sidebar.querySelectorAll('.alpha-letter').forEach(el => el.classList.remove('active'));
                element.classList.add('active');
            }
        };

        const startScrub = (e) => {
            isScrubbing = true;
            handleScrub(e);
        };

        const stopScrub = () => {
            isScrubbing = false;
            // Clear active visual after delay
            setTimeout(() => {
                sidebar.querySelectorAll('.alpha-letter').forEach(el => el.classList.remove('active'));
            }, 300);
        };

        sidebar.addEventListener('mousedown', startScrub);
        document.addEventListener('mousemove', handleScrub);
        document.addEventListener('mouseup', stopScrub);

        sidebar.addEventListener('touchstart', startScrub, {passive: false});
        sidebar.addEventListener('touchmove', handleScrub, {passive: false});
        sidebar.addEventListener('touchend', stopScrub);
    }

    function _jumpToLetter(letter) {
        const listArea = document.getElementById('school-list-area');
        if (!listArea || _sectionPositions[letter] === undefined) return;
        
        listArea.scrollTop = _sectionPositions[letter];
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SELECTION & APPLY TO FORM
    // ─────────────────────────────────────────────────────────────────────────

    function selectSchool(schoolObj) {
        // Find inputs in MinorForm
        const display = document.getElementById('mf-school-display');
        const hiddenId = document.getElementById('mf-school-id');
        const hiddenName = document.getElementById('mf-school-name');
        const hiddenIsNew = document.getElementById('mf-school-is-new');
        
        const typeField = document.getElementById('mf-school-type');
        const cityField = document.getElementById('mf-city');
        const areaField = document.getElementById('mf-area');

        const nameStr = schoolObj.full_name || schoolObj.name || '';

        if (display) {
            display.textContent = nameStr;
            display.style.opacity = '1';
            display.style.color = '#1E88E5'; // visually distinct selection
            display.style.fontWeight = '500';
        }
        if (hiddenId) hiddenId.value = schoolObj.id || '';
        if (hiddenName) hiddenName.value = nameStr;
        if (hiddenIsNew) hiddenIsNew.value = 'false';

        // Auto-fill connected fields
        if (typeField) typeField.value = schoolObj.type || '';
        if (cityField) cityField.value = schoolObj.city || '';
        if (areaField) areaField.value = schoolObj.area || '';

        close();
    }

    function addNewSchool(query) {
        const display = document.getElementById('mf-school-display');
        const hiddenId = document.getElementById('mf-school-id');
        const hiddenName = document.getElementById('mf-school-name');
        const hiddenIsNew = document.getElementById('mf-school-is-new');
        
        const typeField = document.getElementById('mf-school-type');
        const cityField = document.getElementById('mf-city');
        const areaField = document.getElementById('mf-area');

        if (display) {
            display.textContent = query;
            display.style.opacity = '1';
            display.style.color = '#1E88E5'; 
            display.style.fontWeight = '500';
        }
        if (hiddenId) hiddenId.value = 'SCH-NEW-' + Date.now();
        if (hiddenName) hiddenName.value = query;
        if (hiddenIsNew) hiddenIsNew.value = 'true';

        // Clear connected fields so user can fill them
        if (typeField) typeField.value = '';
        if (cityField) {
            cityField.value = '';
            cityField.removeAttribute('readonly'); 
        }
        if (areaField) {
            areaField.value = '';
            areaField.removeAttribute('readonly');
        }

        close();
    }

    // Helpers
    function _safeAttr(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Initialize listeners on DOM load
    document.addEventListener('DOMContentLoaded', init);

    // Provide public interface
    return {
        open,
        close,
        selectSchool,
        addNewSchool
    };

})();

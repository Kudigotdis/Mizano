// Location Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const areaSelect = document.getElementById('areaSelect');
    const settlements = window.MIZANO_SETTLEMENTS || [];
    const locations = window.MIZANO_LOCATIONS || {};

    if (!citySelect || !areaSelect) return;

    // Populate City Dropdown
    settlements.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // Handle City Change
    citySelect.addEventListener('change', () => {
        const selectedCity = citySelect.value;
        const areas = locations[selectedCity] || [];

        // Clear Area Dropdown
        areaSelect.innerHTML = '<option value="" disabled selected>Select Area</option>';

        if (areas.length > 0) {
            areaSelect.disabled = false;
            areas.sort().forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaSelect.appendChild(option);
            });
            // Add "Other" option
            const otherOpt = document.createElement('option');
            otherOpt.value = "Other";
            otherOpt.textContent = "Other / Not Listed";
            areaSelect.appendChild(otherOpt);
        } else {
            // No areas defined (smaller villages), allow "Main Area" or "Other"
            areaSelect.disabled = false;
            const option = document.createElement('option');
            option.value = "Main Area";
            option.textContent = "Main Area / Central";
            areaSelect.appendChild(option);
        }
    });
});

// Dynamic Interests Logic
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('interests-grid');
    const counterEl = document.getElementById('interests-count');
    const data = window.MIZANO_INTERESTS_DATA || [];

    if (data.length === 0) {
        console.warn('No interests data found in external script.');
        if (grid) grid.innerHTML = '<p>No interests available.</p>';
        return;
    }

    if (!grid || !counterEl) return;

    // Group by Category
    const categories = {};
    data.forEach(item => {
        const cat = item.category || 'Other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
    });

    // Sort Categories Naturally (1. before 2. before 10.)
    const sortedCategories = Object.keys(categories).sort((a, b) => {
        const numA = parseInt(a.match(/^\d+/) || 0);
        const numB = parseInt(b.match(/^\d+/) || 0);
        if (numA && numB) return numA - numB;
        return a.localeCompare(b);
    });

    // Clear Loading/Static Content
    grid.innerHTML = '';

    // Render
    sortedCategories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'interest-category';

        const catLabel = document.createElement('span');
        catLabel.className = 'category-label';
        catLabel.textContent = cat;
        catDiv.appendChild(catLabel);

        // Special handling for "18. Other"
        if (cat.includes('Other')) {
            const container = document.createElement('div');
            container.id = 'other-interests-container';

            // Add Button
            const addBtn = document.createElement('button');
            addBtn.type = 'button'; // Prevent form submit
            addBtn.className = 'btn-add-interest';
            addBtn.textContent = '+ Add Other';
            addBtn.onclick = () => addCustomField(container);

            container.appendChild(addBtn);
            catDiv.appendChild(container);

            // Add one default field
            addCustomField(container);

        } else {
            const optionsList = document.createElement('div');
            optionsList.className = 'options-list';

            // Sort items within category
            categories[cat].sort((a, b) => a.label.localeCompare(b.label));

            categories[cat].forEach(item => {
                const label = document.createElement('label');
                label.className = 'option-chip';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'interests';
                input.value = item.value;

                // Add change listener
                input.addEventListener('change', (e) => {
                    // Sync checks for same value
                    const val = e.target.value;
                    const isChecked = e.target.checked;
                    document.querySelectorAll(`input[name="interests"][value="${val}"]`).forEach(el => {
                        if (el !== e.target) {
                            el.checked = isChecked;
                            updateChipStyle(el);
                        }
                    });
                    updateChipStyle(e.target);
                    updateCounter();
                });

                label.appendChild(input);
                label.appendChild(document.createTextNode(item.label));
                optionsList.appendChild(label);
            });
            catDiv.appendChild(optionsList);
        }
        grid.appendChild(catDiv);
    });

    function addCustomField(container) {
        const row = document.createElement('div');
        row.className = 'custom-interest-row';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'interests'; // Submit as interest
        input.className = 'custom-interest-input';
        input.placeholder = 'Type interest...';
        input.addEventListener('input', updateCounter); // Count if not empty

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn-remove-interest';
        removeBtn.textContent = '-';
        removeBtn.onclick = () => {
            container.removeChild(row);
            updateCounter();
        };

        row.appendChild(input);
        row.appendChild(removeBtn);

        // Insert before the Add button
        // The container children are: [row, row, ..., addBtn]
        // addBtn is last child? No, we appended it first, then appended rows?
        // Wait: container.appendChild(addBtn);
        // addCustomField: container.insertBefore(row, container.lastChild);
        // Correct?
        // Initial: [addBtn]
        // insertBefore(row, addBtn) -> [row, addBtn]
        // Correct.
        const addBtn = container.querySelector('.btn-add-interest');
        container.insertBefore(row, addBtn);
    }

    function updateChipStyle(input) {
        if (input.checked) input.parentElement.classList.add('active');
        else input.parentElement.classList.remove('active');
    }

    function updateCounter() {
        // Count UNIQUE values from proper checkboxes
        const checkedValues = new Set();
        document.querySelectorAll('input[type="checkbox"][name="interests"]:checked').forEach(inp => {
            checkedValues.add(inp.value);
        });

        // Add custom text inputs if they have value
        document.querySelectorAll('input[type="text"][name="interests"]').forEach(inp => {
            if (inp.value.trim() !== '') {
                checkedValues.add(inp.value.trim().toLowerCase());
            }
        });

        counterEl.textContent = `(${checkedValues.size})`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // --- Modal Logic ---
    const modal = document.getElementById('booking-modal');
    const openBtn = document.getElementById('request-booking-btn');
    const closeBtn = document.querySelector('.close-button');

    if (modal && openBtn && closeBtn) {
        openBtn.onclick = function() {
            modal.style.display = 'block';
        }

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // --- Form Submission Logic ---
    const form = document.getElementById('booking-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // IMPORTANT: Replace with your actual script URL
            const formData = new FormData(form);

            // For demonstration: log the data to the console
            console.log("Form Data Submitted:");
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }

            if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                formStatus.textContent = 'Integration needed. See google-apps-script-placeholder.js for instructions.';
                formStatus.style.color = 'red';
                return;
            }

            formStatus.textContent = 'Submitting...';
            formStatus.style.color = 'blue';

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    if (response.ok) {
                        formStatus.textContent = 'Thank you! Your inquiry has been sent.';
                        formStatus.style.color = 'green';
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    formStatus.textContent = 'Error! Something went wrong. Please try again.';
                    form-status.style.color = 'red';
                    console.error('Error!', error.message);
                });
        });
    }

    // --- Itinerary Filtering Logic ---
    const filtersContainer = document.querySelector('.filters');
    if (filtersContainer) {
        const styleFilter = document.getElementById('trip-style');
        const durationFilter = document.getElementById('duration');
        const durationValue = document.getElementById('duration-value');
        const budgetFilter = document.getElementById('budget');

        const itineraries = document.querySelectorAll('#itinerary-grid .gallery-item-link');
        const noResultsMessage = document.getElementById('no-results-message');
        const recommendedSection = document.getElementById('recommended-section');
        const recommendedGallery = document.getElementById('recommended-gallery');

        function filterItineraries() {
            let visibleCount = 0;
            let firstVisible = null;

            const selectedStyle = styleFilter.value;
            const selectedDuration = parseInt(durationFilter.value, 10);
            const selectedBudget = budgetFilter.value;

            itineraries.forEach(item => {
                const itemStyle = item.dataset.style;
                const itemDuration = parseInt(item.dataset.duration, 10);
                const itemBudget = parseInt(item.dataset.budget, 10);

                // Style check
                const styleMatch = selectedStyle === 'all' || selectedStyle === itemStyle;

                // Duration check (show items with duration <= selected)
                const durationMatch = itemDuration <= selectedDuration;

                // Budget check
                let budgetMatch = false;
                if (selectedBudget === 'all') {
                    budgetMatch = true;
                } else {
                    const budgetRange = {
                        '3000': [3000, 5000],
                        '5000': [5000, 8000],
                        '8000': [8000, Infinity]
                    };
                    const [min, max] = budgetRange[selectedBudget];
                    budgetMatch = itemBudget >= min && itemBudget < max;
                }

                if (styleMatch && durationMatch && budgetMatch) {
                    item.style.display = 'block';
                    visibleCount++;
                    if (!firstVisible) {
                        firstVisible = item;
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Update UI based on visible count
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';

            if (firstVisible) {
                recommendedSection.style.display = 'block';
                recommendedGallery.innerHTML = ''; // Clear previous recommendation
                const recommendedClone = firstVisible.cloneNode(true);
                // Optional: remove the link from the recommended item to avoid confusion
                // recommendedClone.href = 'javascript:void(0);';
                recommendedGallery.appendChild(recommendedClone);
            } else {
                recommendedSection.style.display = 'none';
            }
        }

        filtersContainer.addEventListener('change', filterItineraries);
        durationFilter.addEventListener('input', () => {
            // Update the duration value display
            durationValue.textContent = durationFilter.value + ' Days';
            filterItineraries();
        });

        // Initial filter on page load
        filterItineraries();
    }
});

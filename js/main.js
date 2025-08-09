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
});

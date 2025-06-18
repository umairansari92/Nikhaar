document.addEventListener("DOMContentLoaded", function () {
    // Simulate loading time (e.g., 3 seconds)
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.querySelector(".content").style.display = "block";
    }, 3000); // Adjust time as needed
});


// Time validation and form handling
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('appointmentForm'); 
    const timeInput = document.querySelector('input[name="time"]'); 
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger d-none';
    bookingForm.insertBefore(errorDiv, bookingForm.firstChild);

    // Set minimum date to today
    const dateInput = document.querySelector('input[name="date"]');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayString = `${yyyy}-${mm}-${dd}`;
    
    dateInput.min = todayString;
    
    // Convert 24h time to 12h format
    timeInput.addEventListener('change', function() {
        const time24 = this.value;
        if (time24) {
            const [hours24, minutes] = time24.split(':');
            const period = hours24 >= 12 ? 'PM' : 'AM';
            const hours12 = hours24 % 12 || 12;
            this.dataset.displayValue = `${hours12}:${minutes} ${period}`;
        }
    });

    // Form submission handling
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get submit button reference
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Validate date
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < currentDate) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Please select a future date for your appointment.'
            });
            return;
        }

        try {
            // Show loading state
            submitButton.innerHTML = 'Booking...';
            submitButton.disabled = true;

            const timeValue = document.querySelector('input[name="time"]');
            const formattedTime = timeValue.dataset.displayValue || timeValue.value; // Use 12h format if available

            const formData = {
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                service: document.querySelector('select[name="service"]').value,
                date: dateInput.value,
                time: formattedTime, // Using formatted 12h time
                message: document.querySelector('textarea[name="message"]')?.value || ''
            };

            const response = await fetch('https://nikhaar-backend.vercel.app/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Appointment booked successfully! We will contact you shortly.'
                });
                bookingForm.reset(); // Reset form
            } else {
                throw new Error(result.message || 'Failed to book appointment');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong! Please try again.'
            });
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Optional: Add time picker with restricted hours
    if (timeInput.type === 'time') {
        timeInput.setAttribute('min', '13:00');
        timeInput.setAttribute('max', '20:00');
        timeInput.setAttribute('step', '1800'); // 30-minute intervals
    }
});
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                service: document.getElementById("service").value,
                date: document.getElementById("appointment-date").value,
                time: document.getElementById("appointment-time").value,
                message: document.getElementById("message").value,
            };

            try {
                const response = await fetch("/api/book-appointment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Appointment successfully booked! Confirmation has been sent.");
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("An error occurred while booking the appointment.");
            }
        });
    });

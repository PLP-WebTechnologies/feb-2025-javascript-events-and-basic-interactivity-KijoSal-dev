document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const serverResponseDiv = document.getElementById('serverResponse');
    const interactiveElement = document.getElementById('interactiveElement');

    interactiveElement.addEventListener('click', () => {
        alert('Interactive element clicked!');
        interactiveElement.textContent = 'Clicked!';
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Reset error messages
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Validation
        let isValid = true;

        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username is required.';
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        }

        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters.';
            isValid = false;
        }

        if (confirmPasswordInput.value.trim() === '') {
            confirmPasswordError.textContent = 'Confirm Password is required.';
            isValid = false;
        } else if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        }

        if (isValid) {
            const formData = {
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Handle non-2xx responses
                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage = `Server error: ${response.status}`;
                    
                    // Try to parse error message if server returns JSON
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.message || errorText;
                    } catch {
                        errorMessage = errorText || 'Unknown server error';
                    }
                    
                    throw new Error(errorMessage);
                }

                // Handle successful response
                const data = await response.json();
                serverResponseDiv.textContent = data.message;
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                serverResponseDiv.textContent = error.message;
                serverResponseDiv.style.color = 'red';
            }
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

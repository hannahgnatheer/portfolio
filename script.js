// Navigation toggle functionality
let menuIcon = document.querySelector('#menu-icon');  
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Active link switching on scroll
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

// Function to restrict and format contact number input
function formatContactNumber(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    // Limit to 11 digits
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // Format as +XX-XX-XXXX-XXX
    let formattedValue = '+';
    if (value.length > 0) formattedValue += value.slice(0, 2);
    if (value.length > 2) formattedValue += '-' + value.slice(2, 4);
    if (value.length > 4) formattedValue += '-' + value.slice(4, 8);
    if (value.length > 8) formattedValue += '-' + value.slice(8, 11);

    input.value = formattedValue;
}

// Function to allow only alphabetic characters and spaces in the full name input
function restrictFullNameInput(event) {
    let input = event.target;
    let value = input.value;

    // Allow only alphabetic letters and spaces
    let filteredValue = value.replace(/[^A-Za-z\s]/g, '');

    if (filteredValue !== value) {
        input.value = filteredValue;
    }
}

// Form validation functionality
function validateForm() {
    // Get the values of the input fields
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let contactNumber = document.getElementById("contactNumber").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Clear any previous errors
    document.getElementById("nameError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("contactError").style.display = "none";
    document.getElementById("subjectError").style.display = "none";
    document.getElementById("messageError").style.display = "none";

    // Basic validation logic
    let isValid = true;

    // Full name validation: Only alphabetic letters allowed
    if (fullName.length < 3) {
        document.getElementById("nameError").innerText = "Full name must be at least 3 characters long.";
        document.getElementById("nameError").style.display = "block";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    }

    // Contact number validation: Format (+XX-XX-XXXX-XXX)
    let contactPattern = /^\+\d{2}-\d{2}-\d{4}-\d{3}$/;
    if (!contactPattern.test(contactNumber)) {
        document.getElementById("contactError").innerText = "Contact number must be in the format (+XX-XX-XXXX-XXX).";
        document.getElementById("contactError").style.display = "block";
        isValid = false;
    }

    // Subject validation
    if (subject.length < 3) {
        document.getElementById("subjectError").innerText = "Subject must be at least 3 characters long.";
        document.getElementById("subjectError").style.display = "block";
        isValid = false;
    }

    // Message validation
    if (message.length < 10) {
        document.getElementById("messageError").innerText = "Message must be at least 10 characters long.";
        document.getElementById("messageError").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function sendEmail() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Construct the mailto link
    const mailtoLink = `mailto:hannahnatheer9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\nContact Number: ${contactNumber}\nMessage: ${message}`)}`;

    // Redirect to the mailto link
    window.location.href = mailtoLink;
}

// Attach form validation to form submission
document.getElementById('contactForm').onsubmit = function() {
    return validateForm(); // Return true if the form is valid, false if not
};

// Attach input restriction and formatting to input fields
document.getElementById('fullName').addEventListener('input', restrictFullNameInput);
document.getElementById('contactNumber').addEventListener('input', formatContactNumber);


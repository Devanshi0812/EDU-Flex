document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggleBtn.querySelector('span');

    // Check local storage for saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // --- 2. Tools Page Logic (EMI & Search) ---
    // We check if elements exist to avoid errors on other pages
    if (document.getElementById('emiResult')) {

        // Populate Dummy Courses
        const courses = [
            "HTML5 Mastery", "CSS3 Advanced Animations", "JavaScript ES6+",
            "React for Beginners", "Node.js Backend", "Python Data Science",
            "UI/UX Design Fundamentals", "Web Accessibility (A11Y)"
        ];

        window.filterCourses = function () {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const list = document.getElementById('courseList');
            list.innerHTML = ''; // Clear current

            const filtered = courses.filter(c => c.toLowerCase().includes(input));

            if (input.length === 0) return; // Hide if empty

            filtered.forEach(course => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = course;
                list.appendChild(li);
            });
        };

        window.updateRateDisplay = function (val) {
            document.getElementById('rateVal').innerText = val + "%";
        };

        window.calculateEMI = function () {
            const P = parseFloat(document.getElementById('principal').value);
            const r = parseFloat(document.getElementById('rate').value) / 12 / 100;
            const n = parseFloat(document.getElementById('years').value) * 12;

            if (P && r && n) {
                const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                document.getElementById('emiResult').innerText = "EMI: " + emi.toFixed(2);
            } else {
                alert("Please fill all fields correctly.");
            }
        };
    }

    // --- 3. Registration Page Logic ---
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            if (!regForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                alert("Registration Successful!");
                regForm.reset();
            }
            regForm.classList.add('was-validated');
        });
    }
});
const toggleButton = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = storedTheme;

// Determine the initial theme
if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? "dark-mode" : "light-mode";
}

// Apply the initial theme
if (currentTheme === "dark-mode") {
    document.body.classList.add('dark-mode');
    toggleButton.textContent = 'Toggle Light Mode ☀️';
} else {
    document.body.classList.remove('dark-mode');
    toggleButton.textContent = 'Toggle Dark Mode 🌙';
}

// Toggle theme on button click
toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    let theme;
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
        toggleButton.textContent = 'Toggle Light Mode ☀️';
    } else {
        theme = 'light-mode';
        toggleButton.textContent = 'Toggle Dark Mode 🌙';
    }

    localStorage.setItem('theme', theme);
});

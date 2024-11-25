const toggleButton = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = storedTheme;

if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? "dark-mode" : "light-mode";
}

document.body.classList.toggle(currentTheme === "dark-mode");

if (currentTheme === "dark-mode") {
    toggleButton.textContent = '☀️ Light Mode';
} else {
    toggleButton.textContent = '🌙 Dark Mode';
}

toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    let theme = 'light-mode';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
        toggleButton.textContent = '☀️ Light Mode';
    } else {
        theme = 'dark-mode';
        toggleButton.textContent = '🌙 Dark Mode';
    }

    localStorage.setItem('theme', theme);
});

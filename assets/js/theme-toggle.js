const toggleButton = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = storedTheme;

if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? "dark-mode" : "light-mode";
}

document.body.classList.toggle(currentTheme === "dark-mode");

if (currentTheme === "dark-mode") {
    toggleButton.textContent = '☀️';
} else {
    toggleButton.textContent = '🌙';
}

toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    let theme = 'light-mode';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
        toggleButton.textContent = '☀️';
    } else {
        theme = 'light-mode';
        toggleButton.textContent = '🌙';
    }

    localStorage.setItem('theme', theme);
});

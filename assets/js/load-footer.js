document.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById("footer-placeholder");
    if (!placeholder) return;

    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
    <p>
        435.574.9393 &middot; 
        640 E 700 S Ste. 303 St. George, UT 84770 &middot; 
        &copy; <span id="year"></span>
        <a href="https://neurodevmentoring.com/" target="_blank" rel="noopener">NeuroDev</a>
    </p>
    <p>
        <a href="#top">Back to top</a>
    </p>
    <div class="theme-toggle-container">
        <button id="theme-toggle" class="button" aria-label="Theme / Dark Mode">
        Toggle Theme
        </button>
    </div>
    `;

    placeholder.appendChild(footer);

    document.getElementById("year").textContent = new Date().getFullYear();

    const themeScript = document.createElement("script");
    themeScript.src = "assets/js/theme-toggle.js";
    document.body.appendChild(themeScript);
});

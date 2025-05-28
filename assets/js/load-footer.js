document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <p>
      &copy; <span id="year"></span>
      <a href="https://neurodevmentoring.com/" target="_blank" rel="noopener">NeuroDev</a>
      &middot; <a href="#top">Back to top</a>
    </p>
  `;

  placeholder.appendChild(footer);

  document.getElementById("year").textContent = new Date().getFullYear();

  const themeScript = document.createElement("script");
  themeScript.src = "assets/js/theme-toggle.js";
  document.body.appendChild(themeScript);
});

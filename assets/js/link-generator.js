// Makes course assignment checkboxes pretty and consistent, with password protection for links

const correctPassword = "love2code!"; // same as our WiFi password
localStorage.setItem('isAuthenticated', 'false'); // password protected

document.addEventListener("DOMContentLoaded", () => {
    const dataScript = document.getElementById("unit-data");
    if (!dataScript) {
        console.error("No unit data found.");
        return;
    }

    let unitData = [];
    try {
        unitData = JSON.parse(dataScript.textContent);
    } catch (error) {
        console.error("Error parsing JSON data:", error);
        return;
    }

    const container = document.getElementById("unit-sections");

    unitData.forEach(unit => {
        const section = document.createElement("section");

        // Unit Title and Description
        const header = document.createElement("h2");
        header.textContent = unit.title;

        const description = document.createElement("p");
        description.textContent = unit.description;

        section.appendChild(header);
        section.appendChild(description);

        unit.content.forEach(item => {
            const div = document.createElement("div");
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";
            label.appendChild(checkbox);

            // YouTube links
            if (item.type === "video") {
                const textNode = document.createTextNode(`Video - ${item.title}`);
                label.appendChild(textNode);
                div.appendChild(label);
                const videoContainer = document.createElement("div");
                videoContainer.className = "video-responsive";

                const iframe = document.createElement("iframe");
                iframe.src = item.url;
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.loading = "lazy";

                videoContainer.appendChild(iframe);
                div.appendChild(videoContainer);
            }

            // Inline HTML content
            else if (item.type === "html") {
                const text = document.createTextNode(item.title || "");
                label.appendChild(text);

                const htmlContainer = document.createElement("span");
                htmlContainer.innerHTML = item.html;
                htmlContainer.style.display = "inline-block";
                label.appendChild(htmlContainer);
                div.appendChild(label);
            }

            // All other link types (with password protection)
            else {
                const link = document.createElement("a");
                link.dataset.url = item.url;
                link.href = "javascript:void(0)";
                link.textContent = item.title;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                
                // Password protection logic
                link.addEventListener('click', function (event) {
                event.preventDefault();
                if (localStorage.getItem('isAuthenticated') !== 'true') {
                    const enteredPassword = prompt("Please enter the Tech Class password.");
                    if (enteredPassword === correctPassword) {
                        localStorage.setItem('isAuthenticated', 'true');
                        alert("Access granted!\nYou can now view all course materials.");
                    } else if (enteredPassword === null) {
                        return;
                    } else {
                        alert("Incorrect password.");
                        return;
                    }
                }
                // Authenticated, now open the real URL
                window.open(this.dataset.url, '_blank');
                });

                label.appendChild(link);
                div.appendChild(label);
            }

            section.appendChild(div);
        });

        container.appendChild(section);
    });
});

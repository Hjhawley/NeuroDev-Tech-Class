// Makes course assignment checkboxes pretty and consistent, with password protection for links

const correctPassword = "love2code!"; // same as our WiFi password
/* localStorage.setItem('isAuthenticated', 'true'); // keep everything public for now */

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
                link.href = item.url;
                link.textContent = item.title;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                
                // Password protection logic
                link.addEventListener('click', function (event) {
                    if (localStorage.getItem('isAuthenticated') !== 'true') {
                        event.preventDefault();
                        const enteredPassword = prompt("Please enter the Tech Class password to access course content.\n(Hint: it's the same as our Wi-Fi password.)");

                        if (enteredPassword === null) {
                            return; // Cancel
                        } else if (enteredPassword === correctPassword) {
                            localStorage.setItem('isAuthenticated', 'true');
                            alert("Access granted!\nYou can now view all course materials.");
                            window.open(link.href, '_blank');
                        } else {
                            alert("Incorrect password. Please try again.\n(Hint: it's the same as our WiFi password.)");
                        }
                    }
                });

                label.appendChild(link);
                div.appendChild(label);
            }

            section.appendChild(div);
        });

        container.appendChild(section);
    });
});

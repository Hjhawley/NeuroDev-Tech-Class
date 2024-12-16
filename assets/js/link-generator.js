document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the JSON data from the HTML script tag
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

    // Get the container where the content will be inserted
    const container = document.getElementById("unit-sections");

    // Function to generate the content
    unitData.forEach(unit => {
        // Create section for each unit
        const section = document.createElement("section");

        // Add Unit Title and Description
        const header = document.createElement("h2");
        header.textContent = unit.title;

        const description = document.createElement("p");
        description.textContent = unit.description;

        section.appendChild(header);
        section.appendChild(description);

        // Loop through the content
        unit.content.forEach(item => {
            const div = document.createElement("div");
            const label = document.createElement("label");

            // Add a checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";
            label.appendChild(checkbox);

            if (item.type === "doc") {
                // If it's a document link
                const link = document.createElement("a");
                link.href = item.url;
                link.textContent = item.title;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                label.appendChild(link);
            } else if (item.type === "video") {
                // If it's a video
                const text = document.createTextNode(`Video - ${item.title}`);
                label.appendChild(text);

                const videoContainer = document.createElement("div");
                videoContainer.className = "video-responsive";

                const iframe = document.createElement("iframe");
                iframe.src = item.url;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.loading = "lazy";

                videoContainer.appendChild(iframe);
                div.appendChild(videoContainer);
            }

            div.appendChild(label);
            section.appendChild(div);
        });

        container.appendChild(section);
    });
});

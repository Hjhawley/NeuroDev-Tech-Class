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

            if (item.type === "video") {
                // Put the inline text with the checkbox
                const textNode = document.createTextNode(`Video - ${item.title}`);
                label.appendChild(textNode);
                // Append the label now
                div.appendChild(label);

                // Now add the video container outside the label
                const videoContainer = document.createElement("div");
                videoContainer.className = "video-responsive";

                const iframe = document.createElement("iframe");
                iframe.src = item.url;
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.loading = "lazy";

                videoContainer.appendChild(iframe);
                div.appendChild(videoContainer);

            } else if (item.type === "html") {
                // Add a simple text label (if needed) or just the checkbox if no title
                const textNode = document.createTextNode(item.title || "");
                label.appendChild(textNode);
                // Append the label first
                div.appendChild(label);

                // Now add the HTML block outside the label
                const htmlContainer = document.createElement("div");
                htmlContainer.innerHTML = item.html;
                div.appendChild(htmlContainer);

            } else {
                // For simple links, it's fine to keep them in the label
                const link = document.createElement("a");
                link.href = item.url;
                link.textContent = item.title;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                label.appendChild(link);
                // Append the label last since it's all inline
                div.appendChild(label);
            }

            section.appendChild(div);
        });

        container.appendChild(section);
    });
});

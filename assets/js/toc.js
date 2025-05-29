document.addEventListener('DOMContentLoaded', () => {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = document.querySelectorAll('main h2');
    if (!headings.length) return;

    const ul = document.createElement('ul');
    headings.forEach(h => {
    if (!h.id) {
        const slug = h.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
        h.id = slug;
    }
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = `#${h.id}`;
    a.textContent = h.textContent;
    li.appendChild(a);
    ul.appendChild(li);
    });

    toc.appendChild(ul);
    });

const matches = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption"
);


function boldFirstHalf(word) {
    let mid = Math.ceil(word.length / 2);
    let firstHalf = word.slice(0, mid);
    let secHalf = word.slice(mid, word.length);

    return `<strong>${firstHalf}</strong>${secHalf}`;
}

for (const el of matches) {
    let newEl = ``;
    for (const node of el.childNodes) {
        if ("outerHTML" in node) {
            newEl += node.outerHTML;
            continue;
        }
        if (node.nodeType != Node.TEXT_NODE) {
            continue;
        }
        const rawWords = node.textContent.split(" ");
        for (let i = 0; i < rawWords.length; i++) {
            let word = rawWords[i];
            newEl += boldFirstHalf(word) + " ";
        }
    }
    el.innerHTML = newEl;
}

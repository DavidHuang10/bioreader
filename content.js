const matches = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption"
);
// const matches = document.querySelectorAll(`
//     p, h1, h2, h3, h4, h5, h6,
//     li, blockquote, figcaption,
//     span,
//      a, label, b, i, u, small,
//     td, th, dt, dd, cite, q, em, strong
//   `);

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

// function boldHalf(word) {
//     const mid = Math.ceil(word.length / 2);
//     return `<strong>${word.slice(0, mid)}</strong>${word.slice(mid)}`;
// }
// console.log("Hiiii");
// console.log("the event loaded");
// const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
//     acceptNode(node) {
//         const skipTags = [
//             "SCRIPT",
//             "STYLE",
//             "CODE",
//             "PRE",
//             "TEXTAREA",
//             "INPUT",
//         ];
//         const parent = node.parentElement;
//         if (!parent) return NodeFilter.FILTER_REJECT;
//         if (skipTags.includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
//         return NodeFilter.FILTER_ACCEPT;
//     },
// });

// let textNode;
// let count = 0;

// while ((textNode = walker.nextNode())) {
//     count++;
//     const originalText = textNode.data;
//     const words = originalText.split(/\s+/).map(boldHalf).join(" ");

//     // Log what's happening
//     console.log(`🔍 [${count}] Replacing text node:`, originalText);

//     const span = document.createElement("span");
//     span.innerHTML = words;
//     span.style.border = "1px dotted red"; // visual debug
//     span.style.padding = "0 2px"; // spacing for visibility

//     const parent = textNode.parentNode;
//     if (parent) {
//         console.log(`✅ Inserting replacement into:`, parent);
//         parent.insertBefore(span, textNode);
//         parent.removeChild(textNode);
//     } else {
//         console.log("⚠️ Skipped — node had no parent.");
//     }
// }

// console.log(`✅ Total text nodes processed: ${count}`);

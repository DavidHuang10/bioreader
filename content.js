// ⚡️ Content Script: Scoped Hybrid Bolding

console.log("🚀 Boldify (scoped) loaded");

function boldHalfInText(text) {
    return text.replace(/([^\s]+)/g, word => {
      if (word.length < 2) return word;
      const mid = Math.ceil(word.length/2);
      return `<strong>${word.slice(0, mid)}</strong>${word.slice(mid)}`;
    });
  }
  
  function processTextNodesIn(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim()) nodes.push(node);
    }
  
    for (const textNode of nodes) {
      const html = boldHalfInText(textNode.textContent);
      const wrapper = document.createElement("span");
      wrapper.innerHTML = html;
      textNode.parentNode.replaceChild(wrapper, textNode);
    }
  }
  

function runScopedBoldify() {
  console.log("🔍 Scoped Boldify running…");

  const selector = [
    "h1","h2","h3",
    "p",
    "li",
    "blockquote",
    "figcaption",
    "td","th",
    "span","a"
  ].join(",");

  const elements = document.querySelectorAll(selector);
  console.log(`📦 Found ${elements.length} elements to process`);

  elements.forEach(processTextNodesIn);

  console.log("✅ Scoped Boldify complete.");
}

// Run as soon as DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runScopedBoldify);
} else {
  runScopedBoldify();
}

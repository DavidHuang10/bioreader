// Inject our CSS to force strong tags to actually bold
function injectBoldifyStyle() {
    const style = document.createElement("style");
    style.textContent = `
      .__boldify strong {
        font-weight: 600 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Replace the first half of each word with a strong-wrapped version
  function boldHalfInText(text) {
    return text.replace(/([^\s]+)/g, word => {
      if (word.length < 2) return word;
      const mid = Math.ceil(word.length / 2);
      return `<strong>${word.slice(0, mid)}</strong>${word.slice(mid)}`;
    });
  }
  
  // Recursively walk through text nodes and replace them safely
  function processTextNodesIn(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
  
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim()) {
        nodes.push(node);
      }
    }
  
    for (const textNode of nodes) {
      const wrapper = document.createElement("span");
      wrapper.className = "__boldify";
      wrapper.innerHTML = boldHalfInText(textNode.textContent);
      textNode.parentNode.replaceChild(wrapper, textNode);
    }
  }
  
  // Run bolding on safe, content-related elements only
  function runScopedBoldify() {
    console.log("🔍 Boldify running...");
  
    const selector = `
      h1, h2, h3,
      p, li,
      blockquote, figcaption,
      td, th,
      span, a
    `;
  
    const elements = document.querySelectorAll(selector);
    console.log(`📦 Found ${elements.length} elements`);
  
    elements.forEach(processTextNodesIn);
  
    console.log("✅ Boldify complete.");
  }
  
  // Entry point: inject style and run
  function run() {
    injectBoldifyStyle();
    runScopedBoldify();
  }
  
  // Execute when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
  
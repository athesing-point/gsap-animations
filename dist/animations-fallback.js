(()=>{function e(t){document.readyState!=="loading"?t():document.addEventListener("DOMContentLoaded",t)}var n=class{constructor(){this.init()}init(){e(()=>{console.warn("GSAP not loaded - applying animation fallbacks"),this.applyFallbacks()})}applyFallbacks(){document.querySelectorAll("[data-anim]").forEach(a=>{a.style.opacity="1",a.style.transform="none",a.style.willChange="auto",a.removeAttribute("data-anim")})}};window.AnimationsFallback=n;})();

(()=>{(function(){class h{constructor(n,u={}){this.element=n,this.duration=u.duration||1500,this.startValue=0;let e=n.getAttribute("data-target").replace(/,/g,"");this.endValue=parseFloat(e)||0,this.decimals=this.hasDecimals(this.endValue)?1:0,this.shouldFormat=this.endValue===11e3,this.frameRate=1e3/60}hasDecimals(n){return n%1!==0}formatNumber(n){return this.shouldFormat?Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):n.toFixed(this.decimals)}start(){let n=this.endValue-this.startValue,u=performance.now(),e=o=>{let t=o-u,i=Math.min(t/this.duration,1),r=1-(1-i)*(1-i),s=this.startValue+n*r;this.element.textContent=this.formatNumber(s),i<1&&requestAnimationFrame(e)};requestAnimationFrame(e)}}document.addEventListener("DOMContentLoaded",function(){function a(o){new h(o,{duration:1500}).start()}function n(o){let t=o.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}let u=document.querySelectorAll(".stat-counter"),e=new IntersectionObserver(o=>{o.forEach(t=>{t.isIntersecting&&(a(t.target),e.unobserve(t.target))})},{threshold:.1});u.forEach(o=>{e.observe(o)})}),document.addEventListener("DOMContentLoaded",function(){let a=!1,n=()=>{let e=document.querySelectorAll(".product-faq-toggle"),o=document.querySelectorAll(".product-faq-content");if(typeof gsap=="undefined"){console.warn("GSAP not loaded - showing all accordions"),o.forEach(t=>{var r;t.style.display="block",t.style.height="auto",t.style.opacity="1",t.style.overflow="visible";let i=(r=t.closest(".product-faq-item"))==null?void 0:r.querySelector(".product-faq-toggle");i&&i.setAttribute("aria-expanded","true"),t.setAttribute("aria-hidden","false")});return}if(o.forEach(t=>{t.style.display="none",t.style.height="0",t.style.opacity="0"}),e.length===0){console.warn("No accordion toggles found. Check your class names.");return}e.forEach((t,i)=>{let r=t.closest(".product-faq-item"),s=r==null?void 0:r.querySelector(".product-faq-content"),d=r==null?void 0:r.querySelector(".prod-faq-bg_shadow");if(!s){console.warn(`Accordion ${i} has no content element.`);return}t.setAttribute("aria-expanded","false"),s.style.overflow="hidden",s.setAttribute("aria-hidden","true"),gsap.set(s,{height:0,opacity:0,display:"none"}),d&&gsap.set(d,{opacity:0}),t.addEventListener("click",function(l){if(l.preventDefault(),l.stopPropagation(),a)return;let c=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!c),s.setAttribute("aria-hidden",c),u(s,d,!c)})})};function u(e,o,t){if(a)return;a=!0;let i=gsap.timeline({onComplete:()=>{a=!1}});if(t){gsap.set(e,{display:"block",height:"auto"});let r=e.offsetHeight;gsap.set(e,{height:0,paddingBottom:0}),i.to(e,{height:r,paddingBottom:"1.5rem",opacity:1,duration:.3,ease:"power2.out",onComplete:()=>{e.style.height="auto"}}),o&&i.to(o,{opacity:1,duration:.3,ease:"power2.out"},"-=0.3")}else{let r=e.offsetHeight;i.to(e,{height:0,paddingBottom:0,opacity:0,duration:.3,ease:"power2.out",onComplete:()=>{gsap.set(e,{display:"none",clearProps:"paddingBottom,height"})}}),o&&i.to(o,{opacity:0,duration:.3,ease:"power2.out"},"-=0.3")}}n()})})();})();

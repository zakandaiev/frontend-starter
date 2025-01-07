console.log("%cMade by Zakandaiev","background:#e44d26;color:#fff;padding:10px;font-weight:bold;");const t={name:"frontend-starter",nameFormatted:"Frontend Starter",version:"2.1.4",mode:"prod"},e={delayMs:500,timeoutMs:3e4,backend:"http://localhost:4173"};function n(t){return t||e.timeoutMs||15e3}async function o(t,o={},a=null,r=null){const s=performance.now();o.method||(o.method="GET"),o.headers||(o.headers={"Content-Type":"application/json"}),"object"!=typeof o.body||o.body instanceof FormData||(o.body=JSON.stringify(o.body));const c={code:null,status:null,message:null,data:null};let d={};try{d=await async function(t,e={},o=null){const a=new AbortController,r=setTimeout((()=>a.abort()),n(o)),s=await fetch(t,{...e,signal:a.signal});return clearTimeout(r),s}(t,o,n(a)),c.code=d.status}catch(t){}try{const t=await d.json()||{};Object.assign(c,t),c.status=t.status||null,c.message=t.message||null,c.data=t.data||t.payload||null}catch(t){c.status="error",c.message=t}const i=performance.now()-s,l=function(t){return t||e.delayMs||1e3}(r);var u;return i<l&&await(u=l-i,new Promise((t=>setTimeout(t,u)))),c}window.location.protocol.replace(":","");const[a,r]=window.location.href.split("?"),s=`${a}?${r}`;function c(t,e){e.classList.add("disappear"),e.addEventListener("animationend",(()=>{e.remove(),t&&t.childElementCount<=0&&t.remove()}))}function d(t=null,e=0,n="smooth"){if(t){const o=t.getBoundingClientRect().top+window.scrollY-e;window.scrollTo({top:o,behavior:n})}else window.scrollTo({top:0,behavior:n})}function i(){const t=document.getElementById("header");if(!t)return!1;document.documentElement.scrollTop>0?t.classList.add("is-scrolled"):t.classList.remove("is-scrolled")}new Proxy(new URLSearchParams(window.location.search),{get:(t,e)=>t.get(e)}),window.onerror=async(n,a,r,c,d)=>async function(n){const a=`${e.backend}/logError`,r={method:"POST",body:{app:{...t},url:s,error:n}};return await o(a,r)}({message:n,source:a,line:r,col:c,stack:d?.stack||null}),document.addEventListener("DOMContentLoaded",(()=>{document.addEventListener("click",(t=>{const e=t.target.closest("[data-copy]");if(!e)return!1;const n=e.getAttribute("data-copy").length>0?e.getAttribute("data-copy"):e.textContent;if(!n)return!1;!async function(t){let e=!1;if(navigator.clipboard&&window.isSecureContext)try{await navigator.clipboard.writeText(t),e=!0}catch(t){}else{const n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.zIndex="-1000000",n.style.top="100%",n.style.left="100%",n.style.opacity="0",n.style.visibility="hidden",document.body.append(n),n.select();try{document.execCommand("copy"),e=!0}catch(t){}finally{n.remove()}}}(n)}))})),document.addEventListener("DOMContentLoaded",(()=>{document.addEventListener("click",(t=>{const e=t.target.closest("[data-toast]");if(!e)return!1;!function(t,e="default",n=null){if("string"!=typeof t||!t?.length)return!1;let o=document.querySelector(".toasts");o||(o=document.createElement("div"),o.classList.add("toasts"),document.body.appendChild(o));const a=document.createElement("div");a.classList.add("toasts__item"),e&&a.classList.add(e);const r=document.createElement("i");r.classList.add("toasts__icon");const s=document.createElement("span");s.classList.add("toasts__text"),s.textContent=t,a.appendChild(r),a.appendChild(s),o.appendChild(a),a.addEventListener("click",(()=>c(o,a))),setTimeout((()=>c(o,a)),n||5e3)}(e.getAttribute("data-toast").length>0?e.getAttribute("data-toast"):e.textContent,e.getAttribute("data-toast-type"),e.getAttribute("data-toast-duration"))}))})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("a").forEach((t=>{t.hasAttribute("target")&&"_blank"===t.getAttribute("target")&&t.setAttribute("rel","noopener noreferrer nofollow")}))})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("a").forEach((t=>{t.hasAttribute("href")&&t.href.startsWith("tel:")&&(t.href=`tel:${t.href.replaceAll(/[^\d+]/g,"")}`)}))})),window.onload=()=>{document.querySelectorAll("img").forEach((t=>{t.complete&&"number"==typeof t.naturalWidth&&t.naturalWidth<=0&&(t.src="./img/no-image.jpg")}))},document.addEventListener("DOMContentLoaded",(()=>{document.addEventListener("contextmenu",(t=>{"IMG"===t.target.nodeName&&t.preventDefault()}))})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("table").forEach((t=>{if(!t.parentElement.classList.contains("table-responsive")&&!t.hasAttribute("data-noresponsive")){const e=document.createElement("div");e.classList.add("table-responsive"),t.before(e),e.appendChild(t)}}))})),document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("header")?.offsetHeight||0;document.addEventListener("click",(e=>{const n=e.target.closest("a");if(!n)return!1;const o=n.getAttribute("href");if("#"===o)e.preventDefault(),d();else if("#"===o.charAt(0)||"/"===o.charAt(0)&&"#"===o.charAt(1)){if(!n.hash)return!1;const o=document.querySelector(n.hash);o&&(e.preventDefault(),d(o,t+32))}}))})),document.addEventListener("DOMContentLoaded",(()=>{i(),window.addEventListener("scroll",(()=>i()))})),document.addEventListener("DOMContentLoaded",(()=>{const t=document.querySelector(".section__navigation"),e=document.querySelectorAll(".section__title");if(!t||!e.length)return!1;e.forEach((e=>{const n=document.createElement("a"),o=`${function(t,e="-"){const n=new RegExp(`[^A-Za-z0-9${e}]+`,"g"),o=new RegExp(`[${e}]+`,"g"),a=new RegExp(`^${e}`),r=new RegExp(`${e}$`);return function(t){const e={"а":"a","А":"A","б":"b","Б":"B","в":"v","В":"V","г":"g","Г":"G","д":"d","Д":"D","е":"e","Е":"E","ё":"e","Ё":"E","ж":"zh","Ж":"Zh","з":"z","З":"Z","и":"i","И":"I","й":"y","Й":"Y","к":"k","К":"K","л":"l","Л":"L","м":"m","М":"M","н":"n","Н":"N","о":"o","О":"O","п":"p","П":"P","р":"r","Р":"R","с":"s","С":"S","т":"t","Т":"T","у":"u","У":"U","ф":"f","Ф":"F","х":"kh","Х":"Kh","ц":"tz","Ц":"Tz","ч":"ch","Ч":"Ch","ш":"sh","Ш":"Sh","щ":"sch","Щ":"Sch","ы":"y","Ы":"Y","э":"e","Э":"E","ю":"iu","Ю":"Iu","я":"ia","Я":"Ia","ь":"","Ь":"","ъ":"","Ъ":"","ї":"yi","Ї":"Yi","і":"i","І":"I","ґ":"g","Ґ":"G","є":"e","Є":"E"};return t.split("").map((t=>e[t]||t)).join("")}(t).replaceAll(n,e).replaceAll(o,e).replace(a,"").replace(r,"").toLowerCase()}(e.textContent)}-${Math.random().toString(32).replace("0.","")}`;e.id=o,n.href=`#${o}`,n.innerHTML=`<span>${e.textContent}</span>`,n.classList.add("section__navigation-item"),t.appendChild(n)})),function(t){const e=t.closest(".position-sticky");if(!e)return!1;const n=document.getElementById("header")?.offsetHeight||0;window.innerWidth>=768?e.style.top=`calc(2em + ${n}px)`:e.style.top=`${n}px`}(t),function(){const t=document.querySelectorAll(".section"),e=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting){const e=t.target.querySelector(".section__title");if(!e)return!1;document.querySelectorAll(".section__navigation-item").forEach((t=>{t.hash===`#${e.id}`?t.classList.add("active"):t.classList.remove("active")}))}}))}),{root:document,rootMargin:"-10% 0px -90% 0px"});t.forEach((t=>{e.observe(t)}))}()}));

"use strict";const BASE_URL=window.location.protocol+"//"+window.location.host,PATH_URL=window.location.pathname,FULL_URL=window.location.href,GET_PARAM=t=>new URL(FULL_URL).searchParams.get(t);function cyrToLat(t){const e={"а":"a","А":"A","б":"b","Б":"B","в":"v","В":"V","г":"g","Г":"G","д":"d","Д":"D","е":"e","Е":"E","ё":"e","Ё":"E","ж":"zh","Ж":"Zh","з":"z","З":"Z","и":"i","И":"I","й":"y","Й":"Y","к":"k","К":"K","л":"l","Л":"L","м":"m","М":"M","н":"n","Н":"N","о":"o","О":"O","п":"p","П":"P","р":"r","Р":"R","с":"s","С":"S","т":"t","Т":"T","у":"u","У":"U","ф":"f","Ф":"F","х":"kh","Х":"Kh","ц":"tz","Ц":"Tz","ч":"ch","Ч":"Ch","ш":"sh","Ш":"Sh","щ":"sch","Щ":"Sch","ы":"y","Ы":"Y","э":"e","Э":"E","ю":"iu","Ю":"Iu","я":"ia","Я":"Ia","ь":"","Ь":"","ъ":"","Ъ":"","ї":"yi","Ї":"Yi","і":"i","І":"I","ґ":"g","Ґ":"G","є":"e","Є":"E"};return t.split("").map((t=>e[t]||t)).join("")}function getSlug(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";const n=new RegExp("[^A-Za-z0-9"+e+"]+","g"),o=new RegExp("["+e+"]+","g"),r=new RegExp("^"+e),a=new RegExp(e+"$");return cyrToLat(t).replaceAll(n,e).replaceAll(o,e).replace(r,"").replace(a,"").toLowerCase()}function encode(t){return(isArray(t)||isObject(t))&&(t=JSON.stringify(t)),window.btoa(encodeURIComponent(t))}function decode(t){return"["!==(t=decodeURIComponent(window.atob(t))).charAt(0)&&"{"!==t.charAt(0)||(isStringValidJSON(t)?t=JSON.parse(t):"["===t.charAt(0)?t=[]:"{"===t.charAt(0)&&(t={})),t}function fadeIn(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!t)return!1;let n=0,o=setInterval((()=>{n>=1&&(clearInterval(o),e instanceof Function&&e(t)),t.style.opacity=n.toFixed(1),n+=.1}),arguments.length>2&&void 0!==arguments[2]?arguments[2]:20)}function fadeOut(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!t)return!1;let n=1,o=setInterval((()=>{n<=0&&(clearInterval(o),e instanceof Function?e(t):t.remove()),t.style.opacity=n.toFixed(1),n-=.1}),arguments.length>2&&void 0!==arguments[2]?arguments[2]:20)}async function getUserPosition(){const t={};if(!navigator||!navigator.geolocation)return t;try{const{coords:e}=await new Promise(((t,e)=>{navigator.geolocation.getCurrentPosition(t,e,{enableHighAccuracy:!0,maximumAge:0,timeout:5e3})}));e.latitude&&e.longitude&&(t.lat=e.latitude,t.lng=e.longitude)}catch(e){t.error=e}return t}function isArray(t){return!!t&&t.constructor===Array}function isObject(t){return!!t&&t.constructor===Object}function isStringValidJSON(t){return!!/^[\],:{}\s]*$/.test(t.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))}async function fetchWithTimeout(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15e3;const o=new AbortController,r=setTimeout((()=>o.abort()),n),a=await fetch(t,{...e,signal:o.signal});return clearTimeout(r),a}async function request(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15e3,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3;const r=performance.now();e.method||(e.method="POST"),"get"!==e.method.toLowerCase()&&(e.headers||(e.headers={"Content-Type":"application/json"}),e.body?e.body=JSON.stringify(e.body):e.body=JSON.stringify({}));const a={code:null,status:null,message:null,data:null};try{const o=await fetchWithTimeout(t,e,n),r=await o.json()??{};a.code=o.status,a.status=r.status,a.message=r.message,a.data=r.data}catch(t){a.status="error",a.message=t}const i=performance.now()-r;return i<o&&await sleep(o-i),a}function sleep(t){return new Promise((e=>setTimeout(e,t)))}function smoothScroll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"smooth";t?t.scrollIntoView({behavior:e}):window.scrollTo({top:0,behavior:e})}function setStorage(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"session";return(isArray(e)||isObject(e))&&(e=JSON.stringify(e)),"session"===n?sessionStorage.setItem(t,e):localStorage.setItem(t,e),!0}function getStorage(t){let e="session"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"session")?sessionStorage.getItem(t):localStorage.getItem(t);return!e||"["!==e.charAt(0)&&"{"!==e.charAt(0)||(isStringValidJSON(e)?e=JSON.parse(e):"["===e.charAt(0)?(e=[],flushStorage(t)):"{"===e.charAt(0)&&(e={},flushStorage(t))),e}function flushStorage(t){return"session"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"session")?sessionStorage.removeItem(t):localStorage.removeItem(t),!0}function getVibrate(t){switch(t){case"success":return[40];case"warning":return[40,20,40];case"error":return[20,20,20,20,20]}return 20}function vibrate(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!!(!window.navigator||!window.navigator.vibrate))return!1;const e="string"==typeof t?getVibrate(t):t;return window.navigator.vibrate(e),!0}console.log("%cMade by Zakandaiev","background:#da4648;color:#fff;padding:10px;font-weight:bold;"),document.addEventListener("click",(t=>{if("A"!==t.target.tagName)return!1;const e=t.target,n=e.getAttribute("href");if("#"===n)t.preventDefault(),smoothScroll();else if("#"===n.charAt(0)||"/"===n.charAt(0)&&"#"===n.charAt(1)){if(!e.hash)return!1;const n=document.querySelector(e.hash);n&&(t.preventDefault(),smoothScroll(n))}})),document.addEventListener("DOMContentLoaded",(()=>{navigator&&navigator.clipboard&&document.addEventListener("click",(t=>{const e=t.target.closest("[data-copy]");if(!e)return!1;t.preventDefault();const n=e.getAttribute("data-copy").length>0?e.getAttribute("data-copy"):e.textContent;if(!n)return!1;navigator.clipboard.writeText(n).then((()=>{e.hasAttribute("data-toast")&&toast instanceof Function&&toast(e.getAttribute("data-toast-type")||"info",e.getAttribute("data-toast"))}))})),document.querySelectorAll("a").forEach((t=>{t.hasAttribute("href")&&t.href.startsWith("tel:")&&(t.href="tel:"+t.href.replaceAll(/[^\d+]/g,""))})),document.querySelectorAll("a").forEach((t=>{t.hasAttribute("target")&&"_blank"===t.getAttribute("target")&&t.setAttribute("rel","noopener noreferrer nofollow")})),document.addEventListener("contextmenu",(t=>{"IMG"===t.target.nodeName&&t.preventDefault()})),document.querySelectorAll("table").forEach((t=>{if(!t.parentElement.classList.contains("table-responsive")&&!t.hasAttribute("data-noresponsive")){const e=document.createElement("div");e.classList.add("table-responsive"),t.before(e),e.appendChild(t)}}))})),window.onload=()=>{document.querySelectorAll("img").forEach((t=>{t.complete&&void 0!==t.naturalWidth&&t.naturalWidth<=0&&(t.src=BASE_URL+"/img/no-image.jpg")}))};
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const o={"/index.html":()=>"Home Page","/products.html":()=>"RWD:Products -class","/hwproducts.html":()=>"RWD : HWProducts tailwind","/grid-products.html":()=>"Grid Products","/news.html":()=>"News","/js-day1.html":()=>"Javascript DAY-1: 資料型別與型別轉換","/js-day2.html":()=>"Javascript DAY-2: 變數、作用域、","/default":()=>"Welcome to Our Website"},n=()=>{const i=window.location.pathname;return o[i]?o[i]():o["/default"]()},c=document.getElementById("app");c.insertAdjacentHTML("afterbegin",`
  <nav class="navigator">
    <div class="navigator-title">${n()}</div>
    <div id="nav-trigger" class="navigator-trigger"><i></i></div>
  </nav>
  <div id="nav-mask" class="navigator-mask"></div>
  <div id="nav-panel" class="navigator-panel">
    <b>HTML/CSS</b>
    <ul class="navigator-list">
      <li><a href="index.html">Home</a></li>
        <li><a href="./news.html">News</a></li>
        <li><a href="./products.html">Products</a></li>
        <li><a href="./hwproducts.html">HWProducts</a></li>
        <li><a href="./grid-products.html">grid-products</a></li>
        <li><a href="./cosmetic.html">cosmetic</a></li>
        <li><a href="./extra-homework.html">extra</a></li>
    </ul>
    <b>Javascript</b>
    <ul class="navigator-list">
      <li>
        <a href="js-day1.html">Day-1: 資料型別與型別轉換</a>
      </li>
      <li>
        <a href="js-day2.html">Day-2: 變數、作用域、物件</a>
      </li>
      <li>
        <a href="javascript: void()">Day Extra: 偵聽器與DOM操作</a>
      </li>
    </ul>
  </div>  
 `);document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("nav-trigger"),a=document.getElementById("nav-mask"),r=document.getElementById("nav-panel");r.classList.remove("is-disabled");const s=e=>{r.classList.toggle("is-active",e),r.classList.toggle("is-disabled",!e),a.classList.toggle("is-active",e)};i.addEventListener("click",()=>s(!0)),a.addEventListener("click",()=>s(!1))});

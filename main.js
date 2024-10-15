import "./src/styles/style.scss";
// import "@/js/js-day-1.js";

//定義一個策略物件 用來映射步同業面對應h1標題
const pageTitleStrategy = {
  "/index.html": () => "Home Page",
  "/products.html": () => "RWD:Products -class",
  "/hwproducts.html": () => "RWD : HWProducts tailwind",
  "/cosmetic.html": () => "RWD:Cosmetic",
  "/grid-products.html": () => "Grid Products",
  "/news.html": () => "News",
  "/js-day1.html": () => "Javascript DAY-1: 資料型別與型別轉換",
  "/js-day2.html": () => "Javascript DAY-2: 變數、作用域、",
  "/js-day3.html": () => "Javascript DAY-3: 函式、運算子、判別式",
  "/js-day4.html": () => "Javascript DAY-4:",
  "/js-day-3-dijikstra.html": () => " Dijikstra",
  "/default": () => "Welcome to Our Website",
};

//判斷當前葉面設定標題
const getCurrentPageTitle = () => {
  const path = window.location.pathname;
  // 根據當前頁面的 path，從策略物件中選擇對應的標題
  return pageTitleStrategy[path]
    ? pageTitleStrategy[path]()
    : pageTitleStrategy["/default"]();
};

// 動態將nav相關的內容加入到頁面上
const appContent = document.getElementById("app");
appContent.insertAdjacentHTML(
  "afterbegin",
  `
  <nav class="navigator">
    <div class="navigator-title">${getCurrentPageTitle()}</div>
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
        <a href="js-work-day-2.html">Day2 作業</a>
      </li>
       <li>
        <a href="js-work-day-3.html">Day3 作業</a>
      </li>
       <li>
        <a href="js-work-day-3.html">Day3 Dijikstra</a>
      </li>
    </ul>
  </div>  
 `
);

//extra
document.addEventListener("DOMContentLoaded", () => {
  const navTrigger = document.getElementById("nav-trigger");
  const navMask = document.getElementById("nav-mask");
  const navPanel = document.getElementById("nav-panel");

  //初始化 隱藏選單且不顯示transition效果 並且清除選單的disabled狀態
  navPanel.classList.remove("is-disabled");

  // 切換選單狀態的函示
  const toggleNav = (isOpen) => {
    navPanel.classList.toggle("is-active", isOpen);
    navPanel.classList.toggle("is-disabled", !isOpen);
    navMask.classList.toggle("is-active", isOpen);
  };

  // 監聽選單按鈕的點擊事件，開啟選單
  navTrigger.addEventListener("click", () => toggleNav(true));

  // 監聽遮罩的點擊事件，關閉選單
  navMask.addEventListener("click", () => toggleNav(false));
});

// DOMContentLoaded = DOM確定載入後執行
// document.addEventListener("DOMContentLoaded", () => {
//   // 選擇所有需要被監聽的對象
//   const productCards = document.querySelectorAll(".product-card");
//   // 移除class name的事件
//   const removeActiveClassFromAll = () => {
//     productCards.forEach((card) =>
//       card.classList.remove("product-card--active")
//     );
//   };
//   // 點擊事件
//   const handleCardClick = (card) => {
//     removeActiveClassFromAll();
//     card.classList.add("product-card--active");
//     console.log("product-card--active");
//   };
//   // 監聽所有的productCards，並且點擊後執行handleCardClick
//   productCards.forEach((card) => {
//     card.addEventListener("click", () => handleCardClick(card));
//   });

//   //cosmetic
// const mobilebtn = document.getElementById("mobile-button");
// mobilebtn.addEventListener("click", () => {
//   const cosmeticpanel = document.getElementById("mobile-panel");
//   cosmeticpanel.classList.toggle("is-open");
//   console.log("costmeticMenuClick");
// });

// 手機選單點擊事件 //products
// const mobileMenu = document.getElementById("mobile-menu-btn");
// const mobileMenuMask = document.getElementById("mobile-menu-mask");
// mobileMenu.addEventListener("click", () => {
//   const panel = document.getElementById("mobile-menu-panel");
//   panel.classList.toggle("is-open");
//   mobileMenuMask.classList.toggle("is-open");
//   console.log("mobileMenuClick");
// });

// mobileMenuMask.addEventListener("click", () => {
//   const panel = document.getElementById("mobile-menu-panel");
//   panel.classList.remove("is-open");
//   mobileMenuMask.classList.remove("is-open");
//   console.log("mobileMaskClick");
// });

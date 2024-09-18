import "./src/styles/style.scss";
// DOMContentLoaded = DOM確定載入後執行
document.addEventListener("DOMContentLoaded", () => {
  // 選擇所有需要被監聽的對象
  const productCards = document.querySelectorAll(".product-card");
  // 移除class name的事件
  const removeActiveClassFromAll = () => {
    productCards.forEach((card) =>
      card.classList.remove("product-card--active")
    );
  };
  // 點擊事件
  const handleCardClick = (card) => {
    removeActiveClassFromAll();
    card.classList.add("product-card--active");
    console.log("product-card--active");
  };
  // 監聽所有的productCards，並且點擊後執行handleCardClick
  productCards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
  });

  //cosmetic
  const mobilebtn = document.getElementById("mobile-button");
  mobilebtn.addEventListener("click", () => {
    const cosmeticpanel = document.getElementById("mobile-panel");
    cosmeticpanel.classList.toggle("is-open");
    console.log("costmeticMenuClick");
  });

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
});

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

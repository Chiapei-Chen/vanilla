import './src/styles/style.scss'
// DOMContentLoaded = DOM確定載入後執行
document.addEventListener('DOMContentLoaded', () => {
    // 選擇所有需要被監聽的對象
    const productCards = document.querySelectorAll('.product-card');
    // 移除class name的事件
    const removeActiveClassFromAll = () => {
      productCards.forEach(card => card.classList.remove('product-card--active'));
    };
    // 點擊事件
    const handleCardClick = (card) => {
      removeActiveClassFromAll()
      card.classList.add('product-card--active');
      console.log('product-card--active');
    }
    // 監聽所有的productCards，並且點擊後執行handleCardClick
    productCards.forEach(card => {
      card.addEventListener('click', () => handleCardClick(card));
    });


  });

  
  //手機選單點擊事件
  // const mobileMenu=document.getElementById('mobile-menu-btn');
  // const mobileMenuMask=document.getElementById('mobile-menu-mask');
  // mobileMenu.addEventListener('click',()=>{
  //   const panel=document.getElementById('mobile-menu-panel');
  //   panel.classList.toggle('is-open');
  //   mobileMenuMask.classList.toggle('is-open');
  //   console.log('mobileMenuClick');
  // })
  
  // mobileMenuMask.addEventListener('click',()=>{
  //   const panel=document.getElementById('mobile-menu-panel');
  //   panel.classList.remove('is-open');
  //   mobileMenuMask.classList.remove('is-open');
  //   console.log('mobileMaskClick');
  // })

//cosmetic 
const mobilebtn=document.getElementById('cosmeticmenu-mobile__btn');
  mobilebtn.addEventListener('click',()=>{
  const cosmeticpanel=document.getElementById('cosmeticmenu-mobile__panel');
  cosmeticpanel.classList.toggle('is-open');
  console.log('costmeticMenuClick');


})


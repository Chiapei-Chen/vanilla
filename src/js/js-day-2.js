//js中 變量作用域和生命週期受到變量聲明方式的影響
//var let const

//(1)var
//函數作用域 在函數外聲明的var會成為全局變量 自動綁定到window
//hoisting:會在代碼執行前 
//提升到作用域頂部 但不會賦值

console.log(myNewNum);  //undefined
var myNewNum=20;
var x=1;
var newFun=function (y) {
  var x=40;
  return x+y;
}
console.log(newFun(100));
console.log(x);

//(2)let
//塊級作用域 只在{ }內有效 不同於var let不會把變量綁定到window
//hositing:let會被提升 但在使用前無法訪問(TDZ)
console.log("---let---")
let apple=10;
console.log(apple);

//(3)const 塊級
//聲明的變量需初始化 且不能重新賦值
//如果是對象或數組 不能更改其引用 但可以修改內容
const appleobj={name:"apple",
                price:30
}
console.log(appleobj.name); //apple
appleobj.name="banana";  
console.log(appleobj.name);  //banana

//window對象 是最外層的全局對象 包含全局範圍內所有全局變量和函數
//通過var 聲明的會自動成為window對象的屬性 
var globalVar = "I am global";
let globalLet = "I am block-scoped";

// console.log(window.globalVar); // "I am global"
// console.log(window.globalLet); // undefined

console.log("---Object---");

//Object物件
var price="window price";

var cake={
  flavor:"apple",
  price:400,
  date:"2023-3-3",
  hello:()=>{
    console.log(`${this.price}`);  
  },
  mycake:function(){
    console.log("this is function");  
    console.log(`${this.price}`); 
  }
}

// cake.hello();  //undefined  在window宣告var price="window price" 此時會是window price
cake.mycake(); //400

//箭頭函式 function
//當使用箭頭函式 this會指向全域物件(在瀏覽器是window 而不是cake物件)
//因此this 會去找全域物件的屬性 屬性並不存在 返回defined

//箭頭函數不會創建自己的 this，而是從包含它的作用域中繼承 this。這意味著：
// 如果在物件方法中使用箭頭函數，this 不會指向該物件，而是指向箭頭函數定義時的外部上下文（例如全域或外部函數的 this）。
//什麼時候使用箭頭函數？
// 箭頭函數的主要優勢在於它能夠簡化回呼函數的寫法，特別是在需要保留外部上下文的情況下，例如在處理異步操作（如 setTimeout 或 Promise）時。
// 但是，當需要訪問物件的屬性時，應使用普通函數來確保 this 指向該物件

//新增
cake.maker="Lily";
console.log(cake.maker);
//更新屬性
cake.flavor="orange";
console.log(cake.flavor);
//delete
delete cake.flavor;

cake.flavor="apple";
console.log(cake.flavor);




console.log("----Array.isArray----");

const MyArr = ["PS4", "PS5","PS6","PS7"];
const MyObj = {
  name: "PS4 Pro",
  price: "9,600",
  games: ["九日", "空洞騎士", "惡魔獵人V"],
};

console.log(Array.isArray(MyArr), Array.isArray(MyObj)); //true false
console.log(Array.isArray(MyObj.games)); //true

let result=MyArr.splice(2,3);

// splice()：
// 用途： 用於新增、刪除或替換陣列中的元素。

// 會改變原陣列。

// 語法： array.splice(start, deleteCount, item1, item2, ...)

// start：從哪個索引位置開始操作。
// deleteCount：要刪除的元素數量。如果為 0，則不刪除元素，只插入新元素。
// item1, item2, ...：（可選）要插入到陣列中的新元素
MyArr.splice(2,0,'ps5.1','ps5.2');
console.log(MyArr);
//++count count++
//time timeend

const players = [
  { name: '泡泡', currentExp: 200 },
  { name: '花花', currentExp: 1000 }, 
  { name: '毛毛',currentExp: 800 }
];

let myResult=players.map(item=>{return item.currentExp=item.currentExp*2});

console.log(players,myResult);

console.log('---CLOSURE---');

const createCounter=()=>{
  let count=0;
  return ()=>{
    return count++;
  }
}

const counter=createCounter();
console.log(counter());
console.log(counter());


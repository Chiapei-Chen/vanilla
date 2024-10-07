// ES6語法 允許參數內有預設值
function Es6Log(x, y = "貓咪") {
  console.log(x, y);
}
Es6Log(2);

// Arror Function
const printLog = (x) => console.log(x);

const calcFunc = (x, y) => {
  let num = 10;
  return x * y + num;
};
calcFunc(5, 5); //35

//call back
const timer = setTimeout(() => {
  console.log("2秒到了");
}, 2000);

//IF ELSE
console.log("If Else");
let num = 10;
let result = "";

if (num > 5) {
  result = "over than 5";
} else if (num > 9) {
  result = "over than 10";
} else {
  result = "lower than 5";
}
console.log(result);

// ?.
console.log("Ternary Operator");
let org = 20;
let orgResult = "";

org > 10 ? (orgResult = "over than 10") : "lower than 10";
console.log(orgResult);

//Array.every() Array.some()
console.log("Array.every() Array.some()");
const formData = {
  name: "Musashi",
  age: 25,
  address: {
    street: "東山區清水1-294",
    city: "京都府京都市",
  },
};

const validationStrategies = {
  name: (value) => value.length >= 3,
  age: (value) => value.age >= 18,
  address: (value) => value.street !== "" && value.city !== "",
};

const isValid = Object.keys(validationStrategies).every((x) =>
  validationStrategies[x](formData[x])
);

const someValid = Object.keys(validationStrategies).some((key) =>
  validationStrategies[key](formData[key])
);

console.log(isValid, someValid);

// for...of   for...in

//可迭代對象 Array String Map Set arguments NodeList Generators
//名詞解釋
//這些對象 <必須> 實現一個叫做 Symbol.iterator 的方法，
//該方法會返回一個「迭代器」（iterator），用來遍歷該對象中的每一個值。

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(this.name + "make a sound");
};

// for...in 會遍歷對象的所有可枚舉屬性，包括原型鏈上的屬性。
const cat = new Animal("cat");
for (let x in cat) {
  console.log("for..in", x);
}

for (let t in cat) {
  if (cat.hasOwnProperty(t)) console.log("Object own property", t);
}

// for...of 迴圈只會遍歷對象中的「值」，不會遍歷原型鏈上的屬性，
// 且僅適用於可迭代的對象，比如陣列、字串、Set、Map 等。
const arr = ["cat", "dog", "pig"];
for (let value in arr) {
  console.log("for...in", value); //0 1 2
}

for (let value of arr) {
  console.log("for...of", value); //cat dog pig
}

let uniqueNumbers = new Set([1, 2, 3, 3, 4, 5]);
for (let x of uniqueNumbers) {
  console.log(x);
}

let userRoles = new Map();
userRoles.set("Alice", "Admin");
userRoles.set("Jerry", "User");

for (let [User, role] of userRoles) {
  console.log(`${User}:${role}`);
}

//TwoSum
function twoSum(nums, target) {
  //把nums
  for (let i = 0; i < nums.length; i++) {
    for (let k = i; k < nums.length; k++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

//陣列的操作

const obj = {
  score: "",
  objective: "",
  special: "",
  compelete: "",
};

const resultText = document.getElementById("day2result");
resultText.innerHTML = `
Score: ${obj.score}<br/>
Special: ${obj.special}<br/>
Objective: ${obj.objective}<br/>
compelete: ${obj.compelete}
`;
const rateDouble = document.getElementById("rate_2x");
const rateQuarter = document.getElementById("rate_4x");
// 表單提交後的資料更新邏輯
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  console.log("submit!!");

  //先獲取表單的輸入值
  obj.score = Number(document.getElementById("scoreVal").value);
  obj.special = Number(document.getElementById("specialVal").value);
  obj.compelete = Number(document.getElementById("compeleteVal").value);
  const selectedObjective = Number(
    document.querySelector('input[name="objective"]:checked').value
  );

  Object.keys(obj).forEach(
    //排除objective屬性
    (key) => {
      if (key !== "objective") {
        obj[key] = obj[key] * selectedObjective;
      }
    }
  );

  resultText.innerHTML = `
Score: ${obj.score}<br/>
Special: ${obj.special}<br/>
Objective: ${selectedObjective}<br/>
Complete: ${obj.compelete}
`;
});

//second
const existingUser = {
  firstName: "John",
  lastName: "Doe",
  address: {
    street: "123 Main St",
    city: "New York",
  },
  email: "johndoe@example.com",
};

// 顯示原始使用者資料
const secondResultText = document.getElementById("secondResult");
resultText.innerHTML = `
  First Name: ${existingUser.firstName}<br/>
  Last Name: ${existingUser.lastName}<br/>
  Street: ${existingUser.address.street}<br/>
  City: ${existingUser.address.city}<br/>
  Email: ${existingUser.email}
`;

// 表單提交後的資料更新邏輯
const submitBtnSecond = document.getElementById("submitBtnSecond");
submitBtnSecond.addEventListener("click", () => {
  
  // 取得輸入框的值
  const firstNameVal = document.getElementById("firstNameVal").value;
  const lastNameVal = document.getElementById("lastNameVal").value;
  const emailVal = document.getElementById("emailVal").value;
  const streetVal = document.getElementById("streetVal").value;
  const cityVal = document.getElementById("cityVal").value;
  
  //使用Deep Copy
  const updatedUser = structuredClone(existingUser);

  if (firstNameVal) updatedUser.firstName = firstNameVal;
  if (lastNameVal) updatedUser.lastName = lastNameVal;
  if (emailVal) updatedUser.email = emailVal;
  if (streetVal) updatedUser.address.street = streetVal;
  if (cityVal) updatedUser.address.city = cityVal;

  secondResultText.innerHTML = `
  First Name: ${updatedUser.firstName}<br/>
  Last Name: ${updatedUser.lastName}<br/>
  Street: ${updatedUser.address.street}<br/>
  City: ${updatedUser.address.city}<br/>
  Email: ${updatedUser.email}
`;

  console.log("submit!!");
});

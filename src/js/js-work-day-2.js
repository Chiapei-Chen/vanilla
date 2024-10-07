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
  obj.compelete =Number(document.getElementById("compeleteVal").value);
  const selectedObjective = Number(document.querySelector('input[name="objective"]:checked').value);
  
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
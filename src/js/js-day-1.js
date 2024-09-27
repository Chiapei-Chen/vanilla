var day1formObj = {
  name: "",
  job: "",
  company: "",
  seniority: "",
  designerExp: "",
  developerExp: "",
};

var dayfirstsubmit = () => {
  console.log("this function is used");
  // 請從這裡開始作答，寫出事件和對象綁定，來替換掉Result的所有文字
  day1formObj.name = document.getElementById("nameVal").value;
  day1formObj.job = document.getElementById("jobVal").value;
  day1formObj.company = document.getElementById("companyVal").value;
  day1formObj.seniority = document.getElementById("seniorityVal").value;
  day1formObj.designerExp =document.getElementById("designerExp").value;
  day1formObj.developerExp =document.getElementById("developerExp").value;
  // day1formObj.designerExp =
  //   parseInt(document.getElementById("designerExp").value, 10) || 0;
  // day1formObj.developerExp =
  //   parseInt(document.getElementById("developerExp").value, 10) || 0;

  const totalExp =Number(day1formObj.designerExp) +Number (day1formObj.developerExp);

  var resultText = `My name is ${day1formObj.name},I am a ${day1formObj.job} of ${day1formObj.company} for ${day1formObj.seniority} years.
And I have more than ${totalExp} years of work experience.`;

  document.getElementById("result").innerHTML = resultText;
};

// document.addEventListener("DOMContentLoaded",function(){
//   document.getElementById("submitButton").addEventListener("click", dayfirstsubmit);

// });

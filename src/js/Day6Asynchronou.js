//獲取使用者查詢字
//發送請求獲取符合關鍵字的資料
//處理請求成功或失敗結果
//在葉面上顯示請求結果

let response = []
const callApi = () => {
  const keywords = document.getElementById("queryStr").value
  const apiPath = `https://restcountries.com/v2/name/${keywords}?fullText=false`
  // 請在以下作答，程式碼內容自行改寫 --->
  axios.get(apiPath)
  //處理請求成功
  .then((res)=>{
    //  儲存API返回的資料
    response=res.data;
    console.log(response);
    printAnswer(keywords);
  })
  //處理請求失敗
  .catch(error=>{
    console.error(error);
    
  });
   // --->
}

const printAnswer = (val) => {
  // 請在以下作答，程式碼內容自行改寫 --->
  const resultScope = document.getElementById("Day6AsynchronousResult")
  //儲存結果
  const countries = [];

  response.forEach((item)=>{
  countries.push(item.name);
})
  resultScope.innerHTML = `${val} 共有 ${response.length} 筆資料 <br>
  搜尋結果： <br>${countries.join(', ')}`
  // --->
}
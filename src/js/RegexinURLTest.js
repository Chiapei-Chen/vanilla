const getUrlDomain = (url) => {
  // 請在以下區塊作答 --->
  //移除協議部分
  let domain = url
    .replace(/^https?:\/\//, "")
    // 移除 www. 部分
    .replace(/^www\./, "")
    // 移除端口號部分
    .replace(/:[0-9]+/, "")
    // 移除路徑部分
    .replace(/\/.*$/, "");

  return domain;
};

const printAnswer = () => {
  const url = document.getElementById("url_1").value;
  const resultScope = document.getElementById("RegexResult");
  resultScope.innerHTML = getUrlDomain(url);
};

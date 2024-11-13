const getUrlDomain = (url) => {
    // 請在以下區塊作答 --->
    const regex= /^(?:https?:\/\/)?(?:www\.)?([^\/\s]+)/;
    
    const domain=url.replace(regex,'$1');

    return domain;
  }
  
  const printAnswer = () => {
    const url = document.getElementById("url_1").value
    const resultScope = document.getElementById("RegexResult")
    resultScope.innerHTML = getUrlDomain(url)
  }
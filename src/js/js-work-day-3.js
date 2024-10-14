const fruitsArr = [
  { name: 'Melon', seasonal: true, price: '200' },
  { name: 'Strawberry', seasonal: false, price: '120' },
  { name: 'Banana', seasonal: true, price: '40' },
  { name: 'Blue Berry', seasonal: false, price: '300' },
  { name: 'Mango', seasonal: true, price: '180' },
  { name: 'Pinapple', seasonal: true, price: '80' },
  { name: 'Cherry tomato', seasonal: true, price: '70' }
]

const submit = () => {
  
  const marketScope = document.getElementById('result_market');
  const factoryScope = document.getElementById('result_factory');
  
  //篩選出當季非當季
  const marketFruit=fruitsArr.filter(item=>item.seasonal);
  const factoryFruit=fruitsArr.filter(item=>!item.seasonal);

  let marketHTML =marketFruit.map(item=>item.name).join(',');
  let factoryHTML = factoryFruit.map(item=>item.name).join(',');
  
  marketScope.innerHTML = marketHTML;
  factoryScope.innerHTML = factoryHTML;
}

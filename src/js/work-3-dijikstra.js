import Decimal from "decimal.js";

// 旅遊景點數據
const tourismSpots = {
  台北101: {
    avgCost: 500,
    rating: 4.5,
    connections: { 故宮博物院: 30, 象山: 20, 西門町: 25 },
  },
  故宮博物院: {
    avgCost: 350,
    rating: 4.7,
    connections: { 台北101: 30, 陽明山: 40, 西門町: 35 },
  },
  象山: {
    avgCost: 100,
    rating: 4.3,
    connections: { 台北101: 20, 西門町: 30, 龍山寺: 35 },
  },
  西門町: {
    avgCost: 600,
    rating: 4.2,
    connections: { 台北101: 25, 故宮博物院: 35, 象山: 30, 龍山寺: 15 },
  },
  龍山寺: {
    avgCost: 50,
    rating: 4.6,
    connections: { 西門町: 15, 象山: 35 },
  },
  陽明山: {
    avgCost: 200,
    rating: 4.4,
    connections: { 故宮博物院: 40 },
  },
};

// 生成景點按鈕
function generateSpotButtons() {
  const container = document.getElementById("spots-container");
  for (let spot in tourismSpots) {
    const button = document.createElement("button");
    button.textContent = `${spot} (成本: ${tourismSpots[spot].avgCost}, 評分: ${tourismSpots[spot].rating})`;
    button.className = "spot-button";
    button.onclick = () => selectSpot(button, spot);
    container.appendChild(button);
  }
}

let selectedSpots = [];

function selectSpot(button, spot) {
  if (selectedSpots.includes(spot)) {
    selectedSpots = selectedSpots.filter((s) => s !== spot);
    button.classList.remove("selected");
  } else if (selectedSpots.length < 2) {
    selectedSpots.push(spot);
    button.classList.add("selected");
  }

  updateButtonStates();
}

function updateButtonStates() {
  document.getElementById("calculate-route").disabled =
    selectedSpots.length !== 2;
  document.getElementById("clear-selection").disabled =
    selectedSpots.length === 0;
}

function clearSelection() {
  selectedSpots = [];
  document.querySelectorAll(".spot-button").forEach((button) => {
    button.classList.remove("selected");
  });
  document.getElementById("result").innerHTML = "";
  updateButtonStates();
}

function findLowestCostNode(costs, processed) {
  let lowestCost = new Decimal(Infinity);
  let lowestCostNode = null;

  for (let node in costs) {
    const cost = costs[node];
    if (cost.lessThan(lowestCost) && !processed.has(node)) {
      lowestCost = cost;
      lowestCostNode = node;
    }
  }

  return lowestCostNode;
}
//----------------Start-----------------------------
// TODO: 實現 findBestTravelRoute 函數
function findBestTravelRoute(
  spots,
  start,
  end,
  costWeight = 0.7,
  ratingWeight = 0.3
) {
  // TODO: 實現迪傑斯特拉演算法

  const costs = {};
  //前驅節點
  const parents = {};

  const ratings = {};
  //存放已處理完成的節點
  const processed = new Set();

  //初始化所有節點為無窮大，起始點成本0
  for (let spot in spots) {
    costs[spot] = spot === start ? new Decimal(0) : new Decimal(Infinity);
    ratings[spot] = new Decimal(spots[spot].rating);
    parents[spot] = null;
  }

  let node = findLowestCostNode(costs, processed);
  while (node) {
    const currentCost = costs[node];
    const neighbors = spots[node].connections;

    for (let neighbor in neighbors) {
      const actualCost = new Decimal(spots[neighbor].avgCost);
      const totalCost = currentCost
        .plus(actualCost.times(costWeight)) //成本根據權重調整
        .plus(ratings[neighbor].times(ratingWeight)); //評分影響成本

      if (totalCost.lessThan(costs[neighbor])) {
        costs[neighbor] = totalCost; //更新更低成本
        parents[neighbor] = node; //更新父節點
      }
    }
      processed.add(node);
      node = findLowestCostNode(costs, processed);
    }

    if (costs[end].equals(Infinity)) {
      return null;
    }

    //生成最短路徑
    const path = [];
    let step = end;
    while (step) {
      path.unshift(step);
      step = parents[step];
    }

    const totalCost = costs[end];
    let actualCost = new Decimal(0);
    let totalRating = new Decimal(0);

    for (let i = 0; i < path.length; i++) {
      const spot = path[i];
      actualCost = actualCost.plus(spots[spot].avgCost);
      totalRating = totalRating.plus(spots[spot].rating);
    }

    const averageRating = totalRating.dividedBy(path.length);

    return {
      path,
      totalCost,
      actualCost,
      averageRating,
    };
}
//-----------------End-------------------------
  function calculateAndDisplayRoute() {
    const [start, end] = selectedSpots;
    const result = findBestTravelRoute(tourismSpots, start, end);
    displayResult(result);
  }

  function displayResult(result) {
    const resultDiv = document.getElementById("result");
    if (result) {
      resultDiv.innerHTML = `
          <p>最佳路線: ${result.path.join(" -> ")}</p>
          <p>綜合成本指標: ${result.totalCost.toFixed(2)}</p>
          <p>預估總花費: ${result.actualCost.toFixed(2)} NTD</p>
          <p>平均評分: ${result.averageRating.toFixed(2)}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p>沒有找到可行的路線</p>";
    }
  }

  // 初始化
  document.addEventListener("DOMContentLoaded", () => {
    generateSpotButtons();
    document
      .getElementById("calculate-route")
      .addEventListener("click", calculateAndDisplayRoute);
    document
      .getElementById("clear-selection")
      .addEventListener("click", clearSelection);
    updateButtonStates();
  });

import { cloneDeep } from 'lodash';


const players = [
  {
    //mp 魔力值 cost:技能施放時需要消耗的MP值 damage:對對方傷害
    name: "Cloud",
    class: "戰士",
    hp: 5500,
    mp: 500,
    status: "正常",
    skill: [
      { id: 0, name: "400攻擊", cost: 0, damage: 400 },
      { id: 1, name: "2000超究武神霸斬", cost: 50, damage: 2000 },
    ],
  },
  {
    name: "Tifa",
    class: "格鬥家",
    hp: 5000,
    mp: 500,
    status: "正常",
    skill: [
      { id: 2, name: "600攻擊", cost: 0, damage: 600 },
      { id: 3, name: "2000ファイナルヘブン（最終天堂）", cost: 80, damage: 2000 },
    ],
  },
  {
    name: "Aerith",
    class: "魔法師",
    hp: 4800,
    mp: 800,
    status: "正常",
    skill: [
      { id: 4, name: "800攻擊", cost: 0, damage: 800 },
      { id: 5, name: "ケアルガ（全體恢復）", cost: 50, damage: 2000 },
      { id: 6, name: "900ホーリー（聖光）", cost: 80, damage: 900 },
      {
        id: 7,
        name: "1500デブチョコボ召喚（召喚胖陸行鳥）",
        cost: 100,
        damage: 1500,
      },
    ],
  },
];

const mobs = [
  {
    name: "巴哈姆特",
    class: "BOSS",
    hp: 10000,
    mp: 20000,
    status: "不爽",
    skill: [{ name: "メガフレア（超巨爆）", cost: 0, damage: 3000 }],
  },
];
const creatMobs = () => {
  let html = "";
  for (let i in mobs) {
    html += `
      <div class="cards">
        <div class="row horizontal space">
          <b>${mobs[i].name}</b>
          <span>${mobs[i].class}</span>
        </div>
        <div class="row horizontal space">
          <b>HP</b>
          <span>${mobs[i].hp}</span>
        </div>
        <div class="row horizontal space">
          <b>MP</b>
          <span>${mobs[i].mp}</span>
        </div>
        <div class="row horizontal space">
          <b>狀態</b>
          <span>${mobs[i].status}</span>
        </div>
      </div>
    `;
  }
  const scope = document.getElementById("mob");
  scope.innerHTML = html;
};
//初始hp
const initialHps={};
players.forEach(player=>
  {initialHps[player.name]=player.hp});

const createPlayers = () => {
  let html = "";
  let btnHTML = "";
  let buttonName = [];
  let skills = [];
  for (let i in players) {
    skills.push(
      players[i].skill.map((item) => {
        return item.name;
      })
    );
  }
  //console.log(skills)

  for (let i in players) {
    const createButton = () => {
      let html = "";
      let result = players[i].skill.map((item) => {
        return item.name;
      });
      for (let j in result) {
        html += `<button onClick="attackMethods(${i}, ${j})">${result[j]}</button>`;
      }
      return html;
    };
    html += `
      <div class="cards row horizontal">
        <div class="row vertical" data-space="space-next">
          <div class="row horizontal space">
            <b>${players[i].name}</b>
            <span>${players[i].class}</span>
          </div>
          <div class="row horizontal space">
            <b>HP</b>
            <span>${players[i].hp}</span>
          </div>
          <div class="row horizontal space">
            <b>MP</b>
            <span>${players[i].mp}</span>
          </div>
          <div class="row horizontal space">
            <b>狀態</b>
            <span>${players[i].status}</span>
          </div>
        </div>
        <div class="row vertical">
          <b>技能</b>
          ${createButton()}
        </div>
      </div>
    `;
  }
  const scope = document.getElementById("players");
  scope.innerHTML = html;
};

const updateStatus = () => {
  createPlayers();
  creatMobs();
};
updateStatus();

//Boss累積損失
let damageAccumulated=0;
// 請在以下開始作答-------------->
const attackMethods = (playerIndex, playerSkill) => {
  const player = players[playerIndex];
  const skill = player.skill[playerSkill];
  const boss = mobs[0];
  const resultScope = document.getElementById('result');

  // 檢查 MP 是否足夠
  if (player.mp < skill.cost) {
    resultScope.innerHTML = `${player.name} 的 MP 不足以使用 ${skill.name}！`;
    return;
  }

  // 扣除玩家的 MP
  player.mp -= skill.cost;

  // 如果是恢復技能
  if (skill.id ===5) {
    players.forEach(member => {
      //成員生命大於0才可以恢復
      if (member.hp > 0) {
        //取得member的hp  (2000hp、所需hp)
        const healAmount = Math.min(skill.damage, initialHps[member.name] - member.hp);
        member.hp += healAmount; // 防止超過最大 HP
      }
    });
    resultScope.innerHTML = `${player.name} 對我方成員使用了 ${skill.name}，恢復了 HP！`;
  } 
  else {
    // 攻擊 BOSS
    boss.hp -= skill.damage;
    boss.hp = Math.max(boss.hp, 0); // 確保 BOSS HP 不低於 0
    damageAccumulated+=skill.damage;//累積損失值
    resultScope.innerHTML = `${player.name} 對 ${boss.name} 使用了 ${skill.name}，造成了 ${skill.damage} 點傷害！`;
  }

  // 更新顯示狀態
  updateStatus();

  
  // 檢查 BOSS 是否被擊敗
  if (boss.hp === 0) {
    resultScope.innerHTML += `<br>戰鬥勝利！<button class="resetGame" onclick="resetGame()">重新再玩</button>`;
    return;
  }

  // BOSS 觸發全體攻擊
  if (damageAccumulated>=2000) {
    bossAttack();
    damageAccumulated=0;
  }


  // 檢查所有玩家是否被擊倒
  const allPlayersDown = players.every(player => player.hp === 0);
  if (allPlayersDown) {
    resultScope.innerHTML = `戰鬥失敗！<button class="resetGame" onclick="resetGame()">重新再玩</button>`;
  }
};

const bossAttack = () => {
  const boss = mobs[0];
  const resultScope = document.getElementById('result');
  let attackMsg = `${boss.name} 使用 ${boss.skill[0].name}，對我方成員造成了 ${boss.skill[0].damage} 點傷害！<br>`;

  players.forEach(player => {
    if (player.hp > 0) {
      player.hp -= boss.skill[0].damage;
      player.hp = Math.max(player.hp, 0); // 確保 HP 不低於 0
      if (player.hp === 0) {
        player.status = '無法戰鬥';
        attackMsg += `${player.name} 被擊倒了！<br>`;
      }
    }
  });

  resultScope.innerHTML += attackMsg;
  updateStatus();
};

const disabledButton=()=>{
   

}


const resetGame = () => {
  // 重置玩家狀態
  players[0].hp = 5500; players[0].mp = 500; players[0].status = '正常';
  players[1].hp = 5000; players[1].mp = 500; players[1].status = '正常';
  players[2].hp = 4800; players[2].mp = 800; players[2].status = '正常';

  // 重置 BOSS 狀態
  mobs[0].hp = 10000;
  mobs[0].mp = 20000;
  mobs[0].status = '不爽';

  // 清空戰鬥結果
  document.getElementById('result').innerHTML = '';

  // 更新顯示狀態
  updateStatus();
};
// -------------->

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
      {
        id: 3,
        name: "2000ファイナルヘブン（最終天堂）",
        cost: 80,
        damage: 2000,
      },
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
const initialHps = {};
players.forEach((player) => {
  initialHps[player.name] = player.hp;
});

const createPlayers = () => {
  let html = "";
  let skills = [];
  for (let i in players) {
    skills.push(
      players[i].skill.map((item) => {
        return item.name;
      })
    );
  }

  for (let i in players) {
    const createButton = () => {
      let html = "";
      let result = players[i].skill.map((item) => {
        return item.name;
      });
      const player = players[i];
      const disabled = player.hp === 0 ? "disabled" : "";
      const btnClass = player.hp === 0 ? "btn-disabled" : "btn-normal";
      for (let j in result) {
        html += `<button onClick="attackMethods(${i}, ${j})" ${disabled} class="${btnClass}">${result[j]}</button>`;
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

// 請在以下開始作答-------------->

//Boss累積損失
let damageAccumulated = 0;
//更新結果訊息
const updateResultMsg = (message) => {
  const resultScope = document.getElementById("result");
  resultScope.innerHTML = message;
};
const attackMethods = (playerIndex, playerSkill) => {
  const player = players[playerIndex];
  const skill = player.skill[playerSkill];
  const boss = mobs[0];

  // 檢查 MP 是否足夠
  if (player.mp < skill.cost) {
    resultScope.innerHTML = `${player.name} 的 MP 不足以使用 ${skill.name}！`;
    return;
  }

  // 如果是恢復技能
  if (skill.id === 5) {
    healAllMembers(skill, player);
  } else {
    attackMob(skill, player);
    player.mp -= skill.cost;
  }

  // 更新顯示狀態
  updateStatus();

  // 檢查 BOSS 是否被擊敗
  if (boss.hp === 0) {
    updateResultMsg(`<br>戰鬥勝利！<button class="resetGame" 
      onclick="resetGame()">重新再玩</button>`);
    return;
  }

  // BOSS 觸發全體攻擊
  if (damageAccumulated >= 2000) {
    bossAttack();
    damageAccumulated = 0;
  }

  // 檢查所有玩家是否被擊倒
  const allPlayersDown = players.every((player) => player.hp === 0);
  if (allPlayersDown) {
    updateResultMsg(
      `戰鬥失敗！<button class="resetGame" onclick="resetGame()">重新再玩</button>`
    );
  }
};

//攻擊mob
const attackMob = (skill, player) => {
  const boss = mobs[0];
  boss.hp -= skill.damage;
  boss.hp = Math.max(boss.hp, 0); //確保不低於0
  damageAccumulated += skill.damage;

  updateResultMsg(
    `${player.name} 對 ${boss.name} 使用了 ${skill.name}，造成了 ${skill.damage} 點傷害！<br>`
  );

  if (boss.hp === 0) {
    boss.status = "已擊敗";
  }
};

//恢復
const healAllMembers = (skill, player) => {
  let hasHealingEffect = false; // 判斷是否有需要恢復

  players.forEach((member) => {
    //成員生命大於0才可以恢復
    if (member.hp > 0 && member.hp < initialHps[member.name]) {
      hasHealingEffect = true;
      //取得member的hp  (2000hp、所需hp)
      const healAmount = Math.min(
        skill.damage,
        initialHps[member.name] - member.hp
      );
      member.hp += healAmount; // 防止超過最大 HP
    }
  });

  if (hasHealingEffect) {
    player.mp -= skill.cost; //扣除mp
    updateResultMsg(
      `${player.name} 對我方成員使用了 ${skill.name}，恢復了 HP！<br>`
    );
  } else {
    updateResultMsg(
      `${player.name} 的 ${skill.name} 無需使用，所有成員 HP 已滿！<br>`
    );
  }
};
//mob攻擊玩家
const bossAttack = () => {
  const boss = mobs[0];
  let attackMsg = `${boss.name} 使用 ${boss.skill[0].name}，對我方成員造成了 ${boss.skill[0].damage} 點傷害！<br>`;

  players.forEach((player) => {
    if (player.hp > 0) {
      attackMsg += updatePlayerStatus(player, boss.skill[0].damage);
    }
  });

  updateResultMsg(attackMsg);
  updateStatus();
};
function updatePlayerStatus(player, damage) {
  player.hp = Math.max(player.hp - damage, 0); // 扣除傷害並確保 HP 不低於 0
  if (player.hp === 0) {
    player.status = "無法戰鬥";
    return `${player.name} 被擊倒了！<br>`;
  }
  return ""; // 若未被擊倒，返回空字串
}
const initialPlayers = _.cloneDeep(players);
const initialMobs = _.cloneDeep(mobs);

const resetGame = () => {
  // 重置狀態
  players.length = 0;
  players.push(..._.cloneDeep(initialPlayers));

  mobs.length = 0;
  mobs.push(..._.cloneDeep(initialMobs));

  // 清空戰鬥結果
  const resultScope = document.getElementById("result");
  resultScope.innerHTML = "";
  // 更新顯示狀態
  updateStatus();
};
// -------------->

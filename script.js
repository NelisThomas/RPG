function Enemy(name, health, maxHealth, damage) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
}

function Hero(name, health, maxHealth, damage, level, xp, armed, weapon) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.level = level;
    this.xp = xp;
    // this.armed = armed;
    // this.weapon = weapon;
}
//ENEMY REFERENCES
var enemyHealthBar = document.getElementById("enemyHealthBar");
var enemyHealth = document.getElementById("enemyHealth");
//PLAYER REFERENCES
var playerHealthBar = document.getElementById("playerHealthBar");
var playerHealth = document.getElementById("playerHealth");
var playerXP = document.getElementById("playerXP");
var playerLevel = document.getElementById("playerLevel");
//OTHER REFERENCES 
var battleButton = document.getElementById("battleButton");
var returnButton = document.getElementById("returnButton");
var newBattleButton = document.getElementById("newBattleButton");
var shopScreen = document.getElementById("shopScreen");
//VARIABLES
//LISTENERS
newBattleButton.addEventListener("click", openBattleScreen);
returnButton.addEventListener("click", returnShop);
battleButton.addEventListener("click", (event)=>playerAttack(player, randomEnemy));

// function Weapon(name, damage,durability) {
// this.name = name;
// this.damage = damage;
// this.durability = durability;
// }

//PLAYER
let player = new Hero("John Doe", 100, 100, 12, 1, 0);

//ENEMIES
let enemy1 = new Enemy("Bandit", 100, 100, 5);
let enemy2 = new Enemy("Skeleton", 100, 100, 5);
let enemy3 = new Enemy("Tank", 150, 150, 20);
let enemy4 = new Enemy("Mr Man Guy", 100, 100, 15);
//WEAPONS
// let weapon1 = new Weapon("Wooden Stick", 1,2);
// let weapon2 = new Weapon("Wooden Sword", 4,5);
let enemies = [enemy1, enemy2, enemy3, enemy4];
let randomEnemy = enemy1;

//ON LOAD
shopScreen.onload = selectRandomEnemy();


//REFERENCED FUNCTIONS
function selectRandomEnemy(){
    console.log ("selectRandomEnemy()");
    let randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
}
function visible(x) {
    x.setAttribute("visible", x);
    x.classList.remove("invisible");
}
function invisible(x) {
    x.classList.add("invisible");
    x.classList.remove("visible");
}
function damagePlayer(player, enemy) {
    console.log("function damagePlayer(player, enemy) started");
    invisible(battleButton);
    var x = checkAlive(enemy);
    if (x === true){
        let bar = playerHealthBar;
        let hp = playerHealth;
        let endHealth = player.health - enemy.damage;

        if (player.health > endHealth) {
            let x = setInterval(dealDamage, 50);
            function dealDamage() {
                if (player.health == endHealth) {
                    clearInterval(x);
                    visible(battleButton);
                } else {
                    let playerHealthPercentage = (player.health / player.maxHealth) * 100;
                    bar.style.width = playerHealthPercentage + "%";
                    player.health -= 1;
                    bar.style.width = bar.style.width - 1;
                    hp.innerHTML = "Health: " + player.health + "/" + player.maxHealth;
                    if (player.health < 1) {
                        invisible(playerHealthBar);
                        invisible(battleButton);
                        visible(returnButton);

                        let y = setTimeout(deadPlayer, 10);
                        function deadPlayer() {
                            alert(player.name + " has perished to " + enemy.name);
                        }
                        }
                    }
                }
            }
        } else {
            visible(returnButton);
        }
    console.log("function damagePlayer(player, enemy) ended");
}
function canBattleButtonBeShown(player, enemy) {
    console.log("function canBattleBeShown() started");
    if (enemy.health && player.health > 0) {
        visible(battleButton);
    }else {
        invisible(battleButton);
    }
}
function damageEnemy(player, enemy) {
    console.log("function damageEnemy(player, enemy) started");
    invisible(battleButton);
    let bar = enemyHealthBar;
    let hp = enemyHealth;
    let endHealth = enemy.health - player.damage;

    if (enemy.health > endHealth) {
        let x = setInterval(damageAnimation, 50);
        function damageAnimation() {
            if (enemy.health == endHealth) {
                clearInterval(x);
            } else {
                let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
                bar.style.width = enemyHealthPercentage + "%";
                enemy.health -= 1;
                bar.style.width = bar.style.width - 1;
                hp.innerHTML = "Health: " + enemy.health + "/" + enemy.maxHealth;
                if (enemy.health < 1) {
                    clearInterval(x);
                    invisible(enemyHealthBar);
                    invisible(battleButton);
                    visible(returnButton);

                    let y = setTimeout(deadEnemy, 10);
                    function deadEnemy() {
                        alert(player.name + " has defeated " + enemy.name);
                        visible(returnButton);
                    }
                }
            }
        }
    } else {
        
    }
    xpIncrement(player.damage);
    xpCheck();
}
function xpIncrement(amount){
    let x = setInterval(xpDisplay, 50)
    let endXP = player.xp + amount;
    function xpDisplay(){
        if (player.xp == endXP){
            clearInterval(x);
        } else {
            player.xp++;
            playerXP.innerHTML = "XP: " + player.xp;
        }
    }
}
function xpCheck(){
    if (player.xp >= 100){
        player.xp = "0";
        player.level += 1;
    } else {

    }
}
function displayStats(player, enemy) {
    //UPDATE PLAYER STATS
    playerHeader.innerHTML = player.name + ":";
    playerHealth.innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    let playerHealthPercentage = (player.health / player.maxHealth) * 100;
    playerHealthBar.style.width = playerHealthPercentage + "%";
    playerDamage.innerHTML = "Damage: " + player.damage;
    playerXP.innerHTML = "XP: " + player.xp;
    playerLevel.innerHTML = "Level " + player.level;
    //UPDATE ENEMY STATS
    enemyHeader.innerHTML = enemy.name + ":";
    enemyHealth.innerHTML = "Health: " + enemy.health + "/" + enemy.maxHealth;
    //ENEMY HEALTHBAR
    let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    enemyHealthBar.style.width = enemyHealthPercentage + "%";
    visible(enemyHealthBar);
    enemyDamage.innerHTML = "Damage: " + enemy.damage;
}
function returnShop() {
    visible(shopScreen);
}
function refresh(player, enemy) {
    player.health = player.maxHealth;
    enemy.health = enemy.maxHealth;
    displayStats(player, enemy);
}
function checkAlive(x){
    if (x.health > 0) {
       return true;
    } else {
        return false;
    }
}
function openBattleScreen() {
    console.log("openBattleScreen()");
    refresh(player, randomEnemy);
    invisible(returnButton);
    invisible(shopScreen);
    visible(battleButton);
}
function playerAttack(player, enemy) {
    console.log("function playerAttack() started")
    damageEnemy(player, enemy);
    var x = checkAlive(enemy);
    if (x === true){
        var y = setTimeout(damagePlayer, 1500, player, randomEnemy);
        } else {
        visible(returnButton);
    }
    // xpIncrement(player.damage);
    // xpCheck();
    console.log("function playerAttack() started");
}

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

// function Weapon(name, damage,durability) {
    // this.name = name;
    // this.damage = damage;
    // this.durability = durability;
    // }
    
    //PLAYER
    let player = new Hero("John Doe", 100, 100, 25, 1, 0);
    
    //ENEMIES
    let enemy1 = new Enemy("Bandit", 100, 100, 5);
    let enemy2 = new Enemy("Skeleton", 100, 100, 5);
    let enemy3 = new Enemy("Tank", 150, 150, 20);
    let enemy4 = new Enemy("Mr Man Guy", 100, 100, 15);
    //WEAPONS
    // let weapon1 = new Weapon("Wooden Stick", 1,2);
    // let weapon2 = new Weapon("Wooden Sword", 4,5);
    let enemies = [enemy1, enemy2, enemy3, enemy4];
    

//LISTENERS
newBattleButton.addEventListener("click", battle);
returnButton.addEventListener("click", returnShop);



//REFERENCED FUNCTIONS
function visible(x){
    x.classList.add("visible");
    x.classList.remove("invisible");
}
function invisible(x){
    x.classList.add("invisible");
    x.classList.remove("visible");
}
function damagePlayer(player, enemy) {  
    console.log("function damagePlayer(player, enemy) started");
    battleButton.style.display = "none";
    let bar = playerHealthBar;
    let hp = playerHealth;
    let endHealth = player.health - enemy.damage;
    
    if (player.health > endHealth) {
        let x = setInterval(dealDamage, 50);
        function dealDamage() {
            if (player.health == endHealth) {
                clearInterval(x);
                // canBattleButtonBeShown();
            } else {
                let playerHealthPercentage = (player.health / player.maxHealth) * 100;
                bar.style.width = playerHealthPercentage + "%";
                player.health -= 1;
                bar.style.width = bar.style.width - 1;
                hp.innerHTML = "Health: " + player.health;
                if(player.health < 1){
                    document.getElementById("playerHealthBar").style.display = "none";
                    document.getElementById("battleButton").style.display = "none";
                    document.getElementById("returnButton").style.display = "block";
                    // displayStats(player, randomEnemy);

                    let y = setTimeout(deadPlayer, 10);
                    function deadPlayer() {
                    alert(player.name + " has perished to " + randomEnemy.name);
                    // canBattleButtonBeShown();
                    }
                }
            }
        }
    }
    console.log("function damagePlayer(player, enemy) ended");
}
// function canBattleButtonBeShown(enemy, player){
//     console.log("function canBattleBeShown() started");
//     if (enemy.health && player.health > 0){
//         visible(battleButton);
//     } else {
//         invisible(battleButton);
//     }
// }
function damageEnemy(player, enemy) {
    console.log("function damageEnemy(player, enemy) started");

    let bar = enemyHealthBar;
    let hp = enemyHealth;
    let endHealth = enemy.health - player.damage;
    
    if (enemy.health > endHealth) {
        let x = setInterval(damageAnimation, 50);
        function damageAnimation() {
            if (enemy.health == endHealth) {
                clearInterval(x);
                // canBattleButtonBeShown();
                if (enemy.health > 0){
                    // let z = setTimeout(damagePlayer(player, enemy),1000);
                }
            } else {
                let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
                bar.style.width = enemyHealthPercentage + "%";
                enemy.health -= 1;
                bar.style.width = bar.style.width - 1;
                hp.innerHTML = "Health: " + enemy.health;
                if(enemy.health < 1){
                    invisible(enemyHealthBar);
                    invisible(battleButton);
                    visible(returnButton);
                    // displayStats(player, randomEnemy);

                    let y = setTimeout(deadPlayer, 10);
                    function deadPlayer() {
                    alert(player.name + " has defeated " + enemy.name);
                    }
                }
            }
        }
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
    enemyHealth.innerHTML = "Health: " + enemy.health;
    //ENEMY HEALTHBAR
    let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    enemyHealthBar.style.width = enemyHealthPercentage + "%";
    enemyHealthBar.style.display = "block";
    enemyDamage.innerHTML = "Damage: " + enemy.damage;
}
function returnShop() {
    shopScreen.style.display = "block";
}
function refresh(player, enemy){
    player.health = player.maxHealth;
    enemy.health = enemy.maxHealth;
    displayStats(player, enemy);
}


//MAIN FUNCTION
function battle() {
    let randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    battleButton.addEventListener("click",launcher);
    function launcher(){
        damageEnemy(player, randomEnemy);
        if (randomEnemy.health > 0){
            damagePlayer(player, randomEnemy);
        }
    }
    refresh(player, randomEnemy);

    console.log("function battle() started");
    returnButton.style.display = "none";
    shopScreen.style.display = "none";
    battleButton.style.display = "block";
    invisible(returnButton);
    invisible(shopScreen);
    visible(battleButton);

    // displayStats(player, randomEnemy);
    
    
    
    
    
    
    console.log("function battle() ended");
};




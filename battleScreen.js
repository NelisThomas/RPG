function Enemy(name, health, maxHealth, damage, imageLocation, goldDropped) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.imageLocation = imageLocation;
    this.goldDropped = goldDropped;
}

// 
function Hero(name, health, maxHealth, damage, level, xp, imageLocation, money) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.level = level;
    this.xp = xp;
    this.imageLocation = imageLocation;
    this.money = money;
    // this.armed = armed;
    // this.weapon = weapon;
}
//VALUE TWEAKING
let stats = {
    //rnd = value between 0 and 1

    //PLAYER:
    pHPMinToChasePlayer: 30, //Enemy chases player if health is lower than <== OR
    turnsTilFlee: 2, //Turns to pass until the player can flee again, counting starts at 0
    pRndMissChance: 0.15, //Chance that player misses

    //ENEMY:
    rndEnemyGetsAway: 0.2, //Chance enemy gets away after fleeing
    rndMinToChasePlayer: 0.4, // rnd is lower than <==
    eHPToFlee: 65, //Enemy flees if HP is lower than <== AND
    rndToFlee: 0.2, // rnd is lower than <==
    eRndMissChance: 0.2 //Chance that enemy misses
};
//PLAYER
let player = new Hero(
    sessionStorage.getItem("userName"), //Name
    100, //Health
    100, //MaxHealth
    20, //Dmg
    1, //Level
    0, //XP
    sessionStorage.getItem("gender"), //Img Location - value defined in index.js
    30); //Money


//ENEMIES
let enemy1 = new Enemy("Zombie Dude", 100, 100, 12, "assets/images/zombies/male/", 15);
let enemy2 = new Enemy("Zombie Lady", 100, 100, 11, "assets/images/zombies/female/", 15);
let enemy3 = new Enemy("Knight", 125, 125, 13, "assets/images/knight/png/", 30);

let enemies = [enemy1, enemy2, enemy3];
let randomEnemy;

//ENEMY REFERENCES
var enemyHealthBar = document.getElementById("enemyHealthBar");
var enemyHealth = document.getElementById("enemyHealth");
var enemySprite = document.getElementById("enemySprite");
//PLAYER REFERENCES
var playerHealthBar = document.getElementById("playerHealthBar");
var playerHealth = document.getElementById("playerHealth");
var playerXP = document.getElementById("playerXP");
var playerLevel = document.getElementById("playerLevel");
var playerName = document.getElementById("playerName");
var playerDamage = document.getElementById("playerDamage");
var playerMoney = document.getElementById("playerMoney");
var playerSprite = document.getElementById("playerSprite");
// EVENT LOG
var eventLog = document.getElementById("eventTextContainer");
//OTHER REFERENCES 
var attackButton = document.getElementById("attackButton");
var shopButton = document.getElementById("shopButton");
var specialButton = document.getElementById("specialEventButton");
//VARIABLES

//IMAGE ARRAYS
let attackArray = [
    "Attack1.png",
    "Attack2.png",
    "Attack3.png",
    "Attack4.png",
    "Attack5.png",
    "Attack6.png",
    "Attack7.png",
    "Attack8.png"];
let deadArray = [
    "Dead1.png",
    "Dead2.png",
    "Dead3.png",
    "Dead4.png",
    "Dead5.png",
    "Dead6.png",
    "Dead7.png",
    "Dead8.png",
    "Dead9.png",
    "Dead10.png"
];
let walkArray = [
    "Walk1.png",
    "Walk2.png",
    "Walk3.png",
    "Walk4.png",
    "Walk5.png",
    "Walk6.png",
    "Walk7.png",
    "Walk8.png",
    "Walk9.png",
    "Walk10.png",
]
// TEXT MSG ARRAYS
let encounterArray = [
"You've encountered a ", 
"You hear something... Its a ",
"You run into a "
]
let lowHPArray = [
    "That was close...",
    "You could use a health potion..."
]
let deadPlayerArray = [
    " has perished to a ",
    " has been defeated by a "
]
let deadEnemyArray = [
" has slain a ",
" defeated a ",
" killed a "
]
//LISTENERS
// newattackButton.addEventListener("click", openBattleScreen);
shopButton.addEventListener("click", returnShop);
attackButton.addEventListener("click", (event)=>damageEnemy(player, randomEnemy));
specialButton.addEventListener("click", playerFlee);

//REFERENCED FUNCTIONS
function calcDmg(playerOrEnemy){
    let x = Math.random();
    let baseDmg;
    if (x < 0.4){
        if(x< 0.2){
            baseDmg = (playerOrEnemy.damage - ( Math.floor(Math.random() * (5 - 1) ) + 1));
        } else {
        baseDmg = (playerOrEnemy.damage + ( Math.floor(Math.random() * (5 - 1) ) + 1));
        }
    } else {
        baseDmg = playerOrEnemy.damage;
    }
    endDmg = baseDmg + Math.floor(baseDmg * (player.level / 10));
    return endDmg;
}
function animateScroll(duration) {
    var start = document.getElementById("eventTextContainer").scrollTop;
    var end = document.getElementById("eventTextContainer").scrollHeight;
    var change = end - start;
    var increment = 3;
    function easeInOut(currentTime, start, change, duration) {
      // by Robert Penner
      currentTime /= duration / 2;
      if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
      }
      currentTime -= 1;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
    function animate(elapsedTime) {
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, start, change, duration);
      document.getElementById("eventTextContainer").scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(function() {
          animate(elapsedTime);
        }, increment)
      }
    }
    animate(0);
}
function logEvent(content){
    var p = document.createElement("P");
    var t = document.createTextNode(content);
    p.appendChild(t);
    document.getElementById("eventTextContainer").appendChild(p);
    animateScroll(500);
}
function logHighScore(){
    let entry = {Name: player.name, Level: player.level};
    localStorage.setItem('highScoreEntry', JSON.stringify(entry));
}
function getMoney(enemy){
    let x = Math.random();
    let gold = enemy.goldDropped * (1+(player.level/100));
    if (x<0.4){
        let cashToGet = Math.ceil(gold * 0.95);
        player.money += cashToGet;
        logEvent("You found " + cashToGet + " gold pieces.");
        displayStats(player, randomEnemy);
    } else {
        let cashToGet = Math.ceil(gold * 1.05);
        player.money += cashToGet;
        logEvent("You found " + cashToGet + " gold pieces.");
        displayStats(player, randomEnemy);
    }
}
function isntNull(x){
    if (x !== null){
        return true;
    } else {
        return false;
    }
}
function visible(x) {
    x.classList.add("visible");
    x.classList.remove("invisible");
}
function invisible(x) {
    x.classList.add("invisible");
    x.classList.remove("visible");
}
function displayStats(player, enemy) {
    //UPDATE PLAYER STATS
    playerName.innerHTML = player.name + ":";
    playerHealth.innerHTML = "<i class='fas fa-heart'></i> " + player.health + "/" + player.maxHealth;
    let playerHealthPercentage = (player.health / player.maxHealth) * 100;
    playerHealthBar.style.width = playerHealthPercentage + "%";
    visible(playerHealthBar);
    playerXP.innerHTML = "XP: " + player.xp;
    playerLevel.innerHTML = "Level: " + player.level;
    playerDamage.innerHTML = "Base Damage: " + player.damage;
    playerMoney.innerHTML = "<i class='fas fa-coins'></i>" + player.money;


    
    //UPDATE ENEMY STATS
    enemyName.innerHTML = enemy.name + ":";
    enemyHealth.innerHTML = "<i class='fas fa-heart'></i> " + enemy.health + "/" + enemy.maxHealth;

    //ENEMY HEALTHBAR=
    let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    enemyHealthBar.style.width = enemyHealthPercentage + "%";
    visible(enemyHealthBar);
    // enemyDamage.innerHTML = "Damage: " + enemy.damage;
}
function isInViewPort(element) {

    // Credit to StokeMasterJack for this function https://gist.github.com/davidtheclark/5515733

    const rect = element.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}
function selectRandomEnemy(){
    console.log ("selectRandomEnemy()");
    randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
}
function xpCheck(){
    if (player.xp >= 100){
        player.xp -= 100;
        player.level += 1;
        playerLevel.innerHTML = "Level: " + player.level;
        playerXP.innerHTML = "XP: " + player.xp;
        // player.health = (player.maxHealth *;
        player.damage += 1;
        enemies.forEach(enemy => {
            //ENEMIES GET STRONGER
            enemy.maxHealth += (enemy.maxHealth/100)*15;
            enemy.damage += 1;
            displayStats(player, randomEnemy);
        });
        console.log("lvl up");   
    }
}
function xpIncrement(amount){
    currentXP = player.xp;
    let x = setInterval(xpDisplay, 10)
    let endXP = parseInt(player.xp) + parseInt(amount);
    let xpToGive = amount; 
    function xpDisplay(){
        if (xpToGive == 0){
            player.xp = parseInt(player.xp) + parseInt(amount);
            playerXP.innerHTML = "XP: " + currentXP;
            clearInterval(x);
            xpCheck();
        } else {
            playerXP.innerHTML = "XP: " + currentXP;
            currentXP++;
            xpToGive -= 1;
        }
    }
    
    
}
function returnShop() {
    sessionStorage.setItem('playerObject', JSON.stringify(player));
    window.location.href = "shopScreen.html";
    console.log("returnShop")
}
function refresh(character) {
    // player.health = player.maxHealth;
    character.health = character.maxHealth;
    // displayStats(player, character);
}
function checkAlive(x){
    if (x.health > 0) {
       return true;
    } else {
        return false;
    }
}
//ANIMATIONS CALLED FUNCTIONS
function resetImg(xsprite, character){
    xsprite.src = character.imageLocation + "Idle1.png";
}
function lastFrame(array, xsprite, character){
    xsprite.src = character.imageLocation + array[array.length - 1];
}
//ANIMATIONS
function enemyMove(){
    console.log("enemyMove()");
    var pos = 0;
    var x = setInterval(y, 50);
    function y(){
        if (isInViewPort(enemySprite)){
            pos++;
            enemySprite.style.marginRight = pos + "%";
        } else {
            clearInterval(x);
            enemySprite.style.marginRight = 25 + "%";
            invisible(enemySprite);
        }
    }
}
function enemyMoveAway(){
    console.log("enemyMoveAway()");
    enemySprite.style.transform = "rotateY(0deg)";
    var pos = 0;
    var x = setInterval(y, 50);
    function y(){
        if (isInViewPort(enemySprite)){
            pos--;
            enemySprite.style.marginRight = pos + "%";
        } else {
            clearInterval(x);
            visible(shopButton);
        }
    }
}
function enemyLoop(array, enemy){
    console.log("enemyLoop()");
    var x = setInterval(y, 50);
    var i = 0;
    function y(){
        if (isInViewPort(enemySprite)){
            if (i < array.length){
                enemySprite.src = enemy.imageLocation + array[i];
                i++;
                if (i==array.length){
                    i=0;
                }
            }
        } else {
            clearInterval(x);
            if (checkAlive(player) === false){
                logHighScore();
                lastFrame(deadArray, playerSprite, player);
                alert(player.name + " has died to a " + randomEnemy.name +
                "\n You reached level " + player.level);
                window.location.href = "index.html";
                sessionStorage.clear();
            }
        }
    }
}
function playerMove(interval){
    console.log("playerMove()");
    var pos = 0;
    var x = setInterval(y, interval);
    function y(){
        if (isInViewPort(playerSprite)){
            pos++;
            playerSprite.style.marginLeft = pos + "%";
        } else {
            clearInterval(x);
            playerSprite.style.marginLeft = 25 + "%";
            invisible(playerSprite);
        }
    }
}
function playerMoveAway(){
    console.log("playerMoveAway()");
    var pos = 0;
    let x = setInterval(() => {
        if (isInViewPort(playerSprite)){
            pos--;
            playerSprite.style.marginLeft = pos + "%";
        } else {
            clearInterval(x);
            playerSprite.style.marginLeft = 25 + "%";
            invisible(playerSprite);
        }
    }, 50);
}
function playerLoop(array, player){
    console.log("playerLoop()");
    var x = setInterval(y, 50);
    var i = 0;
    function y(){
        if (isInViewPort(playerSprite)){
            if (i < array.length-1){
                i++;
                playerSprite.src = player.imageLocation + array[i];
            } else {
                i=0;
            }
        } else {
            clearInterval(x);
        }
    }
}
function enemyAnimation(array, enemy){
    var x = setInterval(y, 50);
    var i=0;
    function y(){
        if (i<array.length){
            enemySprite.src = enemy.imageLocation + array[i];
            i++;    
        } else {
            clearInterval(x);
            if (enemy.health < 1){
                lastFrame(deadArray, enemySprite, enemy);
            } else {
                resetImg(enemySprite, enemy);
            }
        }
    }
    resetImg(enemySprite, enemy);
}
function playerAnimation(array, player){
    var x = setInterval(y, 50);
    var i=0;
    function y(){
        if (i<array.length){
            playerSprite.src = player.imageLocation + array[i];
            i++;    
        } else {
            clearInterval(x);
            if (player.health < 1){
                lastFrame(deadArray, playerSprite, player);
            } else {
                resetImg(playerSprite, player);
            }
        }
    }
    resetImg(playerSprite, player);
}
function chaseEnemy(){
    console.log("chaseEnemy()");
    invisible(specialButton);
    specialButton.removeEventListener("click", chaseEnemy);
    playerMove(25);
    playerLoop(walkArray, player);
    let y = setInterval(checkVP, 5)
    function checkVP(){       //only run once playerSprite is out of view
        if (isInViewPort(playerSprite) === false){
            clearInterval(y);
            setTimeout(() => {
                let x = Math.random();
                if (x < stats.rndEnemyGetsAway){
                    //enemy got away
                    playerSprite.style = "";
                    enemySprite.style = "";
                    resetImg(playerSprite, player);
                    resetImg(enemySprite, randomEnemy);
                    visible(attackButton);
                    visible(playerSprite);
                    visible(enemySprite);
                    invisible(shopButton);
                    logEvent(`You caught up with ${randomEnemy.name}.`);
                } else {
                    //caught enemy
                    invisible(enemySprite);
                    logEvent("The enemy got away");
                }
            }, 50);
        }
    }
}
function enemyFlee(){
    console.log("enemyFlee()");
    enemyLoop(walkArray, randomEnemy);
    enemyMoveAway();
    logEvent(`${randomEnemy.name} has fled!`);
    specialButton.removeEventListener("click", playerFlee);
    specialButton.addEventListener("click",chaseEnemy);
    specialButton.innerHTML = "Chase!";
    visible(specialButton);
}
function continueBattle(){
    console.log("continueBattle")
    damagePlayer(player,randomEnemy);
    playerSprite.style = "";
    enemySprite.style = "";
    visible(playerSprite);
    visible(enemySprite);
    visible(attackButton);
}
var turnsSinceFlee = 0;
function playerFlee(){
    console.log("playerFlee()");
    turnsSinceFlee = 0;
    invisible(specialButton);
    invisible(attackButton);
    playerSprite.style.transform = "rotateY(180deg)";
    playerLoop(walkArray, player);
    playerMoveAway();
    logEvent(`${player.name} has fled!`);
    //Flee check
    let y = setInterval(() => {
        if (isInViewPort(playerSprite) === false){
            setTimeout(() => {
                playerSprite.style.transform = "rotateY(0deg)";
                playerSprite.src = `${player.imageLocation}Idle1.png`;
            }, 50);
            let x = Math.random();
            if (player.health < stats.pHPMinToChasePlayer || x < stats.rndMinToChasePlayer){
                clearInterval(y);
                //ENEMY CHASES PLAYER
                enemyMove(randomEnemy);
                logEvent(`${randomEnemy.name} is coming for you...`)
                enemyLoop(walkArray, randomEnemy);
                let z = setInterval(() => {
                    if(isInViewPort(enemySprite) === false){
                        clearInterval(z);
                        setTimeout(() => {
                            continueBattle();
                        }, 500);
                    }
                }, 50);
            } else {
                logEvent("You got away.");
                visible(shopButton);
            }
        }
    },50);
}
//CALLED FUNCTIONS THAT CALL OTHER FUNCTIONS WITHIN

function damageEnemy(player, enemy) {
    invisible(attackButton);
    if (turnsSinceFlee > stats.turnsTilFlee){
        visible(specialButton);
    }
    turnsSinceFlee++;
    let bar = enemyHealthBar;
    let hp = enemyHealth;
    let preHealth = enemy.health;
    let endHealth = enemy.health - calcDmg(player);
    setTimeout(() => {
        enemySprite.classList.add("flashAnimation");
    }, 250);

    let xy = Math.random();
    if (xy < stats.pRndMissChance){
        logEvent("You missed!");
        var x = setTimeout(() => {
            damagePlayer(player, enemy);
        }, 300);
    } else {
        playerAnimation(attackArray, player);
        let x = setInterval(damageAnimation, 25);
        function damageAnimation() {
            if (enemy.health == endHealth) {
                xpIncrement(5);
                enemySprite.classList.remove("flashAnimation");
                bar.style.backgroundColor = "rgb(237, 50, 50)";
                logEvent(player.name + " attacked " + randomEnemy.name + " for " + (preHealth - endHealth) + " damage.");
                clearInterval(x);
                if (enemy.health > 0){
                    var y = setTimeout(z, 500)
                    function z(){
                        damagePlayer(player, enemy);
                    }
                }
            } else {
                let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
                bar.style.width = enemyHealthPercentage + "%";
                enemy.health -= 1;
                bar.style.width = bar.style.width - 1;
                bar.style.backgroundColor = "rgb(237, 56, 56)";
                hp.innerHTML = "<i class='fas fa-heart'></i> " + enemy.health + "/" + enemy.maxHealth;
                if (enemy.health < 1) {
                    logEvent(player.name + deadEnemyArray[Math.floor(Math.random()*deadEnemyArray.length)] + randomEnemy.name + ".");
                    invisible(specialButton);
                    getMoney(randomEnemy);
                    invisible(enemyHealthBar);
                    invisible(attackButton);
                    visible(shopButton);
                    enemyAnimation(deadArray, randomEnemy);
                    playerLoop(walkArray, player);
                    playerMove(50);
                    xpIncrement(25);
                    if ((player.health/player.maxHealth)*100 < 25){
                        logEvent(lowHPArray[Math.floor(Math.random()*lowHPArray.length)]);
                    }
                    clearInterval(x);
                    
                    let y = setTimeout(deadEnemy, 10);
                    function deadEnemy() {
                        // alert(player.name + " has defeated " + enemy.name);
                        visible(shopButton);
                    }
                }
            }
        }
    }
}
function damagePlayer(player, enemy) {
    invisible(attackButton);
    if (checkAlive(enemy) === true){
        if (Math.random() < stats.eRndMissChance){
            enemyAnimation(attackArray, randomEnemy);
            logEvent(randomEnemy.name + " has missed!");
            visible(attackButton);
        } else if(randomEnemy.health < stats.eHPToFlee && Math.random() < stats.rndToFlee){
            enemyFlee();
        } else {
        enemyAnimation(attackArray, randomEnemy);
        let bar = playerHealthBar;
        let hp = playerHealth;
        let preHealth = player.health;
        let endHealth = player.health - calcDmg(randomEnemy);
        setTimeout(() => {
            playerSprite.classList.add("flashAnimation");
        }, 250);

        if (player.health > endHealth) {
            let x = setInterval(dealDamage, 50);
            function dealDamage() {
                if (player.health == endHealth) {
                    playerSprite.classList.remove("flashAnimation");
                    bar.style.backgroundColor = "rgb(237, 50, 50)";
                    visible(attackButton);
                    logEvent(randomEnemy.name + " attacked " + player.name + " for " + (preHealth - endHealth) + " damage.");
                    clearInterval(x);
                } else {
                    let playerHealthPercentage = (player.health / player.maxHealth) * 100;
                    bar.style.width = playerHealthPercentage + "%";
                    player.health -= 1;
                    bar.style.width = bar.style.width - 1;
                    bar.style.backgroundColor = "rgb(237, 56, 56)";
                    hp.innerHTML = "<i class='fas fa-heart'></i> " + player.health + "/" + player.maxHealth;
                    if (player.health < 1) {
                        clearInterval(x);
                        enemySprite.style.zIndex = 70;
                        invisible(playerHealthBar);
                        invisible(attackButton);
                        invisible(specialButton);
                        playerAnimation(deadArray, player);
                        logEvent(player.name + deadPlayerArray[Math.floor(Math.random()*deadPlayerArray.length)] + randomEnemy.name + ".");
                        if (isInViewPort(enemySprite)){
                            enemyLoop(walkArray, randomEnemy);
                            enemyMove(randomEnemy);
                        }                        
                    }
                }
            }
        }
    }
    } else {
        visible(shopButton);
    }
    enemySprite.src = enemy.imageLocation + "Idle1.png";
}
//MAIN FUNCTIONS 
function openBattleScreen() {
    console.log("openBattleScreen()");
    selectRandomEnemy();
    enemySprite.style.zIndex = 50;
    logEvent(encounterArray[Math.floor(Math.random()*encounterArray.length)] + randomEnemy.name + ".");
    // RESET HEALTH
    refresh(randomEnemy);
    // RESET ENEMY
    resetImg(enemySprite, randomEnemy);
    visible(enemySprite);
    // RESET PLAYER
    resetImg(playerSprite, player);
    visible(playerSprite);
    visible(attackButton);
    invisible(shopButton);
    if (isntNull(sessionStorage.getItem('playerObject'))){
        player = JSON.parse(sessionStorage.getItem('playerObject'));   
    }
    displayStats(player, randomEnemy);
}
window.onload = openBattleScreen;

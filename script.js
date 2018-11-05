function Enemy(name, health, maxHealth, damage, imageLocation) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.imageLocation = imageLocation;
}

// 
function Hero(name, health, maxHealth, damage, level, xp, imageLocation) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.level = level;
    this.xp = xp;
    this.imageLocation = imageLocation;
    // this.armed = armed;
    // this.weapon = weapon;
}
//PLAYER
let player = new Hero(localStorage.getItem("userName"), 100, 100, 30, 1, 0, localStorage.getItem("gender"));
// let hero1 = new Hero("John Doe", 100, 100, 50, 1, 0, "assets/images/ninja/");
// let hero2 = new Hero("John Doe", 100, 100, 50, 1, 0, "assets/images/ninja/");
// PLAYER ARRAYS


//ENEMIES
let enemy1 = new Enemy("Zombie Dude", 100, 100, 20, "assets/images/zombies/male/");
let enemy2 = new Enemy("Zombie Lady", 100, 100, 23, "assets/images/zombies/female/");
let enemy3 = new Enemy("Knight", 150, 150, 20, "assets/images/knight/png/");
//WEAPONS
// let weapon1 = new Weapon("Wooden Stick", 1,2);
// let weapon2 = new Weapon("Wooden Sword", 4,5);
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
var playerSprite = document.getElementById("playerSprite");
//OTHER REFERENCES 
var battleButton = document.getElementById("battleButton");
var returnButton = document.getElementById("returnButton");
// var shopScreen = document.getElementById("shopScreen");
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
//OTHER ARRAYS

//LISTENERS
// newBattleButton.addEventListener("click", openBattleScreen);
returnButton.addEventListener("click", returnShop);
battleButton.addEventListener("click", (event)=>playerAttack(player, randomEnemy));
playerName.addEventListener("click", (event)=>changeValue(player, name, "Enter your name", true ));









//REFERENCED FUNCTIONS
function isntNull(x){
    if (x !== null){
        return true;
    } else {
        return false;
    }
}
function visible(x) {
    x.setAttribute("visible", x);
    x.classList.remove("invisible");
}
function invisible(x) {
    x.classList.add("invisible");
    x.classList.remove("visible");
}
function displayStats(player, enemy) {
    //UPDATE PLAYER STATS
    playerName.innerHTML = player.name + ":";
    playerHealth.innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    let playerHealthPercentage = (player.health / player.maxHealth) * 100;
    playerHealthBar.style.width = playerHealthPercentage + "%";
    visible(playerHealthBar);
    // playerDamage.innerHTML = "Damage: " + player.damage;
    playerXP.innerHTML = "XP: " + player.xp;
    playerLevel.innerHTML = "Level " + player.level;
    //UPDATE ENEMY STATS
    enemyName.innerHTML = enemy.name + ":";
    enemyHealth.innerHTML = "Health: " + enemy.health + "/" + enemy.maxHealth;
    //ENEMY HEALTHBAR
    let enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    enemyHealthBar.style.width = enemyHealthPercentage + "%";
    visible(enemyHealthBar);
    // enemyDamage.innerHTML = "Damage: " + enemy.damage;
}
function isAnyPartOfElementInViewport(element) {

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
function changeValue(character, valueToChange, promptContent, isisNan){
    console.log("changeValue()")
    function y(){
        x = prompt(promptContent);
    }
    y();
    if (isNaN(x) == isisNan){
        console.log(isNaN(x) == isisNan);
        character.valueToChange = x;
        console.log(player.name);
        console.log(x);
        displayStats(player,randomEnemy);
    } else {
        if(x ==string){
            alert("Invalid value, please try again");
            y();
        }
        y();
    }
}
function selectRandomEnemy(){
    console.log ("selectRandomEnemy()");
    randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
}
function xpCheck(){
    console.log("xpCheck");
    if (player.xp >= 100){
        player.xp -= 100;
        player.level += 1;
        playerLevel.innerHTML = "Level: " + player.level;
        playerXP.innerHTML = "XP: " + player.xp;
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
    localStorage.setItem('playerObject', JSON.stringify(player));
    window.location.href = "shopScreen.html";
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
function enemyMove(enemy){
    console.log("enemyMove()");
    var pos = 0;
    var x = setInterval(y, 50);
    function y(){
        if (isAnyPartOfElementInViewport(enemySprite)){
            pos++;
            enemySprite.style.marginRight = pos + "%";
        } else {
            clearInterval(x);
            enemySprite.style.marginRight = 25 + "%";
            invisible(enemySprite);
        }
    }
}
function enemyLoop(array, enemy){
    console.log("enemyLoop()");
    var x = setInterval(y, 5);
    var i = 0;
    function y(){
        if (isAnyPartOfElementInViewport(enemySprite)){
            if (i <= array.length){
                i++;
                playerSprite.src = enemy.imageLocation + array[i];
            } else {
                i=0;
            }
        } else {
            clearInterval(x);
        }
    }
    enemyMove(enemy);
}
function playerMove(player){
    console.log("playerMove()");
    var pos = 0;
    var x = setInterval(y, 50);
    function y(){
        if (isAnyPartOfElementInViewport(playerSprite)){
            pos++;
            playerSprite.style.marginLeft = pos + "%";
        } else {
            clearInterval(x);
            playerSprite.style.marginLeft = 25 + "%";
            invisible(playerSprite);
        }
    }
}
function playerLoop(array, player){
    console.log("playerLoop()");
    playerMove(player);
    var x = setInterval(y, 50);
    var i = 0;
    function y(){
        if (isAnyPartOfElementInViewport(playerSprite)){
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
    console.log("playerAttackAnimation()");
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
//CALLED FUNCTIONS THAT CALL OTHER FUNCTIONS WITHIN

function damageEnemy(player, enemy) {
    console.log("function damageEnemy() started");
    invisible(battleButton);
    let bar = enemyHealthBar;
    let hp = enemyHealth;
    let endHealth = enemy.health - player.damage;
    playerAnimation(attackArray, player);

    
        let x = setInterval(damageAnimation, 25);
        function damageAnimation() {
            
                if (enemy.health == endHealth) {
                    clearInterval(x);
                    bar.style.backgroundColor = "rgb(237, 50, 50)";
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
                    hp.innerHTML = "Health: " + enemy.health + "/" + enemy.maxHealth;
                    if (enemy.health < 1) {
                        clearInterval(x);
                        invisible(enemyHealthBar);
                        invisible(battleButton);
                        visible(returnButton);
                        enemyAnimation(deadArray, randomEnemy);
                        playerLoop(walkArray, player);
                        xpIncrement(50);

                        let y = setTimeout(deadEnemy, 10);
                        function deadEnemy() {
                            // alert(player.name + " has defeated " + enemy.name);
                            visible(returnButton);
                        }
                    }
                }
        }

    xpIncrement(20);
}
function damagePlayer(player, enemy) {
    console.log("function damagePlayer() started");
    invisible(battleButton);
    var x = checkAlive(enemy);
    enemyAnimation(attackArray, randomEnemy);
    if (x === true){
        let bar = playerHealthBar;
        let hp = playerHealth;
        let endHealth = player.health - enemy.damage;

        if (player.health > endHealth) {
            let x = setInterval(dealDamage, 50);
            function dealDamage() {
                if (player.health == endHealth) {
                    clearInterval(x);
                    bar.style.backgroundColor = "rgb(237, 50, 50)";
                    visible(battleButton);
                } else {
                    let playerHealthPercentage = (player.health / player.maxHealth) * 100;
                    bar.style.width = playerHealthPercentage + "%";
                    player.health -= 1;
                    bar.style.width = bar.style.width - 1;
                    bar.style.backgroundColor = "rgb(237, 56, 56)";
                    hp.innerHTML = "Health: " + player.health + "/" + player.maxHealth;
                    if (player.health < 1) {
                        clearInterval(x);
                        enemyLoop(randomEnemy);
                        invisible(playerHealthBar);
                        invisible(battleButton);
                        // visible(returnButton);
                        playerAnimation(deadArray, player);
                        let hey = setInterval(aaa, 500)
                        var i=0;
                        function aaa(){
                            if (i<12){
                                enemyAnimation(walkArray, randomEnemy);
                                i++;
                            } else {
                                clearInterval(hey);
                                lastFrame(deadArray, playerSprite, player);
                                alert(player.name + " has died to a " + randomEnemy.name +
                                "\n You reached level " + player.level);
                                window.location.href = "index.html";
                                localStorage.clear();
                            }
                        
                        }
                    }
                }
            }
        }
    } else {
        visible(returnButton);
    }
    enemySprite.src = enemy.imageLocation + "Idle1.png";
    console.log("function damagePlayer(player, enemy) ended");
}
//MAIN FUNCTIONS 
function openBattleScreen() {
    console.log("openBattleScreen()");
    selectRandomEnemy();
    // RESET HEALTH
    refresh(randomEnemy);
    // RESET ENEMY
    resetImg(enemySprite, randomEnemy);
    visible(enemySprite);
    // RESET PLAYER
    resetImg(playerSprite, player);
    visible(playerSprite);
    invisible(returnButton);
    visible(battleButton);
    if (isntNull(localStorage.getItem('playerObject'))){
        console.log(JSON.parse(localStorage.getItem('playerObject')));
        player = JSON.parse(localStorage.getItem('playerObject'));   
    }
    displayStats(player, randomEnemy);
}
window.onload = openBattleScreen;
function playerAttack(player, enemy) {
    console.log("function playerAttack() started")
    damageEnemy(player, enemy);
    console.log("function playerAttack() ended");
}

//STATS
var playerStats = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    xp:0
};

var monsterStats = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    xp: 0
};
//SHOP BUTTON TO GO TO SHOP SCREEN
//document.getElementById("shopButton").addEventListener("click", openShopScreen());

function battle(monster) {

};

function displayStats() {
    //UPDATE PLAYER STATS
    document.getElementById("playerHealth").innerHTML = playerStats.health + "/" + playerStats.maxHealth;
    document.getElementById("playerDamage").innerHTML = playerStats.damage;
    document.getElementById("playerXP").innerHTML = playerStats.xp;
    document.getElementById("playerLevel").innerHTML = playerStats.level;
    //UPDATE ENEMY STATS
    document.getElementById("enemyHealth").innerHTML = monsterStats.health;
    document.getElementById("enemyDamage").innerHTML = monsterStats.damage;
};
displayStats();


    //document.getElementById = "damage".innerHTML(damage);
    //document.getElementById = "xp".innerHTML(xp);



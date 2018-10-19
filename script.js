//STATS
var player = {
    name: "Typical Hero Name",
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    xp:0
};

var enemy = {
    name: "Bandit",
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    xp: 0
};
//SHOP BUTTON TO GO TO SHOP SCREEN
//document.getElementById("shopButton").addEventListener("click", openShopScreen());
document.getElementById("battleButton").addEventListener("click", battle());


function battle() {
    //var myVar = setInterval(applyDamage, 3000);
    applyDamage();
    function applyDamage() {
            player.health = - enemy.health;
            enemy.health = - player.health;
        if (player.health < 1) {
            console.log("You're dead");
        } else if (enemy.health < 1){
            console.log("Enemy defeated");
        }

    };
    console.log(player.health);
    console.log(enemy.health);
};

function displayStats() {
    //UPDATE PLAYER STATS
    document.getElementById("playerHeader").innerHTML = player.name + ":";
    document.getElementById("playerHealth").innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    document.getElementById("playerDamage").innerHTML = "Damage: " + player.damage;
    document.getElementById("playerXP").innerHTML = "XP: " + player.xp;
    document.getElementById("playerLevel").innerHTML = "Level " + player.level;
    //UPDATE ENEMY STATS
    document.getElementById("enemyHeader").innerHTML = enemy.name + ":";
    document.getElementById("enemyHealth").innerHTML = "Health: " + enemy.health;
    document.getElementById("enemyDamage").innerHTML = "Damage: " + enemy.damage;
};
displayStats();


    //document.getElementById = "damage".innerHTML(damage);
    //document.getElementById = "xp".innerHTML(xp);



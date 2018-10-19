function Enemy(name, health, maxHealth, damage) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
}

function Hero(name, health, maxHealth, damage, level, xp) {
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.level = level;
    this.xp = xp;
}


var player = new Hero("John Doe", 100, 100, 12, 1, 0);
//ENEMIES
var enemy1 = new Enemy("Bandit", 75, 75, 8);
var enemy2 = new Enemy("Skeleton", 40, 40, 5);
var enemy3 = new Enemy("Tank", 150, 150, 5);
var enemy4 = new Enemy("Weak yet surprisingly strong guy", 10, 10, 99);

var enemies = [enemy1, enemy2, enemy3, enemy4];

document.getElementById("battleButton").addEventListener("click", attack);

var randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

function attack() {
    battle(player, randomEnemy);
}
function battle(player, enemy) {
    if (player.health > 0) {
        player.health -= enemy.damage;
        enemy.health -= player.damage;
        displayStats(player, randomEnemy);
        if (player.health < 1) {
            alert("You're dead");
        }
        if (enemy.health < 1) {
            player.xp += 25;
            displayStats(player, randomEnemy);
            document.getElementById("enemyHealth").innerHTML = "Health: " + 0;
            document.getElementById("enemyHealthBar").style.display = "none";
        }
    }

   
};

function xpCheck() {
    if (player.xp > 100) {
        var i = player.xp / 100;
        player.level += i;
    }
}

function displayStats(player, enemy) {
    //UPDATE PLAYER STATS
    document.getElementById("playerHeader").innerHTML = player.name + ":";
    document.getElementById("playerHealth").innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    document.getElementById("playerHealthBar").style.width = player.health + "%";
    document.getElementById("playerDamage").innerHTML = "Damage: " + player.damage;
    document.getElementById("playerXP").innerHTML = "XP: " + player.xp;
    document.getElementById("playerLevel").innerHTML = "Level " + player.level;
    //UPDATE ENEMY STATS
    document.getElementById("enemyHeader").innerHTML = enemy.name + ":";
    document.getElementById("enemyHealth").innerHTML = "Health: " + enemy.health;
    var enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    document.getElementById("enemyHealthBar").style.width = enemyHealthPercentage + "%";
    document.getElementById("enemyDamage").innerHTML = "Damage: " + enemy.damage;
};
displayStats(player, randomEnemy);
//maybe reference this function instead of having to copy past document.getEleblalablablabla

    //document.getElementById = "damage".innerHTML(damage);
    //document.getElementById = "xp".innerHTML(xp);



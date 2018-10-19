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
var bandit1 = new Enemy("Bandit", 75, 50, 5);
var bandit2 = new Enemy("Skeleton", 80, 20, 7);
var bandit3 = new Enemy("Bandit3", 75, 75, 10);
var bandit4 = new Enemy("Bandit4", 60, 50, 5);

var enemies = [bandit1, bandit2, bandit3, bandit4];
var randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

document.getElementById("battleButton").addEventListener("click", attack);


function attack() {
    battle(player, randomEnemy);
}
function battle(player, enemy) {
    
    if (player.health < 1) {
        alert("You're dead");
    }

    if (player.health > 0) {
        player.health -= enemy.damage;
        enemy.health -= player.damage;
        displayStats(player, randomEnemy);
        if (enemy.health < 1) {
            player.xp += 25;
            player.health = player.maxHealth;
            enemy.health = enemy.maxHealth;
            displayStats(player, randomEnemy);
        }
    }

   
};

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
    document.getElementById("enemyHealthBar").style.width = enemy.health + "%";
    document.getElementById("enemyDamage").innerHTML = "Damage: " + enemy.damage;
};
displayStats(player, randomEnemy);
//maybe reference this function instead of having to copy past document.getEleblalablablabla

    //document.getElementById = "damage".innerHTML(damage);
    //document.getElementById = "xp".innerHTML(xp);



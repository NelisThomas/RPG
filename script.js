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

// function Weapon(name, damage,durability) {
    // this.name = name;
    // this.damage = damage;
    // this.durability = durability;
// }




//LISTENERS
document.getElementById("newBattleButton").addEventListener("click", battle);
document.getElementById("returnButton").addEventListener("click", returnShop);

function battle() {
	//PLAYER
	var player = new Hero("John Doe", 100, 100, 10, 1, 0);
	//ENEMIES
	var enemy1 = new Enemy("Bandit", 100, 100, 11);
	var enemy2 = new Enemy("Skeleton", 40, 40, 5);
	var enemy3 = new Enemy("Tank", 150, 150, 5);
	var enemy4 = new Enemy("Mr Man Guy", 30, 30, 6);
	//WEAPONS
	// var weapon1 = new Weapon("Wooden Stick", 1,2);
	// var weapon2 = new Weapon("Wooden Sword", 4,5);
	var enemies = [enemy1, enemy2, enemy3, enemy4];

    document.getElementById("returnButton").style.display = "none";
    document.getElementById("battleButton").addEventListener("click", main); 
    document.getElementById("shopScreen").style.display = "none";

    var randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    displayStats(player, randomEnemy);
    xpCheck();

    function main() {
        attack(player, randomEnemy)
    }
    function attack (player, enemy) {
        if (enemy.health && player.health >= 0) {
            enemy.health -= player.damage;
            displayStats(player, randomEnemy);
            if (enemy.health < 1) {
                document.getElementById("enemyHealthBar").style.display = "none";
                document.getElementById("returnButton").style.display = "block";
                displayStats(player, randomEnemy);
                var x = setTimeout(deadEnemy, 10);
                function deadEnemy() {
                    alert( randomEnemy.name + " has been defeated!");
                }
            } else if (player.health < 1) {
                alert("U DEAD");
            } else {
                player.health -= enemy.damage;
                displayStats(player, randomEnemy);
            }
        }
        

    }

    

	function xpCheck() {
    if (player.xp >= 100) {
        player.level++;
        player.xp -= 100;
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
    var enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    document.getElementById("enemyHealthBar").style.width = enemyHealthPercentage + "%";
    document.getElementById("enemyHealthBar").style.display = "block";
    document.getElementById("enemyDamage").innerHTML = "Damage: " + enemy.damage;
};

function returnShop(){
    document.getElementById("shopScreen").style.display = "block";
};

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
    console.log("function battle() started");
	//PLAYER
	var player = new Hero("John Doe", 100, 100, 10, 1, 0);
	//ENEMIES
	var enemy1 = new Enemy("Bandit", 100, 100, 11);
	var enemy2 = new Enemy("Skeleton", 100, 100, 5);
	var enemy3 = new Enemy("Tank", 150, 150, 20);
	var enemy4 = new Enemy("Mr Man Guy", 100, 100, 10);
	//WEAPONS
	// var weapon1 = new Weapon("Wooden Stick", 1,2);
	// var weapon2 = new Weapon("Wooden Sword", 4,5);
	var enemies = [enemy1, enemy2, enemy3, enemy4];

    document.getElementById("returnButton").style.display = "none";
    document.getElementById("battleButton").addEventListener("click", main); 
    document.getElementById("shopScreen").style.display = "none";
    document.getElementById("battleButton").style.display = "block";

    var randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    displayStats(player, randomEnemy);
    
    // xpCheck();

    function main() {
        console.log("function main() started");
        var y = true;
        if (y = true){

        function attack (player, enemy) {
            console.log("function attack (player, enemy) started");
            // if (enemy.health && player.health >= 0) {
                function damageEnemy(player, enemy){
                    console.log("function damageEnemy(player, enemy) started");
                    var dmg = player.damage;
                    var bar = document.getElementById("enemyHealthBar");
                    var startHealth = enemy.health;
                    var endHealth = enemy.health - player.damage;
                    var x = setInterval(dmg, 500);
                    function dmg(){
                        while(enemy.health != endHealth){
                            if (enemy.health == endHealth){
                                clearInterval(x);
                            } else {
                                enemy.health -= 1;
                                bar.style.width = bar.style.width + 1;
                            }
                        }   
                        // for (i = 0; i < dmg; i++){
                        //  var x = setTimeout(subtractHealth, 1000);
                        //  function subtractHealth(){
                        //  enemy.health -= 1;
                        //  displayStats(player,randomEnemy);    
                        //  }
                     }
                     console.log("function damageEnemy(player, enemy) ended");
                    }
                    
                }
                // attack(player, randomEnemy);
                // console.log("attack(player, randomEnemy) called");
                displayStats(player, randomEnemy);
                
                var y = setTimeout(z, 800);
                    function z(){
                if (randomEnemy.health < 1) {
                    document.getElementById("enemyHealthBar").style.display = "none";
                    document.getElementById("battleButton").style.display = "none";
                    document.getElementById("returnButton").style.display = "block";
                    displayStats(player, randomEnemy);
                    
                    var x = setTimeout(deadEnemy, 10);
                    function deadEnemy() {
                        alert( randomEnemy.name + " has been defeated!");
                    }
                } else{
                        player.health -= randomEnemy.damage;
                    }
                    displayStats(player, randomEnemy);
                    
                    if (player.health < 1) {
                        document.getElementById("enemyHealthBar").style.display = "none";
                        document.getElementById("battleButton").style.display = "none";
                        document.getElementById("returnButton").style.display = "block";
                        displayStats(player, randomEnemy);
                        
                        var x = setTimeout(deadPlayer, 10);
                        function deadPlayer() {
                            alert(player.name + " has perished to a " + randomEnemy.name);
                        }
                    }
                }
        y = false;
    } else {
        return;
    }
    console.log("function main() ended");
}
console.log("function battle() ended")
};
    

	// function xpCheck() {
 //    if (player.xp >= 100) {
 //        player.level++;
 //        player.xp -= 100;
 //    }





function displayStats(player, enemy) {
    console.log("function displayStats(player, enemy) started");
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
    //ENEMY HEALTHBAR
    var enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    document.getElementById("enemyHealthBar").style.width = enemyHealthPercentage + "%";
    document.getElementById("enemyHealthBar").style.display = "block";
    document.getElementById("enemyDamage").innerHTML = "Damage: " + enemy.damage;
};

function returnShop(){
    document.getElementById("shopScreen").style.display = "block";
};

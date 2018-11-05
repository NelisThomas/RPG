
// VARIABLES
    let player = JSON.parse(localStorage.getItem('playerObject'));

// LISTENERS
var newBattleButton = document.getElementById("newBattleButton");
newBattleButton.addEventListener("click", goToBattle);

// SHOP BUTTONS
document.getElementById("buttonFullHP").addEventListener("click", fullHP);
document.getElementById("smallHPPotion").addEventListener("click", smallHPPotion);

function checkHealth(){
    if (player.health > player.maxHealth){
        player.health = player.maxHealth;
    }
}

// SHOP ITEMS
function smallHPPotion(){
    console.log("smallHPpre   " + player.health);
    player.health += Math.ceil(player.maxHealth / 5);
    checkHealth();
    console.log("smallHPpost   " + player.health);
}
function fullHP() {
    player.health = player.maxHealth;
    checkHealth();
}
function goToBattle(){
    localStorage.setItem('playerObject', JSON.stringify(player));
    window.location.href = "battleScreen.html";
}

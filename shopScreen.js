// SHOP ITEMS
function ShopItem(name, price){
    this.name = name;
    this.price = price;
}
let smallHealthPotion = new ShopItem("Small Health Potion",10);
let bigHealthPotion = new ShopItem("Big Health Potion", 30);
let incMaxHPPotion = new ShopItem("Increase Maximum HP", 25);
let incDamagePotion = new ShopItem("Increase Damage Potion", 15);
// VARIABLES
    let player = JSON.parse(sessionStorage.getItem('playerObject'));
    let healthBar = document.getElementById("healthDisplay");

// ARRAYS
    let noMoneyArray = [
    "'You haven't got enough gold for that.'",
    "'Come back when you have more gold.'"
]
    let afterPurchaseArray = [
        "'Thank you, come again!'",
        "'Good luck with that.'",
        "'Here you are.'",
        "'Another happy customer...'"
    ]
    let minorDamageArray = [
        "'You look a little scratched up.'",
        "'Looks like you had fun out there.'",
        "'Fight any monsters recently?'"
    ]
    let heavyDamageArray = [
        "'How are you still alive?'",
        "'How did you survive that?'",
    ]
    // LISTENERS
    var attackButton = document.getElementById("attackButton");
    attackButton.addEventListener("click", goToBattle);

// VARIABLE
    let smallHPPotionButton = document.getElementById("smallHPPotion");
    let bigHPPotionButton = document.getElementById("bigHPPotion");
    let incMaxHPButton = document.getElementById("incMaxHP");
    let incDamageButton = document.getElementById("incDamage");

// SHOP BUTTONS
    smallHPPotionButton.addEventListener("click", smallHPPotion);
    bigHPPotionButton.addEventListener("click", fullHP);
    incMaxHPButton.addEventListener("click", incMaxHP);
    incDamageButton.addEventListener("click", incDamage);


function scrollToBottom() {
    document.getElementById("eventTextContainer").scrollTop =
    document.getElementById("eventTextContainer").scrollHeight;
}
function logEvent(content){
    var p = document.createElement("P");
    var t = document.createTextNode(content);
    p.appendChild(t);
    document.getElementById("eventTextContainer").appendChild(p);
    scrollToBottom();
}
function checkHealth(){
    if (player.health > player.maxHealth){
        player.health = player.maxHealth;
    }
}
function checkMoney(cost){
    endGold = player.money - cost;
    if (endGold < 0){
        return false;
    } else {
        return true;
    }
}
function updatePlayerStats(){
    document.getElementById("playerDamage").innerHTML = "Damage: " + player.damage;
    document.getElementById("playerMoney").innerHTML = '<i class="fas fa-coins"></i>' + player.money;
}
function updateButtons(){
    smallHPPotionButton.innerHTML = smallHealthPotion.name + ": " + smallHealthPotion.price + " Gold";
    bigHPPotionButton.innerHTML = bigHealthPotion.name + ": " + bigHealthPotion.price + " Gold";
    incMaxHPButton.innerHTML = incMaxHPPotion.name + ": " + incMaxHPPotion.price + " Gold";
    incDamageButton.innerHTML = incDamagePotion.name + ": " + incDamagePotion.price + " Gold";

    attackButton.innerHTML = "Head to battle";
}
function updateHP(){
    let healthPercent = (player.health / player.maxHealth) * 100;
    healthbar.style.height = healthPercent + "%";
    healthbar.innerHTML = player.health + " / " + player.maxHealth ;
}
function updateAll(){
    updateButtons();
    checkHealth();
    updateHP();
    updatePlayerStats();
}
// SHOP ITEMS

function smallHPPotion(){
    if(checkMoney(smallHealthPotion.price)){
        player.health += Math.ceil(player.maxHealth / 5);
        player.money -= smallHealthPotion.price;
        updateAll();
        logEvent("You've purchased a " + smallHealthPotion.name + " for " + smallHealthPotion.price + " gold.")
        logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function fullHP() {
    if(checkMoney(bigHealthPotion.price)){
        player.health = player.maxHealth;
        player.money -= bigHealthPotion.price;
        updateAll();
        logEvent("You've purchased a " + bigHealthPotion.name + " for " + bigHealthPotion.price + " gold.")
        logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function incMaxHP(){
    if(checkMoney(incMaxHPPotion.price)){
        player.maxHealth += 25;
        player.money -= incMaxHPPotion.price;
        updateAll();
        logEvent("You've purchased a " + incMaxHPPotion.name + " for " + incMaxHPPotion.price + " gold.")
        logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function incDamage(){
    if(checkMoney(incMaxHPPotion.price)){
        player.damage += 1;
        player.money -= incDamagePotion.price;
        updateAll();
        logEvent("You've purchased a " + incDamagePotion.name + " for " + incDamagePotion.price + " gold.")
        logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function goToBattle(){
    sessionStorage.setItem('playerObject', JSON.stringify(player));
    window.location.href = "battleScreen.html";
}
function openShop(){
    updatePlayerStats();
    updateButtons();
    updateHP();
    let healthPercent = (player.health / player.maxHealth) * 100;
    if (healthPercent < 50){
        if(healthPercent < 20){
            logEvent(heavyDamageArray[Math.floor(Math.random()*heavyDamageArray.length)]);
        } else {
            logEvent(minorDamageArray[Math.floor(Math.random()*minorDamageArray.length)]);
        }
    }
    
   }
window.onload = openShop;

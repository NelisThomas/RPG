// SHOP ITEMS
function ShopItem(name, price){
    this.name = name;
    this.price = price;
}
let smallHealthPotion = new ShopItem("Small Health Potion", 5);
let bigHealthPotion = new ShopItem("Big Health Potion", 25);
let incMaxHPPotion = new ShopItem("Increase Maximum HP", 30);
let incDamagePotion = new ShopItem("Increase Damage Potion", 20);
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
    let genericGreetingArray = [
        "'Welcome to my shop, Hero.'",
        "'Greetings!'"
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
    document.getElementById("playerMoney").innerHTML = "<i class='fas fa-coins'></i>" + player.money;
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
    console.log("smallHPPotion()");
    if(checkMoney(smallHealthPotion.price)){
        if (player.health < player.maxHealth){
            player.health += Math.ceil(player.maxHealth / 5);
            player.money -= smallHealthPotion.price;
            smallHealthPotion.price += 1;
            updateAll();
            logEvent("You've purchased a " + smallHealthPotion.name + " for " + smallHealthPotion.price + " gold.")
            logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
        } else {
            logEvent("You are already at full health.");
        }
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function fullHP() {
    console.log("fullHP()");
    if(checkMoney(bigHealthPotion.price)){
        if (player.health < player.maxHealth){
            player.health = player.maxHealth;
            player.money -= bigHealthPotion.price;
            updateAll();
            logEvent("You've purchased a " + bigHealthPotion.name + " for " + bigHealthPotion.price + " gold.")
            logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
        } else {
            logEvent("You are already at full health.")
        }
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function incMaxHP(){
    console.log("incMaxHP()");
    if(checkMoney(incMaxHPPotion.price)){
        player.maxHealth += 25;
        player.money -= incMaxHPPotion.price;
        incMaxHPPotion.price = Math.ceil(incMaxHPPotion.price *1.1);
        updateAll();
        logEvent("You've purchased a " + incMaxHPPotion.name + " for " + incMaxHPPotion.price + " gold.")
        logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
let dmgInc = 2;
function incDamage(){
    console.log("incDamage()");
    if(checkMoney(incDamagePotion.price)){
        player.damage += dmgInc;
        player.money -= incDamagePotion.price;
        incDamagePotion.price += Math.ceil((incDamagePotion.price / 100)*25);
        updateAll();
        logEvent("You've purchased a " + incDamagePotion.name + " for " + incDamagePotion.price + " gold.")
        logEvent(afterPurchaseArray[Math.floor(Math.random()*afterPurchaseArray.length)]);
    } else {
        logEvent(noMoneyArray[Math.floor(Math.random()*noMoneyArray.length)]);
    }
}
function rememberPrices(){
    if (sessionStorage.getItem('smallHealthPotion') != null){
        smallHealthPotion = JSON.parse(sessionStorage.getItem('smallHealthPotion'));
    } else {
        smallHealthPotion = smallHealthPotion;
    }
    if (sessionStorage.getItem('bigHealthPotion') != null){
        bigHealthPotion = JSON.parse(sessionStorage.getItem('bigHealthPotion'));
    } else {
        bigHealthPotion = bigHealthPotion;
    }
    if (sessionStorage.getItem('incMaxHPPotion') != null){
        incMaxHPPotion = JSON.parse(sessionStorage.getItem('incMaxHPPotion'));
    } else {
        incMaxHPPotion = incMaxHPPotion;
    }
    if (sessionStorage.getItem('incDamagePotion') != null){
        incDamagePotion = JSON.parse(sessionStorage.getItem('incDamagePotion'));
    } else {
        incDamagePotion = incDamagePotion;
    }
}
function goToBattle(){
    sessionStorage.setItem('playerObject', JSON.stringify(player));
    sessionStorage.setItem('smallHealthPotion', JSON.stringify(smallHealthPotion));
    sessionStorage.setItem('bigHealthPotion', JSON.stringify(bigHealthPotion));
    sessionStorage.setItem('incMaxHPPotion', JSON.stringify(incMaxHPPotion));
    sessionStorage.setItem('incDamagePotion', JSON.stringify(incDamagePotion));
    window.location.href = "battleScreen.html";
}
function openShop(){
    rememberPrices();
    updatePlayerStats();
    updateButtons();
    updateHP();
    let healthPercent = (player.health / player.maxHealth) * 100;
    if (healthPercent < 35){
        if(healthPercent < 20){
            logEvent(heavyDamageArray[Math.floor(Math.random()*heavyDamageArray.length)]);
        } else {
            logEvent(minorDamageArray[Math.floor(Math.random()*minorDamageArray.length)]);
        }
    } else {
        logEvent(genericGreetingArray[Math.floor(Math.random()*genericGreetingArray.length)]);
    }
    
}
window.onload = openShop;

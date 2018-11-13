// ARRAYS
let climbArray = [
    "Climb_000.png",
    "Climb_001.png",
    "Climb_002.png",
    "Climb_003.png",
    "Climb_004.png",
    "Climb_005.png",
    "Climb_006.png",
    "Climb_007.png",
    "Climb_008.png",
    "Climb_009.png",
]
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

let highScoreArray = [];
let userName;


// LISTENERS
document.getElementById("maleButton").addEventListener("click", setGenderMale);
document.getElementById("femaleButton").addEventListener("click", setGenderFemale);

function animateScroll(duration) {
    var start = document.getElementById("scoreBoard").scrollTop;
    var end = document.getElementById("scoreBoard").scrollHeight;
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
        document.getElementById("scoreBoard").scrollTop = position;
        if (elapsedTime < duration) {
        setTimeout(function() {
            animate(elapsedTime);
        }, increment)
        }
    }
    animate(0);
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
function capitalise(){
    var y = userName.split("");
    if (y[0] !== y[0].toUpperCase()){
        y[0] = y[0].toUpperCase();
    }
    for (i=1; i<y.length;i++){
        if (y[i]===y[i].toUpperCase()){
            y[i] = y[i].toLowerCase();
        }
    }
    x = y.join("");
    userName = x;
}

function setGenderMale(){
    sessionStorage.clear();
    var x = document.getElementById("nameInput").value;
    if (/^[a-zA-Z]+$/.test(x)){
        userName = x;
        capitalise();
        sessionStorage.setItem("userName", userName);
        document.getElementById("maleButton").removeEventListener("click", setGenderMale); 
        sessionStorage.setItem("gender", "assets/images/ninja/");
        playerAnimation(deadArray, document.getElementById("femaleButton"), "assets/images/ninja/female/");
        playerLoop(climbArray, 
            document.getElementById("maleButton"),
            "assets/images/ninja//",
            moveUp);
    } else {
        alert("Invalid name, please try again");
    }
    
}
function setGenderFemale(){
    sessionStorage.clear();
    var x = document.getElementById("nameInput").value;
    if (/^[a-zA-Z]+$/.test(x)){
        userName = x;
        capitalise();
        sessionStorage.setItem("userName", userName);
        document.getElementById("femaleButton").removeEventListener("click", setGenderFemale); 
        sessionStorage.setItem("gender", "assets/images/ninja/female/");
        playerAnimation(deadArray, document.getElementById("maleButton"), "assets/images/ninja/");
        playerLoop(climbArray, 
            document.getElementById("femaleButton"),
            "assets/images/ninja/female/",
            moveUp);
    } else {
        alert("Invalid name, please try again");
    }
    
}
function playerLoop(array, button, imgLocation, direction){
    console.log("playerLoop()");
    direction(button);
    var x = setInterval(y, 50);
    var i = 0;
    function y(){
        if (isAnyPartOfElementInViewport(button)){
            if (i < array.length-1){
                i++;
                button.src = imgLocation + array[i];
            } else {
                i=0;
            }
        } else {
            clearInterval(x);
        }
    }
}
function moveUp(elemToMove){
    var pos = 0;
    var x = setInterval(y, 25);
    function y(){
        if (isAnyPartOfElementInViewport(elemToMove)){
            pos++;
            elemToMove.style.bottom = pos + "%";
        } else {
            clearInterval(x);
            window.location.href = "battleScreen.html";
        }
    }
}
function playerAnimation(array, button, imgLocation){
    var x = setInterval(y, 50);
    var i=0;
    function y(){
        if (i<array.length){
            button.src = imgLocation + array[i];
            i++;    
        } else {
            clearInterval(x);
        }
    }
}
// function submitHighScore(){
//     let newStringEntry = localStorage.getItem('highScoreEntry');
//     let entry = JSON.parse(newStringEntry);
//     console.log(entry);
//     highScoreArray.push(entry);
//     console.log(highScoreArray);
//     localStorage.setItem("ScoreBoard", JSON.stringify(highScoreArray));
//     animateScroll(500);
// }
// function startIndex(){
//     highScoreArray = localStorage.getItem("ScoreBoard", highScoreArray);
//     submitHighScore();
// }
// window.onload = startIndex;


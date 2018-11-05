document.getElementById("submitButton").addEventListener("click", (event)=> submitButton());
let userName;
function submitButton(){
    var x = document.getElementById("nameInput").value;
    console.log(x);
    if (/^[a-zA-Z]+$/.test(x)){
        userName = x;
        localStorage.setItem("userName", userName);
        window.location.href = "battleScreen.html";
    } else {
        alert("Invalid name, please try again");
    }
}

let maleButton = document.getElementById("maleButton");
let femaleButton = document.getElementById("femaleButton");

// maleButton.addEventListener("click", (event) => highlight(maleButton));
// femaleButton.addEventListener("click", (event) => highlight(femaleButton));
// function highlight(element){
//     element.classList.add("selected")
// }
maleButton.addEventListener("click", setGenderMale());
femaleButton.addEventListener("click", setGenderFemale());
function setGenderMale(){
    console.log("setGenderMale()");
    localStorage.setItem("gender", "assets/images/ninja/");
};
function setGenderFemale(){
    console.log("setGenderFemale()");
    localStorage.setItem("gender", "assets/images/ninja/female/");
};
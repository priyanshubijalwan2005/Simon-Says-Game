let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

//Step 1.Invoking game if key is pressed
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;
        
        levelUp();
        displayHighestScore();
    }
});

//Step 2. Starting levels
function levelUp(){
    userSeq = []; //resetting user sequence to null
    level++;
    h2.innerText = `Level ${level}`;

    // Update highest score if the current level is greater
    if (level > highestScore) {
        highestScore = level;
        displayHighestScore();
    }

    //random button choose
    let randIndx = Math.floor(Math.random() * 4); //choosig random index
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIndx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

//For flashing of button by game automatically
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

//When user presses the button
function btnPress(){
    let btn = this;
    //console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

//flashing when user presses the button
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

//Matching sequence
function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "darkseagreen";
        }, 250);
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

//Highest Score
function displayHighestScore() {
    let highestScoreElement = document.querySelector("#highest-score");
    if (!highestScoreElement) {  //this condition is made to avoid duplicacy i.e. duplicate highest score elements
        highestScoreElement = document.createElement("h3");
        highestScoreElement.id = "highest-score";
        document.body.appendChild(highestScoreElement);
    }
    highestScoreElement.innerText = `Highest Score: ${highestScore}`;
}
displayHighestScore();
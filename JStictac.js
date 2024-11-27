//set up components
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
//var scoreO = 0;
//var scoreX = 0;
let xscr = document.getElementById("xscr");

let oscr = document.getElementById("oscr");
//data
let scoreX = parseInt(localStorage.getItem('scoreX')) || 0;
let scoreO = parseInt(localStorage.getItem('scoreO')) || 0;
xscr.textContent = scoreX;
oscr.textContent = scoreO;
//reset
let res = document.querySelector(".resetScoreDiv .resetScore");
res.addEventListener("click",startPosition);
function startPosition(){
    scoreX=0;
    xscr.textContent = scoreX;
    scoreO=0;
    oscr.textContent = scoreO;
}
//main logic
boxes.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            if(turn==="X"){
                e.style.color="white"
            }else{
                e.style.color="yellow"
            }
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    })
})
//turn
function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}
//win
function cheakWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;
        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "yellow"
                boxes[winConditions[i][j]].style.color = "#000"
            }
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline"
            if(turn==="X"){
                scoreX+=1;
                xscr.textContent = scoreX;
                localStorage.setItem('scoreX', scoreX);  //modify local storage for scoreX
            }else{
                scoreO+=1;
                oscr.textContent = scoreO;
                localStorage.setItem('scoreO', scoreO); //modify local storage for scoreO
            }
            updateScores(); 
        }
    }
}
//draw
function cheakDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })
        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}
//play again
document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        //e.style.color = "#fff"
    })
})
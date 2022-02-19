let inputDir = {x:0, y: 0}; 
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
let food = {x:10, y:5}
let score=0;


function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
    for (let i = 1; i < sarr.length; i++) {
        if ( sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }
    }
    if (sarr[0].x <= 0 || sarr[0].x >=18 || sarr[0].y <= 0 || sarr[0].y >=18){
        return true;
    }
}

 function gameEngine(){
    //1. Update the Snake and Food
    if (isCollide(snakeArr)){
        inputDir={x:0, y:0};
        alert("Game Over");
        snakeArr = [
            {x:13, y:15}
        ];
        score = 0;
        sbox.innerHTML = "Score: " + score;
    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        let a = 2;
        let b =16;
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hsbox.innerHTML = "HiScore: " + hiscoreval;
        }
        sbox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        food = {x: Math.round(a+ (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    }
    // Moving the Snake
    for (let i = snakeArr.length -2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x+= inputDir.x;
    snakeArr[0].y+= inputDir.y;

    //Display the snake
     board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
     });

     //Display Food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart= food.y;
     foodElement.style.gridColumnStart= food.x;
     foodElement.classList.add('food');
     board.appendChild(foodElement);
 } 


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hsbox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1};
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
                                    
    }
});
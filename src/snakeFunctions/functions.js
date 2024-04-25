export function drawBoard(context,width,height){
    context.fillStyle = 'black';
    context.fillRect(0, 0,width,height);
}   


export function drawSnake(context,snake,cellSize){
    for (let i = 0; i < snake.length; i++){
        const snakePart = snake[i];
        context.fillStyle = 'cyan';
        context.fillRect(snakePart.x,snakePart.y, cellSize,cellSize)
    }
}

export function getRandomCords(width,height,cellSize,excludedCords){
    const maxX = Math.floor(width / cellSize);
    const maxY = Math.floor(height / cellSize);
    
    // const x = Math.floor(Math.random() * maxX) * cellSize;
    const x = Math.floor(Math.random() * (maxX - 1)) * cellSize + cellSize;
    const y = Math.floor(Math.random() * (maxY - 1)) * cellSize + cellSize;
    

    return { x, y };
}



export function drawFood(context,food,cellSize){
    context.fillStyle = "crimson";
    context.fillRect(food.x,food.y,cellSize,cellSize)
}


export function isSnakeStraight(snake){
    const head = snake[snake.length - 1];
    const tail = snake[0];
    

    for (let i = 1; i < snake.length - 1; i++) {
        if (snake[i].x !== head.x && snake[i].y !== head.y) {
            return false;
        }
    }

    return true;
};
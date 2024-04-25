import { getRandomCords, isSnakeStraight } from "../snakeFunctions/functions";


export default {

    initSnake: () => {
        return (dispatch,getState) => {
            dispatch({type:"INIT_SNAKE",payload:{data:[
                {x:getState().cellSize * 2, y:0},
                {x:getState().cellSize, y:0},
                {x:0, y:0},
                ]}})
        }
    },

    initBoard: (width,height) =>{
        return (dispatch,getState) => {
            dispatch({type:"INIT_BOARD",payload:{data:{width:width,height:height}}});
        }
    },

    initFood: (cords) => {
        return (dispatch,getState) => {
            dispatch({type:"INIT_FOOD",payload:{data:{x:cords.x,y:cords.y}}})
        }
    },

    plusScore: () => {
        return (dispatch,getState) => {
            dispatch({type:"PLUS_SCORE",payload:{data:getState().score + 1}})
        }
    },

    addBlock: () =>{
        return (dispatch,getState) => {
            let initSnake = getState().initSnake.map((item) => ({ ...item }));
            initSnake.unshift({x:initSnake[0].x,y:initSnake[0].y});
            dispatch({ type: "ADD_BLOCK", payload: { data: initSnake } });
            
        }
    },

    startGame: () => {
        return (dispatch,getState) => {
            dispatch({ type: "START_GAME"});
        }
    },

    setDirection: (key) => {
        return (dispatch,getState) => {
            dispatch({type: "SET_DIRECTION", payload: { data: key }});
        }
    },

    
    moveSnake: () =>{
        return (dispatch,getState) =>{
            let initSnake = getState().initSnake.map((item) => ({ ...item }));
            
            switch (getState().snakeDirection) {
                case 'ArrowLeft':
                    if (getState().snakePrevDirection !== "ArrowRight"){
                        if (initSnake[initSnake.length - 1].x == 0){
                            initSnake.push({ x: initSnake[initSnake.length - 1].x + 570, y: initSnake[initSnake.length - 1].y });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowLeft"}})
                            break;
                        }
                        else{
                            initSnake.push({ x: initSnake[initSnake.length - 1].x - getState().cellSize, y: initSnake[initSnake.length - 1].y });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowLeft"}})
                            break;
                        }
                    }
                    else{
                        initSnake.push({ x: initSnake[initSnake.length - 1].x + getState().cellSize, y: initSnake[initSnake.length - 1].y });
                        dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowRight"}})
                        break;
                    }
                case 'ArrowRight':
                    if (getState().snakePrevDirection !== "ArrowLeft"){
                        if (initSnake[initSnake.length - 1].x == 570){
                            initSnake.push({ x: initSnake[initSnake.length - 1].x - 570, y: initSnake[initSnake.length - 1].y });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowRight"}})
                            break;
                        }
                        else{
                            initSnake.push({ x: initSnake[initSnake.length - 1].x + getState().cellSize, y: initSnake[initSnake.length - 1].y });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowRight"}})
                            break;
                        }
                    }
                    else{
                        initSnake.push({ x: initSnake[initSnake.length - 1].x - getState().cellSize, y: initSnake[initSnake.length - 1].y });
                        dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowLeft"}})
                        break;
                    }
                case 'ArrowDown':
                    if (getState().snakePrevDirection !== "ArrowUp"){
                        if (initSnake[initSnake.length - 1].y == 570){
                            initSnake.push({ x: initSnake[initSnake.length - 1].x, y: initSnake[initSnake.length - 1].y - 570 });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowDown"}})
                            break;
                        }
                        else{
                            initSnake.push({ x: initSnake[initSnake.length - 1].x, y: initSnake[initSnake.length - 1].y + getState().cellSize });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowDown"}})
                            break;
                        }
                    }
                    else{
                        initSnake.push({ x: initSnake[initSnake.length - 1].x, y: initSnake[initSnake.length - 1].y - getState().cellSize });
                        dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowUp"}})
                        break;
                    }
                case 'ArrowUp':
                    if (getState().snakePrevDirection !== "ArrowDown"){
                        if (initSnake[initSnake.length - 1].y == 0){
                            initSnake.push({ x: initSnake[initSnake.length - 1].x, y: initSnake[initSnake.length - 1].y + 570 });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowUp"}})
                            break;
                        }
                        else{
                            initSnake.push({ x: initSnake[initSnake.length - 1].x, y: initSnake[initSnake.length - 1].y - getState().cellSize });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowUp"}})
                            break;
                        }
                    }
                    else{
                        initSnake.push({ x: initSnake[initSnake.length - 1].x, y: initSnake[initSnake.length - 1].y + getState().cellSize });
                        dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowDown"}})
                        break;
                    }
                default:
                    if (getState().snakePrevDirection !== "ArrowLeft"){
                        if (initSnake[initSnake.length - 1].x == 570){
                            initSnake.push({ x: initSnake[initSnake.length - 1].x - 570, y: initSnake[initSnake.length - 1].y });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowRight"}})
                            break;
                        }
                        else{
                            initSnake.push({ x: initSnake[initSnake.length - 1].x + getState().cellSize, y: initSnake[initSnake.length - 1].y });
                            dispatch({type:"CHANGE_DIRECTION",payload:{data:"ArrowRight"}})
                            break;
                        }
                    }
            }
    
            initSnake.shift();

            if (!isSnakeStraight(initSnake)) {
                for (let elem of initSnake){
                    if (elem.x == initSnake[initSnake.length -1].x && elem.y == initSnake[initSnake.length -1].y && elem !== initSnake[initSnake.length -1]){
                        dispatch({ type: "GAME_END"});
                    }
                }
            }
            
            if (isSnakeStraight(initSnake)){
                if (initSnake.length > 4){
                    for (let elem of initSnake){
                        if (elem.x == initSnake[initSnake.length -1].x && elem.y == initSnake[initSnake.length -1].y && elem !== initSnake[initSnake.length -1]){
                            dispatch({ type: "GAME_END"});
                        }
                    }
                }
            }
            
            
            dispatch({ type: "MOVE_SNAKE", payload: { data: initSnake } });
        }
    }
}
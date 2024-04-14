import React, { useEffect, useMemo, useState } from 'react';
import { drawBoard, drawFood, drawSnake, getRandomCords } from '../snakeFunctions/functions';
import reducer from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import actions from '../store/actions';


const Game = () => {
    const dispatch = useDispatch();

    const selector = useSelector(state => ({
        cellSize: state.cellSize,
        initSnake: state.initSnake,
        initBoard: state.initBoard,
        food: state.food,
        score: state.score,
        snakePrevDirection: state.snakePrevDirection,
        gameEnd: state.gameEnd,

    }),shallowEqual);
    
    useEffect(() =>{
        dispatch(actions.initSnake());
        dispatch(actions.initBoard(document.querySelector('#game-board').width,document.querySelector('#game-board').height));

    },[])

    useEffect(() => {
        if (Object.keys(selector.initBoard).length != 0){
            dispatch(actions.initFood(getRandomCords(selector.initBoard.width,selector.initBoard.height,selector.cellSize)));
        }
    },[selector.initBoard])

    useEffect(() => {
        if (selector.initSnake.length > 0){
            let context = document.querySelector('#game-board').getContext('2d');
            let width = document.querySelector('#game-board').width;
            let height = document.querySelector('#game-board').height;
            drawBoard(context,width,height);
            let snake = JSON.parse(JSON.stringify(selector.initSnake));
            drawSnake(context,snake,selector.cellSize);
        
            if (selector.food.x != 0 && selector.food.y != 0){
                let context = document.querySelector('#game-board').getContext('2d');
                drawFood(context,selector.food,selector.cellSize);
                if (selector.initSnake[selector.initSnake.length -1].x == selector.food.x && selector.initSnake[selector.initSnake.length -1].y == selector.food.y){
                    dispatch(actions.plusScore());
                    dispatch(actions.addBlock());
                    dispatch(actions.initFood(getRandomCords(selector.initBoard.width,selector.initBoard.height,selector.cellSize)));
                }

            }
        }
    },[selector.initSnake,selector.initBoard,selector.food])

    useEffect(() => {
        if (!selector.gameEnd){
            document.addEventListener('keydown', (e) =>{
                dispatch(actions.setDirection(e.key));
            });
            
            let intervalId = setInterval(() => dispatch(actions.moveSnake()), 200);
            
            return () =>{
                clearTimeout(intervalId);
            }
        }
    }, [selector.gameEnd])    


    

    function restartFunc(){
        dispatch(actions.initSnake());
        dispatch(actions.initFood(getRandomCords(selector.initBoard.width,selector.initBoard.height,selector.cellSize)));
        dispatch(actions.startGame());

    }
    

    return (
        <div className='game'>
            <canvas id='game-board' className='game-board' width={600} height={600}>
            </canvas>
            {selector.gameEnd && (
                <div className='game-end'>Игра окончена</div>
            )}
            <div className='game-score'>{selector.score}</div>
            <button className='restart-btn' onClick={() => restartFunc()}>restart</button>
        </div>
    );
};

export default Game;
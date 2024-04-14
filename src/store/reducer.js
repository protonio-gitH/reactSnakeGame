export const initialState ={
    cellSize:30,
    score:0,
    initSnake:[],
    initBoard:{},
    food:{  
        x:0,
        y:0
    },
    snakePrevDirection:null,
    snakeDirection:null,
    gameEnd:false
    
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case "INIT_SNAKE":
            return {...state,initSnake:action.payload.data};
        
        case "INIT_BOARD":
            return {...state,initBoard:action.payload.data};

        case "INIT_FOOD":
            return {...state,food:action.payload.data};

        case "MOVE_SNAKE":
            return {...state, initSnake: action.payload.data};

        case "PLUS_SCORE":
            return {...state, score: action.payload.data};
        
        case "ADD_BLOCK":
            return {...state, initSnake: action.payload.data};
        
        case "CHANGE_DIRECTION":
            return {...state, snakePrevDirection: action.payload.data};
        
        case "GAME_END":
            return {...state, gameEnd:true}
        
        case "START_GAME":
            return {...state, gameEnd: false,snakePrevDirection: null, snakeDirection:null,score: 0};
        
        case "SET_DIRECTION":
            return {...state, snakeDirection: action.payload.data};


  
      default:
        return state;
    }
  
}


export default reducer;

/**
 * State mashine (конечная машина)
 */
export const GAME_STATES = {
    SETTINGS: "settings",
    IN_PROGRESS: "in_progress",
    WIN: "win",
    LOSE: "lose"
}

export const MOVING_DIRECTIONS = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
}



export const dataUser = {
    gridSize: {
        size3: { 
            x: 3, 
            y: 3
        }, 
        size4: { 
            x: 4, 
            y: 4
        }, 
        size6: { 
            x: 6, 
            y: 6
        }, 
        size8: { 
            x: 8, 
            y: 8
        }, 
    },
    pointsToWin: {
        win5: 5, 
        win10: 10, 
        win15: 15 
    },
    pointsToLose: {
        lose3: 3, 
        lose5: 5, 
        lose10: 10, 
        lose15: 15
    },    
}

/**
 * управление с клавиатуры или голосом
 */
export const SELECT_MANAGEMENT = {
    KEYBOARD: "keyboard",
    VOICE: "voice",
};


const _data = {
    gameState: GAME_STATES.SETTINGS,
    settings: {
        gridSize: {
            x: 3,
            y: 3
        },
        pointsToWin: 5,
        pointsToLose: 3,
        googleJumpInterval: 1000
    },
    catch: {
        player1: 0,
        player2: 0
    },
    miss: 0,
    time: new Date(),
    heroes: {
        google: {
            x: 0,
            y: 0
        },
        player1: {x: 1, y: 1},
        player2: {x: 2, y: 2}
    }
}

/* экспорт через функцию не всех данных, а той части данных которая необходима
мы в дату на прямую не лезем, пользователи взаимодействуют с данными через
прослойку геттеров и сеттеров */


let _observer = () => {};

/* function changeGoogleCoords() {
    let randomObject = _getRandomInt(_data.settings.gridSize.x - 1);
 
    _data.heroes.google.x = randomObject.x;
    _data.heroes.google.y = randomObject.y;

    console.log(_data.heroes.google.x);
    console.log(_data.heroes.google.y);
} */

//генерация новых координат гугла 
function _changeGoogleCoords() {
    //реализована логика чтобы гугл не прыгал туда где находятся наши персонажи

    let newX = _data.heroes.google.x;
    let newY = _data.heroes.google.y;

    do {
        let randomObject = _getRandomInt(_data.settings.gridSize.x - 1);

        newX = randomObject.x;
        newY = randomObject.y;

        var newCoordsMatchWithPlayer1Coords = newX === _data.heroes.player1.x && newY === _data.heroes.player1.y;
        var newCoordsMatchWithPlayer2Coords = newX === _data.heroes.player2.x && newY === _data.heroes.player2.y;

    } while ( newCoordsMatchWithPlayer1Coords || newCoordsMatchWithPlayer2Coords) //true

    _data.heroes.google.x = newX;
    _data.heroes.google.y = newY;


    console.log(_data.heroes.google.x);
    console.log(_data.heroes.google.y);
}


let previousPair = { x: null, y: null };

/**
 * 
 * @param max любое целое положительное число, от 0 (включая) до этого числа включая,
 * каждая новая пара чисел при генерации отличаласется от предыдущей
 * @returns 
 */
function _getRandomInt(max) {
    let x, y;

    do {
        x = Math.floor(Math.random() * (max + 1));
        y = Math.floor(Math.random() * (max + 1));
    } while (x === previousPair.x && y === previousPair.y);

    previousPair = { x: x, y: y };

    return { x: x, y: y };
} 

let jumpIntervalId;

//остановка интервала перед перезапуском
function _stopGoogleJump() {
    clearInterval(jumpIntervalId); 
}

function _runGoogleJump() {
    jumpIntervalId = setInterval(() => {
        _changeGoogleCoords(); // изменение координат
        _data.miss++;
        //состояние state mashine при проигрыше
        if(_data.miss === _data.settings.pointsToLose) {
            _stopGoogleJump();
            _data.gameState = GAME_STATES.LOSE;
        }
        _observer(); //когда поменял позицию вызываем гугл
    }, _data.settings.googleJumpInterval);    
}

/**
 * счетчик пойманных кликов по гуглу
 */
function _catchGoogle(playerNumber) {
    _stopGoogleJump();

    //защита от дурака на повторный клик (более кол-ва очков: pointsToWin)
    //при _data.catch ===pointsToWin будет остановка

 
    _data.catch[`player${playerNumber}`]++;

    if (_data.catch[`player${playerNumber}`] === _data.settings.pointsToWin) {
        _data.gameState = GAME_STATES.WIN;
    } else {
        _changeGoogleCoords()
        _runGoogleJump();
    }

    _observer(); //когда поменял позицию вызываем гугл
}

/**
 * Проверка на валидность координат, координаты не меньше нуля и меньше размера сетки
 */
function _checkIsCoordInValidRange(coords) {
    const xIsCorrect = coords.x >= 0 && coords.x < _data.settings.gridSize.x;
    const yIsCorrect = coords.y >= 0 && coords.y < _data.settings.gridSize.y;

    return xIsCorrect && yIsCorrect
}

/**
 * проверка на наличие в ячейке другога игрока
 */
function _coordsMatchWithOtherPlayer(coords) {
    const player1IsThisCell = coords.x === _data.heroes.player1.x && coords.y === _data.heroes.player1.y;
    const player2IsThisCell = coords.x === _data.heroes.player2.x && coords.y === _data.heroes.player2.y;


    return player1IsThisCell || player2IsThisCell
}

/**
 * проверка координат на совпадение с гуглом, если совпадает срабатывает catchgoogle
 */
function _coordsMatchWithGoogle(coords) {
    const googleIsInThisCell = coords.x === _data.heroes.google.x && coords.y === _data.heroes.google.y;
    
    return googleIsInThisCell;
}

//setter/muration/command
//сеттер - ввод данных пользователем с предварительной проверкой

export function addEventListener(subscriber) {
    _observer = subscriber;
}

export function setGridSize(selectGridSize){
    const x = dataUser.gridSize[selectGridSize.value].x;
    const y = dataUser.gridSize[selectGridSize.value].y;


    if (x < 1) throw new Error("incorrect X grid size settings");
    if (y < 1) throw new Error("incorrect Y grid size settings");
    _data.settings.gridSize.x = x;
    _data.settings.gridSize.y = y;
}

export function setPointsToWin(x){
    x = dataUser.pointsToWin[x.value];

    console.log(x);

    if (x < 1) throw new Error("incorrect X points to win settings");
    _data.settings.pointsToWin = x;
}

export function setMaxMisses(x){
    x = dataUser.pointsToLose[x.value];
    
    console.log(x);

    if (x < 1) throw new Error("incorrect X max misses settings");
    _data.settings.pointsToLose = x;
}

export function start() {
    //защита от старта уже запущенной игры
    if (_data.gameState !== GAME_STATES.SETTINGS) {
        throw new Error("Game cannot be started from state: " + _data.gameState);    
    }

    _data.gameState = GAME_STATES.IN_PROGRESS;
    _runGoogleJump();
    _observer();
}

//сброс настроек заданных при новой игре
export function playAgain() {
    _data.miss = 0;
    _data.catch.player1 = 0;
    _data.catch.player2 = 0;
    _data.settings.gridSize = dataUser.gridSize.size3;
    _data.settings.pointsToWin = dataUser.pointsToWin.win5;
    _data.settings.pointsToLose = dataUser.pointsToLose.lose3;

    _data.gameState = GAME_STATES.SETTINGS;
    _observer();
}





export function movePlayer(playerNumber, direction) {
    validatePlayerNumberOrThrow(playerNumber);

    //защита от нажатия при запущенной игре
    if (_data.gameState !== GAME_STATES.IN_PROGRESS) {
        return;
    }

    const newCoords = {..._data.heroes[`player${playerNumber}`]};
    
    switch(direction) {
        case MOVING_DIRECTIONS.LEFT: {
            newCoords.x--;
            break;
        } 
        case MOVING_DIRECTIONS.RIGHT: {
            newCoords.x++;
            break;
        }
        case MOVING_DIRECTIONS.UP: {
            newCoords.y--;
            break;
        } 
        case MOVING_DIRECTIONS.DOWN: {
            newCoords.y++;
            break;
        }
    }

    //Проверка на валидность, совпадение с другим игроком
    const isValid = _checkIsCoordInValidRange(newCoords);
    if (!isValid) return;

    const isMatchWithOtherPlayer = _coordsMatchWithOtherPlayer(newCoords)
    if (isMatchWithOtherPlayer) return;

    const isMatchWithGoogle = _coordsMatchWithGoogle(newCoords)
    if (isMatchWithGoogle) {
        _catchGoogle(playerNumber)
    };

    _data.heroes[`player${playerNumber}`] = newCoords;

    _observer();
}

//getter/selector/query/adapter

/**
 * 
 * @returns кол-во баллов, заработанных пользователем
 */
export function getCatchCount() {
    return _data.catch;
}
export function getMissCount() {
    return _data.miss;
}

//вместо передачи объекта, передавать копию
/* export function getGoogleCoords() {
    return _data.heroes.google;
}
 */

//создается новый объект и забираются все свойства у гугла
export function getGoogleCoords() {
    return {
        ..._data.heroes.google
    };
}

export function getPlayer1Coords() {
    return {
        ..._data.heroes.player1
    };
}

export function getPlayer2Coords() {
    return {
        ..._data.heroes.player2
    };
}

export function getGridSizeSettings() {
    return {
        ..._data.settings.gridSize
    };
}

export function getGameState() {
    return _data.gameState;
}

export function validatePlayerNumberOrThrow(playerNumber) {
    if (![1,2].some(number => number === playerNumber)) {
        throw new Error("incorrect player number");
    }
}

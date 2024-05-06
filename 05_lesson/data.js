
/**
 * State mashine (конечная машина)
 */
export const GAME_STATES = {
    SETTINGS: "settings",
    IN_PROGRESS: "in_progress",
    WIN: "win",
    LOSE: "lose"
}

export const dataUser = {
    gridSize: {
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

const _data = {
    gameState: GAME_STATES.SETTINGS,
    settings: {
        gridSize: {
            x: 4,
            y: 4
        },
        pointsToWin: 5,
        pointsToLose: 3
    },
    catch: 0,
    miss: 0,
    time: new Date(),
    heroes: {
        google: {
            x: 0,
            y: 0
        },
        player1: {},
        player2: {}
    }
}

/* экспорт через функцию не всех данных, а той части данных которая необходима
мы в дату на прямую не лезем, пользователи взаимодействуют с данными через
прослойку геттеров и сеттеров */


let observer = () => {};

function changeGoogleCoords() {
    let randomObject = createRandomInt(_data.settings.gridSize.x - 1);
 
    _data.heroes.google.x = randomObject.x;
    _data.heroes.google.y = randomObject.y;

    console.log(_data.heroes.google.x);
    console.log(_data.heroes.google.y);
}

/**
 * 
 * @param max любое целое положительное число, от 0 (включая) до этого числа включая,
 * каждая новая пара чисел при генерации отличаласется от предыдущей
 * @returns 
 */
let previousPair = { x: null, y: null };

function createRandomInt(max) {
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
function stopGoogleJump() {
    clearInterval(jumpIntervalId); 
}

function runGoogleJump() {
    jumpIntervalId = setInterval(() => {
        changeGoogleCoords(); // изменение координат
        _data.miss++;
        //состояние state mashine при проигрыше
        if(_data.miss === _data.settings.pointsToLose) {
            stopGoogleJump();
            _data.gameState = GAME_STATES.LOSE;
        }
        observer(); //когда поменял позицию вызываем гугл
    }, 1000);    
}

//setter/muration/command
//сеттер - ввод данных пользователем с предварительной проверкой

export function addEventListener(subscriber) {
    observer = subscriber;
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
    if (_data.gameState !== GAME_STATES.IN.SETTINGS) {
        throw new Error("Game cannot be started from state: " + _data.gameState);    
    }

    _data.gameState = GAME_STATES.IN_PROGRESS;
    runGoogleJump();
    observer();
}

//сброс настроек заданных при новой игре
export function playAgain() {
    _data.miss = 0;
    _data.catch = 0;
    _data.settings.gridSize = dataUser.gridSize.size4;
    _data.settings.pointsToWin = dataUser.pointsToWin.win5;
    _data.settings.pointsToLose = dataUser.pointsToLose.lose3;

    _data.gameState = GAME_STATES.SETTINGS;
    observer();
}

/**
 * счетчик пойманных кликов по гуглу
 */
export function catchGoogle() {
    stopGoogleJump();

    //защита от дурака на повторный клик (более кол-ва очков: pointsToWin)
    //при _data.catch ===pointsToWin будет остановка

    if (_data.catch === _data.settings.pointsToWin) {
        return;
    }

    _data.catch++;

    if (_data.catch === _data.settings.pointsToWin) {
        _data.gameState = GAME_STATES.WIN;
    } else {
        changeGoogleCoords()
        runGoogleJump();
    }

    observer(); //когда поменял позицию вызываем гугл
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
    }
}

export function getGridSizeSettings() {
    return {
        ..._data.settings.gridSize
    }
}

export function getGameState() {
    return _data.gameState;
}


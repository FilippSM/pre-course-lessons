const _data = {
    settings: {
        gridSize: {
            x: 4,
            y: 4
        }
    },
    catch: 0,
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
    _data.heroes.google.x = getRandomInt(_data.settings.gridSize.x - 1);
    _data.heroes.google.y = getRandomInt(_data.settings.gridSize.y - 1);
}

/**
 * 
 * @param max любое целое положительное число, от 0 (включая) до этого числа включая
 * @returns 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
} 

//setter/muration/command
//сеттер - ввод данных пользователем с предварительной проверкой

export function addEventListener(subscriber) {
    observer = subscriber;
}

export function setGridSize(x, y){
    if (x < 1) throw new Error("incorrect X grid size settings");
    if (y < 1) throw new Error("incorrect Y grid size settings");
    _data.settings.gridSize.x = x;
    _data.settings.gridSize.y = y;
}

export function start() {
    setInterval(() => {
        changeGoogleCoords(); // изменение координат
        observer(); //когда поменял позицию вызываем гугл
    }, 3000);
}

/**
 * счетчик пойманных кликов по гуглу
 */
export function catchGoogle() {
    _data.catch++;
    changeGoogleCoords()

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
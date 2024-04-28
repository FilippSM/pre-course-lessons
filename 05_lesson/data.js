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

//setter
export function addEventListener(subscriber) {
    observer = subscriber;
}

//сеттер - ввод данных пользователем с предварительной проверкой
export function setGridSize(x, y){
    if (x < 1) throw new Error("incorrect X grid size settings");
    if (y < 1) throw new Error("incorrect Y grid size settings");
    _data.settings.gridSize.x = x;
    _data.settings.gridSize.y = y;
}

export function start() {
    setInterval(changeGoogleCoords, 1000);
}

function changeGoogleCoords() {
    _data.heroes.google.x = Math.floor(Math.random() * (3 + 1));
    _data.heroes.google.y = Math.floor(Math.random() * (3 + 1));
    
    //когда поменял позицию вызываем гугл
    observer();
}


export function getCatchCount() {
    return _data.catch;
}

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
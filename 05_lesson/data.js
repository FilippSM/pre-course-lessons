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
            x: 1,
            y: 1
        },
        player1: {},
        player2: {}
    }
}

/* экспорт через функцию не всех данных, а той части данных которая необходима
мы в дату на прямую не лезем, пользователи взаимодействуют с данными через
прослойку геттеров и сеттеров */

//сеттер - ввод данных пользователем с предварительной проверкой
export function setGridSize(x, y){
    if (x < 1) throw new Error("incorrect X grid size settings");
    if (y < 1) throw new Error("incorrect Y grid size settings");
    _data.settings.gridSize.x = x;
    _data.settings.gridSize.y = y;
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
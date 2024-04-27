const _data = {
    catch: 0,
    time: new Date(),
    heroes: {
        google: {},
        player1: {},
        player2: {}
    }
}

/* экспорт через функцию не всех данных, а той части данных которая необходима
мы в дату на прямую не лезем, пользователи взаимодействуют с данными через
прослойку геттеров и сеттеров */

export function getCatchCount() {
    return _data.catch;
}

export function getGoogleCoords() {
    return _data.heroes.google;
}
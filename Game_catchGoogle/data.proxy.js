
/**
 * State mashine (конечная машина)
 */

export const EVENTS = {
    GOOGLE_JUMPED: 'GOOGLE_JUMPED',
    PLAYER1_MOVED: 'PLAYER1_MOVED',
    PLAYER2_MOVED: 'PLAYER2_MOVED',
    STATUS_CHANGED: 'STATUS_CHANGED',
    SCORES_CHANGED: 'SCORES_CHANGED',
    RESET_PLAYER_COORDS: 'RESET_PLAYER_COORDS',
}

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

/**
 * управление с клавиатуры или голосом
 */
export const SELECT_MANAGEMENT = {
    KEYBOARD: "keyboard",
    VOICE: "voice",
};

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


/* экспорт через функцию не всех данных, а той части данных которая необходима
мы в дату на прямую не лезем, пользователи взаимодействуют с данными через
прослойку геттеров и сеттеров */

let _subscribers = [];

function _notify(eventName) {
    _subscribers.forEach((s) => {
        try {
            const event = {name: eventName}
            s(event)
        } catch(error) {
            console.error(error);
        }
    })
}


const eventSource = new EventSource('http://localhost:3000/events');

let playerNumber = 0;

eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    if (data.name === "PLAYER_NUMBER_DETECTED") {
        playerNumber = data.payload
    }

    _notify(data.name)
    console.log(event.data);
});

//setter/muration/command
//сеттер - ввод данных пользователем с предварительной проверкой

//каждый раз когда подписываемся мы пушим в массив нового сабскрайбера
export function subscribe(subscriber) {
    _subscribers.push(subscriber);
}
export function unsubscribe(subscriber) {
    _subscribers = _subscribers.filter(s => s !== subscriber);
}

export function setGridSize(selectGridSize) {
    fetch("http://localhost:3000/setGridSize",
        {
            method: "put",
            body: JSON.stringify({ selectGridSize }),
            headers: {
                "content-type": "application/json"
            }
        });
}


export function setPointsToWin(x){
}

export function setMaxMisses(x){
    
}


export function start() {
    fetch("http://localhost:3000/start", {method: "put"});
}

//сброс настроек заданных при новой игре
export function playAgain() {
    fetch("http://localhost:3000/playAgain", {method: "put"});


}





export function movePlayer(playerNumber, direction) {
    fetch("http://localhost:3000/movePlayer",
        {
            method: "put",
            body: JSON.stringify({ playerNumber, direction }),
            headers: {
                "content-type": "application/json"
            }
        });
}

//getter/selector/query/adapter

/**
 * 
 * @returns кол-во баллов, заработанных пользователем
 */
export async function getCatchCount() {
    const promise = fetch("http://localhost:3000/getCatchCount");
    const response = await promise; //промежуточны шаг, для наглядности можно удалить
    const data = await response.json();
    return data;
}
export async function getMissCount() {
    const promise = fetch("http://localhost:3000/getMissCount");
    const response = await promise;
    const data = await response.json();
    return data.value;
}

//вместо передачи объекта, передавать копию
/* export function getGoogleCoords() {
    return _data.heroes.google;
}
 */

//создается новый объект и забираются все свойства у гугла
export async function getGoogleCoords() {
    const promise = fetch("http://localhost:3000/getGoogleCoords");
    const response = await promise;
    const data = await response.json();
    return data;
}

export async function getPlayer1Coords() {
    const promise = fetch("http://localhost:3000/getPlayer1Coords");
    const response = await promise;
    const data = await response.json();
    return data;
}

export async function getPlayer2Coords() {
    const promise = fetch("http://localhost:3000/getPlayer2Coords");
    const response = await promise;
    const data = await response.json();
    return data;
}

export async function getGridSizeSettings() {
    const promise = fetch("http://localhost:3000/getGridSizeSettings");
    const response = await promise;
    const data = await response.json();
    return data;
}

//возврат объекта, (примитив обернутый в объект)
//чтобы получить притив добавляем  return data.value
export async function getGameState() {
    const promise = fetch("http://localhost:3000/getGameState");
    const response = await promise;
    const data = await response.json();
    return data.value;
}


export function validatePlayerNumberOrThrow(playerNumber) {
    if (![1,2].some(number => number === playerNumber)) {
        throw new Error("incorrect player number");
    }
}

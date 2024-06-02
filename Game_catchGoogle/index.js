import { Game } from "./components/Game/game.component.js";
import { EVENTS, subscribe, unsubscribe } from "./data.js";



//надо ререндериться всякий раз когда поменялись данные
export function rerender(e) {

    //условие чтобы перересоавки не было каждыйраз

    if (e.name === EVENTS.STATUS_CHANGED) {
        console.log("RERENDER");
        const rootElement = document.getElementById("root");

        rootElement.innerHTML = ""; //очистка перед append чтобы не наслаивалось приложение

        const game = Game();
        rootElement.append(game);
    }
}
rerender({name: EVENTS.STATUS_CHANGED})

//каждый раз когда что-то меняется происходит ререндер
subscribe(rerender);


const subscriber = (e) => {
    console.log(e);
}

subscribe(subscriber);



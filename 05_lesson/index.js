import { Game } from "./components/Game/game.component.js";
import { addEventListener } from "./data.js";



//надо ререндериться всякий раз когда поменялись данные
export function rerender() {
    const rootElement = document.getElementById("root");

    rootElement.innerHTML = ""; //очистка перед append чтобы не наслаивалось приложение

    const game = Game();
    rootElement.append(game);
    
}
rerender()


//каждый раз когда что-то меняется происходит ререндер
addEventListener(rerender);




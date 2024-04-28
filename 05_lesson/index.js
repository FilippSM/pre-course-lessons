import {GameGrid} from "./components/GameGrid/game-grid.component.js"
import {ResultPanel} from "./components/ResultPanel/result-panel.component.js"
import { addEventListener, start } from "./data.js";


//надо ререндериться всякий раз когда поменялись данные
export function rerender() {
    const rootElement = document.getElementById("root");

    rootElement.innerHTML = " "; //очистка перед append чтобы не наслаивалось приложение

    rootElement.append(ResultPanel(), GameGrid());

    
}
rerender()
start();

//каждый раз когда что-то меняется происходит ререндер
addEventListener(rerender);




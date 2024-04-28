import { GameGrid } from "./components/GameGrid/game-grid.component.js"
import { ResultPanel } from "./components/ResultPanel/result-panel.component.js"
import { Settings } from "./components/Settings/settings.component.js";
import { Win } from "./components/Win/win.component.js";
import { addEventListener, start, getGameState, GAME_STATES } from "./data.js";


//надо ререндериться всякий раз когда поменялись данные
export function rerender() {
    const rootElement = document.getElementById("root");

    rootElement.innerHTML = " "; //очистка перед append чтобы не наслаивалось приложение

    const gameState = getGameState();

    switch (gameState) {
        case GAME_STATES.IN_PROGRESS:
            rootElement.append(ResultPanel(), GameGrid());
            break;
        case GAME_STATES.SETTINGS:
            rootElement.append(Settings());
            break;
        case GAME_STATES.WIN:
            rootElement.append(Win());
            break;
        default: {
            throw new Error("Not supported state")
        }
    }
}
rerender()
start();

//каждый раз когда что-то меняется происходит ререндер
addEventListener(rerender);




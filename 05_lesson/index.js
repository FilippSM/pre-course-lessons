import {GameGrid} from "./components/GameGrid/game-grid.component.js"

const rootElement = document.getElementById("root");


const resultPanelElement = ResultPanel();
const gameGridElement = GameGrid();

rootElement.append(gameGridElement);
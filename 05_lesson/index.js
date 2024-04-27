import {GameGrid} from "./components/GameGrid/game-grid.component.js"
import {ResultPanel} from "./components/ResultPanel/result-panel.component.js"

const rootElement = document.getElementById("root");

rootElement.append(ResultPanel(), GameGrid());
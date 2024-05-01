import { start } from "../../data.js";

export function Settings() {
    const element = document.createElement("div");
    
    const startButton = document.createElement("button");
    startButton.append("Start");

    startButton.addEventListener("click", () => {
        start();    
    })

    element.append(startButton);

    const gridSizeSelect = document.createElement("select");
    gridSizeSelect.append("Grid Size");

    gridSizeSelect.addEventListener("click", () => {
        setGridSize(x, y)    
    })

    element.append(gridSizeSelect);

    const gridPointsToWinSelect = document.createElement("select");
    gridPointsToWinSelect.append("Grid Size");

    gridPointsToWinSelect.addEventListener("click", () => {
        gridSize();    
    })

    element.append(gridPointsToWinSelect);

    const gridMaxMissesSelect = document.createElement("select");
    gridMaxMissesSelect.append("Grid Size");

    gridMaxMissesSelect.addEventListener("click", () => {
        gridSize();    
    })

    element.append(gridMaxMissesSelect);

    

    return element;
}


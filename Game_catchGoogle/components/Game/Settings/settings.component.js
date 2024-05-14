import { dataUser, setGridSize, setMaxMisses, setPointsToWin, start } from "../../../data.js";

export function Settings() {
    const elementRoot = document.getElementById("root");
    const element = document.createElement("div");
    elementRoot.append(element);


    const startButton = document.createElement("button");
    startButton.append("Start");

    startButton.addEventListener("click", () => {
        start();
    })

    element.append(startButton);

    const gridSizeSelect = document.createElement("select");
    gridSizeSelect.id = 'gridSizeSelect'


    //перебор ассоциативного массива, размер сетки
    for (var key in dataUser.gridSize) {
        const option = document.createElement('option');
        option.value = key;
        option.text = `${dataUser.gridSize[key].x} x ${dataUser.gridSize[key].y}`;

        gridSizeSelect.append(option);
    };


    element.append(gridSizeSelect);
    const selectGridSize = document.querySelector("#gridSizeSelect");

    selectGridSize.addEventListener("change", () => {
        setGridSize(selectGridSize)
    })



    const gridPointsToWinSelect = document.createElement("select");
    gridPointsToWinSelect.id = "gridPointsToWinSelect";

    //перебор ассоциативного массива, pointstoWin
    for (var key in dataUser.pointsToWin) {
        const option = document.createElement('option');
        option.value = key;
        option.text = dataUser.pointsToWin[key];

        gridPointsToWinSelect.append(option);
    };

    element.append(gridPointsToWinSelect);
    const selectPointsToWin = document.querySelector("#gridPointsToWinSelect");

    selectPointsToWin.addEventListener("change", () => {
        setPointsToWin(selectPointsToWin);
    })

    const gridMaxMissesSelect = document.createElement("select");
    gridMaxMissesSelect.id = 'gridMaxMissesSelect'

    //перебор ассоциативного массива, pointstoWin
    for (var key in dataUser.pointsToLose) {
        const option = document.createElement('option');
        option.value = key;
        option.text = `${dataUser.pointsToLose[key]}`;

        gridMaxMissesSelect.append(option);
    };

    element.append(gridMaxMissesSelect);
    const selectMaxMisses = document.querySelector("#gridMaxMissesSelect");

    selectMaxMisses.addEventListener("change", () => {
        setMaxMisses(selectMaxMisses);
    })

    return element;
}


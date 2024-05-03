import { dataUser, setGridSize, start } from "../../data.js";

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


    let x;
    let y;

    //перебор ассоциативного массива
    for (var key in dataUser.gridSize) {
        const option = document.createElement('option');
        option.value = key;
        option.text = key;

        x = dataUser.gridSize[key].x
        y = dataUser.gridSize[key].y
        console.log(x);
        console.log(y); 
        gridSizeSelect.append(option);
    };


    element.append(gridSizeSelect);
    const selectGridSize = document.querySelector("select");
    console.log(selectGridSize.value);


   /*  gridSizeSelect.addEventListener("change", () => {
        setGridSize(x, y)    
    }) */

    element.append(gridSizeSelect);



    /*var selectPair = document.getElementById('pair');

     function getValuePair() {
        let a = (selectPair.value);
        console.log(a);
        return a;   
    };
    
    function calcViscosityPair(event) {
        let valuePair = getValuePair();
        let const100 = pairsVisc[valuePair][100];
        let const40 = pairsVisc[valuePair][40];
        return [const100, const40];
    };
    
    selectPair.addEventListener('change', calcViscosityPair) */

/*  

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

    element.append(gridMaxMissesSelect); */

    

    return element;
}


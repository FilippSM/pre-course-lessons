import { getGoogleCoords, getGridSizeSettings, getPlayer1Coords, getPlayer2Coords} from "../../../data.js";
import { Cell } from "./Cell/Cell.js";


export function GameGrid() {
    const gridElement = document.createElement("table");

    const gridSize = getGridSizeSettings();




    //gridSize.x = -100;
    /* мы так можем изменить _data через UI это неправильно
    чтобы такого не было примитивы возращать как есть,
    а объекты как копию */

    for (let y = 0; y < gridSize.y; y++) {
        const row = document.createElement("tr");

        for (let x = 0; x < gridSize.x; x++) {
            const cell = Cell(x, y);
            row.append(cell);
        }
        gridElement.append(row);
    }

    return gridElement;
}


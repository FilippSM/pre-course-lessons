import { getCatchCount, getMissCount } from "../../data.js";

export function ResultPanel() {
    const element = document.createElement("div");

    element.append(`Catch: ${getCatchCount()}, Miss: ${getMissCount()}`);

    return element;
}
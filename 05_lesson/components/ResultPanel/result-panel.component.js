import { getCatchCount } from "../../data.js";

export function ResultPanel() {
    const element = document.createElement("div");

    element.append("Catch: " + getCatchCount());

    return element;
}
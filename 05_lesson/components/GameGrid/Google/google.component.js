import { catchGoogle } from "../../../data.js";

export function Google() {
    const element = document.createElement("span");
    const img = document.createElement("img");
    img.src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png";

    element.append(img);

    element.addEventListener("click", catchGoogle)

    return element;
}
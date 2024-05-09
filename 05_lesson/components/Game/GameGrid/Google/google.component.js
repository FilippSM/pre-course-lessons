export function Google() {
    const element = document.createElement("span");
    const img = document.createElement("img");
    img.src="assets/images/google_icon.png";

    element.append(img);

    return element;
}
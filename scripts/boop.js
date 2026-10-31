// SQL boop count
const image = document.getElementById("boopImage");
const counter = document.getElementById("boopCount");
const endpoint = "php/counter.php";

async function updateCounter() {
    const response = await fetch(endpoint);
    const data = await response.json();

    counter.textContent = data.boops;
}

image.addEventListener("click", async () => {
    const response = await fetch(endpoint, {
        method: "POST"
    });

    const data = await response.json();
    counter.textContent = data.boops;
});

updateCounter();
setInterval(updateCounter, 1000);


// EventListener for grab cursor
const img = document.getElementById("boopImage");

img.addEventListener("mousedown", () => {
  img.style.cursor = "grabbing";
});

img.addEventListener("mouseup", () => {
  img.style.cursor = "grab";
});

img.addEventListener("mouseenter", () => {
  img.style.cursor = "grab";
});
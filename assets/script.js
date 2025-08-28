
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondesElement = document.getElementById("secondes");
const millisecondsElement = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");


//Variables generales du Chronomètre
let startTime, elapsedTime = 0, timer, isRunning = false, laps = [];

//fonction de mise à jour de l'affichage
function update() {
    const time = elapsedTime + (isRunning ? Date.now() - startTime : 0);
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor(time / 60000);
    const secondes = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    // Mettre à jour chaque chiffre individuellement
    document.getElementById("hrs-tens").textContent = String(Math.floor(hours / 10));
    document.getElementById("hrs-ones").textContent = String(hours % 10);
    document.getElementById("min-tens").textContent = String(Math.floor(minutes / 10));
    document.getElementById("min-ones").textContent = String(minutes % 10);
    document.getElementById("sec-tens").textContent = String(Math.floor(secondes / 10));
    document.getElementById("sec-ones").textContent = String(secondes % 10);
    document.getElementById("mil-tens").textContent = String(Math.floor(milliseconds / 10));
    document.getElementById("mil-ones").textContent = String(milliseconds % 10);
}

function start() {
    // Démarrer le chronomètre
    if (!isRunning) {
        startTime = Date.now();
        isRunning = true;
        timer = setInterval(update, 0.1);

        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;   
    }
}

function pause() {
    // mettre en pause le chronomètre
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        clearInterval(timer);

        startButton.disabled = false;
        pauseButton.disabled = true;    
    }
}

function reset() {
    // reset le chronomètre
    clearInterval(timer);
    startTime = elapsedTime = 0;
    isRunning = false;
    laps = [];
    update();
    document.getElementById("lap-times")?.remove();

    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function lap() {
    // Enregistrer la lap
    if (isRunning) {
        const time = elapsedTime + Date.now() - startTime;
        const hrs = String(Math.floor(time / 3600000)).padStart(2, "0");
        const min = String(Math.floor(time / 60000)).padStart(2, "0");
        const sec = String(Math.floor(time % 60000 / 1000)).padStart(2, "0");
        const mil = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
        laps.push(`${hrs}:${min}:${sec}:${mil}`);

        let list = document.getElementById("lap-times") || document.body.appendChild(Object.assign(document.createElement("ul"), {id: "lap-times"}));
        list.innerHTML = laps.map((lap, i) => `<li>Lap ${i + 1} | ${lap}</li>`).join("");
    }
}

// initialisation des événements
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start").onclick = start;
    document.getElementById("pause").onclick = pause;
    document.getElementById("reset").onclick = reset;
    document.getElementById("lap").onclick = lap;

    //etat initial des boutons
    pauseButton.disabled = true;
    lapButton.disabled = true;
});

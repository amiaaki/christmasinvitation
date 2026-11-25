const SWAP_CLICKS = 7;   // No button just swaps places with Yes this many times
const GIVE_UP_AT = 15;   // then it gives up and says goodbye
const GOODBYE_DELAY = 5000;

const pleas = ["No", "Are you sure?", "Really??", "I'm making snacks (Carbonara and Cinamomon Bites) :(", "Pretty please", "Come on!", "No"];

const main = document.querySelector("main");
const welcome = document.getElementById("welcome");
const question = document.getElementById("question");
const details = document.getElementById("details");
const choices = document.getElementById("choices");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const goodbye = document.getElementById("goodbye");

let noClicks = 0;
let goodbyeTimer;

document.getElementById("open-btn").addEventListener("click", () => {
    welcome.hidden = true;
    question.hidden = false;
    yesBtn.focus();
});

yesBtn.addEventListener("click", () => {
    question.hidden = true;
    details.hidden = false;
    document.getElementById("details-title").focus();
});

noBtn.addEventListener("click", () => {
    noClicks++;
    noBtn.textContent = pleas[Math.min(noClicks, pleas.length - 1)];

    if (noClicks >= GIVE_UP_AT) return sayGoodbye();
    if (noClicks <= SWAP_CLICKS) return choices.classList.toggle("swapped");
    dodge();
});

document.getElementById("undo-btn").addEventListener("click", () => {
    clearTimeout(goodbyeTimer);
    goodbye.hidden = true;
    main.inert = false;
    noClicks = 0;
    noBtn.textContent = pleas[0];
    noBtn.removeAttribute("style");
    choices.classList.remove("swapped");
    yesBtn.focus();
});

// jump to a random spot, but stay clear of the Yes button
function dodge() {
    choices.classList.remove("swapped"); // Yes goes back to the left for good
    const area = choices.getBoundingClientRect();
    const yes = yesBtn.getBoundingClientRect();
    const no = noBtn.getBoundingClientRect();

    const minLeft = yes.right - area.left + 10;
    const maxLeft = area.width - no.width;
    const maxTop = area.height - no.height;

    noBtn.style.right = "auto";
    noBtn.style.left = minLeft + Math.random() * Math.max(0, maxLeft - minLeft) + "px";
    noBtn.style.top = no.height / 2 + Math.random() * maxTop + "px";
}

function sayGoodbye() {
    main.inert = true;
    goodbye.hidden = false;
    goodbye.querySelector(".note").focus();
    goodbyeTimer = setTimeout(() => location.replace("about:blank"), GOODBYE_DELAY);
}

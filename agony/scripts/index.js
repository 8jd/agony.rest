// --- Global Variables ---
let transitionActive = false; // Flag to prevent multiple transitions at once
let current_page = "main";    // Tracks the current page displayed

// Get DOM elements once for efficiency
const song = document.getElementById("song");
const displayText = document.querySelector('.display-text');
const enterButton = document.getElementById("enter-container");
const memberButtons = document.getElementById("member-container");
const mainButtons = document.getElementById("main-container");
const randomGif = document.getElementById("random-gif");
const pfpImage = document.getElementById("pfp-image");

// --- Utility Functions ---

/**
 * Returns a random sentence for the display text.
 * @returns {string} A random HTML sentence string.
 */
function getRandomSentence() {
    const sentences = [
        "@ <a href='https://agony.rest' target='_blank' style='color: white;'>exile</a>, a collective"
    ];
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

const gifs = [
    "alakazam.gif", "arceus.gif", "articuno.gif", "charizard.gif", "darkrai.gif",
    "dialga.gif", "dragonite.gif", "entei.gif", "garchomp.gif", "gardevoir.gif",
    "genesect.gif", "gengar.gif", "giratina.gif", "groudon.gif", "ho-oh.gif",
    "kyogre.gif", "kyurem.gif", "lugia.gif", "mewtwo.gif", "moltres.gif",
    "palkia.gif", "raikou.gif", "rayquaza.gif", "reshiram.gif", "scizor.gif",
    "suicune.gif", "tyranitar.gif", "venusaur.gif", "zapdos.gif", "zekrom.gif"
];

/**
 * Sets a random GIF as the background and updates button hover colors.
 */
function setRandomGif() {
    if (!randomGif) return; // Ensure the element exists

    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomGifName = gifs[randomIndex];
    randomGif.src = `assets/${randomGifName}`;

    document.body.setAttribute("data-current-gif", randomGifName);
    updateButtonHoverColor();
}

/**
 * Updates the custom data attribute on buttons for hover effects based on the current GIF.
 */
function updateButtonHoverColor() {
    const currentGif = document.body.getAttribute("data-current-gif");
    const buttons = document.querySelectorAll(".buttons-container button");

    buttons.forEach(button => {
        button.setAttribute("data-gif", currentGif);
    });
}

// --- Page Transition Functions ---

/**
 * Initializes the home display text with a random sentence after a delay.
 */
function startHome() {
    if (transitionActive) return; // Prevent multiple calls while transitioning
    transitionActive = true;

    displayText.style.opacity = 0; // Fade out current text

    setTimeout(() => {
        displayText.innerHTML = getRandomSentence(); // Change content
        displayText.style.opacity = 1;              // Fade in new text
        transitionActive = false;                   // Allow new transitions
    }, 2000);
}

/**
 * Handles the initial page load animation, fading out the enter button
 * and fading in the main and member buttons, along with audio.
 */
function startPage() {
    // Fade out enter button
    enterButton.style.transition = "opacity 1s ease-in-out";
    enterButton.style.opacity = 0;

    setTimeout(() => {
        // After enter button fades out, make main/member buttons visible and fade them in
        memberButtons.style.display = "flex";
        mainButtons.style.display = "flex";

        requestAnimationFrame(() => { // Use rAF for immediate style application before transition
            memberButtons.style.transition = "opacity 1s ease-in-out";
            memberButtons.style.opacity = 1;
            mainButtons.style.transition = "opacity 1s ease-in-out";
            mainButtons.style.opacity = 1;
        });

        enterButton.style.display = "none"; // Hide enter button completely
    }, 1000); // Wait for enter button fade out

    // Audio Fade-in
    song.volume = 0;
    song.playbackRate = 0.85;
    song.play().catch(e => console.error("Audio play failed:", e)); // Add catch for Promise rejection

    const fadeInInterval = setInterval(() => {
        song.volume += 0.05; // Increase volume gradually
        if (song.volume >= 0.7) {
            song.volume = 0.7;
            clearInterval(fadeInInterval); // Stop when desired volume is reached
        }
    }, 150); // Adjust interval for smoother fade

    setTimeout(startHome, 2000); // Call startHome after main buttons appear
}

/**
 * Handles the display of member-specific content (PFP and text).
 * @param {string} pfpSrc - The source URL for the profile picture.
 * @param {string} textContent - The HTML content to display.
 * @param {string} user - The username to set in the document title.
 */
function memberCall(pfpSrc, textContent, user) {
    if (transitionActive) return;
    transitionActive = true;

    document.title = `#agony; ${user}`;
    displayText.innerHTML = textContent;
    pfpImage.src = pfpSrc;

    if (current_page !== "member") {
        current_page = "member";
        // Transition from GIF to PFP
        randomGif.style.opacity = 0; // Fade out GIF
        setTimeout(() => {
            randomGif.style.display = "none";
            pfpImage.style.display = "block";
            pfpImage.style.opacity = 1; // Fade in PFP
            transitionActive = false;
        }, 500); // Half second for GIF to fade out
    } else {
        // Already on member page, just update content/pfp
        pfpImage.style.opacity = 1; // Ensure PFP is visible if already shown
        transitionActive = false;
    }
}

/**
 * Updates the main display area with new HTML content and page title.
 * Handles transitions between member view (PFP) and main view (GIF).
 * @param {string} htmlContent - The HTML content to display.
 * @param {string} pageTitle - The title to set in the document.
 */
function updatePage(htmlContent, pageTitle) {
    if (transitionActive) return;
    transitionActive = true;

    document.title = `#agony; ${pageTitle}`;
    displayText.style.opacity = 0; // Fade out current text

    setTimeout(() => {
        displayText.innerHTML = htmlContent;

        if (current_page !== "main") {
            current_page = "main";
            // Transition from PFP to GIF
            pfpImage.style.opacity = 0; // Fade out PFP
            setTimeout(() => {
                pfpImage.style.display = "none";
                randomGif.style.display = "block";
                randomGif.style.opacity = 1; // Fade in GIF
                displayText.style.opacity = 1; // Fade in new text
                transitionActive = false;
            }, 500); // Half second for PFP to fade out
        } else {
            // Already on main page, just update text
            displayText.style.opacity = 1; // Fade in new text
            transitionActive = false;
        }
    }, 500); // Half second for text to fade out
}

// --- Member Specific Functions ---
function lain() {
    memberCall(
        "assets/lain_icon.png",
        "<a href='https://namemc.com/_2' target='_blank' style='color: white;'>namemc</a>, <a href='https://instagram.com/axst' target='_blank' style='color: white;'>instagram</a>, <a href='https://x.com/eternallyexile' target='_blank' style='color: white;'>x</a>",
        "lain"
    );
}

function cross() {
    memberCall(
        "assets/cross_icon.png",
        "<a href='https://instagram.com/rollupvamp' target='_blank' style='color: white;'>instagram</a>",
        "cross"
    );
}

// --- Core Button Functions ---
function about() {
    updatePage(
        "<a href='https://agony.rest' target='_blank' style='color: white;'>#agony</a> is a cyber collective with a primary focus on coding and various other digital endeavors.",
        "about"
    );
}

function site() {
    window.open("https://agony.rest", "_blank");
}

// --- Initialization ---
// Set an initial random GIF when the script loads
setRandomGif();

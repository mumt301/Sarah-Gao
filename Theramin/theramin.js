"use strict";

let urlParameters=(new URL(document.location)).searchParams;
if (urlParameters.has('oscillator')) {
    let oscillatorType=urlParameters.get('oscillator');
}

if (urlParameters.has('semitones')) {
    let semitonesType=parseInt(urlParameters.get('semitones'));
}
if (urlParameters.has('minfreq')) {
    let minfreqType=parseInt(urlParameters.get('minfreq'));
}
if (urlParameters.has('maxfreq')) {
    let minfreqType=parseInt(urlParameters.get('maxfreq'));
}

// Turn theremin on
function thereminOn(oscillator) {
    oscillator.play();

}
// Control the theremin
function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;

    oscillator2.frequency=interval(thereminFreq, semitones);
    oscillator2.frequency=oscillator(thereminFreq, 4);
    
}

// Turn theremin off
function thereminOff(oscillator) {
    oscillator.stop();
}

function runAfterLoadingPage() {
    // Instantiate a sine wave with pizzicato.js
    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: "sine",
            frequency: 220
        };

        function runAfterLoadingPage() {
            // Instantiate a sine wave with pizzicato.js
            const oscillator2 = new Pizzicato.Sound({
                source: 'wave',
                options: {
                    type: "sine",
                    frequency: 220
                }
    });

//Return note name
let notenames = {
    0: "C",
    1: "C#",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B"
}
function noteFromFrequency(frequency, withOctave=false) {
    const midinumber = midiFromFrequency(frequency);
    const pitchclass = midinumber % 12;
    let octave = (midinumber - pitchclass) / 12;
    let notename = notenames[pitchclass];
    if (withOctave) {
        octave--;
        notename += octave;
    }
    return notename;
}

//Return Frequency
function interval(frequency, semitones) {
    // Assuming equal temperament
    return frequency * Math.pow(2, semitones / 12);
}


    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator);
    });
}


window.onload = runAfterLoadingPage;
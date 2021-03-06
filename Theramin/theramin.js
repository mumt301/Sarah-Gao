"use strict";


// Turn theremin on
function thereminOn(oscillator, oscillator2) {
    oscillator.play(); oscillator2.play();

}
// Control the theremin (Had note2 in bottom bracket before as well)
function thereminControl(e, oscillator, oscillator2, theremin, semitonesType, minfreqType, maxfreqType, notename, freqrange) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let freqRange = maxfreqType - minfreqType;
    let thereminFreq = minfreqType + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight); 

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;

    oscillator2.frequency=interval(thereminFreq, semitonesType);
    notefrequency.innerHTML = "Note Frequency Oscillator 1 " + (thereminFreq);
    notename.innerHTML = "Note Name Oscillator 1 " + noteFromFrequency(thereminFreq);
    freqrange.innerHTML = "Frequency Range " + (freqRange);
    
}

// Turn theremin off
function thereminOff(oscillator, oscillator2) {
    oscillator.stop(); oscillator2.stop();
}

function runAfterLoadingPage() {
    // Instantiate a sine wave with pizzicato.js
    let urlParameters=(new URL(document.location)).searchParams;
    let oscillatorType="sine";
    if (urlParameters.has('oscillator')) {
       oscillatorType=urlParameters.get('oscillator');
    }
    let semitonesType=0;
    if (urlParameters.has('semitones')) {
        semitonesType=parseInt(urlParameters.get('semitones'));
    }
    let minfreqType=220;
    if (urlParameters.has('minfreq')) {
        minfreqType=parseInt(urlParameters.get('minfreq'));
    }
    let maxfreqType=440;
    if (urlParameters.has('maxfreq')) {
        maxfreqType=parseInt(urlParameters.get('maxfreq'));
    }
    const notename = document.getElementById("notename");

    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
            
        }

    });

    const oscillator2 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }         
       
    });

    // and notename info


   
    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");
    const note = document.getElementById("notefrequency");
    //const note2 = document.getElementById("notefrequency2");
    const freqrange = document.getElementById("freqrange");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator, oscillator2,);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, oscillator2, theremin, semitonesType, minfreqType, maxfreqType, notename, freqrange);

    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator, oscillator2);
    });
}

window.onload = runAfterLoadingPage;
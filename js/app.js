let isSpeaking = false;
let utterance = null;

function updateInnerHTML(id, value) {
    document.getElementById(id).innerHTML = value;
}

function updateValue(id, value) {
    document.getElementById(id).value = value;
}

function updateCounts() {
    let script = document.getElementById('script').value;
    if (script.trim() === '') {
        alert('Por favor, insira algum texto antes de calcular.');
        return;
    }

    let cleanedScript = script.replace(/.*\]:/g, '').trim().replace(/^\s+/gm, '');
    updateValue('script', cleanedScript);

    let wordsPerSecond = document.getElementById('wordsPerSecond').value;
    let wordCount = cleanedScript.split(' ').length;
    let charCount = cleanedScript.length;
    let videoTime = wordCount / wordsPerSecond;

    updateInnerHTML('wordCount', `<strong>${wordCount}</strong> palavras`);
    updateInnerHTML('charCount', `<strong>${charCount}</strong> caracteres`);
    updateInnerHTML('videoTime', `<strong>${videoTime.toFixed(2)}</strong> segundos`);
}

function resetCounts() {
    updateValue('script', '');
    updateInnerHTML('wordCount', '<strong>0</strong> palavras');
    updateInnerHTML('charCount', '<strong>0</strong> caracteres');
    updateInnerHTML('videoTime', '<strong>0</strong> segundos');
}

function toggleSpeech() {
    let script = document.getElementById('script').value;
    if (script.trim() === '') {
        alert('Por favor, insira algum texto antes de ouvir.');
        return;
    }

    let wordsPerSecond = parseFloat(document.getElementById('wordsPerSecond').value);
    let voices = window.speechSynthesis.getVoices();

    if (!isSpeaking) {
        utterance = new SpeechSynthesisUtterance(script);
        utterance.rate = wordsPerSecond;
        utterance.voice = voices[1];
        window.speechSynthesis.speak(utterance);
        updateInnerHTML('speak', '<i class="fa-solid fa-pause"></i> Pausar');
    } else {
        window.speechSynthesis.pause();
        updateInnerHTML('speak', '<i class="fa-solid fa-volume-high"></i> Ouvir');
    }

    isSpeaking = !isSpeaking;
}

document.getElementById('speak').addEventListener('click', toggleSpeech);
document.getElementById('count').addEventListener('click', updateCounts);
document.getElementById('reset').addEventListener('click', resetCounts);

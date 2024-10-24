/* script for audio recording in the poll section*/
// script.js
const recordButton = document.getElementById("recordBtn");
const questionInput = document.getElementById("questionInput");
const recordIcon = document.getElementById("recordIcon");

let isRecording = false;
let recognition;

if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
        isRecording = true;
        recordIcon.classList.remove("fa-microphone");
        recordIcon.classList.add("fa-stop");
    };

    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        questionInput.value = finalTranscript || interimTranscript;
    };

    recognition.onend = () => {
        isRecording = false;
        recordIcon.classList.remove("fa-stop");
        recordIcon.classList.add("fa-microphone");
    };

    recordButton.addEventListener("click", () => {
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
            questionInput.value = ""; // Clear the input when starting a new recording
        }
    });
} else {
    questionInput.value = "Web Speech API not supported in this browser.";
}
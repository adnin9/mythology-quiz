//npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

// data
var quizData = {
    greek: [
        { question: "Who is the king of the gods in Greek mythology?", options: ["Zeus", "Hades", "Poseidon", "Apollo"], correctAnswer: "Zeus" },
        { question: "Who is the goddess of wisdom in Greek mythology?", options: ["Artemis", "Athena", "Hera", "Demeter"], correctAnswer: "Athena" },
        { question: "Who is the god of the sea in Greek mythology?", options: ["Dionysus", "Hades", "Ares", "Poseidon"], correctAnswer: "Poseidon" },
        { question: "Who is the hero known for the Golden Fleece in Greek mythology?", options: ["Jason", "Heracles", "Perseus", "Theseus"], correctAnswer: "Jason" },
        { question: "Who is the goddess of love and beauty in Greek mythology?", options: ["Athena", "Artemis", "Aphrodite", "Hera"], correctAnswer: "Aphrodite" },
        { question: "Who is the god of war in Greek mythology?", options: ["Hermes", "Zeus", "Apollo", "Ares"], correctAnswer: "Ares" },
        { question: "Who is the titan who stole fire for humanity in Greek mythology?", options: ["Atlas", "Prometheus", "Cronus", "Epimetheus"], correctAnswer: "Prometheus" },
        { question: "Who is the goddess of the harvest in Greek mythology?", options: ["Hera", "Demeter", "Athena", "Persephone"], correctAnswer: "Demeter" },
        { question: "Who is the messenger god in Greek mythology?", options: ["Ares", "Apollo", "Dionysus", "Hermes"], correctAnswer: "Hermes" },
        { question: "Who is the queen of the underworld in Greek mythology?", options: ["Hera", "Persephone", "Demeter", "Artemis"], correctAnswer: "Persephone" }
    ],
    norse: [
        { question: "Who is the god of thunder in Norse mythology?", options: ["Odin", "Thor", "Loki", "Freyr"], correctAnswer: "Thor" },
        { question: "Who is the father of all in Norse mythology?", options: ["Frigg", "Odin", "Loki", "Ymir"], correctAnswer: "Ymir" },
        { question: "Who is the trickster god in Norse mythology?", options: ["Freyr", "Thor", "Loki", "Balder"], correctAnswer: "Loki" },
        { question: "Who is the guardian of Bifrost in Norse mythology?", options: ["Tyr", "Freyr", "Baldur", "Heimdall"], correctAnswer: "Heimdall" },
        { question: "Who is the goddess of the underworld in Norse mythology?", options: ["Skadi", "Frigg", "Hel", "Sif"], correctAnswer: "Hel" },
        { question: "Who is the god of poetry and wisdom in Norse mythology?", options: ["Odin", "Thor", "Freyr", "Bragi"], correctAnswer: "Bragi" },
        { question: "Who is the god of war in Norse mythology?", options: ["Odin", "Tyr", "Balder", "Thor"], correctAnswer: "Tyr" },
        { question: "Who is the world serpent in Norse mythology?", options: ["Jormungandr", "Fenrir", "Sleipnir", "Nidhogg"], correctAnswer: "Jormungandr" },
        { question: "Who is the queen of the Aesir in Norse mythology?", options: ["Hel", "Sif", "Frigg", "Skadi"], correctAnswer: "Frigg" },
        { question: "Who is the god associated with the sun in Norse mythology?", options: ["Sol", "Sif", "Freyr", "Balder"], correctAnswer: "Balder" }
    ],
    roman: [
        { question: "Who is the Roman equivalent of Zeus?", options: ["Mercury", "Mars", "Neptune", "Jupiter"], correctAnswer: "Jupiter" },
        { question: "Who is the goddess of love and beauty in Roman mythology?", options: ["Minerva", "Juno", "Venus", "Diana"], correctAnswer: "Venus" },
        { question: "Who is the god of war in Roman mythology?", options: ["Mars", "Jupiter", "Neptune", "Mercury"], correctAnswer: "Mars" },
        { question: "Who is the messenger god in Roman mythology?", options: ["Apollo", "Mercury", "Jupiter", "Mars"], correctAnswer: "Mercury" },
        { question: "Who is the queen of the gods in Roman mythology?", options: ["Diana", "Venus", "Minerva", "Juno"], correctAnswer: "Juno" },
        { question: "Who is the god of the sea in Roman mythology?", options: ["Neptune", "Jupiter", "Mars", "Apollo"], correctAnswer: "Neptune" },
        { question: "Who is the god of the underworld in Roman mythology?", options: ["Mars", "Jupiter", "Pluto", "Neptune"], correctAnswer: "Pluto" },
        { question: "Who is the goddess of wisdom in Roman mythology?", options: ["Juno", "Venus", "Minerva", "Diana"], correctAnswer: "Minerva" },
        { question: "Who is the god of fire in Roman mythology?", options: ["Mars", "Vulcan", "Jupiter", "Mercury"], correctAnswer: "Vulcan" },
        { question: "Who is the goddess of the hunt in Roman mythology?", options: ["Diana", "Venus", "Juno", "Minerva"], correctAnswer: "Diana" }
    ]
};

var currentQuestionIndex = 0;
var score = 0;
var selectedQuizCategory;

var mythOfDayContent = document.getElementById("myth-content");
var aboutContent = document.getElementById("about-content");
var contactContent = document.getElementById("contact-content");

function openNav() {
    document.getElementById("myNav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("menubut").style.display = "none";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
    mythOfDayContent.style.display = "none";
    aboutContent.style.display = "none";
    contactContent.style.display = "none";
    document.getElementById("menubut").style.display = "block";
}

function closeQuizModal() {
    document.getElementById("quiz-modal").style.display = "none";
    document.getElementById("main").style.display = "flex";
    score = 0;
}

function closeModalNav(){
    closeNav();
    closeQuizModal();
    closeResultsModal();
    document.getElementById("main").style.display= "flex";
}

function openQuizModal() {
    var quizSelect = document.getElementById("mythologySelect");
    selectedQuizCategory = quizSelect.value;

    // display first question
    currentQuestionIndex = 0;
    displayQuestion();

    // show quiz modal
    document.getElementById("quiz-modal").style.display = "flex";
    document.getElementById("main").style.display = "none";
}

function displayQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");
    var currentQuestion = quizData[selectedQuizCategory][currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = ""; // clear previous

    // show options in a list
    currentQuestion.options.forEach(function (option) {
        var optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", function () {
            checkAnswer(option);
        });
        optionsElement.appendChild(document.createElement("li").appendChild(optionButton));
    });
}

function checkAnswer(selectedOption) {
    var currentQuestion = quizData[selectedQuizCategory][currentQuestionIndex];

    if (selectedOption == currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData[selectedQuizCategory].length) {
        displayQuestion();
    } 
    else {
        showResult();
    }
}

function openResults(){
    document.getElementById("main").style.display = "none";
    document.getElementById("results-modal").style.display = "flex";
    document.getElementById("results-container").style.display = "flex";
}

function nextQuestion() {
    if (currentQuestionIndex < quizData[selectedQuizCategory].length) {
        displayQuestion();
    } 
    else {
        showResult();

    }
}

function showResult() {
    var resultsContainer = document.getElementById("results-container");

    resultsContainer.textContent = "Your score is " + score + "/10";

    closeQuizModal();
    openResults();
}

function closeResultsModal() {
    document.getElementById("results-modal").style.display = "none";
    document.getElementById("main").style.display = "flex";
}

document.getElementById('toggleSwitch').addEventListener('change', function () {
    document.querySelector('.navbar').classList.toggle('dark-theme', this.checked);
    document.querySelector('.menubut').classList.toggle('dark-theme', this.checked);
    document.querySelector('.starting').classList.toggle('dark-theme', this.checked);
    document.querySelector('select').classList.toggle('dark-theme', this.checked);
    document.querySelector('#quiz-container').classList.toggle('dark-theme', this.checked);
    document.querySelector('#question').classList.toggle('dark-theme', this.checked);
    document.querySelector('#options').classList.toggle('dark-theme', this.checked);
    document.querySelector('#results-container').classList.toggle('dark-theme', this.checked);
    document.querySelector('#myth-container').classList.toggle('dark-theme', this.checked);
    document.querySelector('#about-container').classList.toggle('dark-theme', this.checked);
    document.querySelector('#contact-container').classList.toggle('dark-theme', this.checked);
    document.querySelector('#titleA').classList.toggle('dark-theme', this.checked);
    document.querySelector('#textA').classList.toggle('dark-theme', this.checked);

});

function openMyth() {
    
    aboutContent.style.display = "none";
    contactContent.style.display = "none";

    if (mythOfDayContent.style.display == "none") {
        mythOfDayContent.style.display = "block";
    } 
    else {
        mythOfDayContent.style.display = "none";
    }

}

function openAbout() {

    mythOfDayContent.style.display = "none";
    contactContent.style.display = "none";

    if (aboutContent.style.display == "none") {
        aboutContent.style.display = "block";
    } 
    else {
        aboutContent.style.display = "none";
    }
}

function openContact() {

    aboutContent.style.display = "none";
    mythOfDayContent.style.display = "none";

    if (contactContent.style.display == "none") {
        contactContent.style.display = "block";
    } 
    else {
        contactContent.style.display = "none";
    }
}

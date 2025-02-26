const quizData = {
    beginner: [
        { question: "What is the capital of Nigeria?", options: ["Lagos", "Abuja", "Kano", "Port Harcourt"], answer: "b" },
        { question: "Who is the current president of Nigeria (as of 2023)?", options: ["Muhammadu Buhari", "Bola Tinubu", "Atiku Abubakar", "Peter Obi"], answer: "b" },
        { question: "Beginner Question 3", options: ["A", "B", "C", "D"], answer: "c" },
    ],
    intermediate: [
        { question: "Which Nigerian city is known as the 'Centre of Excellence'?", options: ["Lagos", "Abuja", "Ibadan", "Enugu"], answer: "a" },
        { question: "What year did Nigeria gain independence?", options: ["1960", "1963", "1970", "1957"], answer: "a" },
        { question: "Intermediate Question 3", options: ["A", "B", "C", "D"], answer: "c" },
    ],
    advanced: [
        { question: "Which Nigerian won the Nobel Prize in Literature?", options: ["Chinua Achebe", "Wole Soyinka", "Chimamanda Adichie", "Ben Okri"], answer: "b" },
        { question: "What is the name of Nigeria's central bank?", options: ["First Bank", "Central Bank of Nigeria", "Union Bank", "Zenith Bank"], answer: "b" },
        { question: "Advanced Question 3", options: ["A", "B", "C", "D"], answer: "c" },
    ]
};

let currentSection = '';
let currentQuestionIndex = 0;
let userAnswers = { beginner: [], intermediate: [], advanced: [] };
let userName = '';

document.getElementById('start-quiz').addEventListener('click', () => {
    userName = document.getElementById('name-input').value;
    if (userName) {
        document.getElementById('name-input-section').style.display = 'none';
        document.getElementById('section-selection').style.display = 'block';
    } else {
        alert('Please enter your name.');
    }
});

document.getElementById('beginner-btn').addEventListener('click', () => {
    currentSection = 'beginner';
    startQuiz();
});

document.getElementById('intermediate-btn').addEventListener('click', () => {
    currentSection = 'intermediate';
    startQuiz();
});

document.getElementById('advanced-btn').addEventListener('click', () => {
    currentSection = 'advanced';
    startQuiz();
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < quizData[currentSection].length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

document.getElementById('submit-btn').addEventListener('click', () => {
    showResults();
});

document.getElementById('choose-another-section').addEventListener('click', () => {
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('section-selection').style.display = 'block';
});

function startQuiz() {
    document.getElementById('section-selection').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    const questionData = quizData[currentSection][currentQuestionIndex];
    document.getElementById('section-title').innerText = currentSection.toUpperCase();
    document.getElementById('question').innerText = questionData.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.innerText = questionData.options[index];
        option.onclick = () => selectOption(option);
        // Reset button styles
        option.style.backgroundColor = '#f8f9fa';
        option.style.color = 'black';
    });

    // Highlight selected answer if already answered
    const selectedAnswer = userAnswers[currentSection][currentQuestionIndex];
    if (selectedAnswer) {
        const selectedOption = document.querySelector(`.option[data-option="${selectedAnswer}"]`);
        selectedOption.style.backgroundColor = '#007bff';
        selectedOption.style.color = 'white';
    }

    updateProgressBar();
    updateNavigationButtons();
}

function selectOption(option) {
    const selectedOption = option.getAttribute('data-option');
    userAnswers[currentSection][currentQuestionIndex] = selectedOption;
    option.style.backgroundColor = '#007bff';
    option.style.color = 'white';
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData[currentSection].length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = currentQuestionIndex === quizData[currentSection].length - 1;
    document.getElementById('submit-btn').style.display = currentQuestionIndex === quizData[currentSection].length - 1 ? 'inline-block' : 'none';
}

function showResults() {
    const score = calculateScore();
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('result-message').innerText = `Thank you, ${userName}, for completing the ${currentSection} section! Your score is ${score.correctAnswers} out of ${score.totalQuestions}.`;
}

function calculateScore() {
    const questions = quizData[currentSection];
    let correctAnswers = 0;

    questions.forEach((question, index) => {
        if (userAnswers[currentSection][index] === question.answer) {
            correctAnswers++;
        }
    });

    return {
        correctAnswers: correctAnswers,
        totalQuestions: questions.length
    };
}
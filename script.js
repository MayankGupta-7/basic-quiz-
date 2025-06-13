const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false }
    ]
  },
  {
    question: "Which tag is used for inserting a line break in HTML?",
    answers: [
      { text: "<br>", correct: true },
      { text: "<lb>", correct: false },
      { text: "<break>", correct: false }
    ]
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true }
    ]
  }
];

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, isCorrect) {
  const buttons = answerButtons.children;
  for (let b of buttons) {
    b.disabled = true;
  }

  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }

  Array.from(buttons).forEach(btn => {
    const correct = questions[currentQuestionIndex].answers.find(ans => ans.text === btn.innerText).correct;
    if (correct) btn.classList.add("correct");
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.innerText = `${score} / ${questions.length}`;
}

startQuiz();

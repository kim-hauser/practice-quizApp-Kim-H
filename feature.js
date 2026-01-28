// Quiz Questions:
const questions = [
  {
    question: "What color is Mia?",
    choices: ["Black", "Orange", "Gray", "Calico"],
    correctIndex: 2, // Gray
  },
  {
    question: "What kind of animal is Mia?",
    choices: ["Dog", "Cat", "Rabbit", "Hamster"],
    correctIndex: 1, // Cat
  },
];

// Grabbing DOM stuff:
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

const answerInputs = Array.from(document.querySelectorAll('input[name="answer"]'));
const answerLabels = answerInputs.map((input) => input.parentElement);

let currentQuestionIndex = 0;

function setAnswersEnabled(enabled) {
  answerInputs.forEach((input) => (input.disabled = !enabled));
}

function getSelectedIndex() {
  const selected = document.querySelector('input[name="answer"]:checked');
  return selected ? Number(selected.value) : null;
}

// Display
function displayQuestion() {
  const q = questions[currentQuestionIndex];

  questionEl.textContent = q.question;
  feedbackEl.textContent = "";

  // Reset selection + enable answers
  answerInputs.forEach((input) => (input.checked = false));
  setAnswersEnabled(true);

  // IMPORTANT: disable Next until they answer
  nextButton.disabled = true;

  // Fill choices
  for (let i = 0; i < 4; i++) {
    answerInputs[i].value = String(i);
    answerLabels[i].lastChild.nodeValue = ` ${q.choices[i]}`;
  }
}

function handleAnswerSelection() {
  const selectedIndex = getSelectedIndex();
  if (selectedIndex === null) return;

  const q = questions[currentQuestionIndex];

  if (selectedIndex === q.correctIndex) {
    feedbackEl.textContent = "Correct! 🎉";
  } else {
    feedbackEl.textContent = `Not quite — correct answer: ${q.choices[q.correctIndex]}`;
  }

  // Disable answers + enable Next
  setAnswersEnabled(false);
  nextButton.disabled = false;
}

// Listen for selecting an answer
answerInputs.forEach((input) => {
  input.addEventListener("change", handleAnswerSelection); //used change instead of click since I'm using radios instead of buttons.
});

// Next Question button
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  // loop back to start (simple)
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }

  displayQuestion();
});

// Start
displayQuestion();

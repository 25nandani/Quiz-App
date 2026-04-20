const questions = [
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["this", "super", "extends", "implements"],
    answer: "extends",
  },
  {
    question: "Which concept of OOP involves hiding internal details?",
    options: ["Abstraction", "Inheritance", "Polymorphism", "Encapsulation"],
    answer: "Abstraction",
  },
  {
    question: "Which of these is not a pillar of OOP?",
    options: ["Encapsulation", "Abstraction", "Compilation", "Polymorphism"],
    answer: "Compilation",
  },
  {
    question:
      "Which access modifier makes a member visible only within its class?",
    options: ["public", "protected", "private", "default"],
    answer: "private",
  },
  {
    question: "What is method overloading?",
    options: [
      "Same method name with different return type",
      "Same method name with different parameters",
      "Multiple classes with same method",
      "Inheritance of method",
    ],
    answer: "Same method name with different parameters",
  },
  {
    question: "Which keyword is used to call the parent class constructor?",
    options: ["this", "parent", "base", "super"],
    answer: "super",
  },
  {
    question: "What does JVM stand for?",
    options: [
      "Java Virtual Method",
      "Java Very-fast Machine",
      "Java Virtual Machine",
      "Joint Virtual Model",
    ],
    answer: "Java Virtual Machine",
  },
  {
    question:
      "Which interface must a class implement to be runnable in a thread?",
    options: ["Serializable", "Comparable", "Runnable", "Threadable"],
    answer: "Runnable",
  },
  {
    question: "Which of the following is a runtime polymorphism example?",
    options: [
      "Method Overloading",
      "Method Overriding",
      "Constructor Overloading",
      "Operator Overloading",
    ],
    answer: "Method Overriding",
  },
  {
    question: "What is the base class of all classes in Java?",
    options: ["Base", "Object", "Main", "Super"],
    answer: "Object",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const currentQuestionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");
const currentElement = document.getElementById("current");
const totalElement = document.getElementById("total");
const finalScore = document.getElementById("percent");
const circle = document.getElementById("circle-id");
const header = document.querySelector(".header");

function showQuestion() {
   circle.style.display = "none";
    resultElement.style.display = "none";
     totalElement.innerHTML = questions.length;
    const currentQuestion = questions[currentQuestionIndex];
    currentQuestionElement.innerHTML = currentQuestion.question;
    optionElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option-btn");
      button.innerHTML = option;
      optionElement.appendChild(button);

      button.addEventListener("click", () => {
         Array.from(optionElement.children).forEach(btn => btn.disabled = true);
        if (option == currentQuestion.answer) {
          button.style.backgroundColor = "lightgreen";
            score++;
            
        }
        else {
          button.style.backgroundColor = "lightcoral";
        }
      });
    });
       
    

}
function showFinalScoreBar() {
  const percent = (score / questions.length) * 100;

  const circle = document.getElementById("inner");
  const text = document.getElementById("percent");

  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  let current = 0;

  const interval = setInterval(() => {
    if (current >= percent) {
      clearInterval(interval);
    } else {
      current++;

      const offset = circumference - (current / 100) * circumference;

      circle.style.strokeDashoffset = offset;
      text.innerText = current + "%";
    }
  }, 15);
}

 nextButton.addEventListener("click", () => {
   currentQuestionIndex++;
   if (currentQuestionIndex < questions.length) {
     showQuestion();
       currentElement.innerHTML = currentQuestionIndex + 1;
   } else {
     header.style.display = "none";
     currentQuestionElement.style.display = "none";
     optionElement.style.display = "none";
     nextButton.style.display = "none";
     circle.style.display = "block";
     currentElement.innerHTML = currentQuestionIndex;
     totalElement.innerHTML = questions.length;
     scoreElement.innerHTML = `${score} / ${questions.length}`;
     resultElement.style.display = "block";
     showFinalScoreBar();
   }
 });

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  currentQuestionElement.style.display = "block";
  optionElement.style.display = "flex"; 
  nextButton.style.display = "block";
  resultElement.style.display = "none";

  currentElement.innerHTML = 1;
  totalElement.innerHTML = questions.length;
  showQuestion();
});



showQuestion();

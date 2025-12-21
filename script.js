// Calculator Logic
function append(value) {
    const display = document.getElementById("display");

    // Prevent multiple dots in the same number
    if (value === ".") {
        let parts = display.value.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes(".")) return;
    }

    display.value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(document.getElementById("display").value);
        document.getElementById("display").value = result;
    } catch {
        alert("Invalid Expression");
    }
}

// Game Logic
let score = 0;
let correctAnswer = 0;

function startGame() {
    document.getElementById("game").style.display = "block";
    generateQuestion();
}

function generateQuestion() {
    let num1 = (Math.random() * 10).toFixed(1);
    let num2 = (Math.random() * 10).toFixed(1);
    let operators = ["+", "-", "*"];
    let op = operators[Math.floor(Math.random() * operators.length)];

    let question = `${num1} ${op} ${num2}`;
    correctAnswer = parseFloat(eval(question).toFixed(2));

    const q = document.getElementById("question");
    q.innerText = "Solve: " + question;
    q.style.color = "#f7fbfcff";
    q.style.fontFamily = "cursive";
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";
}

function checkAnswer() {
    let userAnswer = parseFloat(document.getElementById("answer").value);

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        score++;
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText =
            "Wrong! Answer was " + correctAnswer;
    }

    document.getElementById("score").innerText = score;
    generateQuestion();
}

function exitGame() {
    document.getElementById("game").style.display = "none";
}

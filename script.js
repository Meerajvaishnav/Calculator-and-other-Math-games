// ---------------- CALCULATOR ----------------
function append(value) {
    const display = document.getElementById("display");

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

// ---------------- GAME ----------------
let score = 0;
let correctAnswer = 0;

function startGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("game").style.display = "block";
    generateQuestion();
}

function generateQuestion() {
    let num1 = Number((Math.random() * 10).toFixed(1));
    let num2 = Number((Math.random() * 10).toFixed(1));
    let operators = ["+", "-", "*"];
    let op = operators[Math.floor(Math.random() * operators.length)];

    let question = `${num1} ${op} ${num2}`;
    correctAnswer = Number(eval(question).toFixed(2));

    document.getElementById("question").innerText = "Solve: " + question;
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";
}

function checkAnswer(event) {
    event.preventDefault();

    let input = document.getElementById("answer").value.trim();
    let resultBox = document.getElementById("result");

    if (input === "") {
        resultBox.innerText = "Enter an answer!";
        return;
    }

    let userAnswer = Number(input);

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        score++;
        resultBox.innerText = "Correct!";
    } else {
        resultBox.innerText = `Wrong! Answer was ${correctAnswer}`;
    }

    document.getElementById("score").innerText = score;

    setTimeout(generateQuestion, 1500);
}

function exitGame() {
    document.getElementById("game").style.display = "none";
}
